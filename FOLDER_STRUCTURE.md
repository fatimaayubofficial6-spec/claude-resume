# Project Folder Structure

```
resume-ocr-app/
│
├── public/                          # Static assets
│   └── vite.svg                     # Favicon
│
├── src/                             # Source code
│   ├── components/                  # React components
│   │   ├── FileUploader.tsx         # Handles file upload (images/PDFs)
│   │   ├── LayoutDebugger.tsx       # Visual debugger showing word boundaries
│   │   ├── ResumeForm.tsx           # Editable form with detected data
│   │   └── ResumePreview.tsx        # Preview resume before PDF export
│   │
│   ├── store/                       # State management
│   │   └── useResumeStore.ts        # Zustand store for global state
│   │
│   ├── types/                       # TypeScript type definitions
│   │   └── index.ts                 # All TypeScript interfaces/types
│   │
│   ├── utils/                       # Utility functions
│   │   ├── layoutDetector.ts        # Detects layout and extracts resume data
│   │   ├── ocrProcessor.ts          # Tesseract.js OCR processing
│   │   ├── pdfExporter.ts           # Export to PDF using jsPDF
│   │   └── pdfToImage.ts            # Convert PDF to image using pdfjs-dist
│   │
│   ├── App.tsx                      # Main application component
│   ├── main.tsx                     # Application entry point
│   ├── index.css                    # Global styles with Tailwind
│   └── vite-env.d.ts                # Vite environment types
│
├── .eslintrc.cjs                    # ESLint configuration
├── .gitignore                       # Git ignore rules
├── index.html                       # HTML entry point
├── package.json                     # Dependencies and scripts
├── postcss.config.js                # PostCSS configuration
├── README.md                        # Project documentation
├── tailwind.config.js               # Tailwind CSS configuration
├── tsconfig.json                    # TypeScript configuration
├── tsconfig.node.json               # TypeScript config for Node
├── vercel.json                      # Vercel deployment configuration
└── vite.config.ts                   # Vite build configuration
```

## Component Hierarchy

```
App
├── FileUploader (if no resume uploaded)
└── (if resume uploaded)
    ├── LayoutDebugger (toggleable)
    ├── ResumeForm
    └── ResumePreview (after form submit)
```

## Data Flow

1. **Upload** → FileUploader
2. **Process** → ocrProcessor (Tesseract.js)
3. **Analyze** → layoutDetector
4. **Store** → useResumeStore (Zustand)
5. **Display** → ResumeForm
6. **Edit** → React Hook Form
7. **Preview** → ResumePreview
8. **Export** → pdfExporter (jsPDF + html2canvas)

## Key Files

### Components

- **FileUploader.tsx**: Handles file selection, PDF conversion, OCR processing, and layout analysis
- **LayoutDebugger.tsx**: Canvas-based visual debugger showing word bounding boxes
- **ResumeForm.tsx**: Dynamic form that adapts to single/double column layout
- **ResumePreview.tsx**: A4-sized resume preview ready for PDF export

### Utils

- **ocrProcessor.ts**: Wrapper for Tesseract.js with progress tracking
- **layoutDetector.ts**: Core logic for layout detection and data extraction
- **pdfToImage.ts**: PDF.js integration for first-page extraction
- **pdfExporter.ts**: HTML-to-PDF conversion using html2canvas + jsPDF

### Store

- **useResumeStore.ts**: Global state management with Zustand
  - resumeData: Detected resume information
  - wordBoxes: OCR word bounding boxes
  - showDebugger: Toggle debugger visibility
  - isProcessing: Loading state
  - uploadedImage: Base64 image data

### Types

- **index.ts**: TypeScript definitions
  - WordBox: OCR word with position
  - DetectedSection: Resume section
  - ContactInfo: Contact details
  - ResumeData: Complete resume structure
  - FormData: Form fields
