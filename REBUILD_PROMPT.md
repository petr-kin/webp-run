# REBUILD PROMPT: WebP.run — The Fastest Browser-Based Media Converter

## Instructions for Claude

You are rebuilding **WebP.run** — a privacy-first, browser-based media conversion tool. Upload video/GIF/images, get optimized animated WebP. Zero uploads to any server, zero tracking, instant results. All processing happens client-side via FFmpeg WASM.

The product vision: **The Canva of media conversion** — dead simple, beautiful, and just works. Not a developer CLI. Not a bloated online converter with ads. A premium, focused tool that web developers, email marketers, and designers reach for when they need lightweight animations.

**CRITICAL RULES:**
1. Research 2027 best practices BEFORE writing any code — 4 deep research blocks minimum
2. Build for 10,000+ users from day one — proper payment integration, analytics, error tracking
3. Every feature must ACTUALLY WORK — real FFmpeg processing, real payments, real AI recommendations
4. Privacy-first is the #1 brand promise — ALL processing stays in the browser, period
5. Performance is the product — conversion speed, FFmpeg load time, and UI responsiveness must be world-class

---

## Why This Rebuild Is Necessary

The current build is a **solid MVP** — much better than most projects. It actually works. But it has real gaps preventing it from being a production SaaS:

### What's Actually Wrong

1. **Payment Is Fake** — The Stripe integration (`lib/stripe.ts`) uses a test payment link (`https://buy.stripe.com/test_xxx`). In development mode, Pro is auto-unlocked. There's no webhook to validate real payments. Pro status is stored in localStorage — anyone can open DevTools and set `isPro: true`. There is zero payment security.

2. **"AI Recommendations" Are Heuristics** — The `AIRecommendation.tsx` component has a 600ms `setTimeout` to fake "processing", then applies basic if/else rules on video dimensions and duration. It's fine logic, but calling it "AI" is misleading. Should either be real AI or honestly labeled "Smart Recommendations."

3. **FFmpeg Scale Filter Bug** — Line 113 in `useFFmpeg.ts`:
   ```
   scale='min(${scaleW},iw)':min'(${scaleH},ih)':force_original_aspect_ratio=decrease
   ```
   The quoting syntax is wrong — misplaced single quotes around the height `min()`. Works for width-only scaling but will fail for height constraints.

4. **Output Dimensions Are Guessed** — Lines 149-150 in `useFFmpeg.ts` set `width: settings.maxWidth || 0` and `height: settings.maxHeight || 0` instead of reading actual output dimensions. The result metadata is wrong.

5. **No Error Tracking** — No Sentry, no error boundary reporting, no analytics. If FFmpeg crashes for users, nobody knows.

6. **No Analytics** — No conversion tracking, no funnel measurement, no way to know if the niche landing pages (/email, /webflow, /framer, /shopify) actually drive Pro conversions.

7. **Single Format** — Only video → WebP. The roadmap lists GIF → WebP and image sequence → WebP but neither is implemented. A media converter that only does one conversion is limiting.

8. **No Backend for Webhook** — Stripe webhooks need a server endpoint. The current app is fully static with no API routes. You can't validate payments without one.

### What's Good (Keep the Spirit)

- **Privacy-first architecture** — Client-side FFmpeg WASM is genuinely excellent. Don't change this.
- **Dark UI with green accent** — The design system is clean and professional. Evolve it, don't reinvent.
- **Preset system** — Platform-specific presets (Email Safe, Webflow Hero, Framer Landing, Shopify Product) are a smart differentiator.
- **Batch conversion with ZIP** — Well-implemented, good Pro feature.
- **Niche landing pages** — Great SEO strategy targeting specific platforms.
- **One-time pricing** — No subscription fatigue. Keep this model.
- **PRD** — Excellent documentation. Follow its structure.

---

## Research Blocks (Complete These FIRST)

### Research Block 1: FFmpeg WASM Performance & Capabilities in 2027
```
RESEARCH: State of FFmpeg WASM and browser-based media processing in 2027

Topics to investigate:
- FFmpeg WASM latest versions: @ffmpeg/ffmpeg 0.13+, core-mt performance improvements
- SharedArrayBuffer support across browsers in 2027 (still need COOP/COEP?)
- WebCodecs API: can we use hardware-accelerated encoding/decoding alongside or instead of FFmpeg?
- WASM SIMD support for faster processing — is it mainstream in 2027?
- Multi-threading in WASM: how many cores can we use, what's the perf gain?
- Memory management: handling large files (>500MB) in browser without OOM
- FFmpeg WebP encoding options: all flags, quality tuning, lossy vs lossless animated WebP
- GIF → WebP conversion: FFmpeg approach vs dedicated library
- Image sequence → animated WebP: multiple images to animation
- AVIF animated support: should we add AVIF as an output format alongside WebP?
- Video → GIF conversion (the reverse): huge demand, should we offer it?
- Progress reporting accuracy: FFmpeg progress events, frame counting
- Self-hosting FFmpeg WASM vs CDN: reliability, versioning, offline support
```

