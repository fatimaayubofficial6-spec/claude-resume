# Quick Start Guide

Get the Resume OCR app running in 3 minutes.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Installation

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser
# Navigate to http://localhost:5173
```

That's it! The app is now running.

## First Use

1. Click **"Choose File"**
2. Upload a resume (JPG, PNG, or PDF)
3. Wait for OCR processing (10-30 seconds)
4. Edit the auto-generated form
5. Click **"Generate PDF"**
6. Click **"Export as PDF"** to download

## Build for Production

```bash
# Build the app
npm run build

# Preview production build
npm run preview
```

## Deploy to Vercel

```bash
# Install Vercel CLI (one time)
npm install -g vercel

# Deploy
vercel
```

Follow the prompts and your app will be live in minutes!

## Common Commands

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## File Upload Tips

For best OCR results:
- Use high-resolution images (300 DPI+)
- Ensure text is clear and readable
- Upload PDFs for best quality
- Keep file size under 5MB

## Troubleshooting

**Issue: Installation fails**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Issue: Port 5173 already in use**
```bash
# Use a different port
npm run dev -- --port 3000
```

**Issue: Build fails**
```bash
# Check Node.js version
node --version  # Should be 18+

# Update dependencies
npm update
```

## Next Steps

- Read [README.md](README.md) for full documentation
- Check [USAGE.md](USAGE.md) for detailed usage guide
- Review [FOLDER_STRUCTURE.md](FOLDER_STRUCTURE.md) to understand the codebase

## Need Help?

- Check the browser console for errors
- Review troubleshooting section in README.md
- Ensure all dependencies installed correctly

Happy resume processing! 🚀
