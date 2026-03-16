'use client'

import { useAppStore } from '@/store/useAppStore'
import { useFFmpeg } from '@/hooks/useFFmpeg'
import { Zap, Loader2, Download, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function ConvertButton() {
  const { 
    videoFile,
    conversionState, 
    conversionProgress,
    conversionResult,
    error,
  } = useAppStore()
  
  const { convert } = useFFmpeg()
  
  const handleConvert = async () => {
    await convert()
  }
  
  const handleDownload = () => {
    if (!conversionResult) return
    
    // Generate smart filename from original video name
    const originalName = useAppStore.getState().videoMetadata?.name || 'animation'
    const baseName = originalName.replace(/\.[^.]+$/, '') // Remove extension
    const sanitized = baseName
      .replace(/[^a-zA-Z0-9-_\s]/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase()
      .slice(0, 50) || 'animation'
    
    const link = document.createElement('a')
    link.href = conversionResult.url
    link.download = `${sanitized}-webp.webp`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  
  const isProcessing = conversionState === 'loading-ffmpeg' || conversionState === 'processing'
  const isComplete = conversionState === 'complete' && conversionResult
  const isError = conversionState === 'error'
  
  return (
    <div className="space-y-4">
      {/* Main action button */}
      <AnimatePresence mode="wait">
        {isComplete ? (
          <motion.button
            key="download"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onClick={handleDownload}
            className="w-full btn-primary py-4 rounded-xl text-base font-medium"
          >
            <Download className="w-5 h-5" />
            Download WebP
            <span className="text-sm opacity-75">
              ({formatFileSize(conversionResult.size)})
            </span>
          </motion.button>
        ) : (
          <motion.button
            key="convert"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onClick={handleConvert}
            disabled={!videoFile || isProcessing}
            className={`
              w-full py-4 rounded-xl text-base font-medium transition-all
              flex items-center justify-center gap-2
              ${!videoFile || isProcessing
                ? 'bg-bg-elevated text-text-muted cursor-not-allowed'
                : 'bg-accent-primary text-bg-primary hover:bg-accent-secondary'
              }
            `}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {conversionState === 'loading-ffmpeg' ? 'Loading engine...' : 'Converting...'}
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                Convert to WebP
              </>
            )}
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Progress bar */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            <div className="h-2 rounded-full bg-bg-elevated overflow-hidden">
              <motion.div
                className="h-full bg-accent-primary"
                initial={{ width: 0 }}
                animate={{ width: `${conversionProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-xs text-text-tertiary text-center">
              {conversionProgress}% complete
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Error message */}
      <AnimatePresence>
        {isError && error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-start gap-2 p-3 rounded-lg bg-status-error/10 border border-status-error/20"
          >
            <AlertCircle className="w-4 h-4 text-status-error flex-shrink-0 mt-0.5" />
            <span className="text-sm text-status-error">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Result preview */}
      <AnimatePresence>
        {isComplete && conversionResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-4 rounded-xl bg-bg-secondary border border-border-subtle"
          >
            <div className="aspect-video rounded-lg overflow-hidden bg-bg-primary mb-4">
              <img
                src={conversionResult.url}
                alt="Converted WebP animation"
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-text-muted mb-1">Size</p>
                <p className="text-sm font-mono text-text-primary">
                  {formatFileSize(conversionResult.size)}
                </p>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-1">Frames</p>
                <p className="text-sm font-mono text-text-primary">
                  {conversionResult.frames}
                </p>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-1">Duration</p>
                <p className="text-sm font-mono text-text-primary">
                  {conversionResult.duration.toFixed(1)}s
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}
