import React from 'react';
import { FormData } from '../types';

interface ResumePreviewProps {
  data: FormData;
  layout: 'single' | 'double';
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data, layout }) => {
  const isDoubleColumn = layout === 'double';

  return (
    <div
      id="resume-preview"
      className="bg-white p-12 shadow-lg"
      style={{ width: '210mm', minHeight: '297mm' }}
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{data.name}</h1>
        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>•</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.location && <span>•</span>}
          {data.location && <span>{data.location}</span>}
        </div>
        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600 mt-2">
          {data.linkedin && <span>{data.linkedin}</span>}
          {data.github && data.linkedin && <span>•</span>}
          {data.github && <span>{data.github}</span>}
        </div>
      </div>

      {data.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-3">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {data.summary}
          </p>
        </div>
      )}

      {isDoubleColumn ? (
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-6">
            {data.experience && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-3">
                  Experience
                </h2>
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {data.experience}
                </div>
              </div>
            )}

            {data.education && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-3">
                  Education
                </h2>
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {data.education}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {data.skills && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-3">
                  Skills
                </h2>
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {data.skills}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {data.experience && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-3">
                Experience
              </h2>
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {data.experience}
              </div>
            </div>
          )}

          {data.education && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-3">
                Education
              </h2>
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {data.education}
              </div>
            </div>
          )}

          {data.skills && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-3">
                Skills
              </h2>
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {data.skills}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
