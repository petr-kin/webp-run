'use client'

import Link from 'next/link'
import { Shield, Zap, Lock } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center gap-8 mb-10 pb-10 border-b border-border-subtle">
          <div className="flex items-center gap-2 text-text-secondary">
            <Lock className="w-4 h-4 text-accent-primary" />
            <span className="text-sm">100% client-side processing</span>
          </div>
          <div className="flex items-center gap-2 text-text-secondary">
            <Shield className="w-4 h-4 text-accent-primary" />
            <span className="text-sm">No data uploads</span>
          </div>
          <div className="flex items-center gap-2 text-text-secondary">
            <Zap className="w-4 h-4 text-accent-primary" />
            <span className="text-sm">No account required</span>
          </div>
        </div>
        
        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/convert" className="text-sm text-text-tertiary hover:text-text-secondary transition-colors">
                  Converter
                </Link>
              </li>
              <li>
                <Link href="/pro" className="text-sm text-text-tertiary hover:text-text-secondary transition-colors">
                  Pro Features
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-sm text-text-tertiary hover:text-text-secondary transition-colors">
                  Guides
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-4">Use Cases</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/email" className="text-sm text-text-tertiary hover:text-text-secondary transition-colors">
                  Email Marketing
                </Link>
              </li>
              <li>
                <Link href="/webflow" className="text-sm text-text-tertiary hover:text-text-secondary transition-colors">
                  Webflow
                </Link>
              </li>
              <li>
                <Link href="/framer" className="text-sm text-text-tertiary hover:text-text-secondary transition-colors">
                  Framer
                </Link>
              </li>
              <li>
                <Link href="/shopify" className="text-sm text-text-tertiary hover:text-text-secondary transition-colors">
                  Shopify
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/guides/webp-vs-gif" className="text-sm text-text-tertiary hover:text-text-secondary transition-colors">
                  WebP vs GIF
                </Link>
              </li>
              <li>
                <Link href="/guides/optimal-settings" className="text-sm text-text-tertiary hover:text-text-secondary transition-colors">
                  Optimal Settings
                </Link>
              </li>
              <li>
                <Link href="/guides/browser-support" className="text-sm text-text-tertiary hover:text-text-secondary transition-colors">
                  Browser Support
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-text-tertiary hover:text-text-secondary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-text-tertiary hover:text-text-secondary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-border-subtle">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-accent-primary flex items-center justify-center">
              <span className="text-bg-primary font-bold text-xs">W</span>
            </div>
            <span className="text-sm text-text-tertiary">2WebP</span>
          </div>
          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} 2WebP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
