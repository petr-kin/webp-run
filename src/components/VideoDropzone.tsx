'use client'

import { useCallback, useState } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { Upload, Film, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const ACCEPTED_TYPES = ['video/mp4', 'video/webm', 'video/quicktime']
const MAX_SIZE = 500 * 1024 * 1024 // 500MB

export function VideoDropzone() {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { setVideoFile, setVideoMetadata } = useAppStore()
  
  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return 'Please upload an MP4, WebM, or MOV file'
    }
    if (file.size > MAX_SIZE) {
      return 'File size must be under 500MB'
    }
    return null
  }
  
  const processFile = useCallback(async (file: File) => {
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      return
    }
    
    setError(null)
    setVideoFile(file)
    
    // Get video metadata
    const video = document.createElement('video')
    video.preload = 'metadata'
    
    video.onloadedmetadata = () => {
      setVideoMetadata({
        duration: video.duration,
        width: video.videoWidth,
        height: video.videoHeight,
        name: file.name,
        size: file.size,
        type: file.type,
      })
      URL.revokeObjectURL(video.src)
    }
    
    video.onerror = () => {
      setError('Could not read video metadata')
      URL.revokeObjectURL(video.src)
    }
    
    video.src = URL.createObjectURL(file)
  }, [setVideoFile, setVideoMetadata])
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files[0]
    if (file) {
      processFile(file)
    }
  }, [processFile])
  
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])
  
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])
  
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }, [processFile])
  
  return (
    <div className="w-full">
      <motion.div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer
          ${isDragging 
            ? 'border-accent-primary bg-accent-glow scale-[1.02]' 
            : 'border-border-subtle hover:border-border-default bg-bg-secondary/50'
          }
        `}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <input
          type="file"
          accept=".mp4,.mov,.webm,video/mp4,video/webm,video/quicktime"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          aria-label="Upload video file"
        />
        
        <div className="flex flex-col items-center justify-center py-16 px-8">
          <motion.div
            className={`
              w-16 h-16 rounded-2xl flex items-center justify-center mb-6
              ${isDragging ? 'bg-accent-primary' : 'bg-bg-elevated'}
            `}
            animate={isDragging ? { rotate: [0, -5, 5, 0] } : {}}
            transition={{ duration: 0.3 }}
          >
            {isDragging ? (
              <Film className="w-8 h-8 text-bg-primary" />
            ) : (
              <Upload className="w-8 h-8 text-text-secondary" />
            )}
          </motion.div>
          
          <h3 className="text-lg font-medium text-text-primary mb-2">
            {isDragging ? 'Drop your video' : 'Drop a video to start'}
          </h3>
          
          <p className="text-sm text-text-tertiary mb-4">
            or click to browse
          </p>
          
          <div className="flex items-center gap-4 text-xs text-text-muted">
            <span>MP4</span>
            <span className="w-1 h-1 rounded-full bg-border-default" />
            <span>WebM</span>
            <span className="w-1 h-1 rounded-full bg-border-default" />
            <span>MOV</span>
            <span className="w-1 h-1 rounded-full bg-border-default" />
            <span>Up to 500MB</span>
          </div>
        </div>
      </motion.div>
      
      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 flex items-center gap-2 p-3 rounded-lg bg-status-error/10 border border-status-error/20"
          >
            <AlertCircle className="w-4 h-4 text-status-error flex-shrink-0" />
            <span className="text-sm text-status-error">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
