# WebP.run

A browser-based video-to-animated-WebP converter. Zero uploads, zero tracking — all processing happens locally using FFmpeg WASM.

![WebP.run](https://img.shields.io/badge/status-production--ready-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![License](https://img.shields.io/badge/license-MIT-blue)

## Features

### Free Features
- 🎬 **Video to WebP conversion** — MP4, WebM, MOV support
- ✂️ **Timeline trimming** — Set precise start/end points
- ⚙️ **Conversion controls** — FPS, quality, max width, loop
- 🎯 **3 Free presets** — Balanced, Small Size, High Quality
- 🔒 **100% client-side** — Nothing leaves your browser
- 🌙 **Dark theme** — Easy on the eyes

### Pro Features (€9 one-time)
- 🤖 **AI recommendations** — Smart settings based on your video
- 📦 **Batch conversion** — Convert multiple files at once
- 📧 **Pro presets** — Email Safe, Webflow Hero, Framer Landing, Shopify Product
- 💾 **ZIP download** — Download all batch results as ZIP

## Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/webp-run.git
cd webp-run

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS
- **State**: Zustand
- **Video Processing**: FFmpeg WASM (multi-threaded)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Geist Sans/Mono

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── convert/           # Main converter
│   ├── pro/               # Pro unlock page
│   ├── email/             # Niche landing page
│   ├── webflow/           # Niche landing page
│   ├── framer/            # Niche landing page
│   ├── shopify/           # Niche landing page
│   ├── guides/            # Guides section
│   ├── privacy/           # Privacy policy
│   └── terms/             # Terms of service
├── components/            # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── VideoDropzone.tsx
│   ├── VideoPreview.tsx
│   ├── PresetsPanel.tsx
│   ├── ConversionControls.tsx
│   ├── ConvertButton.tsx
│   ├── AIRecommendation.tsx
│   ├── BatchConverter.tsx
│   └── ProUpsell.tsx
├── hooks/
│   └── useFFmpeg.ts       # FFmpeg WASM integration
├── store/
│   └── useAppStore.ts     # Zustand state management
├── lib/
│   └── stripe.ts          # Payment integration
├── data/
│   └── presets.ts         # Preset configurations
└── types/
    └── index.ts           # TypeScript types
```

## Environment Variables

For production deployment with Stripe:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_STRIPE_PAYMENT_LINK=https://buy.stripe.com/...
NEXT_PUBLIC_APP_URL=https://webp.run
```

## Browser Requirements

WebP.run requires browsers that support:
- SharedArrayBuffer (for FFmpeg multi-threading)
- WebAssembly

Tested and working on:
- Chrome 91+
- Firefox 89+
- Safari 15.2+
- Edge 91+

## Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Important: COOP/COEP Headers

FFmpeg WASM requires these headers for SharedArrayBuffer:

```
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Opener-Policy: same-origin
```

These are configured in `next.config.js`.

## Development

```bash
# Run dev server
npm run dev

# Type checking
npm run lint

# Build
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License — see [LICENSE](LICENSE) for details.

## Credits

- [FFmpeg](https://ffmpeg.org/) — Video processing
- [FFmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm) — WebAssembly port
- [Next.js](https://nextjs.org/) — React framework
- [Tailwind CSS](https://tailwindcss.com/) — Styling
- [Zustand](https://zustand-demo.pmnd.rs/) — State management
- [Framer Motion](https://www.framer.com/motion/) — Animations
- [Lucide](https://lucide.dev/) — Icons

---

Built with ❤️ for web performance enthusiasts.