### Research Block 2: Payment & Licensing for Browser-Based Tools
```
RESEARCH: Best payment integration for one-time-purchase browser tools in 2027

Topics to investigate:
- Stripe Payment Links vs Stripe Checkout Sessions vs Stripe Elements for one-time payments
- License key approach: Gumroad/LemonSqueezy-style license keys that validate payment server-side
- Paddle vs Stripe for EU VAT handling (WebP.run uses EUR pricing)
- LemonSqueezy as Stripe alternative (built-in EU VAT, digital product focus)
- How to validate Pro status securely without user accounts:
  - Option A: License key stored in localStorage (validated against server on purchase)
  - Option B: Browser fingerprint + payment receipt
  - Option C: Simple email-based license key delivery
- Webhook validation: minimal API route (Next.js API route or Edge Function)
- Refund handling: what happens to Pro status when refunded?
- Revenue analytics: Stripe Dashboard vs custom dashboard
- Pricing psychology: €9 one-time vs €29 one-time vs freemium with usage limits
```

### Research Block 3: Conversion Tool UX & Competition
```
RESEARCH: Best practices for media conversion tools and competitive landscape in 2027

Topics to investigate:
- Competitors: CloudConvert, Convertio, EZGIF, Squoosh (Google), HandBrake, online-convert.com
- What Squoosh does right (Google's image optimizer): instant preview, slider comparison, WASM-based
- Side-by-side preview: original vs converted with slider/toggle comparison
- File size estimation BEFORE conversion (show user predicted output size)
- Conversion queue UX: how to handle multiple files elegantly
- Drag-and-drop from browser tabs, clipboard paste, URL input
- Output format comparison: WebP vs AVIF vs GIF vs MP4 (help users choose)
- Platform-specific guides that actually rank in SEO (Webflow WebP, Shopify animated images)
- Keyboard shortcuts for power users (Space = play/pause, Enter = convert, etc.)
- Progressive enhancement: basic conversion works, Pro adds precision tools
- Dark mode + light mode: should we offer both?
```

### Research Block 4: Next.js 15+ Static Site with Minimal Backend
```
RESEARCH: Building a mostly-static Next.js app with minimal server needs in 2027

Topics to investigate:
- Next.js 15 static export with selective API routes (just for webhook)
- Edge Functions on Vercel for Stripe webhook validation (minimal cold start)
- Cloudflare Pages + Workers as deployment alternative (better global performance?)
- COOP/COEP headers on different hosting platforms (Vercel, Cloudflare, Netlify)
- Service Worker for offline support: cache FFmpeg WASM core, cache the app shell
- PWA: should WebP.run be installable? (Desktop + Mobile)
- SEO for tool pages: structured data, OG images, dynamic meta per niche page
- Core Web Vitals optimization: LCP, CLS, INP for a WASM-heavy app
- Bundle splitting: keep FFmpeg WASM lazy-loaded, keep initial bundle tiny
- PostHog or Plausible for privacy-respecting analytics (aligns with brand)
```

---

## Tech Stack (2027 Standards)

```
Framework:        Next.js 15+ (App Router, Turbopack)
Language:         TypeScript 5.x (strict mode)
Styling:          Tailwind CSS 4 + CSS variables for theming
UI:               Radix UI primitives (accessible sliders, dialogs, toggles)
Animations:       Framer Motion 12+
Icons:            Lucide React
Fonts:            Geist Sans/Mono (keep current)
State:            Zustand 5 (client state + persistence)

Video Processing:
  Primary:        FFmpeg WASM (multi-threaded, self-hosted core files)
  Preview:        WebCodecs API (hardware-accelerated decode for preview)
  Comparison:     Canvas API (side-by-side before/after rendering)

Backend (Minimal):
  API Routes:     Next.js API routes or Vercel Edge Functions (webhook only)
  Payment:        LemonSqueezy OR Stripe (one-time purchase, license key delivery)
  Analytics:      PostHog or Plausible (privacy-respecting, aligns with brand)
  Error Tracking: Sentry (with source maps)
  Email:          Resend (license key delivery, optional)

Deployment:       Vercel (recommended) or Cloudflare Pages
PWA:              Service Worker for offline FFmpeg WASM caching
```

