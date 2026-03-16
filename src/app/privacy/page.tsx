'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-text-primary mb-4">
              Privacy Policy
            </h1>
            <p className="text-text-secondary mb-8">
              Last updated: December 2024
            </p>

            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  Our Commitment to Privacy
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  WebP.run is built with privacy as a core principle. We believe your files 
                  are your business, not ours. This policy explains how we handle (or rather, 
                  don&apos;t handle) your data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  Client-Side Processing
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  All video conversion happens entirely in your browser using WebAssembly 
                  technology. This means:
                </p>
                <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                  <li>Your video files never leave your device</li>
                  <li>No files are uploaded to our servers</li>
                  <li>We cannot see, access, or store your content</li>
                  <li>Processing works offline after initial page load</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  Data We Collect
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  We collect minimal data to operate and improve the service:
                </p>
                
                <h3 className="text-lg font-medium text-text-primary mt-6 mb-3">
                  Analytics (Optional)
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  We may use privacy-focused analytics to understand how the tool is used. 
                  This includes page views, feature usage patterns, and general geographic 
                  region. No personal identifiers are collected.
                </p>

                <h3 className="text-lg font-medium text-text-primary mt-6 mb-3">
                  Pro Purchases
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  If you purchase Pro, payment processing is handled by our payment provider. 
                  We receive confirmation of purchase but do not store payment details. Your 
                  Pro status is stored locally in your browser.
                </p>

                <h3 className="text-lg font-medium text-text-primary mt-6 mb-3">
                  Local Storage
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  We use browser local storage to remember your preferences and Pro status. 
                  This data never leaves your device.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  Data We Don&apos;t Collect
                </h2>
                <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                  <li>Your video files or any processed content</li>
                  <li>Personal information unless you make a purchase</li>
                  <li>Tracking cookies for advertising</li>
                  <li>Data for sale to third parties</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  Third-Party Services
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  We use the following third-party services:
                </p>
                <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                  <li>
                    <strong>FFmpeg WASM</strong> — Open-source video processing library 
                    loaded from CDN
                  </li>
                  <li>
                    <strong>Payment Provider</strong> — For processing Pro purchases 
                    (if applicable)
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  Cookies
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  We use essential cookies only. No advertising or tracking cookies. 
                  You can disable cookies in your browser settings, though this may 
                  affect preference saving.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  Your Rights
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Since we don&apos;t collect personal data, most data rights requests don&apos;t 
                  apply. However:
                </p>
                <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                  <li>You can clear local storage to remove all preferences</li>
                  <li>You can use the tool without any data collection by disabling JavaScript analytics</li>
                  <li>Contact us if you have questions about your data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  Changes to This Policy
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  We may update this policy occasionally. Significant changes will be 
                  announced on the site. Continued use after changes constitutes acceptance.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  Contact
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  Questions about privacy? Email us at{' '}
                  <a 
                    href="mailto:privacy@webp.run" 
                    className="text-accent hover:underline"
                  >
                    privacy@webp.run
                  </a>
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
