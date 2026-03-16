'use client'

import { useAppStore } from '@/store/useAppStore'
import { presets, getFreePresets, getProPresets } from '@/data/presets'
import { Preset } from '@/types'
import { Check, Lock, Sparkles, AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function PresetsPanel() {
  const { activePreset, setActivePreset, isPro } = useAppStore()
  
  const freePresets = getFreePresets()
  const proPresets = getProPresets()
  
  return (
    <div className="space-y-6">
      {/* Free presets */}
      <div>
        <h3 className="text-sm font-medium text-text-primary mb-3">Presets</h3>
        <div className="space-y-2">
          {freePresets.map((preset) => (
            <PresetCard
              key={preset.id}
              preset={preset}
              isActive={activePreset?.id === preset.id}
              isLocked={false}
              onSelect={() => setActivePreset(preset)}
            />
          ))}
        </div>
      </div>
      
      {/* Pro presets */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-accent-primary" />
          <h3 className="text-sm font-medium text-text-primary">Pro Presets</h3>
          {!isPro && (
            <Link 
              href="/pro" 
              className="ml-auto text-xs text-accent-primary hover:underline"
            >
              Unlock
            </Link>
          )}
        </div>
        <div className="space-y-2">
          {proPresets.map((preset) => (
            <PresetCard
              key={preset.id}
              preset={preset}
              isActive={activePreset?.id === preset.id}
              isLocked={!isPro}
              onSelect={() => isPro && setActivePreset(preset)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

interface PresetCardProps {
  preset: Preset
  isActive: boolean
  isLocked: boolean
  onSelect: () => void
}

function PresetCard({ preset, isActive, isLocked, onSelect }: PresetCardProps) {
  return (
    <motion.button
      onClick={onSelect}
      disabled={isLocked}
      className={`
        w-full p-3 rounded-lg text-left transition-all
        ${isActive 
          ? 'bg-accent-glow border border-accent-primary/30' 
          : isLocked
            ? 'bg-bg-elevated/50 border border-transparent opacity-60 cursor-not-allowed'
            : 'bg-bg-elevated border border-transparent hover:border-border-subtle'
        }
      `}
      whileHover={!isLocked ? { scale: 1.01 } : {}}
      whileTap={!isLocked ? { scale: 0.99 } : {}}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${isActive ? 'text-accent-primary' : 'text-text-primary'}`}>
              {preset.name}
            </span>
            {isLocked && <Lock className="w-3 h-3 text-text-muted" />}
          </div>
          <p className="text-xs text-text-tertiary mt-0.5 truncate">
            {preset.description}
          </p>
        </div>
        
        {isActive && (
          <div className="w-5 h-5 rounded-full bg-accent-primary flex items-center justify-center flex-shrink-0">
            <Check className="w-3 h-3 text-bg-primary" />
          </div>
        )}
      </div>
      
      {/* Settings preview */}
      <div className="flex items-center gap-3 mt-2 text-2xs text-text-muted font-mono">
        <span>{preset.fps} FPS</span>
        <span>•</span>
        <span>Q{preset.quality}</span>
        {preset.maxWidth && (
          <>
            <span>•</span>
            <span>{preset.maxWidth}px</span>
          </>
        )}
      </div>
      
      {/* Warnings */}
      {isActive && preset.warnings && preset.warnings.length > 0 && (
        <div className="mt-2 flex items-start gap-1.5 p-2 rounded bg-status-warning/10 border border-status-warning/20">
          <AlertTriangle className="w-3 h-3 text-status-warning flex-shrink-0 mt-0.5" />
          <span className="text-2xs text-status-warning">{preset.warnings[0]}</span>
        </div>
      )}
    </motion.button>
  )
}
