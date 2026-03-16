'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ShoppingBag, Check, ArrowRight, Zap, TrendingUp, Smartphone } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ShopifyPage() {
  return (
    <>
      <Header />
      
      <main className="pt-14">
        {/* Hero */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-accent-primary/5 rounded-full blur-3xl" />
          </div>
          
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-glow border border-accent-primary/20 mb-6">
                <ShoppingBag className="w-4 h-4 text-accent-primary" />
                <span className="text-sm text-accent-primary">Shopify</span>
              </div>
              
              <h1 className="text-4xl font-bold text-text-primary mb-6">
                Animated Product Images That Don't Slow Down Shopify Stores
              </h1>
              
              <p className="text-lg text-text-secondary mb-8 max-w-2xl">
                Showcase your products with smooth, eye-catching animations that 
                boost conversions without hurting mobile performance.
              </p>
              
              <Link
                href="/convert"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-primary text-bg-primary font-medium hover:bg-accent-secondary transition-colors"
              >
                <Zap className="w-4 h-4" />
                Create Product Animation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>
        
        {/* Why it matters */}
        <section className="py-16 bg-bg-secondary/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-text-primary mb-8">
              Speed = Sales
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-text-secondary mb-4">
                  Every 100ms of page load time costs e-commerce sites up to 1% in sales. 
                  Heavy product images are often the biggest performance bottleneck.
                </p>
                <p className="text-text-secondary">
                  Animated WebP lets you add motion to product pages while keeping 
                  file sizes small — especially important for mobile shoppers.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-bg-primary border border-border-subtle text-center">
                  <TrendingUp className="w-6 h-6 text-accent-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-text-primary">26%</p>
                  <p className="text-xs text-text-tertiary">Smaller than GIF</p>
                </div>
                <div className="p-4 rounded-xl bg-bg-primary border border-border-subtle text-center">
                  <Smartphone className="w-6 h-6 text-accent-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-text-primary">2x</p>
                  <p className="text-xs text-text-tertiary">Faster on mobile</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Use cases */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-text-primary mb-8">
              Shopify Product preset settings
            </h2>
            
            <div className="p-6 rounded-xl bg-bg-secondary border border-border-subtle mb-8">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-2xl font-mono text-accent-primary">12</p>
                  <p className="text-sm text-text-tertiary">FPS</p>
                </div>
                <div>
                  <p className="text-2xl font-mono text-accent-primary">75%</p>
                  <p className="text-sm text-text-tertiary">Quality</p>
                </div>
                <div>
                  <p className="text-2xl font-mono text-accent-primary">600px</p>
                  <p className="text-sm text-text-tertiary">Max Size</p>
                </div>
                <div>
                  <p className="text-2xl font-mono text-accent-primary">Loop</p>
                  <p className="text-sm text-text-tertiary">Infinite</p>
                </div>
              </div>
            </div>
            
            {/* Ideas */}
            <div className="space-y-4">
              <h3 className="font-medium text-text-primary">Animation ideas for products</h3>
              <ul className="space-y-3 text-text-secondary">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent-primary mt-1" />
                  <span>360° product rotations</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent-primary mt-1" />
                  <span>Color/variant transitions</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent-primary mt-1" />
                  <span>Unboxing previews</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent-primary mt-1" />
                  <span>Feature demonstrations</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent-primary mt-1" />
                  <span>Size comparison animations</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* Theme compatibility */}
        <section className="py-16 bg-bg-secondary/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Theme compatibility
            </h2>
            <p className="text-text-secondary mb-6">
              WebP is supported by all modern Shopify themes. Just upload your animated 
              WebP like any other image — Shopify handles the rest.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Dawn', 'Debut', 'Brooklyn', 'Minimal', 'Custom themes'].map((theme) => (
                <span 
                  key={theme}
                  className="px-3 py-1.5 rounded-lg bg-bg-primary border border-border-subtle text-sm text-text-secondary"
                >
                  {theme}
                </span>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Ready to boost your product pages?
            </h2>
            <p className="text-text-secondary mb-8">
              Use our Shopify Product preset for the best balance of quality and speed.
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
