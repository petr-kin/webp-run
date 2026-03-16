import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AppState, ConversionSettings, Preset, VideoMetadata, ConversionResult, ConversionState, BatchFile } from '@/types'

const defaultSettings: ConversionSettings = {
  fps: 15,
  quality: 75,
  maxWidth: 800,
  maxHeight: null,
  loop: true,
  startTime: 0,
  endTime: 0,
}

// Extended AppState with batch support
interface ExtendedAppState extends AppState {
  // Batch conversion
  batchFiles: BatchFile[]
  batchProcessing: boolean
  addBatchFiles: (files: File[]) => void
  removeBatchFile: (id: string) => void
  updateBatchFile: (id: string, updates: Partial<BatchFile>) => void
  clearBatchFiles: () => void
  setBatchProcessing: (processing: boolean) => void
}

export const useAppStore = create<ExtendedAppState>()(
  persist(
    (set, get) => ({
      // Video state
      videoFile: null,
      videoUrl: null,
      videoMetadata: null,
      
      // Settings
      settings: defaultSettings,
      activePreset: null,
      
      // Conversion state
      conversionState: 'idle',
      conversionProgress: 0,
      conversionResult: null,
      error: null,
      
      // Pro state
      isPro: false,
      
      // Batch state
      batchFiles: [],
      batchProcessing: false,
      
      // Actions
      setVideoFile: (file: File | null) => {
        const prevUrl = get().videoUrl
        if (prevUrl) {
          URL.revokeObjectURL(prevUrl)
        }
        
        const newUrl = file ? URL.createObjectURL(file) : null
        
        set({
          videoFile: file,
          videoUrl: newUrl,
          conversionResult: null,
          conversionState: 'idle',
          conversionProgress: 0,
          error: null,
        })
      },
      
      setVideoMetadata: (metadata: VideoMetadata | null) => {
        set({
          videoMetadata: metadata,
          settings: {
            ...get().settings,
            startTime: 0,
            endTime: metadata?.duration || 0,
          },
        })
      },
      
      updateSettings: (newSettings: Partial<ConversionSettings>) => {
        set({
          settings: { ...get().settings, ...newSettings },
          activePreset: null, // Clear preset when manually changing settings
        })
      },
      
      setActivePreset: (preset: Preset | null) => {
        if (!preset) {
          set({ activePreset: null })
          return
        }
        
        const metadata = get().videoMetadata
        set({
          activePreset: preset,
          settings: {
            ...get().settings,
            fps: preset.fps,
            quality: preset.quality,
            maxWidth: preset.maxWidth,
            maxHeight: preset.maxHeight,
            loop: preset.loop,
          },
        })
      },
      
      setConversionState: (state: ConversionState) => {
        set({ conversionState: state })
      },
      
      setConversionProgress: (progress: number) => {
        set({ conversionProgress: progress })
      },
      
      setConversionResult: (result: ConversionResult | null) => {
        set({
          conversionResult: result,
          conversionState: result ? 'complete' : get().conversionState,
        })
      },
      
      setError: (error: string | null) => {
        set({
          error,
          conversionState: error ? 'error' : get().conversionState,
        })
      },
      
      setPro: (isPro: boolean) => {
        set({ isPro })
      },
      
      reset: () => {
        const prevUrl = get().videoUrl
        const prevResultUrl = get().conversionResult?.url
        
        if (prevUrl) URL.revokeObjectURL(prevUrl)
        if (prevResultUrl) URL.revokeObjectURL(prevResultUrl)
        
        set({
          videoFile: null,
          videoUrl: null,
          videoMetadata: null,
          settings: defaultSettings,
          activePreset: null,
          conversionState: 'idle',
          conversionProgress: 0,
          conversionResult: null,
          error: null,
        })
      },
      
      // Batch actions
      addBatchFiles: (files: File[]) => {
        const newFiles: BatchFile[] = files.map((file) => ({
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          file,
          name: file.name,
          size: file.size,
          status: 'pending' as const,
          progress: 0,
          result: null,
          error: null,
        }))
        set({ batchFiles: [...get().batchFiles, ...newFiles] })
      },
      
      removeBatchFile: (id: string) => {
        const file = get().batchFiles.find(f => f.id === id)
        if (file?.result?.url) {
          URL.revokeObjectURL(file.result.url)
        }
        set({ batchFiles: get().batchFiles.filter(f => f.id !== id) })
      },
      
      updateBatchFile: (id: string, updates: Partial<BatchFile>) => {
        set({
          batchFiles: get().batchFiles.map(f => 
            f.id === id ? { ...f, ...updates } : f
          )
        })
      },
      
      clearBatchFiles: () => {
        get().batchFiles.forEach(f => {
          if (f.result?.url) URL.revokeObjectURL(f.result.url)
        })
        set({ batchFiles: [], batchProcessing: false })
      },
      
      setBatchProcessing: (processing: boolean) => {
        set({ batchProcessing: processing })
      },
    }),
    {
      name: 'webp-run-storage',
      partialize: (state) => ({
        isPro: state.isPro,
      }),
    }
  )
)
