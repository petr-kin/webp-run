'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function TermsPage() {
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
              Terms of Service
            </h1>
            <p className="text-text-secondary mb-8">
              Last updated: December 2024
            </p>

            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  Agreement to Terms
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  By accessing or using 2WebP, you agree to be bound by these Terms of 
                  Service. If you disagree with any part, you may not access the service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  Description of Service
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  2WebP is a browser-based tool for converting video files to animated 
                  WebP format. All processing occurs locally in your browser using WebAssembly 
                  technology.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  Use License
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Permission is granted to use 2WebP for personal and commercial purposes, 
                  subject to the following conditions:
                </p>
                <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                  <li>You may not attempt to reverse engineer or extract the source code</li>
                  <li>You may not use automated systems to abuse the service</li>
                  <li>You may not redistribute the service as your own product</li>
                  <li>You may not remove or alter any proprietary notices</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  User Responsibilities
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  You are responsible for:
                </p>
                <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                  <li>Ensuring you have rights to convert any video content</li>
                  <li>Complying with applicable laws regarding your content</li>
                  <li>Maintaining the security of your own device</li>
                  <li>Any use of output files created using the service</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  Intellectual Property
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  2WebP and its original content, features, and functionality are owned 
                  by 2WebP and are protected by international copyright, trademark, and 
                  other intellectual property laws.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  You retain all rights to your input files and output files. We claim no 
                  ownership over content you process using our tool.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  Pro Purchases
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Pro is a one-time purchase that unlocks additional features:
                </p>
                <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                  <li>Purchase is final and non-refundable except where required by law</li>
                  <li>Pro status is stored locally in your browser</li>
                  <li>Clearing browser data may require re-verification of purchase</li>
                  <li>Features may be updated over time</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  Disclaimer
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  THE SERVICE IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
                  IMPLIED, INCLUDING BUT NOT LIMITED TO:
                </p>
                <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                  <li>Warranties of merchantability</li>
                  <li>Fitness for a particular purpose</li>
                  <li>Non-infringement</li>
                  <li>Accuracy or reliability of results</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  Limitation of Liability
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  In no event shall 2WebP, its operators, or affiliates be liable for any 
                  indirect, incidental, special, consequential, or punitive damages, including 
                  loss of profits, data, or other intangible losses, resulting from your use 
                  of the service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  Service Availability
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  We strive to maintain service availability but do not guarantee uninterrupted 
                  access. Since processing is client-side, the tool may work offline after 
                  initial load, but we are not responsible for browser compatibility issues 
                  or local processing failures.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  Browser Requirements
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  2WebP requires a modern browser with WebAssembly and SharedArrayBuffer 
                  support. We are not responsible for functionality issues in unsupported 
                  browsers or environments.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  Modifications
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  We reserve the right to modify or discontinue the service at any time 
                  without notice. We may also modify these terms, with changes effective 
                  upon posting. Continued use constitutes acceptance of modified terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  Governing Law
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  These terms shall be governed by and construed in accordance with applicable 
                  laws, without regard to conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  Contact
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  Questions about these terms? Email us at{' '}
                  <a 
                    href="mailto:hello@2webp.com" 
                    className="text-accent hover:underline"
                  >
                    hello@2webp.com
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