---

## Core Architecture

### 1. Conversion Engine (The Heart)

The FFmpeg WASM integration must be bulletproof:

**Supported Conversions:**
| Input | Output | Status |
|-------|--------|--------|
| Video (MP4, WebM, MOV, AVI) | Animated WebP | Core feature |
| Video | Animated AVIF | New — next-gen format |
| Video | GIF | New — huge demand |
| GIF | Animated WebP | New — GIF optimizer |
| GIF | Animated AVIF | New |
| Image sequence (PNG, JPG) | Animated WebP | New |
| Video | Optimized MP4 (H.264/H.265) | New — video compression |

**FFmpeg Command Construction (Fixed):**
```typescript
// Current (BROKEN scale filter):
// scale='min(${scaleW},iw)':min'(${scaleH},ih)':force_original_aspect_ratio=decrease
//                            ^^^ misplaced quote

// Fixed:
const scaleFilter = settings.maxWidth
  ? `scale=min(${settings.maxWidth}\\,iw):min(${settings.maxHeight || -1}\\,ih):force_original_aspect_ratio=decrease`
  : null;

// Full pipeline for animated WebP:
const args = [
  ...(settings.startTime > 0 ? ['-ss', settings.startTime.toFixed(3)] : []),
  '-i', inputName,
  ...(duration > 0 ? ['-t', duration.toFixed(3)] : []),
  '-vf', [
    `fps=${settings.fps}`,
    scaleFilter,
  ].filter(Boolean).join(','),
  '-c:v', 'libwebp',
  '-quality', String(settings.quality),
  '-preset', 'picture',
  '-compression_level', '4',
  '-loop', settings.loop ? '0' : '1',
  '-an', '-y',
  outputName,
];
```

**Output Dimensions (Fixed):**
```typescript
// Current (WRONG — guesses from settings):
// width: settings.maxWidth || 0,
// height: settings.maxHeight || 0,

// Fixed — read actual output dimensions:
const outputData = await ffmpeg.readFile(outputName);
const blob = new Blob([outputData], { type: 'image/webp' });

// Decode the WebP to get real dimensions
const img = new Image();
img.src = URL.createObjectURL(blob);
await new Promise(resolve => { img.onload = resolve; });

const result: ConversionResult = {
  blob,
  url: img.src,
  size: blob.size,
  width: img.naturalWidth,   // REAL dimensions
  height: img.naturalHeight, // REAL dimensions
  duration,
  frames: Math.round(duration * settings.fps),
};
```

**Performance Optimizations:**
- Self-host FFmpeg WASM core files (not unpkg CDN — reliability + cache control)
- Service Worker pre-caches FFmpeg WASM files after first load
- Show conversion time estimate based on input file size and settings
- Use WebCodecs API for video preview/scrubbing (hardware-accelerated, way faster than FFmpeg for decode)
- Memory cleanup: explicitly free FFmpeg file system between conversions

### 2. Before/After Preview (New Feature)

After conversion, show a side-by-side comparison:

- **Split slider**: drag left/right to compare original frame vs WebP output
- **Size comparison**: "Original: 12.4MB → WebP: 340KB (97% smaller)"
- **Quality comparison**: zoom into details to see compression artifacts
- **Toggle view**: A/B switch between original and converted

This is what Squoosh does and it's incredibly compelling. It gives users confidence their output looks good.

### 3. Smart Recommendations (Honest Labeling)

Rename from "AI Recommendations" to "Smart Recommendations" — it's heuristic-based, and that's fine:

