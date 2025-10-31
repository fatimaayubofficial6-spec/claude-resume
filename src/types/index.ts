export interface WordBox {
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DetectedSection {
  title: string;
  content: string;
  y: number;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
}

export interface ResumeData {
  name: string;
  contact: ContactInfo;
  sections: DetectedSection[];
  layout: 'single' | 'double';
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  summary: string;
  experience: string;
  education: string;
  skills: string;
  [key: string]: string;
}
