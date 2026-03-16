'use client'

import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Shield, Zap, Sparkles, ArrowRight, Play, Check } from 'lucide-react'
import { motion } from 'framer-motion'

export default function HomePage() {
  return (
    <>
      <Header />
      
      <main className="pt-14">
        {/* Hero section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-primary/3 rounded-full blur-3xl" />
          </div>
          
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-glow border border-accent-primary/20 mb-8">
                <Shield className="w-4 h-4 text-accent-primary" />
                <span className="text-sm text-accent-primary">100% client-side processing</span>
              </div>
              
              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
                Convert video to lightweight animated WebP —{' '}
                <span className="text-accent-primary">instantly, in your browser</span>
              </h1>
              
              {/* Subheadline */}
              <p className="text-lg sm:text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
                No uploads. No tracking. Just fast, private WebP conversion with smart defaults.
              </p>
              
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/convert"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent-primary text-bg-primary font-medium text-lg hover:bg-accent-secondary transition-colors"
                >
                  <Zap className="w-5 h-5" />
                  Start Converting
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-xl text-text-secondary hover:text-text-primary transition-colors"
                >
                  <Play className="w-5 h-5" />
                  See how it works
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Value props */}
        <section className="py-24 bg-bg-secondary/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-6 rounded-2xl bg-bg-primary border border-border-subtle"
              >
                <div className="w-12 h-12 rounded-xl bg-accent-glow flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-accent-primary" />
                </div>
                <h3 className="text-lg font-medium text-text-primary mb-2">Private by design</h3>
                <p className="text-text-secondary">
                  All processing happens locally in your browser. Your files never leave your device.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-6 rounded-2xl bg-bg-primary border border-border-subtle"
              >
                <div className="w-12 h-12 rounded-xl bg-accent-glow flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-accent-primary" />
                </div>
                <h3 className="text-lg font-medium text-text-primary mb-2">Built for performance</h3>
                <p className="text-text-secondary">
                  Create animated WebP files that load fast and stay small. Perfect for web performance.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="p-6 rounded-2xl bg-bg-primary border border-border-subtle"
              >
                <div className="w-12 h-12 rounded-xl bg-accent-glow flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-accent-primary" />
                </div>
                <h3 className="text-lg font-medium text-text-primary mb-2">Smart decisions included</h3>
                <p className="text-text-secondary">
                  Presets and AI guidance remove guesswork around FPS, quality, and file size.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* How it works */}
        <section id="how-it-works" className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-text-primary mb-4">How it works</h2>
              <p className="text-text-secondary">Three steps. No account required.</p>
            </motion.div>
            
            <div className="space-y-8">
              {[
                { step: 1, title: 'Drop a video clip', desc: 'Drag and drop or click to select an MP4, WebM, or MOV file.' },
                { step: 2, title: 'Trim and choose a preset', desc: 'Set your start and end points. Pick a preset or customize settings.' },
                { step: 3, title: 'Convert and download', desc: 'Get your optimized animated WebP instantly. No waiting for uploads.' },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-6"
                >
                  <div className="w-12 h-12 rounded-full bg-accent-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-bg-primary">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-text-primary mb-1">{item.title}</h3>
                    <p className="text-text-secondary">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Pro section */}
        <section className="py-24 bg-bg-secondary/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-accent-primary/10 to-bg-primary border border-accent-primary/20 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/10 rounded-full blur-3xl" />
              
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-accent-primary" />
                  <span className="text-sm font-medium text-accent-primary">Pro</span>
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
                  Need better results with less tweaking?
                </h2>
                
                <p className="text-text-secondary mb-8 max-w-xl">
                  Unlock Pro presets and smart AI recommendations. One-time payment, no subscription.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {[
                    'AI optimization suggestions',
                    'Pro presets (Email, Webflow, Framer, Shopify)',
                    'Batch conversion',
                    'Remove branding',
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-accent-primary" />
                      <span className="text-sm text-text-secondary">{feature}</span>
                    </div>
                  ))}
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
          </div>
        </section>
        
        {/* Trust section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-text-tertiary mb-8">
              Trusted by developers, designers, and performance-focused teams.
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
