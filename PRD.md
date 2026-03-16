# WebP.run - Product Requirements Document

**Version:** 2.0  
**Last Updated:** December 16, 2025  
**Status:** Production Ready

---

## Executive Summary

**WebP.run** is a browser-based video-to-animated-WebP converter that processes everything client-side using FFmpeg WASM. Zero uploads, zero tracking, instant results.

### Value Proposition
- **Privacy-first**: All processing happens locally in the browser
- **No account required**: Start converting immediately
- **Smart defaults**: Presets for common use cases
- **One-time Pro unlock**: €9 for advanced features, no subscription

### Target Users
- Web developers optimizing page performance
- Email marketers creating lightweight animations
- Webflow/Framer/Shopify designers
- Content creators replacing heavy GIFs

---

## Technical Architecture

### Core Stack
- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS with custom dark theme
- **State**: Zustand with localStorage persistence
- **Video Processing**: FFmpeg WASM (multi-threaded)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Geist Sans/Mono

### Browser Requirements
- SharedArrayBuffer support (requires COOP/COEP headers)
- Modern browser (Chrome 91+, Firefox 89+, Safari 15.2+)
- Minimum 4GB RAM recommended for large videos

### Headers Configuration
```
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Opener-Policy: same-origin
```

---

## Feature Specification

### 1. Video Input System

#### 1.1 File Upload
- **Drag & drop zone** with visual feedback
- **File picker** fallback
- **Supported formats**: MP4, WebM, MOV
- **Max file size**: 500MB
- **Validation**: File type, size, readability

#### 1.2 Video Metadata Extraction
- Duration
- Resolution (width × height)
- Original filename
- File size
- MIME type

### 2. Video Preview & Trimming

#### 2.1 Video Player
- Native HTML5 video element
- Play/pause controls
- Current time indicator
- Resolution/duration overlay

#### 2.2 Timeline Trimmer
- Dual-handle range slider
- Visual selection highlight
- Real-time duration calculation
- Start/end time display (mm:ss.s format)
- Playback loops within trim range

### 3. Conversion Controls

#### 3.1 Frame Rate (FPS)
- Range: 1-30 FPS
- Default: 15 FPS
- Step: 1 FPS

#### 3.2 Quality
- Range: 10-100%
- Default: 75%
- Step: 5%

#### 3.3 Max Width
- Range: 0-1920px (0 = original)
- Default: 800px
- Step: 80px
- "Original size" toggle

#### 3.4 Loop Toggle
- Default: enabled
- WebP loop flag: 0 (infinite) or 1 (once)

### 4. Presets System

#### 4.1 Free Presets (3)

| Preset | FPS | Quality | Max Width | Use Case |
|--------|-----|---------|-----------|----------|
| Balanced | 15 | 75% | 800px | General purpose |
| Small Size | 10 | 60% | 480px | Bandwidth-constrained |
| High Quality | 24 | 90% | Original | Maximum fidelity |

#### 4.2 Pro Presets (4)

| Preset | FPS | Quality | Max Width | Use Case |
|--------|-----|---------|-----------|----------|
| Email Safe | 8 | 50% | 320px | <500KB for email |
| Webflow Hero | 20 | 80% | 1920px | Full-width heroes |
| Framer Landing | 15 | 70% | 640px | Landing pages |
| Shopify Product | 12 | 75% | 600×600px | E-commerce |

### 5. Conversion Engine

#### 5.1 FFmpeg WASM Integration
- Multi-threaded core for performance
- Lazy loading (loads on first conversion)
- Progress reporting (0-100%)
- Error handling with user feedback

#### 5.2 FFmpeg Command Construction
```
ffmpeg -ss [start] -i input -t [duration] \
  -vf "fps=[fps],scale='min([width],iw)':min'([height],ih)':force_original_aspect_ratio=decrease" \
  -c:v libwebp -quality [quality] -preset picture \
  -compression_level 4 -loop [0|1] -an -y output.webp
```

#### 5.3 Output Handling
- Blob creation from FFmpeg output
- Object URL generation
- File size calculation
- Frame count estimation
- Automatic cleanup of temporary files

### 6. Download System

#### 6.1 Filename Generation
- Pattern: `{original-name}-webp.webp`
- Sanitization: Remove special characters
- Fallback: `animation.webp`

#### 6.2 Download Trigger
- Programmatic anchor click
- Proper MIME type (image/webp)
- Cleanup of object URLs after download

### 7. Pro Features

#### 7.1 Pro Unlock (€9 one-time)
- Stored in localStorage
- Persists across sessions
- No account required

#### 7.2 AI Recommendations (Pro)
- Analyzes video metadata
- Suggests optimal FPS based on content
- Suggests quality based on size constraints
- Estimates output file size
- Provides reasoning explanation

#### 7.3 Batch Conversion (Pro)
- Multiple file selection
- Queue management with status
- Individual progress tracking
- Bulk download as ZIP
- Per-file settings override option

#### 7.4 Pro Presets Access
- Email Safe, Webflow Hero, Framer Landing, Shopify Product

### 8. Payment Integration

#### 8.1 Stripe Checkout (Primary)
- One-time payment link
- €9 EUR pricing
- Success/cancel redirect handling
- Webhook for payment confirmation

#### 8.2 Payment Flow
1. User clicks "Unlock Pro"
2. Redirect to Stripe Checkout
3. On success: return to /pro?success=true
4. Store Pro status in localStorage
5. Show confirmation UI

