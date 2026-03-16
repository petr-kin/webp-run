'use client'

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Check, X, AlertTriangle } from 'lucide-react';

export default function BrowserSupportPage() {
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
              Animated WebP Browser Support
            </h1>
            <p className="text-lg text-text-secondary">
              Complete compatibility guide for animated WebP images across browsers and platforms.
            </p>
          </header>
          
          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <h2 className="text-xl font-semibold text-text-primary mt-8 mb-4">Desktop Browsers</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border-subtle">
                    <th className="text-left py-3 pr-4 text-text-secondary font-medium">Browser</th>
                    <th className="text-left py-3 pr-4 text-text-secondary font-medium">Version</th>
                    <th className="text-left py-3 text-text-secondary font-medium">Support</th>
                  </tr>
                </thead>
                <tbody className="text-text-primary">
                  <tr className="border-b border-border-subtle">
                    <td className="py-3 pr-4">Chrome</td>
                    <td className="py-3 pr-4">32+</td>
                    <td className="py-3"><Check className="w-5 h-5 text-status-success" /></td>
                  </tr>
                  <tr className="border-b border-border-subtle">
                    <td className="py-3 pr-4">Firefox</td>
                    <td className="py-3 pr-4">65+</td>
                    <td className="py-3"><Check className="w-5 h-5 text-status-success" /></td>
                  </tr>
                  <tr className="border-b border-border-subtle">
                    <td className="py-3 pr-4">Safari</td>
                    <td className="py-3 pr-4">14+</td>
                    <td className="py-3"><Check className="w-5 h-5 text-status-success" /></td>
                  </tr>
                  <tr className="border-b border-border-subtle">
                    <td className="py-3 pr-4">Edge</td>
                    <td className="py-3 pr-4">18+</td>
                    <td className="py-3"><Check className="w-5 h-5 text-status-success" /></td>
                  </tr>
                  <tr className="border-b border-border-subtle">
                    <td className="py-3 pr-4">Opera</td>
                    <td className="py-3 pr-4">19+</td>
                    <td className="py-3"><Check className="w-5 h-5 text-status-success" /></td>
                  </tr>
                  <tr className="border-b border-border-subtle">
                    <td className="py-3 pr-4">Internet Explorer</td>
                    <td className="py-3 pr-4">All</td>
                    <td className="py-3"><X className="w-5 h-5 text-status-error" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <h2 className="text-xl font-semibold text-text-primary mt-10 mb-4">Mobile Browsers</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border-subtle">
                    <th className="text-left py-3 pr-4 text-text-secondary font-medium">Browser</th>
                    <th className="text-left py-3 pr-4 text-text-secondary font-medium">Version</th>
                    <th className="text-left py-3 text-text-secondary font-medium">Support</th>
                  </tr>
                </thead>
                <tbody className="text-text-primary">
                  <tr className="border-b border-border-subtle">
                    <td className="py-3 pr-4">Chrome Android</td>
                    <td className="py-3 pr-4">32+</td>
                    <td className="py-3"><Check className="w-5 h-5 text-status-success" /></td>
                  </tr>
                  <tr className="border-b border-border-subtle">
                    <td className="py-3 pr-4">Safari iOS</td>
                    <td className="py-3 pr-4">14+</td>
                    <td className="py-3"><Check className="w-5 h-5 text-status-success" /></td>
                  </tr>
                  <tr className="border-b border-border-subtle">
                    <td className="py-3 pr-4">Samsung Internet</td>
                    <td className="py-3 pr-4">4+</td>
                    <td className="py-3"><Check className="w-5 h-5 text-status-success" /></td>
                  </tr>
                  <tr className="border-b border-border-subtle">
                    <td className="py-3 pr-4">Firefox Android</td>
                    <td className="py-3 pr-4">65+</td>
                    <td className="py-3"><Check className="w-5 h-5 text-status-success" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <h2 className="text-xl font-semibold text-text-primary mt-10 mb-4">Email Client Support</h2>
            
            <div className="p-4 rounded-xl bg-status-warning/10 border border-status-warning/20 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-status-warning flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-status-warning font-medium">Limited Support</p>
                  <p className="text-sm text-text-secondary mt-1">
                    Most email clients do not support animated WebP. Consider using static WebP or GIF for email campaigns.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border-subtle">
                    <th className="text-left py-3 pr-4 text-text-secondary font-medium">Client</th>
                    <th className="text-left py-3 pr-4 text-text-secondary font-medium">Animated WebP</th>
                    <th className="text-left py-3 text-text-secondary font-medium">Static WebP</th>
                  </tr>
                </thead>
                <tbody className="text-text-primary">
                  <tr className="border-b border-border-subtle">
                    <td className="py-3 pr-4">Apple Mail</td>
                    <td className="py-3 pr-4"><Check className="w-5 h-5 text-status-success" /></td>
                    <td className="py-3"><Check className="w-5 h-5 text-status-success" /></td>
                  </tr>
                  <tr className="border-b border-border-subtle">
                    <td className="py-3 pr-4">Gmail (Web)</td>
                    <td className="py-3 pr-4"><X className="w-5 h-5 text-status-error" /></td>
                    <td className="py-3"><Check className="w-5 h-5 text-status-success" /></td>
                  </tr>
                  <tr className="border-b border-border-subtle">
                    <td className="py-3 pr-4">Outlook</td>
                    <td className="py-3 pr-4"><X className="w-5 h-5 text-status-error" /></td>
                    <td className="py-3"><X className="w-5 h-5 text-status-error" /></td>
                  </tr>
                  <tr className="border-b border-border-subtle">
                    <td className="py-3 pr-4">Yahoo Mail</td>
                    <td className="py-3 pr-4"><X className="w-5 h-5 text-status-error" /></td>
                    <td className="py-3"><Check className="w-5 h-5 text-status-success" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <h2 className="text-xl font-semibold text-text-primary mt-10 mb-4">Global Support</h2>
            
            <p className="text-text-secondary mb-4">
              As of 2024, animated WebP is supported by approximately <strong className="text-accent-primary">97%</strong> of 
              global browser users. The main holdout is Internet Explorer, which Microsoft has officially retired.
            </p>
            
            <h2 className="text-xl font-semibold text-text-primary mt-10 mb-4">Fallback Strategy</h2>
            
            <p className="text-text-secondary mb-4">
              For maximum compatibility, use the <code className="px-1.5 py-0.5 rounded bg-bg-elevated text-accent-primary text-sm">&lt;picture&gt;</code> element 
              with a GIF fallback:
            </p>
            
            <pre className="p-4 rounded-xl bg-bg-elevated border border-border-subtle overflow-x-auto text-sm">
              <code className="text-text-primary">{`<picture>
  <source srcset="animation.webp" type="image/webp">
  <img src="animation.gif" alt="Animated content">
</picture>`}</code>
            </pre>
            
            <div className="mt-12 p-6 rounded-xl bg-bg-secondary border border-border-subtle text-center">
              <p className="text-text-secondary mb-4">Ready to convert your videos?</p>
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