```typescript
function getRecommendation(metadata: VideoMetadata, targetUse: string): Recommendation {
  const { width, height, duration, fileSize } = metadata;

  // Target file size budgets by use case
  const budgets: Record<string, number> = {
    'email': 500 * 1024,      // 500KB for email
    'web-hero': 2 * 1024 * 1024, // 2MB for hero sections
    'web-inline': 500 * 1024, // 500KB for inline animations
    'ecommerce': 300 * 1024,  // 300KB for product images
    'social': 1024 * 1024,    // 1MB for social sharing
  };

  const targetSize = budgets[targetUse] || 1024 * 1024;

  // Estimate output size based on duration, resolution, fps, quality
  // Use historical conversion data to improve estimates over time
  const estimatedSize = estimateOutputSize(metadata, settings);

  return {
    suggestedFps: computeOptimalFps(duration, targetSize),
    suggestedQuality: computeOptimalQuality(width * height, targetSize),
    suggestedWidth: computeOptimalWidth(width, targetUse),
    estimatedOutputSize: estimatedSize,
    estimatedConversionTime: estimateTime(fileSize),
    reasoning: buildReasoning(metadata, targetUse),
    confidence: 'high' | 'medium' | 'low', // based on how close we are to known patterns
  };
}
```

### 4. Payment System (Actually Secure)

**Option A: LemonSqueezy (Recommended)**
- Built-in EU VAT handling (critical for €9 EUR pricing)
- License key generation on purchase
- Simple webhook for validation
- No need for full Stripe API integration

**Option B: Stripe with License Keys**
- Stripe Checkout Session (one-time payment)
- On successful payment → generate unique license key
- Store license key in localStorage
- Validate license key via API route on load (prevents DevTools tampering)

**Flow:**
```
1. User clicks "Unlock Pro" (€9)
2. Redirect to LemonSqueezy/Stripe checkout
3. Payment succeeds → webhook fires to /api/webhook
4. Server generates license key → stores in database
5. Redirect to /pro?license=XXXX-XXXX-XXXX
6. Client stores license key in localStorage
7. On app load: validate license key via /api/validate-license
8. If valid → unlock Pro features
9. If invalid/tampered → revert to free tier
```

**API Routes (Minimal Backend):**
```
POST /api/webhook          → LemonSqueezy/Stripe webhook handler
GET  /api/validate-license → Validate a license key (returns { valid: boolean })
```

**Database:** Could be as simple as a Supabase table or even a Cloudflare KV store:
```sql
CREATE TABLE licenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  license_key VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(255),
  payment_id VARCHAR(255) NOT NULL,
  payment_provider VARCHAR(20) NOT NULL, -- stripe, lemonsqueezy
  status VARCHAR(20) DEFAULT 'active', -- active, refunded, expired
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 5. Preset System (Expanded)

Current presets are good. Expand with more platform-specific ones:

**Free Presets (4):**
| Preset | FPS | Quality | Max Width | Use Case |
|--------|-----|---------|-----------|----------|
| Balanced | 15 | 75% | 800px | General purpose |
| Small Size | 10 | 60% | 480px | Bandwidth-constrained |
| High Quality | 24 | 90% | Original | Maximum fidelity |
| Quick GIF Replace | 12 | 70% | 640px | Drop-in GIF replacement |

**Pro Presets (8):**
| Preset | FPS | Quality | Max Width | Target Size | Use Case |
|--------|-----|---------|-----------|-------------|----------|
| Email Safe | 8 | 50% | 320px | <500KB | Email clients |
| Webflow Hero | 20 | 80% | 1920px | <2MB | Full-width hero |
| Framer Landing | 15 | 70% | 640px | <500KB | Landing pages |
| Shopify Product | 12 | 75% | 600x600 | <300KB | Product images |
| WordPress Featured | 15 | 75% | 1200px | <1MB | Blog headers |
| Social Story | 24 | 85% | 1080x1920 | <2MB | Instagram/TikTok |
| Slack/Discord | 10 | 60% | 400px | <1MB | Chat animations |
| Notion Embed | 12 | 70% | 800px | <500KB | Doc embeds |

### 6. Output Format Support (New)

Don't just do WebP — become the browser-based media conversion tool:

**Output Formats:**
- **Animated WebP** (core, current)
- **Animated AVIF** (next-gen, even smaller, growing support)
- **GIF** (for compatibility where WebP isn't supported)
- **Optimized MP4** (H.264, small file, auto-loops)

**Format Comparison Tool:**
Convert the same input to all formats simultaneously, show a comparison table:
```
| Format | Size    | Quality | Browser Support | Best For           |
|--------|---------|---------|-----------------|---------------------|
| WebP   | 340 KB  | ★★★★☆  | 97%             | Web, email          |
| AVIF   | 220 KB  | ★★★★★  | 92%             | Modern web          |
| GIF    | 2.1 MB  | ★★★☆☆  | 100%            | Universal compat    |
| MP4    | 180 KB  | ★★★★★  | 100%            | Social, video embed |
```

This is incredibly valuable — users see exactly which format gives the best tradeoff.

---

## Page Architecture

```
/                          → Landing page (hero, value props, demo, pricing, social proof)
/convert                   → Main converter (single mode, free)
/convert?mode=batch        → Batch converter (Pro)
/convert?format=gif        → GIF conversion mode
/convert?format=avif       → AVIF conversion mode
/compare                   → Format comparison tool (convert to all, compare)
/pro                       → Pro unlock page (pricing, features, payment)
/pro/activate              → License key activation (from email link)

