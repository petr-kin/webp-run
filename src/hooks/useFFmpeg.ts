'use client'

import { useRef, useCallback, useState } from 'react'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile, toBlobURL } from '@ffmpeg/util'
import { useAppStore } from '@/store/useAppStore'
import { ConversionResult } from '@/types'

export function useFFmpeg() {
  const ffmpegRef = useRef<FFmpeg | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  
  const {
    videoFile,
    settings,
    setConversionState,
    setConversionProgress,
    setConversionResult,
    setError,
  } = useAppStore()
  
  const load = useCallback(async () => {
    if (ffmpegRef.current && isLoaded) return
    
    setConversionState('loading-ffmpeg')
    setConversionProgress(0)
    
    try {
      const ffmpeg = new FFmpeg()
      ffmpegRef.current = ffmpeg
      
      ffmpeg.on('progress', ({ progress, time }) => {
        const percent = Math.min(Math.round(progress * 100), 99)
        setConversionProgress(percent)
      })
      
      ffmpeg.on('log', ({ message }) => {
        console.log('[FFmpeg]', message)
      })
      
      // Load FFmpeg with multi-threaded core
      const baseURL = 'https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm'
      
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, 'text/javascript'),
      })
      
      setIsLoaded(true)
      setConversionState('idle')
    } catch (err) {
      console.error('Failed to load FFmpeg:', err)
      setError('Failed to load FFmpeg. Please refresh and try again.')
      setConversionState('error')
    }
  }, [isLoaded, setConversionState, setConversionProgress, setError])
  
  const convert = useCallback(async (): Promise<ConversionResult | null> => {
    if (!videoFile) {
      setError('No video file selected')
      return null
    }
    
    // Load FFmpeg if not already loaded
    if (!ffmpegRef.current || !isLoaded) {
      await load()
    }
    
    const ffmpeg = ffmpegRef.current
    if (!ffmpeg) {
      setError('FFmpeg not available')
      return null
    }
    
    setConversionState('processing')
    setConversionProgress(0)
    setError(null)
    
    try {
      // Write input file
      const inputName = 'input' + getExtension(videoFile.name)
      const outputName = 'output.webp'
      
      await ffmpeg.writeFile(inputName, await fetchFile(videoFile))
      
      // Build FFmpeg command
      const args: string[] = []
      
      // Input with trim
      if (settings.startTime > 0) {
        args.push('-ss', settings.startTime.toFixed(2))
      }
      
      args.push('-i', inputName)
      
      // Duration
      const duration = settings.endTime - settings.startTime
      if (duration > 0) {
        args.push('-t', duration.toFixed(2))
      }
      
      // Video filters
      const filters: string[] = []
      
      // FPS
      filters.push(`fps=${settings.fps}`)
      
      // Scale if needed
      if (settings.maxWidth || settings.maxHeight) {
        const scaleW = settings.maxWidth || -1
        const scaleH = settings.maxHeight || -1
        filters.push(`scale=min(${scaleW}\\,iw):min(${scaleH}\\,ih):force_original_aspect_ratio=decrease`)
      }
      
      if (filters.length > 0) {
        args.push('-vf', filters.join(','))
      }
      
      // WebP specific options
      args.push('-c:v', 'libwebp')
      args.push('-quality', settings.quality.toString())
      args.push('-preset', 'picture')
      args.push('-compression_level', '4')
      
      // Loop
      args.push('-loop', settings.loop ? '0' : '1')
      
      // Output
      args.push('-an') // No audio
      args.push('-y') // Overwrite
      args.push(outputName)
      
      console.log('[FFmpeg] Running:', 'ffmpeg', args.join(' '))
      
      await ffmpeg.exec(args)
      
      // Read output
      const data = await ffmpeg.readFile(outputName)
      // Create blob from FFmpeg output - cast through unknown for SharedArrayBuffer compatibility
      const blob = new Blob([data as unknown as BlobPart], { type: 'image/webp' })
      const url = URL.createObjectURL(blob)
      
      // Get real output dimensions by decoding the WebP
      const img = new Image()
      img.src = url
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = () => resolve() // fallback to 0x0 if decode fails
      })

      const result: ConversionResult = {
        blob,
        url,
        size: blob.size,
        width: img.naturalWidth || settings.maxWidth || 0,
        height: img.naturalHeight || settings.maxHeight || 0,
        duration,
        frames: Math.round(duration * settings.fps),
      }
      
      // Cleanup
      await ffmpeg.deleteFile(inputName)
      await ffmpeg.deleteFile(outputName)
      
      setConversionProgress(100)
      setConversionResult(result)
      
      return result
    } catch (err) {
      console.error('Conversion failed:', err)
      setError('Conversion failed. Please try a different video or settings.')
      setConversionState('error')
      return null
    }
  }, [videoFile, settings, isLoaded, load, setConversionState, setConversionProgress, setConversionResult, setError])
  
  return {
    isLoaded,
    load,
    convert,
  }
}

function getExtension(filename: string): string {
  const match = filename.match(/\.[^.]+$/)
  return match ? match[0].toLowerCase() : '.mp4'
}
