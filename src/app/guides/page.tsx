'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const guides = [
  {
    slug: 'webp-vs-gif',
    title: 'WebP vs GIF: Why Animated WebP Wins',
    description: 'A comprehensive comparison of animated WebP and GIF formats. Learn why WebP delivers better quality at smaller file sizes.',
    category: 'Fundamentals',
    readTime: '5 min',
  },
  {
    slug: 'optimal-settings',
    title: 'Optimal WebP Settings Guide',
    description: 'Choose the right FPS, quality, and dimensions for your specific use case with our recommended presets.',
    category: 'Optimization',
    readTime: '4 min',
  },
  {
    slug: 'browser-support',
    title: 'Animated WebP Browser Support',
    description: 'Current browser and email client support for animated WebP with fallback strategies.',
    category: 'Compatibility',
    readTime: '3 min',
  },
];

const categories = ['All', 'Fundamentals', 'Optimization', 'Compatibility'];

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-text-primary mb-4">
              Guides
            </h1>
            <p className="text-xl text-text-secondary mb-12 max-w-2xl">
              Learn everything about animated WebP: optimization techniques, 
              best practices, and real-world use cases.
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-10">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    category === 'All'
                      ? 'bg-accent-primary text-bg-primary'
                      : 'bg-bg-secondary text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Guides Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {guides.map((guide, index) => (
                <motion.article
                  key={guide.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="block p-6 bg-bg-secondary border border-border-subtle rounded-xl hover:border-accent-primary/50 transition-all group"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2 py-1 bg-bg-tertiary text-text-tertiary text-xs font-medium rounded">
                        {guide.category}
                      </span>
                      <span className="text-text-tertiary text-xs">
                        {guide.readTime} read
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-accent-primary transition-colors">
                      {guide.title}
                    </h2>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {guide.description}
                    </p>
                  </Link>
                </motion.article>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-16 text-center"
            >
              <p className="text-text-secondary mb-4">
                Ready to convert your first video?
              </p>
              <Link
                href="/convert"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent-primary text-bg-primary font-medium rounded-lg hover:bg-accent-secondary transition-colors"
              >
                Open Converter
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
