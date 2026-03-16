'use client'

import { useEffect, useState } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { 
  Sparkles, 
  Check, 
  Wand2, 
  Layers, 
  Award, 
  Zap,
  Shield,
  CreditCard,
  AlertCircle,
  Loader2
} from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { checkPaymentStatus, clearPaymentStatus, PRO_PRICE } from '@/lib/stripe'

export default function ProPage() {
  const { isPro, setPro } = useAppStore()
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'canceled' | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  
  // Check for payment redirect on mount
  useEffect(() => {
    const status = checkPaymentStatus()
    if (status === 'success') {
      setPro(true)
      setPaymentStatus('success')
      clearPaymentStatus()
    } else if (status === 'canceled') {
      setPaymentStatus('canceled')
      clearPaymentStatus()
    }
  }, [setPro])
  
  const handleUnlock = async () => {
    setIsProcessing(true)
    
    // For demo/development: direct unlock
    // In production: redirect to Stripe checkout
    if (process.env.NODE_ENV === 'development' || !process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK) {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1000))
      setPro(true)
      setPaymentStatus('success')
    } else {
      // Production: redirect to Stripe
      const { redirectToStripePaymentLink } = await import('@/lib/stripe')
      redirectToStripePaymentLink()
    }
    
    setIsProcessing(false)
  }
  
  if (isPro) {
    return (
      <>
        <Header />
        <main className="pt-14 min-h-screen flex items-center justify-center">
          <div className="max-w-md mx-auto px-4 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 rounded-full bg-accent-glow flex items-center justify-center mx-auto mb-6"
            >
              <Sparkles className="w-10 h-10 text-accent-primary" />
            </motion.div>
            <h1 className="text-2xl font-bold text-text-primary mb-4">
              You're a Pro!
            </h1>
            <p className="text-text-secondary mb-8">
              All Pro features are unlocked. Thank you for your support.
            </p>
            <Link
              href="/convert"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-primary text-bg-primary font-medium hover:bg-accent-secondary transition-colors"
            >
              <Zap className="w-4 h-4" />
              Start Converting
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }
  
  return (
    <>
      <Header />
      
      <main className="pt-14 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Payment canceled notice */}
          {paymentStatus === 'canceled' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 rounded-xl bg-status-warning/10 border border-status-warning/20 flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-status-warning flex-shrink-0" />
              <p className="text-sm text-status-warning">
                Payment was canceled. No charges were made.
              </p>
            </motion.div>
          )}
          
          {/* Hero */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-glow border border-accent-primary/20 mb-6">
                <Sparkles className="w-4 h-4 text-accent-primary" />
                <span className="text-sm text-accent-primary">Pro</span>
              </div>
              
              <h1 className="text-4xl font-bold text-text-primary mb-4">
                Unlock the full power of WebP.run
              </h1>
              
              <p className="text-lg text-text-secondary max-w-xl mx-auto">
                One-time payment. No subscription. No recurring fees.
              </p>
            </motion.div>
          </div>
          
          {/* Pricing card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-md mx-auto mb-16"
          >
            <div className="p-8 rounded-2xl bg-bg-secondary border border-accent-primary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-accent-primary/10 rounded-full blur-3xl" />
              
              <div className="relative">
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-bold text-text-primary">€9</span>
                  <span className="text-text-tertiary">one-time</span>
                </div>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-accent-primary" />
                    </div>
                    <div>
                      <p className="text-text-primary font-medium">AI Optimization</p>
                      <p className="text-sm text-text-tertiary">Smart settings recommendations</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-accent-primary" />
                    </div>
                    <div>
                      <p className="text-text-primary font-medium">Pro Presets</p>
                      <p className="text-sm text-text-tertiary">Email, Webflow, Framer, Shopify</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-accent-primary" />
                    </div>
                    <div>
                      <p className="text-text-primary font-medium">Batch Conversion</p>
                      <p className="text-sm text-text-tertiary">Process multiple files at once</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-accent-primary" />
                    </div>
                    <div>
                      <p className="text-text-primary font-medium">No Branding</p>
                      <p className="text-sm text-text-tertiary">Clean output without watermarks</p>
                    </div>
                  </li>
                </ul>
                
                <button
                  onClick={handleUnlock}
                  disabled={isProcessing}
                  className="w-full py-4 rounded-xl bg-accent-primary text-bg-primary font-medium text-lg hover:bg-accent-secondary transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Unlock Pro — {PRO_PRICE.formatted}
                    </>
                  )}
                </button>
                
                <p className="text-xs text-text-muted text-center mt-4">
                  Secure payment via Stripe. 30-day money-back guarantee.
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Features grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-accent-glow flex items-center justify-center mx-auto mb-4">
                <Wand2 className="w-7 h-7 text-accent-primary" />
              </div>
              <h3 className="text-lg font-medium text-text-primary mb-2">AI-Powered</h3>
              <p className="text-sm text-text-secondary">
                Get instant recommendations based on your video content and use case.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-accent-glow flex items-center justify-center mx-auto mb-4">
                <Layers className="w-7 h-7 text-accent-primary" />
              </div>
              <h3 className="text-lg font-medium text-text-primary mb-2">Workflow-Aware</h3>
              <p className="text-sm text-text-secondary">
                Presets tuned for real platforms like Webflow, Framer, and Shopify.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-accent-glow flex items-center justify-center mx-auto mb-4">
                <Award className="w-7 h-7 text-accent-primary" />
              </div>
              <h3 className="text-lg font-medium text-text-primary mb-2">Professional Output</h3>
              <p className="text-sm text-text-secondary">
                Clean exports without branding. Perfect for client work.
              </p>
            </motion.div>
          </div>
          
          {/* Trust */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-6 text-text-tertiary">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span className="text-sm">Secure payment</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span className="text-sm">30-day guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span className="text-sm">Instant access</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  )
}
