import Tesseract from 'tesseract.js';
import { WordBox } from '../types';

export async function performOCR(
  imageUrl: string,
  onProgress?: (progress: number) => void
): Promise<WordBox[]> {
  const result = await Tesseract.recognize(imageUrl, 'eng', {
    logger: (m) => {
      if (m.status === 'recognizing text' && onProgress) {
        onProgress(Math.round(m.progress * 100));
      }
    },
  });

  const wordBoxes: WordBox[] = [];

  result.data.words.forEach((word) => {
    if (word.text.trim().length > 0) {
      wordBoxes.push({
        text: word.text,
        x: word.bbox.x0,
        y: word.bbox.y0,
        width: word.bbox.x1 - word.bbox.x0,
        height: word.bbox.y1 - word.bbox.y0,
      });
    }
  });

  return wordBoxes;
}
