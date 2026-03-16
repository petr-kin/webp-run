'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { Play, Pause, RotateCcw, Scissors } from 'lucide-react'
import { motion } from 'framer-motion'

export function VideoPreview() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  
  const { 
    videoUrl, 
    videoMetadata, 
    settings, 
    updateSettings,
    reset,
  } = useAppStore()
  
  // Update current time as video plays
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
      
      // Loop within trim range
      if (video.currentTime >= settings.endTime) {
        video.currentTime = settings.startTime
      }
    }
    
    video.addEventListener('timeupdate', handleTimeUpdate)
    return () => video.removeEventListener('timeupdate', handleTimeUpdate)
  }, [settings.startTime, settings.endTime])
  
  // Set initial end time when video loads
  useEffect(() => {
    if (videoMetadata && settings.endTime === 0) {
      updateSettings({ endTime: videoMetadata.duration })
    }
  }, [videoMetadata, settings.endTime, updateSettings])
  
  const togglePlay = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    
    if (isPlaying) {
      video.pause()
    } else {
      if (video.currentTime < settings.startTime || video.currentTime >= settings.endTime) {
        video.currentTime = settings.startTime
      }
      video.play()
    }
    setIsPlaying(!isPlaying)
  }, [isPlaying, settings.startTime, settings.endTime])
  
  const handleStartTimeChange = useCallback((value: number) => {
    const newStart = Math.min(value, settings.endTime - 0.1)
    updateSettings({ startTime: newStart })
    if (videoRef.current) {
      videoRef.current.currentTime = newStart
    }
  }, [settings.endTime, updateSettings])
  
  const handleEndTimeChange = useCallback((value: number) => {
    const newEnd = Math.max(value, settings.startTime + 0.1)
    updateSettings({ endTime: newEnd })
  }, [settings.startTime, updateSettings])
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    const ms = Math.floor((seconds % 1) * 10)
    return `${mins}:${secs.toString().padStart(2, '0')}.${ms}`
  }
  
  if (!videoUrl || !videoMetadata) return null
  
  const duration = videoMetadata.duration
  const trimDuration = settings.endTime - settings.startTime
  
  return (
    <div className="space-y-4">
      {/* Video player */}
      <div className="relative rounded-xl overflow-hidden bg-bg-primary border border-border-subtle">
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full aspect-video object-contain"
          onClick={togglePlay}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        
        {/* Play/pause overlay */}
        <motion.button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity"
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-16 h-16 rounded-full bg-bg-primary/90 flex items-center justify-center">
            {isPlaying ? (
              <Pause className="w-6 h-6 text-text-primary" />
            ) : (
              <Play className="w-6 h-6 text-text-primary ml-1" />
            )}
          </div>
        </motion.button>
        
        {/* Video info overlay */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2 py-1 rounded bg-bg-primary/80 text-xs text-text-secondary font-mono">
            {videoMetadata.width}×{videoMetadata.height}
          </span>
          <span className="px-2 py-1 rounded bg-bg-primary/80 text-xs text-text-secondary font-mono">
            {formatTime(duration)}
          </span>
        </div>
        
        {/* Reset button */}
        <button
          onClick={reset}
          className="absolute top-3 right-3 p-2 rounded-lg bg-bg-primary/80 text-text-secondary hover:text-text-primary transition-colors"
          title="Remove video"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
      
      {/* Timeline trimmer */}
      <div className="p-4 rounded-xl bg-bg-secondary border border-border-subtle">
        <div className="flex items-center gap-2 mb-4">
          <Scissors className="w-4 h-4 text-accent-primary" />
          <span className="text-sm font-medium text-text-primary">Trim</span>
          <span className="ml-auto text-xs text-text-tertiary font-mono">
            Duration: {formatTime(trimDuration)}
          </span>
        </div>
        
        {/* Timeline visualization */}
        <div className="relative h-12 mb-4">
          {/* Background track */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 rounded-full bg-bg-elevated" />
          
          {/* Selected range */}
          <div
            className="absolute top-1/2 -translate-y-1/2 h-2 rounded-full bg-accent-primary/30"
            style={{
              left: `${(settings.startTime / duration) * 100}%`,
              width: `${((settings.endTime - settings.startTime) / duration) * 100}%`,
            }}
          />
          
          {/* Current position indicator */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-accent-primary z-10"
            style={{
              left: `${(currentTime / duration) * 100}%`,
            }}
          />
          
          {/* Start handle */}
          <input
            type="range"
            min={0}
            max={duration}
            step={0.01}
            value={settings.startTime}
            onChange={(e) => handleStartTimeChange(parseFloat(e.target.value))}
            className="absolute inset-0 w-full opacity-0 cursor-ew-resize z-20"
            style={{ clipPath: 'inset(0 50% 0 0)' }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-8 rounded bg-accent-primary cursor-ew-resize flex items-center justify-center"
            style={{ left: `calc(${(settings.startTime / duration) * 100}% - 8px)` }}
          >
            <div className="w-0.5 h-3 bg-bg-primary rounded" />
          </div>
          
          {/* End handle */}
          <input
            type="range"
            min={0}
            max={duration}
            step={0.01}
            value={settings.endTime}
            onChange={(e) => handleEndTimeChange(parseFloat(e.target.value))}
            className="absolute inset-0 w-full opacity-0 cursor-ew-resize z-20"
            style={{ clipPath: 'inset(0 0 0 50%)' }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-8 rounded bg-accent-primary cursor-ew-resize flex items-center justify-center"
            style={{ left: `calc(${(settings.endTime / duration) * 100}% - 8px)` }}
          >
            <div className="w-0.5 h-3 bg-bg-primary rounded" />
          </div>
        </div>
        
        {/* Time inputs */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-text-tertiary">Start:</span>
            <span className="font-mono text-text-secondary">{formatTime(settings.startTime)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-text-tertiary">End:</span>
            <span className="font-mono text-text-secondary">{formatTime(settings.endTime)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
