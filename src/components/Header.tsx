'use client'

import Link from 'next/link'
import { useAppStore } from '@/store/useAppStore'
import { Sparkles } from 'lucide-react'

export function Header() {
  const { isPro } = useAppStore()
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border-subtle">
      <div className="absolute bottom-0 left-0 right-0 h-px glow-line" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-accent-primary flex items-center justify-center">
              <span className="text-bg-primary font-bold text-sm">W</span>
            </div>
            <span className="font-semibold text-text-primary group-hover:text-accent-primary transition-colors">
              WebP.run
            </span>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/convert" 
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Converter
            </Link>
            <Link 
              href="/email" 
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Email
            </Link>
            <Link 
              href="/webflow" 
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Webflow
            </Link>
            <Link 
              href="/framer" 
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Framer
            </Link>
            <Link 
              href="/shopify" 
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Shopify
            </Link>
          </nav>
          
          {/* Pro Badge / CTA */}
          <div className="flex items-center gap-3">
            {isPro ? (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-glow border border-accent-primary/30">
                <Sparkles className="w-3.5 h-3.5 text-accent-primary" />
                <span className="text-xs font-medium text-accent-primary">Pro</span>
              </div>
            ) : (
              <Link 
                href="/pro"
                className="btn-secondary text-sm py-1.5 px-3 rounded-lg"
              >
                Unlock Pro
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