### 9. Pages & Routes

| Route | Purpose | Components |
|-------|---------|------------|
| `/` | Landing page | Hero, features, pricing preview |
| `/convert` | Main converter | Dropzone, preview, controls, export |
| `/pro` | Pro unlock | Pricing, features, payment |
| `/email` | Email niche landing | SEO content, CTA |
| `/webflow` | Webflow niche landing | SEO content, CTA |
| `/framer` | Framer niche landing | SEO content, CTA |
| `/shopify` | Shopify niche landing | SEO content, CTA |
| `/guides` | Guides hub | Article list |
| `/guides/webp-vs-gif` | Comparison guide | SEO content |
| `/privacy` | Privacy policy | Legal content |
| `/terms` | Terms of service | Legal content |

### 10. UI Components

| Component | Purpose |
|-----------|---------|
| Header | Navigation, Pro badge |
| Footer | Links, trust indicators |
| VideoDropzone | File upload interface |
| VideoPreview | Player + trimmer |
| PresetsPanel | Preset selection |
| ConversionControls | Settings sliders |
| ConvertButton | Action + progress |
| AIRecommendation | Smart suggestions (Pro) |
| ProUpsell | Upgrade prompt |
| BatchConverter | Multi-file queue (Pro) |

---

## State Management

### Zustand Store Shape

```typescript
interface AppState {
  // Video
  videoFile: File | null
  videoUrl: string | null
  videoMetadata: VideoMetadata | null
  
  // Batch (Pro)
  batchFiles: BatchFile[]
  
  // Settings
  settings: ConversionSettings
  activePreset: Preset | null
  
  // Conversion
  conversionState: ConversionState
  conversionProgress: number
  conversionResult: ConversionResult | null
  error: string | null
  
  // Pro
  isPro: boolean
}
```

### Persisted State
- `isPro` - Pro unlock status (localStorage)

---

## SEO Strategy

### Meta Tags (per page)
- Title with keyword
- Description (150-160 chars)
- Open Graph tags
- Twitter Card tags
- Canonical URL

### Niche Landing Pages
- `/email` - "Animated WebP for Email Marketing"
- `/webflow` - "WebP Animations for Webflow"
- `/framer` - "Lightweight WebP for Framer"
- `/shopify` - "Product Animations for Shopify"

### Content Strategy
- Guides section for long-tail keywords
- "WebP vs GIF" comparison article
- Platform-specific how-to guides

---

## Deployment Requirements

### Environment Variables
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID=price_...
NEXT_PUBLIC_APP_URL=https://webp.run
```

### Hosting Requirements
- HTTPS required
- Custom headers support (COOP/COEP)
- Static export compatible
- Recommended: Vercel, Netlify, Cloudflare Pages

---

## Success Metrics

### Core KPIs
- Conversions per day
- Pro unlock conversion rate
- Average session duration
- Bounce rate on /convert

### Technical KPIs
- FFmpeg load time
- Average conversion time
- Error rate
- Browser compatibility %

---

## Roadmap

### Phase 1: MVP ✅ (Current)
- [x] Single video conversion
- [x] Timeline trimming
- [x] 7 presets (3 free, 4 Pro-gated)
- [x] Basic AI recommendations
- [x] Download functionality
- [x] All pages and routes

### Phase 2: Production Ready 🔄 (In Progress)
- [ ] Batch conversion (Pro)
- [ ] Stripe payment integration
- [ ] Smart filename generation
- [ ] Enhanced AI recommendations
- [ ] Error tracking (Sentry)

### Phase 3: Growth
- [ ] GIF to WebP conversion
- [ ] Image sequence to WebP
- [ ] Custom watermark (Pro)
- [ ] API access (Pro)
- [ ] Usage analytics dashboard

---

## File Structure

```
webp-run/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing
│   │   ├── convert/page.tsx      # Converter
│   │   ├── pro/page.tsx          # Pro unlock
│   │   ├── email/page.tsx        # Niche landing
│   │   ├── webflow/page.tsx      # Niche landing
│   │   ├── framer/page.tsx       # Niche landing
│   │   ├── shopify/page.tsx      # Niche landing
│   │   ├── guides/
│   │   │   ├── page.tsx          # Guides hub
│   │   │   └── webp-vs-gif/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── terms/page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── VideoDropzone.tsx
│   │   ├── VideoPreview.tsx
│   │   ├── PresetsPanel.tsx
│   │   ├── ConversionControls.tsx
│   │   ├── ConvertButton.tsx
│   │   ├── AIRecommendation.tsx
│   │   ├── ProUpsell.tsx
│   │   └── BatchConverter.tsx    # NEW
│   ├── hooks/
│   │   └── useFFmpeg.ts
│   ├── store/
│   │   └── useAppStore.ts
│   ├── data/
│   │   └── presets.ts
│   ├── types/
│   │   └── index.ts
│   └── lib/
│       └── stripe.ts             # NEW
├── public/
├── package.json
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── PRD.md
```

---

## Appendix: FFmpeg WebP Options

| Option | Description |
|--------|-------------|
| `-c:v libwebp` | Use WebP encoder |
| `-quality N` | Quality 0-100 |
| `-preset picture` | Optimize for pictures |
| `-compression_level N` | 0-6, higher = smaller + slower |
| `-loop N` | 0 = infinite, 1 = once |
| `-an` | No audio |

---

*Document maintained by the WebP.run development team.*
