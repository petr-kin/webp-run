'use client'

import { useAppStore } from '@/store/useAppStore'
import { Settings, RefreshCw, Maximize, Sliders } from 'lucide-react'

export function ConversionControls() {
  const { settings, updateSettings, activePreset } = useAppStore()
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Sliders className="w-4 h-4 text-text-secondary" />
        <h3 className="text-sm font-medium text-text-primary">Settings</h3>
        {activePreset && (
          <span className="ml-auto text-xs text-text-muted">
            From: {activePreset.name}
          </span>
        )}
      </div>
      
      {/* FPS slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm text-text-secondary">Frame Rate</label>
          <span className="text-sm font-mono text-text-primary">{settings.fps} FPS</span>
        </div>
        <input
          type="range"
          min={1}
          max={30}
          step={1}
          value={settings.fps}
          onChange={(e) => updateSettings({ fps: parseInt(e.target.value) })}
          className="w-full"
        />
        <div className="flex justify-between text-2xs text-text-muted">
          <span>1</span>
          <span>15</span>
          <span>30</span>
        </div>
      </div>
      
      {/* Quality slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm text-text-secondary">Quality</label>
          <span className="text-sm font-mono text-text-primary">{settings.quality}%</span>
        </div>
        <input
          type="range"
          min={10}
          max={100}
          step={5}
          value={settings.quality}
          onChange={(e) => updateSettings({ quality: parseInt(e.target.value) })}
          className="w-full"
        />
        <div className="flex justify-between text-2xs text-text-muted">
          <span>Smaller</span>
          <span>Better</span>
        </div>
      </div>
      
      {/* Max width */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm text-text-secondary">Max Width</label>
          <span className="text-sm font-mono text-text-primary">
            {settings.maxWidth ? `${settings.maxWidth}px` : 'Original'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={0}
            max={1920}
            step={80}
            value={settings.maxWidth || 0}
            onChange={(e) => {
              const val = parseInt(e.target.value)
              updateSettings({ maxWidth: val === 0 ? null : val })
            }}
            className="flex-1"
          />
          <button
            onClick={() => updateSettings({ maxWidth: null })}
            className={`p-2 rounded-lg transition-colors ${
              settings.maxWidth === null 
                ? 'bg-accent-primary/20 text-accent-primary' 
                : 'bg-bg-elevated text-text-tertiary hover:text-text-secondary'
            }`}
            title="Use original size"
          >
            <Maximize className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Loop toggle */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-bg-elevated">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-text-secondary" />
          <span className="text-sm text-text-secondary">Loop Animation</span>
        </div>
        <button
          onClick={() => updateSettings({ loop: !settings.loop })}
          className={`
            relative w-11 h-6 rounded-full transition-colors
            ${settings.loop ? 'bg-accent-primary' : 'bg-bg-primary'}
          `}
        >
          <div
            className={`
              absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform
              ${settings.loop ? 'translate-x-5' : 'translate-x-0'}
            `}
          />
        </button>
      </div>
      
      {/* Estimated output info */}
      <div className="p-3 rounded-lg bg-bg-elevated/50 border border-border-subtle">
        <div className="flex items-center gap-2 mb-2">
          <Settings className="w-4 h-4 text-text-muted" />
          <span className="text-xs text-text-muted">Estimated Output</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-text-muted">Format:</span>
            <span className="ml-2 text-text-secondary font-mono">WebP</span>
          </div>
          <div>
            <span className="text-text-muted">Frames:</span>
            <span className="ml-2 text-text-secondary font-mono">
              ~{Math.round((settings.endTime - settings.startTime) * settings.fps)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
