// Stripe configuration and utilities for Pro unlock
// This module handles the client-side Stripe integration

export const STRIPE_CONFIG = {
  // These should be environment variables in production
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
  priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID || '',
  
  // Fallback to Stripe payment link if no API integration
  // Create this in Stripe Dashboard > Payment Links
  paymentLinkUrl: process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK || 'https://buy.stripe.com/test_xxx',
  
  // Success/cancel URLs
  successUrl: typeof window !== 'undefined' 
    ? `${window.location.origin}/pro?success=true` 
    : '/pro?success=true',
  cancelUrl: typeof window !== 'undefined' 
    ? `${window.location.origin}/pro?canceled=true` 
    : '/pro?canceled=true',
}

/**
 * Redirect to Stripe Checkout via Payment Link
 * This is the simplest integration - no backend required
 */
export function redirectToStripePaymentLink(): void {
  // Add success/cancel URLs to the payment link
  const url = new URL(STRIPE_CONFIG.paymentLinkUrl)
  url.searchParams.set('success_url', STRIPE_CONFIG.successUrl)
  url.searchParams.set('cancel_url', STRIPE_CONFIG.cancelUrl)
  
  window.location.href = url.toString()
}

/**
 * Check URL params for payment status
 * Call this on the /pro page to handle redirects from Stripe
 */
export function checkPaymentStatus(): 'success' | 'canceled' | null {
  if (typeof window === 'undefined') return null
  
  const params = new URLSearchParams(window.location.search)
  
  if (params.get('success') === 'true') {
    return 'success'
  }
  
  if (params.get('canceled') === 'true') {
    return 'canceled'
  }
  
  return null
}

/**
 * Clear payment status from URL without reload
 */
export function clearPaymentStatus(): void {
  if (typeof window === 'undefined') return
  
  const url = new URL(window.location.href)
  url.searchParams.delete('success')
  url.searchParams.delete('canceled')
  
  window.history.replaceState({}, '', url.toString())
}

/**
 * Format price for display
 */
export function formatPrice(amount: number, currency: string = 'EUR'): string {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency,
  }).format(amount)
}

// Price constant
export const PRO_PRICE = {
  amount: 9,
  currency: 'EUR',
  formatted: '€9',
}

/**
 * Paddle integration alternative (if Stripe not available)
 * Paddle handles VAT automatically for EU
 */
export const PADDLE_CONFIG = {
  vendorId: process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID || '',
  productId: process.env.NEXT_PUBLIC_PADDLE_PRODUCT_ID || '',
}

export function redirectToPaddleCheckout(): void {
  // Paddle Checkout would be initialized here
  // For now, fall back to payment link approach
  console.log('Paddle integration placeholder')
}
