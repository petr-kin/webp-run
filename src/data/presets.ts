import { Preset } from '@/types'

export const presets: Preset[] = [
  // Free presets
  {
    id: 'balanced',
    name: 'Balanced',
    description: 'Good quality with reasonable file size',
    fps: 15,
    quality: 75,
    maxWidth: 800,
    maxHeight: null,
    loop: true,
    isPro: false,
    category: 'general',
  },
  {
    id: 'small-size',
    name: 'Small Size',
    description: 'Optimized for minimal file size',
    fps: 10,
    quality: 60,
    maxWidth: 480,
    maxHeight: null,
    loop: true,
    isPro: false,
    category: 'general',
  },
  {
    id: 'high-quality',
    name: 'High Quality',
    description: 'Maximum quality, larger file size',
    fps: 24,
    quality: 90,
    maxWidth: null,
    maxHeight: null,
    loop: true,
    isPro: false,
    category: 'general',
  },
  
  // Pro presets
  {
    id: 'email-safe',
    name: 'Email Safe',
    description: 'Optimized for email clients (<500KB)',
    fps: 8,
    quality: 50,
    maxWidth: 320,
    maxHeight: null,
    loop: true,
    isPro: true,
    category: 'email',
    warnings: ['Some email clients may not support animated WebP'],
  },
  {
    id: 'webflow-hero',
    name: 'Webflow Hero',
    description: 'Full-width hero animations for Webflow',
    fps: 20,
    quality: 80,
    maxWidth: 1920,
    maxHeight: null,
    loop: true,
    isPro: true,
    category: 'web',
  },
  {
    id: 'framer-landing',
    name: 'Framer Landing',
    description: 'Lightweight animations for Framer pages',
    fps: 15,
    quality: 70,
    maxWidth: 640,
    maxHeight: null,
    loop: true,
    isPro: true,
    category: 'web',
  },
  {
    id: 'shopify-product',
    name: 'Shopify Product',
    description: 'Product animations optimized for e-commerce',
    fps: 12,
    quality: 75,
    maxWidth: 600,
    maxHeight: 600,
    loop: true,
    isPro: true,
    category: 'ecommerce',
    warnings: ['Consider mobile performance on product pages'],
  },
]

export const getPresetById = (id: string): Preset | undefined => {
  return presets.find(p => p.id === id)
}

export const getFreePresets = (): Preset[] => {
  return presets.filter(p => !p.isPro)
}

export const getProPresets = (): Preset[] => {
  return presets.filter(p => p.isPro)
}

export const getPresetsByCategory = (category: Preset['category']): Preset[] => {
  return presets.filter(p => p.category === category)
}
