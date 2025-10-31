# Usage Guide

## Step-by-Step Tutorial

### 1. Upload a Resume

Click the **"Choose File"** button on the home screen and select:
- A resume image (JPG or PNG format)
- A resume PDF file (first page only)

The app will automatically:
- Convert PDF to image if needed
- Display a progress bar during OCR processing
- Extract all text and word positions

### 2. View Layout Debugger (Optional)

After processing completes, click **"Show Layout Debugger"** to:
- See red bounding boxes around each detected word
- View a blue vertical line showing column division
- Verify OCR accuracy

This helps you understand:
- Which words were detected
- How the layout algorithm works
- Where errors might have occurred

### 3. Review Extracted Data

The form will be automatically populated with:

**Contact Information:**
- Name (detected from largest text at top)
- Email (regex pattern matching)
- Phone (regex pattern matching)
- Location (context-based detection)
- LinkedIn URL
- GitHub URL

**Sections:**
- Summary/Profile
- Experience/Work History
- Education
- Skills
- Any other detected sections

### 4. Edit the Form

Make any necessary corrections:
- Fix OCR errors
- Add missing information
- Reformat text
- Remove unwanted content

The form adapts to the detected layout:
- **Single Column**: All fields stacked vertically
- **Double Column**: Contact info and sections side-by-side

### 5. Generate Preview

Click **"Generate PDF"** to see a live preview of your resume.

The preview shows:
- A4-sized layout (210mm × 297mm)
- Professional formatting
- Same layout structure as detected

### 6. Export to PDF

Click **"Export as PDF"** to download your resume.

The PDF will include:
- All edited content
- Original layout structure
- Professional styling
- Standard A4 dimensions

## Tips for Best Results

### Image Quality

✅ **Good:**
- High resolution (300 DPI or higher)
- Clear, crisp text
- Good contrast
- Straight orientation

❌ **Avoid:**
- Blurry or pixelated images
- Low contrast
- Rotated or skewed documents
- Handwritten text

### Supported Layouts

**Single Column:**
```
+------------------+
| Name             |
| Contact Info     |
+------------------+
| Summary          |
+------------------+
| Experience       |
+------------------+
| Education        |
+------------------+
| Skills           |
+------------------+
```

**Double Column:**
```
+--------+--------+
| Name            |
| Contact Info    |
+--------+--------+
| Experience      |
|                 |
| Education       |
+--------+--------+
| Skills | Other  |
+--------+--------+
```

### Section Detection

The app recognizes these section headers:
- Experience, Work Experience, Employment, Professional Experience
- Education, Academic Background
- Skills, Technical Skills, Core Competencies
- Summary, Profile, Objective
- Projects, Certifications, Achievements, Awards
- Publications, Languages

**Pro Tip:** Use standard section headers for best detection.

## Troubleshooting

### Issue: OCR accuracy is poor

**Solution:**
1. Upload a higher quality image
2. Ensure text is clear and readable
3. Try scanning at 300 DPI or higher
4. Check that the document is properly aligned

### Issue: Layout detected incorrectly

**Solution:**
1. Use the Layout Debugger to see word positions
2. Manually edit the form fields
3. The form is fully editable regardless of auto-detection

### Issue: Missing sections

**Solution:**
1. Check if section headers match common keywords
2. Manually add content to form fields
3. Consider renaming sections in original document

### Issue: PDF export not working

**Solution:**
1. Ensure you've clicked "Generate PDF" first
2. Check browser console for errors
3. Try a different browser (Chrome/Firefox recommended)
4. Disable browser extensions that might interfere

## Keyboard Shortcuts

- **Tab**: Navigate between form fields
- **Shift + Tab**: Navigate backwards
- **Ctrl/Cmd + Enter**: Submit form (when focused)

## Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | Recommended |
| Firefox | ✅ Full | Recommended |
| Edge | ✅ Full | Chromium-based |
| Safari | ✅ Full | May be slower |
| Mobile Safari | ⚠️ Limited | OCR can be slow |
| Chrome Mobile | ⚠️ Limited | OCR can be slow |

## Performance Notes

### Processing Time

- **Small images (<1MB)**: 5-15 seconds
- **Medium images (1-2MB)**: 15-30 seconds
- **Large images (>2MB)**: 30-60 seconds
- **PDFs**: Add 2-5 seconds for conversion

### First Load

The first time you use the app:
- Tesseract.js worker (~2MB) downloads
- Language data (~4MB) downloads
- Subsequent uses are faster (cached)

### Optimization Tips

1. **Resize images** before upload if very large
2. **Use PNG format** for best OCR accuracy
3. **Close other tabs** for faster processing
4. **Use desktop browser** for best performance

## Privacy & Security

- **100% Client-Side**: All processing happens in your browser
- **No Server Uploads**: Files never leave your device
- **No Data Storage**: Nothing is saved or tracked
- **Offline Capable**: Works without internet after first load

Your resume data is completely private and secure.