/use-cases/email           → Niche landing: email marketing animations
/use-cases/webflow         → Niche landing: Webflow animated backgrounds
/use-cases/framer          → Niche landing: Framer micro-animations
/use-cases/shopify         → Niche landing: Shopify product animations
/use-cases/wordpress       → Niche landing: WordPress featured images
/use-cases/notion          → Niche landing: Notion animated embeds

/guides                    → Guides hub
/guides/webp-vs-gif        → WebP vs GIF comparison (SEO)
/guides/webp-vs-avif       → WebP vs AVIF comparison (SEO)
/guides/optimal-settings   → How to choose the right settings
/guides/browser-support    → Browser compatibility guide
/guides/email-animation    → Animated images in email (SEO)

/privacy                   → Privacy policy
/terms                     → Terms of service

/api/webhook               → Payment webhook (server-side)
/api/validate-license      → License validation (server-side)
```

---

## Design System (Evolve Current)

```
Keep the dark + green identity. Refine it:

Colors:
  Background:
    Primary:    #09090b (near black, deeper than current)
    Secondary:  #111113
    Elevated:   #1c1c20 (cards, panels)
    Hover:      #27272a

  Accent:
    Primary:    #22c55e (bright green — keep this, it's the brand)
    Hover:      #16a34a
    Muted:      rgba(34, 197, 94, 0.15)
    Glow:       rgba(34, 197, 94, 0.08)

  Text:
    Primary:    #fafafa
    Secondary:  #a1a1aa
    Muted:      #71717a

  Borders:
    Subtle:     #27272a
    Default:    #3f3f46

  Status:
    Success:    #22c55e (same as accent)
    Warning:    #eab308
    Error:      #ef4444
    Info:       #3b82f6

Typography:
  Font:         Geist Sans (keep), Geist Mono for code/stats
  Headings:     700-800 weight, tight letter-spacing
  Body:         400 weight, relaxed line-height

Layout:
  Max width:    1200px (content), 1400px (full-bleed)
  Sidebar:      320px (conversion controls)
  Card radius:  12px
  Button radius: 8px

Motion:
  Transitions:  200ms ease (hover), 300ms ease (layout shifts)
  Spring:       { stiffness: 300, damping: 25 } (Framer Motion)
  Progress bar: Smooth gradient animation during conversion
