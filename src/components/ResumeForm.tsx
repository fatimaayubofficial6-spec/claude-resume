import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useResumeStore } from '../store/useResumeStore';
import { FormData } from '../types';

interface ResumeFormProps {
  onSubmit: (data: FormData) => void;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({ onSubmit }) => {
  const { resumeData } = useResumeStore();
  const { register, handleSubmit, reset } = useForm<FormData>();

  useEffect(() => {
    if (resumeData) {
      const formData: FormData = {
        name: resumeData.name || '',
        email: resumeData.contact.email || '',
        phone: resumeData.contact.phone || '',
        location: resumeData.contact.location || '',
        linkedin: resumeData.contact.linkedin || '',
        github: resumeData.contact.github || '',
        summary: '',
        experience: '',
        education: '',
        skills: '',
      };

      resumeData.sections.forEach((section) => {
        const key = section.title.toLowerCase().trim();
        if (key.includes('summary') || key.includes('profile')) {
          formData.summary = section.content;
        } else if (key.includes('experience') || key.includes('work')) {
          formData.experience = section.content;
        } else if (key.includes('education')) {
          formData.education = section.content;
        } else if (key.includes('skill')) {
          formData.skills = section.content;
        } else {
          formData[section.title] = section.content;
        }
      });

      reset(formData);
    }
  }, [resumeData, reset]);

  if (!resumeData) return null;

  const isDoubleColumn = resumeData.layout === 'double';

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        Edit Resume ({isDoubleColumn ? 'Two-Column' : 'Single-Column'} Layout)
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              {...register('name')}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className={isDoubleColumn ? 'grid grid-cols-2 gap-4' : 'space-y-4'}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                {...register('email')}
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                {...register('phone')}
                type="tel"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                {...register('location')}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LinkedIn
              </label>
              <input
                {...register('linkedin')}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GitHub
            </label>
            <input
              {...register('github')}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className={isDoubleColumn ? 'grid grid-cols-2 gap-6' : 'space-y-6'}>
          <div className={isDoubleColumn ? 'col-span-2' : ''}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Summary
            </label>
            <textarea
              {...register('summary')}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className={isDoubleColumn ? 'col-span-2' : ''}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experience
            </label>
            <textarea
              {...register('experience')}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Education
            </label>
            <textarea
              {...register('education')}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills
            </label>
            <textarea
              {...register('skills')}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Generate PDF
          </button>
        </div>
      </form>
    </div>
  );
};
