'use client'

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Zap, FileImage, Monitor, Mail, ShoppingBag, Sparkles } from 'lucide-react';

export default function OptimalSettingsPage() {
  return (
    <>
      <Header />
      
      <main className="pt-14 min-h-screen">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <Link 
            href="/guides" 
            className="inline-flex items-center gap-2 text-sm text-text-tertiary hover:text-accent-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Guides
          </Link>
          
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Optimal WebP Settings Guide
            </h1>
            <p className="text-lg text-text-secondary">
              Choose the right FPS, quality, and dimensions for your specific use case.
            </p>
          </header>
          
          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <h2 className="text-xl font-semibold text-text-primary mt-8 mb-4">Understanding the Trade-offs</h2>
            
            <p className="text-text-secondary mb-6">
              Every WebP conversion involves balancing three factors: <strong className="text-text-primary">file size</strong>, 
              <strong className="text-text-primary"> visual quality</strong>, and <strong className="text-text-primary">smoothness</strong>. 
              Here's how each setting affects your output.
            </p>
            
            <div className="grid gap-4 mb-8">
              <div className="p-4 rounded-xl bg-bg-secondary border border-border-subtle">
                <h3 className="text-base font-medium text-text-primary mb-2">Frame Rate (FPS)</h3>
                <p className="text-sm text-text-secondary">
                  Higher FPS = smoother animation but larger files. Most web animations look smooth at 12-15 FPS. 
                  Only use 24+ FPS for high-motion content.
                </p>
              </div>
              
              <div className="p-4 rounded-xl bg-bg-secondary border border-border-subtle">
                <h3 className="text-base font-medium text-text-primary mb-2">Quality (%)</h3>
                <p className="text-sm text-text-secondary">
                  Controls compression level. 75% is usually optimal. Below 60% may show artifacts. 
                  Above 85% offers diminishing returns for file size increase.
                </p>
              </div>
              
              <div className="p-4 rounded-xl bg-bg-secondary border border-border-subtle">
                <h3 className="text-base font-medium text-text-primary mb-2">Max Width</h3>
                <p className="text-sm text-text-secondary">
                  Resizing has the biggest impact on file size. A 1920px video at 800px is ~5x smaller.
                  Match your display size, not source size.
                </p>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold text-text-primary mt-10 mb-4">Recommended Settings by Use Case</h2>
            
            {/* Web Heroes */}
            <div className="p-5 rounded-xl bg-bg-secondary border border-border-subtle mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent-glow flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-accent-primary" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-text-primary">Website Hero Sections</h3>
                  <p className="text-xs text-text-tertiary">Full-width animated backgrounds</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-accent-primary">20</p>
                  <p className="text-xs text-text-tertiary">FPS</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent-primary">80%</p>
                  <p className="text-xs text-text-tertiary">Quality</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent-primary">1920px</p>
                  <p className="text-xs text-text-tertiary">Max Width</p>
                </div>
              </div>
              <p className="text-sm text-text-secondary mt-3">
                Target file size: 1-3 MB for 3-5 second loops
              </p>
            </div>
            
            {/* Email */}
            <div className="p-5 rounded-xl bg-bg-secondary border border-border-subtle mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent-glow flex items-center justify-center">
                  <Mail className="w-5 h-5 text-accent-primary" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-text-primary">Email Marketing</h3>
                  <p className="text-xs text-text-tertiary">Inline animations for newsletters</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-accent-primary">8</p>
                  <p className="text-xs text-text-tertiary">FPS</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent-primary">50%</p>
                  <p className="text-xs text-text-tertiary">Quality</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent-primary">320px</p>
                  <p className="text-xs text-text-tertiary">Max Width</p>
                </div>
              </div>
              <p className="text-sm text-text-secondary mt-3">
                Target file size: Under 500 KB for email client compatibility
              </p>
            </div>
            
            {/* E-commerce */}
            <div className="p-5 rounded-xl bg-bg-secondary border border-border-subtle mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent-glow flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-accent-primary" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-text-primary">Product Animations</h3>
                  <p className="text-xs text-text-tertiary">360° views and feature highlights</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-accent-primary">12</p>
                  <p className="text-xs text-text-tertiary">FPS</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent-primary">75%</p>
                  <p className="text-xs text-text-tertiary">Quality</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent-primary">600px</p>
                  <p className="text-xs text-text-tertiary">Max Width</p>
                </div>
              </div>
              <p className="text-sm text-text-secondary mt-3">
                Target file size: 300-800 KB for fast page loads
              </p>
            </div>
            
            {/* Social/General */}
            <div className="p-5 rounded-xl bg-bg-secondary border border-border-subtle mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent-glow flex items-center justify-center">
                  <Zap className="w-5 h-5 text-accent-primary" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-text-primary">General Web Use</h3>
                  <p className="text-xs text-text-tertiary">Blog posts, social sharing, documentation</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-accent-primary">15</p>
                  <p className="text-xs text-text-tertiary">FPS</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent-primary">75%</p>
                  <p className="text-xs text-text-tertiary">Quality</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent-primary">800px</p>
                  <p className="text-xs text-text-tertiary">Max Width</p>
                </div>
              </div>
              <p className="text-sm text-text-secondary mt-3">
                Target file size: 200 KB - 1 MB depending on duration
              </p>
            </div>
            
            <h2 className="text-xl font-semibold text-text-primary mt-10 mb-4">Quick Reference Chart</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border-subtle">
                    <th className="text-left py-3 pr-4 text-text-secondary font-medium">Use Case</th>
                    <th className="text-left py-3 pr-4 text-text-secondary font-medium">FPS</th>
                    <th className="text-left py-3 pr-4 text-text-secondary font-medium">Quality</th>
                    <th className="text-left py-3 pr-4 text-text-secondary font-medium">Max Width</th>
                    <th className="text-left py-3 text-text-secondary font-medium">Target Size</th>
                  </tr>
                </thead>
                <tbody className="text-text-primary">
                  <tr className="border-b border-border-subtle">
                    <td className="py-3 pr-4">Hero/Background</td>
                    <td className="py-3 pr-4">20</td>
                    <td className="py-3 pr-4">80%</td>
                    <td className="py-3 pr-4">1920px</td>
                    <td className="py-3">1-3 MB</td>
                  </tr>
                  <tr className="border-b border-border-subtle">
                    <td className="py-3 pr-4">Email</td>
                    <td className="py-3 pr-4">8</td>
                    <td className="py-3 pr-4">50%</td>
                    <td className="py-3 pr-4">320px</td>
                    <td className="py-3">&lt;500 KB</td>
                  </tr>
                  <tr className="border-b border-border-subtle">
                    <td className="py-3 pr-4">Product</td>
                    <td className="py-3 pr-4">12</td>
                    <td className="py-3 pr-4">75%</td>
                    <td className="py-3 pr-4">600px</td>
                    <td className="py-3">300-800 KB</td>
                  </tr>
                  <tr className="border-b border-border-subtle">
                    <td className="py-3 pr-4">Blog/Social</td>
                    <td className="py-3 pr-4">15</td>
                    <td className="py-3 pr-4">75%</td>
                    <td className="py-3 pr-4">800px</td>
                    <td className="py-3">200 KB-1 MB</td>
                  </tr>
                  <tr className="border-b border-border-subtle">
                    <td className="py-3 pr-4">Thumbnail/Icon</td>
                    <td className="py-3 pr-4">10</td>
                    <td className="py-3 pr-4">70%</td>
                    <td className="py-3 pr-4">200px</td>
                    <td className="py-3">&lt;100 KB</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <h2 className="text-xl font-semibold text-text-primary mt-10 mb-4">Pro Tip: Use AI Recommendations</h2>
            
            <div className="p-5 rounded-xl bg-accent-glow border border-accent-primary/30 mb-6">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-accent-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-text-primary font-medium mb-1">Let AI choose for you</p>
                  <p className="text-sm text-text-secondary">
                    Pro users can use AI recommendations to automatically analyze your video and suggest optimal settings 
                    based on duration, resolution, and content type.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 p-6 rounded-xl bg-bg-secondary border border-border-subtle text-center">
              <p className="text-text-secondary mb-4">Ready to try these settings?</p>
              <Link
                href="/convert"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-primary text-bg-primary font-medium hover:bg-accent-secondary transition-colors"
              >
                Start Converting
              </Link>
            </div>
          </div>
        </article>
      </main>
      
      <Footer />
    </>
  );
}
