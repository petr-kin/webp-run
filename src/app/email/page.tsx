'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Mail, Check, ArrowRight, AlertTriangle, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function EmailPage() {
  return (
    <>
      <Header />
      
      <main className="pt-14">
        {/* Hero */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-primary/5 rounded-full blur-3xl" />
          </div>
          
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-glow border border-accent-primary/20 mb-6">
                <Mail className="w-4 h-4 text-accent-primary" />
                <span className="text-sm text-accent-primary">Email Marketing</span>
              </div>
              
              <h1 className="text-4xl font-bold text-text-primary mb-6">
                Animated WebP for Email — smaller than GIF, smoother than PNG
              </h1>
              
              <p className="text-lg text-text-secondary mb-8 max-w-2xl">
                Create eye-catching animated images for your email campaigns that load fast 
                and stay under size limits. All processing happens locally.
              </p>
              
              <Link
                href="/convert"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-primary text-bg-primary font-medium hover:bg-accent-secondary transition-colors"
              >
                <Zap className="w-4 h-4" />
                Create Email-Safe Animation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>
        
        {/* Problem */}
        <section className="py-16 bg-bg-secondary/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-text-primary mb-8">
              The email animation challenge
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-bg-primary border border-border-subtle">
                <h3 className="font-medium text-text-primary mb-3">GIF Problems</h3>
                <ul className="space-y-2 text-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-status-error mt-1">✕</span>
                    <span>Large file sizes (often 1MB+)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-status-error mt-1">✕</span>
                    <span>Limited to 256 colors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-status-error mt-1">✕</span>
                    <span>Choppy animation quality</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-6 rounded-xl bg-accent-glow border border-accent-primary/20">
                <h3 className="font-medium text-accent-primary mb-3">WebP Solution</h3>
                <ul className="space-y-2 text-text-secondary">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent-primary mt-1" />
                    <span>26% smaller than GIF</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent-primary mt-1" />
                    <span>Full color support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent-primary mt-1" />
                    <span>Smoother animation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Recommended settings */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-text-primary mb-8">
              Recommended email settings
            </h2>
            
            <div className="p-6 rounded-xl bg-bg-secondary border border-border-subtle mb-8">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-2xl font-mono text-accent-primary">8</p>
                  <p className="text-sm text-text-tertiary">FPS</p>
                </div>
                <div>
                  <p className="text-2xl font-mono text-accent-primary">50%</p>
                  <p className="text-sm text-text-tertiary">Quality</p>
                </div>
                <div>
                  <p className="text-2xl font-mono text-accent-primary">320px</p>
                  <p className="text-sm text-text-tertiary">Max Width</p>
                </div>
                <div>
                  <p className="text-2xl font-mono text-accent-primary">&lt;500KB</p>
                  <p className="text-sm text-text-tertiary">Target Size</p>
                </div>
              </div>
            </div>
            
            {/* Warning */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-status-warning/10 border border-status-warning/20">
              <AlertTriangle className="w-5 h-5 text-status-warning flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-status-warning">Email client support varies</p>
                <p className="text-sm text-text-secondary mt-1">
                  Some email clients (Outlook desktop, older Gmail app versions) may not support 
                  animated WebP. Consider providing a fallback static image.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16 bg-bg-secondary/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Ready to create?
            </h2>
            <p className="text-text-secondary mb-8">
              Use our Email Safe preset for optimal results.
            </p>
            <Link
              href="/convert"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent-primary text-bg-primary font-medium text-lg hover:bg-accent-secondary transition-colors"
            >
              <Zap className="w-5 h-5" />
              Start Converting — Free
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
}
