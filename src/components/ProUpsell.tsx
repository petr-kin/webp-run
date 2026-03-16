'use client'

import { useAppStore } from '@/store/useAppStore'
import { Sparkles, Wand2, Layers, Award, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'

export function ProUpsell() {
  const { conversionState, isPro } = useAppStore()
  const [isDismissed, setIsDismissed] = useState(false)
  
  // Only show after successful conversion, and only for non-pro users
  if (conversionState !== 'complete' || isPro || isDismissed) {
    return null
  }
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="relative p-6 rounded-2xl bg-gradient-to-br from-accent-primary/10 to-accent-muted/5 border border-accent-primary/20 overflow-hidden"
      >
        {/* Dismiss button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute top-3 right-3 p-1.5 rounded-lg text-text-muted hover:text-text-secondary hover:bg-bg-elevated/50 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/10 rounded-full blur-3xl" />
        
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-accent-primary" />
            <span className="text-sm font-medium text-accent-primary">Unlock Pro</span>
          </div>
          
          <h3 className="text-lg font-medium text-text-primary mb-2">
            Get better results with less effort
          </h3>
          
          <p className="text-sm text-text-secondary mb-6">
            One-time payment. No subscription.
          </p>
          
          {/* Features */}
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div className="flex items-start gap-2">
              <Wand2 className="w-4 h-4 text-accent-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-text-primary">AI Optimization</p>
                <p className="text-xs text-text-tertiary">Smart settings suggestions</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Layers className="w-4 h-4 text-accent-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-text-primary">Pro Presets</p>
                <p className="text-xs text-text-tertiary">Email, Webflow, Framer, Shopify</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Award className="w-4 h-4 text-accent-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-text-primary">Batch Convert</p>
                <p className="text-xs text-text-tertiary">Process multiple files</p>
              </div>
            </div>
          </div>
          
          <Link
            href="/pro"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-primary text-bg-primary font-medium hover:bg-accent-secondary transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            Unlock Pro — €9
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
