'use client'

import { useAppStore } from '@/store/useAppStore'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { VideoDropzone } from '@/components/VideoDropzone'
import { VideoPreview } from '@/components/VideoPreview'
import { PresetsPanel } from '@/components/PresetsPanel'
import { ConversionControls } from '@/components/ConversionControls'
import { ConvertButton } from '@/components/ConvertButton'
import { AIRecommendationPanel } from '@/components/AIRecommendation'
import { ProUpsell } from '@/components/ProUpsell'
import { BatchConverter } from '@/components/BatchConverter'
import { motion } from 'framer-motion'
import { Layers } from 'lucide-react'
import { useState } from 'react'

export default function ConvertPage() {
  const { videoFile, videoMetadata, isPro } = useAppStore()
  const [mode, setMode] = useState<'single' | 'batch'>('single')
  
  return (
    <>
      <Header />
      
      <main className="pt-14 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Convert Video to WebP</h1>
              <p className="text-text-secondary mt-1">
                Drop a video, trim it, and convert to animated WebP.
              </p>
            </div>
            
            {/* Mode switcher (Pro only) */}
            {isPro && (
              <div className="flex items-center gap-1 p-1 rounded-lg bg-bg-secondary border border-border-subtle">
                <button
                  onClick={() => setMode('single')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    mode === 'single' 
                      ? 'bg-accent-primary text-bg-primary' 
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Single
                </button>
                <button
                  onClick={() => setMode('batch')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    mode === 'batch' 
                      ? 'bg-accent-primary text-bg-primary' 
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  Batch
                </button>
              </div>
            )}
          </div>
          
          {/* Batch mode (Pro) */}
          {isPro && mode === 'batch' ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid lg:grid-cols-[1fr,320px] gap-8"
            >
              <div className="space-y-6">
                <BatchConverter />
              </div>
              
              <aside className="space-y-6">
                <div className="lg:sticky lg:top-20">
                  <PresetsPanel />
                  <div className="mt-6 p-4 rounded-xl bg-bg-secondary border border-border-subtle">
                    <ConversionControls />
                  </div>
                </div>
              </aside>
            </motion.div>
          ) : !videoFile ? (
            /* Dropzone state */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto"
            >
              <VideoDropzone />
              
              {/* Features reminder */}
              <div className="mt-8 grid sm:grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-xl bg-bg-secondary/50">
                  <p className="text-sm font-medium text-text-primary">Private</p>
                  <p className="text-xs text-text-tertiary mt-1">Nothing leaves your device</p>
                </div>
                <div className="p-4 rounded-xl bg-bg-secondary/50">
                  <p className="text-sm font-medium text-text-primary">Fast</p>
                  <p className="text-xs text-text-tertiary mt-1">FFmpeg runs in your browser</p>
                </div>
                <div className="p-4 rounded-xl bg-bg-secondary/50">
                  <p className="text-sm font-medium text-text-primary">Smart</p>
                  <p className="text-xs text-text-tertiary mt-1">Presets for every use case</p>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Editor state */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid lg:grid-cols-[1fr,320px] gap-8"
            >
              {/* Main content */}
              <div className="space-y-6">
                <VideoPreview />
                <AIRecommendationPanel />
                <ConvertButton />
                <ProUpsell />
              </div>
              
              {/* Sidebar */}
              <aside className="space-y-6">
                <div className="lg:sticky lg:top-20">
                  <PresetsPanel />
                  <div className="mt-6 p-4 rounded-xl bg-bg-secondary border border-border-subtle">
                    <ConversionControls />
                  </div>
                </div>
              </aside>
            </motion.div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  )
}
