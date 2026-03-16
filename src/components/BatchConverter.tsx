'use client'

import { useCallback, useRef, useState } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile, toBlobURL } from '@ffmpeg/util'
import { 
  Upload, 
  X, 
  Play, 
  Download, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  FileVideo,
  Archive,
  Trash2
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import JSZip from 'jszip'

const ACCEPTED_TYPES = ['video/mp4', 'video/webm', 'video/quicktime']
const MAX_SIZE = 500 * 1024 * 1024

export function BatchConverter() {
  const ffmpegRef = useRef<FFmpeg | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  
  const {
    batchFiles,
    batchProcessing,
    settings,
    addBatchFiles,
    removeBatchFile,
    updateBatchFile,
    clearBatchFiles,
    setBatchProcessing,
  } = useAppStore()
  
  const loadFFmpeg = useCallback(async () => {
    if (ffmpegRef.current && isLoaded) return ffmpegRef.current
    
    const ffmpeg = new FFmpeg()
    ffmpegRef.current = ffmpeg
    
    const baseURL = 'https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm'
    
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, 'text/javascript'),
    })
    
    setIsLoaded(true)
    return ffmpeg
  }, [isLoaded])
  
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const validFiles = files.filter(file => 
      ACCEPTED_TYPES.includes(file.type) && file.size <= MAX_SIZE
    )
    if (validFiles.length > 0) {
      addBatchFiles(validFiles)
    }
    e.target.value = ''
  }, [addBatchFiles])
  
  const convertFile = useCallback(async (
    ffmpeg: FFmpeg,
    file: File,
    onProgress: (progress: number) => void
  ) => {
    const inputName = 'input' + getExtension(file.name)
    const outputName = 'output.webp'
    
    await ffmpeg.writeFile(inputName, await fetchFile(file))
    
    ffmpeg.on('progress', ({ progress }) => {
      onProgress(Math.min(Math.round(progress * 100), 99))
    })
    
    const args: string[] = []
    args.push('-i', inputName)
    
    const filters: string[] = []
    filters.push(`fps=${settings.fps}`)
    
    if (settings.maxWidth || settings.maxHeight) {
      const scaleW = settings.maxWidth || -1
      const scaleH = settings.maxHeight || -1
      filters.push(`scale='min(${scaleW},iw)':min'(${scaleH},ih)':force_original_aspect_ratio=decrease`)
    }
    
    if (filters.length > 0) {
      args.push('-vf', filters.join(','))
    }
    
    args.push('-c:v', 'libwebp')
    args.push('-quality', settings.quality.toString())
    args.push('-preset', 'picture')
    args.push('-compression_level', '4')
    args.push('-loop', settings.loop ? '0' : '1')
    args.push('-an', '-y', outputName)
    
    await ffmpeg.exec(args)
    
    const data = await ffmpeg.readFile(outputName)
    const blob = new Blob([data as unknown as BlobPart], { type: 'image/webp' })
    const url = URL.createObjectURL(blob)
    
    await ffmpeg.deleteFile(inputName)
    await ffmpeg.deleteFile(outputName)
    
    return { blob, url, size: blob.size }
  }, [settings])
  
  const processAll = useCallback(async () => {
    if (batchFiles.length === 0 || batchProcessing) return
    
    setBatchProcessing(true)
    
    try {
      const ffmpeg = await loadFFmpeg()
      
      for (const batchFile of batchFiles) {
        if (batchFile.status === 'complete') continue
        
        updateBatchFile(batchFile.id, { status: 'processing', progress: 0 })
        
        try {
          const result = await convertFile(
            ffmpeg,
            batchFile.file,
            (progress) => updateBatchFile(batchFile.id, { progress })
          )
          
          updateBatchFile(batchFile.id, {
            status: 'complete',
            progress: 100,
            result: {
              blob: result.blob,
              url: result.url,
              size: result.size,
              width: settings.maxWidth || 0,
              height: settings.maxHeight || 0,
              duration: 0,
              frames: 0,
            },
          })
        } catch (err) {
          updateBatchFile(batchFile.id, {
            status: 'error',
            error: 'Conversion failed',
          })
        }
      }
    } finally {
      setBatchProcessing(false)
    }
  }, [batchFiles, batchProcessing, loadFFmpeg, convertFile, updateBatchFile, setBatchProcessing, settings])
  
  const downloadSingle = useCallback((id: string) => {
    const file = batchFiles.find(f => f.id === id)
    if (!file?.result) return
    
    const baseName = file.name.replace(/\.[^.]+$/, '')
    const link = document.createElement('a')
    link.href = file.result.url
    link.download = `${sanitizeFilename(baseName)}-webp.webp`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [batchFiles])
  
  const downloadAll = useCallback(async () => {
    const completedFiles = batchFiles.filter(f => f.status === 'complete' && f.result)
    if (completedFiles.length === 0) return
    
    const zip = new JSZip()
    
    for (const file of completedFiles) {
      if (!file.result) continue
      const baseName = file.name.replace(/\.[^.]+$/, '')
      const filename = `${sanitizeFilename(baseName)}-webp.webp`
      zip.file(filename, file.result.blob)
    }
    
    const content = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(content)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `webp-batch-${Date.now()}.zip`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    URL.revokeObjectURL(url)
  }, [batchFiles])
  
  const completedCount = batchFiles.filter(f => f.status === 'complete').length
  const pendingCount = batchFiles.filter(f => f.status === 'pending').length
  
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-text-primary">Batch Conversion</h3>
          <p className="text-xs text-text-tertiary mt-0.5">
            {batchFiles.length} files • {completedCount} completed
          </p>
        </div>
        
        {batchFiles.length > 0 && (
          <button
            onClick={clearBatchFiles}
            className="p-2 rounded-lg text-text-tertiary hover:text-status-error hover:bg-status-error/10 transition-colors"
            title="Clear all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
      
      {/* File input */}
      <div className="relative">
        <input
          type="file"
          accept=".mp4,.mov,.webm,video/mp4,video/webm,video/quicktime"
          multiple
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          disabled={batchProcessing}
        />
        <div className={`
          p-4 rounded-xl border-2 border-dashed text-center transition-all
          ${batchProcessing 
            ? 'border-border-subtle bg-bg-secondary/30 cursor-not-allowed' 
            : 'border-border-subtle hover:border-accent-primary/50 bg-bg-secondary/50 cursor-pointer'
          }
        `}>
          <Upload className="w-6 h-6 text-text-tertiary mx-auto mb-2" />
          <p className="text-sm text-text-secondary">
            Add videos to batch
          </p>
          <p className="text-xs text-text-muted mt-1">
            MP4, WebM, MOV up to 500MB each
          </p>
        </div>
      </div>
      
      {/* File list */}
      <AnimatePresence mode="popLayout">
        {batchFiles.map((file) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-3 rounded-lg bg-bg-elevated border border-border-subtle"
          >
            <div className="flex items-center gap-3">
              <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                ${file.status === 'complete' ? 'bg-status-success/20' : 
                  file.status === 'error' ? 'bg-status-error/20' : 
                  file.status === 'processing' ? 'bg-accent-glow' : 'bg-bg-tertiary'}
              `}>
                {file.status === 'complete' ? (
                  <CheckCircle className="w-5 h-5 text-status-success" />
                ) : file.status === 'error' ? (
                  <AlertCircle className="w-5 h-5 text-status-error" />
                ) : file.status === 'processing' ? (
                  <Loader2 className="w-5 h-5 text-accent-primary animate-spin" />
                ) : (
                  <FileVideo className="w-5 h-5 text-text-tertiary" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary truncate">{file.name}</p>
                <p className="text-xs text-text-muted">
                  {formatFileSize(file.size)}
                  {file.status === 'complete' && file.result && (
                    <span className="text-status-success"> → {formatFileSize(file.result.size)}</span>
                  )}
                  {file.status === 'processing' && (
                    <span className="text-accent-primary"> • {file.progress}%</span>
                  )}
                  {file.status === 'error' && (
                    <span className="text-status-error"> • {file.error}</span>
                  )}
                </p>
              </div>
              
              <div className="flex items-center gap-1">
                {file.status === 'complete' && file.result && (
                  <button
                    onClick={() => downloadSingle(file.id)}
                    className="p-2 rounded-lg text-accent-primary hover:bg-accent-glow transition-colors"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => removeBatchFile(file.id)}
                  disabled={batchProcessing && file.status === 'processing'}
                  className="p-2 rounded-lg text-text-tertiary hover:text-status-error hover:bg-status-error/10 transition-colors disabled:opacity-50"
                  title="Remove"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Progress bar */}
            {file.status === 'processing' && (
              <div className="mt-2 h-1 rounded-full bg-bg-tertiary overflow-hidden">
                <motion.div
                  className="h-full bg-accent-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${file.progress}%` }}
                />
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* Actions */}
      {batchFiles.length > 0 && (
        <div className="flex gap-2">
          {pendingCount > 0 && (
            <button
              onClick={processAll}
              disabled={batchProcessing}
              className={`
                flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all
                ${batchProcessing
                  ? 'bg-bg-elevated text-text-muted cursor-not-allowed'
                  : 'bg-accent-primary text-bg-primary hover:bg-accent-secondary'
                }
              `}
            >
              {batchProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Convert All ({pendingCount})
                </>
              )}
            </button>
          )}
          
          {completedCount > 0 && (
            <button
              onClick={downloadAll}
              disabled={batchProcessing}
              className="flex-1 py-3 rounded-xl font-medium bg-bg-elevated border border-border-subtle text-text-primary hover:border-accent-primary/50 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <Archive className="w-4 h-4" />
              Download ZIP ({completedCount})
            </button>
          )}
        </div>
      )}
    </div>
  )
}

function getExtension(filename: string): string {
  const match = filename.match(/\.[^.]+$/)
  return match ? match[0].toLowerCase() : '.mp4'
}

function sanitizeFilename(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9-_]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
    .slice(0, 50) || 'video'
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}
