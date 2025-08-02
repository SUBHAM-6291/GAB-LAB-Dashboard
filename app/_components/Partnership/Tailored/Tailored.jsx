// app/dashboard/partnership/Tailored.tsx
'use client';

import React, { useState } from 'react';
import { MdEdit } from 'react-icons/md';

const Tailored = () => {
  // Initial state for form fields (empty strings)
  const [formValues, setFormValues] = useState({
    title: '',
    subtitle: '',
    mainDescription: '',
    secondaryDescription: '',
    primaryCtaText: '',
    secondaryCtaText: '',
  });

  // Handle input changes
  const handleChange = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Tailored Section Data:', formValues);
    // Add backend API call here if needed, e.g.:
    // fetch('/api/update-tailored', { method: 'POST', body: JSON.stringify(formValues) });
  };

  return (
    <div className=" bg-zinc-950 main-container ">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <MdEdit className="text-yellow-400 w-6 h-6" />
          <h2 className="text-3xl font-bold text-white">Edit Tailored Partnership Section</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 text-white p-8 rounded-xl border border-yellow-400/20 shadow-lg shadow-black/50"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-yellow-400 uppercase tracking-wide mb-2 transform transition-transform duration-200 hover:scale-105">
                Section Title
              </label>
              <input
                type="text"
                value={formValues.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full bg-zinc-800 border border-gray-700 rounded-lg p-3 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30 transition-all duration-200 hover:border-yellow-400/50"
              />
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-xs font-semibold text-yellow-400 uppercase tracking-wide mb-2 transform transition-transform duration-200 hover:scale-105">
                Section Subtitle
              </label>
              <input
                type="text"
                value={formValues.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                className="w-full bg-zinc-800 border border-gray-700 rounded-lg p-3 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30 transition-all duration-200 hover:border-yellow-400/50"
              />
            </div>

            {/* Main Description */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-yellow-400 uppercase tracking-wide mb-2 transform transition-transform duration-200 hover:scale-105">
                Main Description
              </label>
              <textarea
                value={formValues.mainDescription}
                onChange={(e) => handleChange('mainDescription', e.target.value)}
                className="w-full bg-zinc-800 border border-gray-700 rounded-lg p-3 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30 transition-all duration-200 hover:border-yellow-400/50"
                rows={4}
              />
            </div>

            {/* Secondary Description */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-yellow-400 uppercase tracking-wide mb-2 transform transition-transform duration-200 hover:scale-105">
                Secondary Description
              </label>
              <textarea
                value={formValues.secondaryDescription}
                onChange={(e) => handleChange('secondaryDescription', e.target.value)}
                className="w-full bg-zinc-800 border border-gray-700 rounded-lg p-3 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30 transition-all duration-200 hover:border-yellow-400/50"
                rows={4}
              />
            </div>

            {/* Primary CTA Text */}
            <div>
              <label className="block text-xs font-semibold text-yellow-400 uppercase tracking-wide mb-2 transform transition-transform duration-200 hover:scale-105">
                Primary Call-to-Action
              </label>
              <input
                type="text"
                value={formValues.primaryCtaText}
                onChange={(e) => handleChange('primaryCtaText', e.target.value)}
                className="w-full bg-zinc-800 border border-gray-700 rounded-lg p-3 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30 transition-all duration-200 hover:border-yellow-400/50"
              />
            </div>

            {/* Secondary CTA Text */}
            <div>
              <label className="block text-xs font-semibold text-yellow-400 uppercase tracking-wide mb-2 transform transition-transform duration-200 hover:scale-105">
                Secondary Call-to-Action
              </label>
              <input
                type="text"
                value={formValues.secondaryCtaText}
                onChange={(e) => handleChange('secondaryCtaText', e.target.value)}
                className="w-full bg-zinc-800 border border-gray-700 rounded-lg p-3 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30 transition-all duration-200 hover:border-yellow-400/50"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="relative py-2 px-4 bg-[#111] border border-gray-600 text-white text-sm font-serif uppercase tracking-wide rounded-lg shadow-md shadow-black/50 overflow-hidden group cursor-pointer"
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                Save Changes
              </span>
              <span className="absolute inset-0 bg-yellow-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Tailored;