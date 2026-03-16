'use client'

import { useState, useCallback } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { AIRecommendation } from '@/types'
import { Sparkles, Wand2, Lock, ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export function AIRecommendationPanel() {
  const { isPro, videoMetadata, settings, updateSettings } = useAppStore()
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  
  const generateRecommendation = useCallback(() => {
    if (!videoMetadata) return
    
    setIsGenerating(true)
    
    // Enhanced AI recommendation logic
    setTimeout(() => {
      const duration = settings.endTime - settings.startTime
      const aspectRatio = videoMetadata.width / videoMetadata.height
      const totalPixels = videoMetadata.width * videoMetadata.height
      const isHD = videoMetadata.width >= 1920 || videoMetadata.height >= 1080
      const is4K = videoMetadata.width >= 3840 || videoMetadata.height >= 2160
      const isPortrait = aspectRatio < 1
      const isSquare = Math.abs(aspectRatio - 1) < 0.1
      const isShort = duration < 2
      const isMedium = duration >= 2 && duration < 5
      const isLong = duration >= 5
      
      // Start with sensible defaults
      let fps = 15
      let quality = 75
      let maxWidth: number | null = 800
      
      // Adjust FPS based on content duration and source quality
      if (isShort) {
        // Short clips can afford higher FPS
        fps = isHD ? 24 : 20
      } else if (isMedium) {
        // Balance smoothness and size
        fps = isHD ? 18 : 15
      } else if (isLong) {
        // Prioritize file size for long content
        fps = 12
      }
      
      // Adjust quality based on resolution
      if (is4K) {
        quality = 65 // 4K source allows more compression
        maxWidth = 1280 // Downsample significantly
      } else if (isHD) {
        quality = 70
        maxWidth = 1080
      } else if (totalPixels < 640 * 480) {
        quality = 85 // Small source needs less compression
        maxWidth = null // Keep original
      }
      
      // Adjust for aspect ratio
      if (isPortrait) {
        // Portrait videos need different sizing
        maxWidth = 480
      } else if (isSquare) {
        maxWidth = 600
      }
      
      // Calculate estimated size
      const outputWidth = maxWidth || videoMetadata.width
      const outputHeight = Math.round(outputWidth / aspectRatio)
      const frameCount = duration * fps
      const bitsPerPixel = 0.12 * (quality / 100) * (isHD ? 0.8 : 1) // HD compresses better
      const estimatedBytes = frameCount * outputWidth * outputHeight * bitsPerPixel / 8
      
      // Generate explanation
      const reasons: string[] = []
      
      if (isShort) {
        reasons.push(`${fps} FPS for smooth playback on this ${duration.toFixed(1)}s clip`)
      } else if (isLong) {
        reasons.push(`${fps} FPS to manage file size for longer content`)
      } else {
        reasons.push(`${fps} FPS balances smoothness and file size`)
      }
      
      if (is4K || isHD) {
        reasons.push(`downscaled to ${maxWidth}px since source is high-resolution`)
      }
      
      if (quality < 75) {
        reasons.push(`${quality}% quality for efficient compression`)
      } else if (quality > 80) {
        reasons.push(`${quality}% quality to preserve detail`)
      }
      
      const rec: AIRecommendation = {
        fps,
        quality,
        maxWidth,
        estimatedSize: formatFileSize(estimatedBytes),
        explanation: reasons.join('. ') + '.',
      }
      
      setRecommendation(rec)
      setIsGenerating(false)
      setIsExpanded(true)
    }, 600)
  }, [videoMetadata, settings.endTime, settings.startTime])
  
  const applyRecommendation = useCallback(() => {
    if (!recommendation) return
    
    updateSettings({
      fps: recommendation.fps,
      quality: recommendation.quality,
      maxWidth: recommendation.maxWidth,
    })
  }, [recommendation, updateSettings])
  
  if (!isPro) {
    return (
      <div className="p-4 rounded-xl bg-bg-elevated border border-border-subtle">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent-glow flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-accent-primary" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-text-primary">AI Optimization</h4>
            <p className="text-xs text-text-tertiary">Get smart recommendations</p>
          </div>
          <Link
            href="/pro"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-primary/10 text-accent-primary text-sm hover:bg-accent-primary/20 transition-colors"
          >
            <Lock className="w-3.5 h-3.5" />
            Unlock
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="rounded-xl bg-bg-elevated border border-accent-primary/20 overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-accent-glow flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-accent-primary" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-medium text-text-primary">AI Optimization</h4>
          <p className="text-xs text-text-tertiary">Smart settings for your video</p>
        </div>
        
        {!recommendation ? (
          <button
            onClick={generateRecommendation}
            disabled={isGenerating || !videoMetadata}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors
              ${isGenerating || !videoMetadata
                ? 'bg-bg-tertiary text-text-muted cursor-not-allowed'
                : 'bg-accent-primary text-bg-primary hover:bg-accent-secondary'
              }
            `}
          >
            <Wand2 className="w-3.5 h-3.5" />
            {isGenerating ? 'Analyzing...' : 'Optimize'}
          </button>
        ) : (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-lg hover:bg-bg-tertiary text-text-secondary transition-colors"
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
      
      {/* Recommendation content */}
      <AnimatePresence>
        {recommendation && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-border-subtle"
          >
            <div className="p-4 space-y-4">
              {/* Recommended settings */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-bg-secondary text-center">
                  <p className="text-xs text-text-muted mb-1">FPS</p>
                  <p className="text-lg font-mono text-accent-primary">{recommendation.fps}</p>
                </div>
                <div className="p-3 rounded-lg bg-bg-secondary text-center">
                  <p className="text-xs text-text-muted mb-1">Quality</p>
                  <p className="text-lg font-mono text-accent-primary">{recommendation.quality}%</p>
                </div>
                <div className="p-3 rounded-lg bg-bg-secondary text-center">
                  <p className="text-xs text-text-muted mb-1">Est. Size</p>
                  <p className="text-lg font-mono text-accent-primary">{recommendation.estimatedSize}</p>
                </div>
              </div>
              
              {/* Explanation */}
              <p className="text-xs text-text-tertiary leading-relaxed">
                {recommendation.explanation}
              </p>
              
              {/* Apply button */}
              <button
                onClick={applyRecommendation}
                className="w-full py-2 rounded-lg bg-accent-primary/10 text-accent-primary text-sm hover:bg-accent-primary/20 transition-colors"
              >
                Apply Recommendations
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${Math.round(bytes)} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
