'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function WebPvsGIFGuide() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Breadcrumb */}
            <nav className="mb-8">
              <Link href="/guides" className="text-text-tertiary hover:text-accent transition-colors">
                ← Back to Guides
              </Link>
            </nav>

            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 bg-bg-secondary text-text-tertiary text-xs font-medium rounded">
                  Fundamentals
                </span>
                <span className="text-text-tertiary text-sm">5 min read</span>
              </div>
              <h1 className="text-4xl font-bold text-text-primary mb-4">
                WebP vs GIF: Why Animated WebP Wins
              </h1>
              <p className="text-xl text-text-secondary">
                A comprehensive comparison of animated WebP and GIF formats for modern web development.
              </p>
            </header>

            {/* Content */}
            <div className="prose prose-invert max-w-none">
              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  The Case Against GIF
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  GIF was created in 1987. While it pioneered animated images on the web, 
                  its technical limitations are severe by modern standards:
                </p>
                <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                  <li>Limited to 256 colors per frame</li>
                  <li>No alpha transparency (only binary on/off)</li>
                  <li>Lossless compression results in large file sizes</li>
                  <li>Poor compression efficiency for photographic content</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  What Makes WebP Better
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  WebP, developed by Google, uses modern compression techniques derived 
                  from the VP8 video codec:
                </p>
                <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                  <li>Supports 16.7 million colors (24-bit)</li>
                  <li>Full alpha channel transparency</li>
                  <li>Lossy and lossless compression options</li>
                  <li>Typically 25-35% smaller than equivalent GIF</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  File Size Comparison
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Here&apos;s what you can expect when converting GIF to WebP:
                </p>
                
                <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-4">
                  <table className="w-full text-text-secondary">
                    <thead>
                      <tr className="border-b border-border-primary">
                        <th className="text-left py-2 text-text-primary">Content Type</th>
                        <th className="text-right py-2 text-text-primary">Size Reduction</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-primary">
                        <td className="py-3">Simple graphics/icons</td>
                        <td className="text-right text-accent">20-30%</td>
                      </tr>
                      <tr className="border-b border-border-primary">
                        <td className="py-3">Screen recordings</td>
                        <td className="text-right text-accent">30-50%</td>
                      </tr>
                      <tr className="border-b border-border-primary">
                        <td className="py-3">Video clips</td>
                        <td className="text-right text-accent">50-70%</td>
                      </tr>
                      <tr>
                        <td className="py-3">Photographic content</td>
                        <td className="text-right text-accent">60-80%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  Quality Comparison
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  The visual quality difference is significant, especially for video-derived content:
                </p>
                <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                  <li>
                    <strong className="text-text-primary">Color banding:</strong> GIF&apos;s 256-color 
                    limit causes visible banding in gradients. WebP handles gradients smoothly.
                  </li>
                  <li>
                    <strong className="text-text-primary">Transparency edges:</strong> GIF&apos;s binary 
                    transparency creates jagged edges. WebP&apos;s alpha channel enables smooth blending.
                  </li>
                  <li>
                    <strong className="text-text-primary">Motion smoothness:</strong> Both support 
                    variable frame delays, but WebP&apos;s compression allows more frames at smaller sizes.
                  </li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  Browser Support
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  As of 2024, animated WebP has excellent browser support:
                </p>
                <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                  <li>Chrome: Full support since version 32</li>
                  <li>Firefox: Full support since version 65</li>
                  <li>Safari: Full support since version 14 (macOS Big Sur, iOS 14)</li>
                  <li>Edge: Full support (Chromium-based)</li>
                </ul>
                <p className="text-text-secondary leading-relaxed mt-4">
                  This covers approximately 96% of global browser usage. For the remaining 
                  users, GIF fallbacks can be provided using the <code className="bg-bg-tertiary px-2 py-1 rounded text-sm">&lt;picture&gt;</code> element.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  When to Still Use GIF
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Despite WebP&apos;s advantages, GIF may still be appropriate for:
                </p>
                <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                  <li>Maximum compatibility requirements (legacy systems)</li>
                  <li>Very simple animations (few colors, small dimensions)</li>
                  <li>Platforms that don&apos;t support WebP (some social media, older email clients)</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  Conclusion
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  For most modern web applications, animated WebP is the clear winner. 
                  It offers better quality, smaller files, and near-universal browser support. 
                  The only question is whether you need to provide a GIF fallback for edge cases.
                </p>
              </section>
            </div>

            {/* CTA */}
            <div className="mt-12 p-6 bg-bg-secondary border border-border-primary rounded-xl text-center">
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Ready to convert?
              </h3>
              <p className="text-text-secondary mb-4">
                Turn your videos into optimized animated WebP files in seconds.
              </p>
              <Link
                href="/convert"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-bg-primary font-medium rounded-lg hover:bg-accent-hover transition-colors"
              >
                Open Converter
              </Link>
            </div>
          </motion.article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