```

---

## Implementation Plan (10 Weeks)

### Weeks 1-2: Foundation & Core Engine Rebuild
- [ ] Next.js 15 project with TypeScript strict, Tailwind CSS 4, design system
- [ ] Self-hosted FFmpeg WASM files (not CDN) with Service Worker caching
- [ ] Fixed FFmpeg command construction (scale filter bug, proper quoting)
- [ ] Correct output dimension detection (Image decode, not guessing)
- [ ] Video → WebP conversion working end-to-end
- [ ] Video → GIF conversion
- [ ] Video → AVIF conversion (if FFmpeg WASM supports libaom)
- [ ] GIF → WebP conversion
- [ ] Zustand store with clean state management
- [ ] Video dropzone with drag-drop, clipboard paste, file picker
- [ ] Video preview with HTML5 player

### Weeks 3-4: Converter UX
- [ ] Timeline trimmer with dual handles (keep current approach, polish)
- [ ] Conversion controls: FPS, quality, max width, loop (Radix UI sliders)
- [ ] Preset system: 4 free + 8 Pro presets
- [ ] Format selector: WebP / AVIF / GIF / MP4
- [ ] Before/after preview with split slider comparison
- [ ] File size estimation before conversion
- [ ] Smart recommendations (heuristic, honestly labeled)
- [ ] Conversion progress with accurate percentage
- [ ] Download with smart filename generation
- [ ] Batch conversion with queue management and ZIP download (Pro)

### Weeks 5-6: Format Comparison & Advanced Features
- [ ] Format comparison tool: convert to all formats, show table
- [ ] Side-by-side quality comparison with zoom
- [ ] Conversion history (session-only, stored in Zustand)
- [ ] Keyboard shortcuts (Space=play/pause, Enter=convert, Esc=reset)
- [ ] Clipboard paste support (paste a GIF/video from clipboard)
- [ ] URL input: paste a video/GIF URL, fetch and convert
- [ ] Mobile responsive converter (touch-friendly trimmer)

### Weeks 7-8: Payment & Pro Features
- [ ] LemonSqueezy OR Stripe integration with license key system
- [ ] Webhook API route for payment validation
- [ ] License validation API route
- [ ] License key storage in localStorage with server validation
- [ ] Pro unlock flow: purchase → receive license → activate
- [ ] Pro gate on batch mode, advanced presets, format comparison
- [ ] Refund handling (revoke license on webhook)
- [ ] Simple database for license keys (Supabase or KV store)

### Weeks 9-10: SEO, Analytics & Launch
- [ ] Landing page: hero with live demo, value props, format comparison, pricing, social proof
- [ ] 6 niche landing pages (email, webflow, framer, shopify, wordpress, notion)
- [ ] 5 SEO guides (webp-vs-gif, webp-vs-avif, optimal-settings, browser-support, email-animation)
- [ ] Dynamic OG images per page
- [ ] Structured data (SoftwareApplication schema)
- [ ] PostHog or Plausible analytics (privacy-respecting)
- [ ] Sentry error tracking with source maps
- [ ] Core Web Vitals optimization (LCP < 1.5s, INP < 100ms)
- [ ] PWA manifest + Service Worker (installable, offline FFmpeg)
- [ ] Privacy policy and terms (updated for license key system)
- [ ] Social proof: conversion counter, testimonials (if available)
- [ ] Product Hunt launch prep

---

## Key Metrics to Track

**Conversion Funnel:**
- Landing page → /convert (conversion start rate)
- File uploaded → conversion started (intent rate)
- Conversion completed → downloaded (success rate)
- Free user → Pro purchase (monetization rate)

**Technical:**
- FFmpeg load time (target: <2s cached, <5s first load)
- Average conversion time by file size
- Error rate by browser/OS
- Memory usage during conversion

**Business:**
- Pro purchases/week
- Revenue (€9 × purchases)
- Refund rate
- Niche landing page → Pro conversion attribution

---

## Non-Negotiable Requirements

1. **Zero server-side processing** — All media conversion happens in the browser. This is the brand promise. Never upload user files anywhere.
2. **Payment must be real** — License key validated server-side. No localStorage-only Pro that anyone can bypass with DevTools.
3. **FFmpeg commands must be correct** — Fix the scale filter bug. Test every conversion path (video→WebP, video→GIF, GIF→WebP, etc.).
4. **Output metadata must be real** — Detect actual output dimensions by decoding the result, don't guess from settings.
5. **Self-host FFmpeg WASM** — Don't depend on unpkg CDN. Host the core files, cache via Service Worker.
6. **Privacy-respecting analytics** — PostHog or Plausible, not Google Analytics. Aligns with the privacy-first brand.
7. **Works offline** — After first load, the converter should work without internet (Service Worker + cached FFmpeg).
8. **One-time pricing** — No subscription. €9 one-time for Pro. This is a differentiator against subscription-fatigued competitors.
9. **SEO is a growth channel** — Niche landing pages and guides must be real, useful content, not keyword-stuffed filler.
10. **Mobile works** — The converter must be fully functional on phones and tablets. Touch-friendly trimmer, responsive layout.

---

## What Success Looks Like

A web developer needs to add an animated hero to their Webflow site:

1. Googles "video to webp converter" → finds WebP.run (organic or via /use-cases/webflow page)
2. Lands on the converter — no signup, no account, just a drop zone
3. Drags in their 15-second screen recording (MP4, 8MB)
4. Selects "Webflow Hero" preset — settings auto-configure
5. Sees Smart Recommendation: "Estimated output: ~1.2MB at these settings. Consider trimming to 10s for <800KB."
6. Trims to 10 seconds using the timeline
7. Hits Convert — progress bar fills in 4 seconds
8. Before/after comparison: "Original: 8MB MP4 → WebP: 680KB (91% smaller)"
9. Downloads the file. Done. Entire experience: 45 seconds.
10. Loves it. Comes back next week, needs batch conversion for 5 product animations. Unlocks Pro for €9. License key arrives. Converts all 5, downloads as ZIP.

That's WebP.run — the fastest path from video to optimized web animation.
