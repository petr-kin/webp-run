'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Layers, Check, ArrowRight, Zap, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function FramerPage() {
  return (
    <>
      <Header />
      
      <main className="pt-14">
        {/* Hero */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent-primary/5 rounded-full blur-3xl" />
          </div>
          
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-glow border border-accent-primary/20 mb-6">
                <Layers className="w-4 h-4 text-accent-primary" />
                <span className="text-sm text-accent-primary">Framer</span>
              </div>
              
              <h1 className="text-4xl font-bold text-text-primary mb-6">
                Lightweight Animations for Framer Landing Pages
              </h1>
              
              <p className="text-lg text-text-secondary mb-8 max-w-2xl">
                Replace heavy JavaScript animations with optimized WebP files. 
                Get smooth micro-interactions that don't slow down your site.
              </p>
              
              <Link
                href="/convert"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-primary text-bg-primary font-medium hover:bg-accent-secondary transition-colors"
              >
                <Zap className="w-4 h-4" />
                Create Framer Animation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>
        
        {/* Benefits */}
        <section className="py-16 bg-bg-secondary/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-text-primary mb-8">
              Why WebP for Framer?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-bg-primary border border-border-subtle">
                <div className="w-10 h-10 rounded-lg bg-accent-glow flex items-center justify-center mb-4">
                  <Zap className="w-5 h-5 text-accent-primary" />
                </div>
                <h3 className="font-medium text-text-primary mb-2">No JS overhead</h3>
                <p className="text-sm text-text-secondary">
                  WebP animations play natively without JavaScript, reducing bundle size.
                </p>
              </div>
              
              <div className="p-6 rounded-xl bg-bg-primary border border-border-subtle">
                <div className="w-10 h-10 rounded-lg bg-accent-glow flex items-center justify-center mb-4">
                  <Layers className="w-5 h-5 text-accent-primary" />
                </div>
                <h3 className="font-medium text-text-primary mb-2">Consistent playback</h3>
                <p className="text-sm text-text-secondary">
                  No frame drops or jank. Animations look the same on every device.
                </p>
              </div>
              
              <div className="p-6 rounded-xl bg-bg-primary border border-border-subtle">
                <div className="w-10 h-10 rounded-lg bg-accent-glow flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5 text-accent-primary" />
                </div>
                <h3 className="font-medium text-text-primary mb-2">Easy to update</h3>
                <p className="text-sm text-text-secondary">
                  Just swap the file. No code changes or republishing needed.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Recommended settings */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-text-primary mb-8">
              Framer Landing preset settings
            </h2>
            
            <div className="p-6 rounded-xl bg-bg-secondary border border-border-subtle mb-8">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-2xl font-mono text-accent-primary">15</p>
                  <p className="text-sm text-text-tertiary">FPS</p>
                </div>
                <div>
                  <p className="text-2xl font-mono text-accent-primary">70%</p>
                  <p className="text-sm text-text-tertiary">Quality</p>
                </div>
                <div>
                  <p className="text-2xl font-mono text-accent-primary">640px</p>
                  <p className="text-sm text-text-tertiary">Max Width</p>
                </div>
                <div>
                  <p className="text-2xl font-mono text-accent-primary">Loop</p>
                  <p className="text-sm text-text-tertiary">Infinite</p>
                </div>
              </div>
            </div>
            
            {/* Use cases */}
            <div className="space-y-4">
              <h3 className="font-medium text-text-primary">Perfect for</h3>
              <ul className="space-y-3 text-text-secondary">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent-primary mt-1" />
                  <span>Product demos and walkthroughs</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent-primary mt-1" />
                  <span>Feature highlights</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent-primary mt-1" />
                  <span>Micro-interactions and UI animations</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent-primary mt-1" />
                  <span>Before/after comparisons</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16 bg-bg-secondary/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Ready to level up your Framer site?
            </h2>
            <p className="text-text-secondary mb-8">
              Use our Framer Landing preset for optimal performance.
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
