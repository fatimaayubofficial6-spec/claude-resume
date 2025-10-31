import { create } from 'zustand';
import { ResumeData, WordBox } from '../types';

interface ResumeStore {
  resumeData: ResumeData | null;
  wordBoxes: WordBox[];
  showDebugger: boolean;
  isProcessing: boolean;
  uploadedImage: string | null;
  setResumeData: (data: ResumeData) => void;
  setWordBoxes: (boxes: WordBox[]) => void;
  setShowDebugger: (show: boolean) => void;
  setIsProcessing: (processing: boolean) => void;
  setUploadedImage: (image: string | null) => void;
  reset: () => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  resumeData: null,
  wordBoxes: [],
  showDebugger: false,
  isProcessing: false,
  uploadedImage: null,
  setResumeData: (data) => set({ resumeData: data }),
  setWordBoxes: (boxes) => set({ wordBoxes: boxes }),
  setShowDebugger: (show) => set({ showDebugger: show }),
  setIsProcessing: (processing) => set({ isProcessing: processing }),
  setUploadedImage: (image) => set({ uploadedImage: image }),
  reset: () => set({
    resumeData: null,
    wordBoxes: [],
    showDebugger: false,
    isProcessing: false,
    uploadedImage: null,
  }),
}));
