'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Globe, Check, ArrowRight, Zap, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function WebflowPage() {
  return (
    <>
      <Header />
      
      <main className="pt-14">
        {/* Hero */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent-primary/5 rounded-full blur-3xl" />
          </div>
          
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-glow border border-accent-primary/20 mb-6">
                <Globe className="w-4 h-4 text-accent-primary" />
                <span className="text-sm text-accent-primary">Webflow</span>
              </div>
              
              <h1 className="text-4xl font-bold text-text-primary mb-6">
                Use Animated WebP in Webflow Without Hurting Performance
              </h1>
              
              <p className="text-lg text-text-secondary mb-8 max-w-2xl">
                Create stunning hero animations that load fast and keep your Core Web Vitals 
                healthy. Perfect for landing pages and portfolio sites.
              </p>
              
              <Link
                href="/convert"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-primary text-bg-primary font-medium hover:bg-accent-secondary transition-colors"
              >
                <Zap className="w-4 h-4" />
                Create Webflow Hero
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>
        
        {/* LCP Impact */}
        <section className="py-16 bg-bg-secondary/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-text-primary mb-8">
              Why LCP matters for your Webflow site
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-text-secondary mb-4">
                  Largest Contentful Paint (LCP) measures when the main content of your page 
                  becomes visible. Hero animations often ARE the LCP element.
                </p>
                <p className="text-text-secondary">
                  A heavy, unoptimized animation can push your LCP beyond 2.5 seconds, 
                  hurting both user experience and SEO rankings.
                </p>
              </div>
              
              <div className="p-6 rounded-xl bg-bg-primary border border-border-subtle">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-5 h-5 text-accent-primary" />
                  <span className="font-medium text-text-primary">WebP advantage</span>
                </div>
                <ul className="space-y-3 text-text-secondary">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent-primary mt-1" />
                    <span>30-50% smaller than equivalent GIF</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent-primary mt-1" />
                    <span>Loads progressively</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent-primary mt-1" />
                    <span>Better compression = faster LCP</span>
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
              Webflow Hero preset settings
            </h2>
            
            <div className="p-6 rounded-xl bg-bg-secondary border border-border-subtle mb-8">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-2xl font-mono text-accent-primary">20</p>
                  <p className="text-sm text-text-tertiary">FPS</p>
                </div>
                <div>
                  <p className="text-2xl font-mono text-accent-primary">80%</p>
                  <p className="text-sm text-text-tertiary">Quality</p>
                </div>
                <div>
                  <p className="text-2xl font-mono text-accent-primary">1920px</p>
                  <p className="text-sm text-text-tertiary">Max Width</p>
                </div>
                <div>
                  <p className="text-2xl font-mono text-accent-primary">Loop</p>
                  <p className="text-sm text-text-tertiary">Infinite</p>
                </div>
              </div>
            </div>
            
            {/* Tips */}
            <div className="space-y-4">
              <h3 className="font-medium text-text-primary">Pro tips for Webflow</h3>
              <ul className="space-y-3 text-text-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-accent-primary">→</span>
                  <span>Keep animations under 3 seconds for hero sections</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-primary">→</span>
                  <span>Use lazy loading for below-the-fold animations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-primary">→</span>
                  <span>Consider reduced-motion preferences for accessibility</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16 bg-bg-secondary/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Ready to optimize your Webflow animations?
            </h2>
            <p className="text-text-secondary mb-8">
              Use our Webflow Hero preset for the best results.
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
