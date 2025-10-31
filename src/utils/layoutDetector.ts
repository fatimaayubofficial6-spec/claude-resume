import { WordBox, ResumeData, ContactInfo, DetectedSection } from '../types';

const SECTION_KEYWORDS = [
  'experience',
  'work experience',
  'employment',
  'professional experience',
  'education',
  'academic background',
  'skills',
  'technical skills',
  'core competencies',
  'summary',
  'profile',
  'objective',
  'projects',
  'certifications',
  'achievements',
  'awards',
  'publications',
  'languages',
];

function detectLayout(words: WordBox[], imageWidth: number): 'single' | 'double' {
  const midPoint = imageWidth / 2;
  const leftWords = words.filter((w) => w.x + w.width / 2 < midPoint);
  const rightWords = words.filter((w) => w.x + w.width / 2 >= midPoint);
  
  const leftCount = leftWords.length;
  const rightCount = rightWords.length;
  
  const ratio = Math.min(leftCount, rightCount) / Math.max(leftCount, rightCount);
  
  return ratio > 0.3 ? 'double' : 'single';
}

function extractName(words: WordBox[]): string {
  if (words.length === 0) return '';
  
  const topWords = words.filter((w) => w.y < words[0].y + 100);
  const sortedBySize = topWords.sort((a, b) => b.height - a.height);
  
  const nameWords = sortedBySize.slice(0, Math.min(3, sortedBySize.length));
  nameWords.sort((a, b) => a.x - b.x);
  
  return nameWords.map((w) => w.text).join(' ');
}

function extractContactInfo(words: WordBox[]): ContactInfo {
  const contact: ContactInfo = {
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
  };
  
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const phoneRegex = /(\+?\d{1,3}[-.]?)?\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}/;
  const linkedinRegex = /linkedin\.com\/in\/[a-zA-Z0-9-]+/;
  const githubRegex = /github\.com\/[a-zA-Z0-9-]+/;
  
  words.forEach((word) => {
    const text = word.text.toLowerCase();
    
    if (emailRegex.test(text)) {
      contact.email = text;
    } else if (phoneRegex.test(text)) {
      contact.phone = text;
    } else if (linkedinRegex.test(text)) {
      contact.linkedin = text;
    } else if (githubRegex.test(text)) {
      contact.github = text;
    }
  });
  
  const topWords = words.filter((w) => w.y < 300);
  const locationKeywords = ['city', 'state', 'country', 'avenue', 'street', 'road'];
  
  topWords.forEach((word) => {
    const text = word.text.toLowerCase();
    if (locationKeywords.some((kw) => text.includes(kw))) {
      const idx = words.indexOf(word);
      const nearby = words.slice(Math.max(0, idx - 2), idx + 3);
      contact.location = nearby.map((w) => w.text).join(' ');
    }
  });
  
  return contact;
}

function detectSections(words: WordBox[]): DetectedSection[] {
  const sections: DetectedSection[] = [];
  const sortedWords = [...words].sort((a, b) => a.y - b.y);
  
  const sectionHeaders: { title: string; y: number; index: number }[] = [];
  
  sortedWords.forEach((word, index) => {
    const text = word.text.toLowerCase().trim();
    const normalized = text.replace(/[^a-z\s]/g, '');
    
    if (SECTION_KEYWORDS.some((kw) => normalized.includes(kw) || kw.includes(normalized))) {
      const nextFewWords = sortedWords.slice(index, index + 3).map((w) => w.text).join(' ');
      sectionHeaders.push({
        title: nextFewWords,
        y: word.y,
        index,
      });
    }
  });
  
  sectionHeaders.forEach((header, i) => {
    const nextHeader = sectionHeaders[i + 1];
    const endY = nextHeader ? nextHeader.y : Infinity;
    
    const contentWords = sortedWords.filter(
      (w) => w.y > header.y + 20 && w.y < endY
    );
    
    const content = contentWords.map((w) => w.text).join(' ');
    
    sections.push({
      title: header.title,
      content: content,
      y: header.y,
    });
  });
  
  return sections;
}

export function analyzeLayout(words: WordBox[], imageWidth: number): ResumeData {
  const layout = detectLayout(words, imageWidth);
  const name = extractName(words);
  const contact = extractContactInfo(words);
  const sections = detectSections(words);
  
  return {
    name,
    contact,
    sections,
    layout,
  };
}
