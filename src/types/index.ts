// Preset types
export interface Preset {
  id: string
  name: string
  description: string
  fps: number
  quality: number
  maxWidth: number | null
  maxHeight: number | null
  loop: boolean
  isPro: boolean
  category: 'general' | 'email' | 'web' | 'ecommerce'
  warnings?: string[]
}

// Conversion settings
export interface ConversionSettings {
  fps: number
  quality: number
  maxWidth: number | null
  maxHeight: number | null
  loop: boolean
  startTime: number
  endTime: number
}

// Video metadata
export interface VideoMetadata {
  duration: number
  width: number
  height: number
  name: string
  size: number
  type: string
}

// Conversion result
export interface ConversionResult {
  blob: Blob
  url: string
  size: number
  width: number
  height: number
  duration: number
  frames: number
}

// Conversion state
export type ConversionState = 
  | 'idle'
  | 'loading-ffmpeg'
  | 'processing'
  | 'complete'
  | 'error'

// Store state
export interface AppState {
  // Video state
  videoFile: File | null
  videoUrl: string | null
  videoMetadata: VideoMetadata | null
  
  // Settings
  settings: ConversionSettings
  activePreset: Preset | null
  
  // Conversion state
  conversionState: ConversionState
  conversionProgress: number
  conversionResult: ConversionResult | null
  error: string | null
  
  // Pro state
  isPro: boolean
  
  // Actions
  setVideoFile: (file: File | null) => void
  setVideoMetadata: (metadata: VideoMetadata | null) => void
  updateSettings: (settings: Partial<ConversionSettings>) => void
  setActivePreset: (preset: Preset | null) => void
  setConversionState: (state: ConversionState) => void
  setConversionProgress: (progress: number) => void
  setConversionResult: (result: ConversionResult | null) => void
  setError: (error: string | null) => void
  setPro: (isPro: boolean) => void
  reset: () => void
}

// AI Recommendation
export interface AIRecommendation {
  fps: number
  quality: number
  maxWidth: number | null
  estimatedSize: string
  explanation: string
}

// Batch conversion
export interface BatchFile {
  id: string
  file: File
  name: string
  size: number
  status: 'pending' | 'processing' | 'complete' | 'error'
  progress: number
  result: ConversionResult | null
  error: string | null
}

export interface BatchState {
  files: BatchFile[]
  isProcessing: boolean
  currentIndex: number
}
