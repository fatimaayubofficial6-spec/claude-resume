# Resume OCR App

A complete React TypeScript application that extracts text from resume images/PDFs using OCR, detects layout automatically, generates editable forms, and exports to PDF.

## Features

- **Upload Support**: JPG, PNG images and PDF files
- **OCR Processing**: Uses Tesseract.js to extract text and word positions
- **Smart Layout Detection**: 
  - Automatically detects single-column or double-column layouts
  - Identifies name (largest text at top)
  - Extracts contact information (email, phone, location, LinkedIn, GitHub)
  - Detects resume sections (Experience, Skills, Education, etc.)
- **Editable Forms**: Auto-generated form based on detected layout with pre-filled data
- **Visual Debugger**: Shows bounding boxes around detected words
- **PDF Export**: Export edited resume as PDF with original layout
- **100% Offline**: No backend or third-party APIs required
- **Responsive Design**: Built with Tailwind CSS

## Tech Stack

- React 18
- TypeScript
- Vite
- Tesseract.js (OCR)
- pdfjs-dist (PDF handling)
- jsPDF + html2canvas (PDF export)
- React Hook Form (form management)
- Zustand (state management)
- Tailwind CSS (styling)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd resume-ocr-app
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Upload Resume**: Click "Choose File" and select a resume image (JPG/PNG) or PDF
2. **Wait for Processing**: The app will perform OCR and detect the layout
3. **Toggle Debugger**: Click "Show Layout Debugger" to see detected word boundaries
4. **Edit Form**: Modify any extracted information in the form
5. **Generate Preview**: Click "Generate PDF" to see the preview
6. **Export**: Click "Export as PDF" to download the final resume

## Project Structure

```
resume-ocr-app/
├── public/
├── src/
│   ├── components/
│   │   ├── FileUploader.tsx       # File upload component
│   │   ├── ResumeForm.tsx         # Editable form component
│   │   ├── ResumePreview.tsx      # PDF preview component
│   │   └── LayoutDebugger.tsx     # Visual debugger component
│   ├── store/
│   │   └── useResumeStore.ts      # Zustand state management
│   ├── types/
│   │   └── index.ts               # TypeScript types
│   ├── utils/
│   │   ├── pdfToImage.ts          # PDF to image conversion
│   │   ├── ocrProcessor.ts        # Tesseract.js OCR processing
│   │   ├── layoutDetector.ts      # Layout detection logic
│   │   └── pdfExporter.ts         # PDF export functionality
│   ├── App.tsx                    # Main app component
│   ├── main.tsx                   # Entry point
│   └── index.css                  # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## Building for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

## Deployment

### Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Other Platforms

The app can be deployed to any static hosting service:
- Netlify
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront

Simply upload the contents of the `dist/` directory after building.

## How It Works

### OCR Processing
- Tesseract.js extracts every word with its bounding box coordinates
- Progress is displayed during processing

### Layout Detection
- Analyzes word positions to determine single or double column layout
- Compares left vs right word distribution
- If ratio > 0.3, it's detected as double-column

### Name Detection
- Finds largest text in top 100px
- Combines nearby large words

### Contact Extraction
- Uses regex patterns for email, phone, LinkedIn, GitHub
- Searches in top portion of document

### Section Detection
- Matches keywords: Experience, Skills, Education, Summary, etc.
- Groups content between section headers

### PDF Export
- Uses html2canvas to render preview as image
- jsPDF converts to PDF format
- Maintains A4 dimensions

## Browser Compatibility

- Chrome/Edge: ✅
- Firefox: ✅
- Safari: ✅
- Mobile browsers: ⚠️ (OCR may be slow on mobile devices)

## Performance Notes

- OCR processing time depends on image size and quality
- Larger images (>2MB) may take 30-60 seconds
- PDFs are converted to images at 2x scale for better OCR accuracy
- First load downloads Tesseract.js worker (~2MB)

## Limitations

- Only processes first page of multi-page PDFs
- Complex layouts may require manual editing
- OCR accuracy depends on image quality
- Non-English text requires Tesseract language data

## Troubleshooting

**OCR not working:**
- Ensure image is clear and high resolution
- Check browser console for errors
- Try a different image format

**PDF not exporting:**
- Check if preview is visible
- Ensure form has been submitted
- Check browser console for errors

**Layout detection inaccurate:**
- Use the debugger to see word boundaries
- Manually adjust form fields as needed
- Try uploading a higher quality image

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
