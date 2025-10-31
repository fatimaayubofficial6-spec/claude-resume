import { useState } from 'react';
import { FileUploader } from './components/FileUploader';
import { ResumeForm } from './components/ResumeForm';
import { ResumePreview } from './components/ResumePreview';
import { LayoutDebugger } from './components/LayoutDebugger';
import { useResumeStore } from './store/useResumeStore';
import { FormData } from './types';
import { exportToPdf } from './utils/pdfExporter';

function App() {
  const { resumeData, showDebugger, setShowDebugger, reset } = useResumeStore();
  const [previewData, setPreviewData] = useState<FormData | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleFormSubmit = (data: FormData) => {
    setPreviewData(data);
  };

  const handleExportPdf = async () => {
    if (!previewData) return;

    setIsExporting(true);
    try {
      await exportToPdf('resume-preview', 'resume.pdf');
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleReset = () => {
    setPreviewData(null);
    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Resume OCR App
          </h1>
          <p className="text-xl text-gray-600">
            Upload, extract, edit, and export your resume with AI-powered layout detection
          </p>
        </div>

        {!resumeData ? (
          <FileUploader />
        ) : (
          <div className="space-y-6">
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => setShowDebugger(!showDebugger)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
              >
                {showDebugger ? 'Hide' : 'Show'} Layout Debugger
              </button>
              <button
                onClick={handleReset}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
              >
                Upload New Resume
              </button>
            </div>

            <LayoutDebugger />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <ResumeForm onSubmit={handleFormSubmit} />
              </div>

              {previewData && (
                <div className="space-y-4">
                  <div className="bg-white rounded-lg shadow-md p-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Preview</h3>
                    <div className="overflow-auto max-h-[800px] border border-gray-200 rounded">
                      <div className="transform scale-50 origin-top-left" style={{ width: '200%', height: '200%' }}>
                        <ResumePreview
                          data={previewData}
                          layout={resumeData.layout}
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleExportPdf}
                      disabled={isExporting}
                      className="w-full mt-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                    >
                      {isExporting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Exporting...
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          Export as PDF
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="hidden">
              {previewData && (
                <ResumePreview
                  data={previewData}
                  layout={resumeData.layout}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
