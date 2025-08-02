'use client';

import React, { useState } from 'react';
import { MdEdit, MdAddCircle, MdRemoveCircle } from 'react-icons/md';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import "@/components/ui/professional-ui.css";

const Tailored = () => {
  // Initial state for static fields
  const initialFormValues = {
    leftHeading: 'Culinary Journeys Designed for Your Clients',
    leftDescription:
      'Unlock a variety of hands-on cooking adventures rooted in authentic Spanish and Mediterranean cuisine — all tailored to delight your clients.\nFrom the award-winning Paella Class to sweet baking escapes and vibrant market-to-plate experiences, every journey is chef-led and unforgettable.',
    packetsText: '📄 Download our FREE informational packets:',
    pdfButton1: 'Partnership Incentive Program – English Version (PDF)',
    pdfButton2: 'Programa de Incentivos para Asociaciones – Castillano (PDF)',
    pdfButton3: 'Ultimate Paella Class Experience Guide – English Version (PDF)',
    pdfButton4: 'Guía de Experiencias de Clases de Paella – Castillano (PDF)',
    rightHeading: 'Why Partner with Gastronomic Arts?',
    rightDescription:
      'Offer your clients more than just a meal — deliver curated culinary moments they’ll never forget. Our partnerships help you create tailored, cultural, chef-led experiences.',
    ctaButton: 'Join Our Partner Program',
  };

  const initialFeatures = [
    { title: 'Authentic Experiences', description: 'Each class captures the heart of Spanish gastronomy — from classic paella to traditional sweets.' },
    { title: 'Fully Customized', description: 'Every session is tailored to match your audience — solo travelers, families, or corporate groups.' },
    { title: 'Cultural Immersion', description: 'Local markets, chef stories, and hands-on cooking connect your clients deeply with Barcelona.' },
  ];

  // State for form fields and features
  const [formValues, setFormValues] = useState(initialFormValues);
  const [features, setFeatures] = useState(initialFeatures);
  const [submitConfirmation, setSubmitConfirmation] = useState(false);
  const [resetConfirmation, setResetConfirmation] = useState(false);

  // Handle changes for static fields
  const handleChange = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle changes for feature fields
  const handleFeatureChange = (index, field, value) => {
    setFeatures((prev) => {
      const newFeatures = [...prev];
      newFeatures[index] = { ...newFeatures[index], [field]: value };
      return newFeatures;
    });
  };

  // Add a new feature
  const addFeature = () => {
    setFeatures((prev) => [...prev, { title: '', description: '' }]);
  };

  // Remove a feature
  const removeFeature = (index) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const allEmpty =
      Object.values(formValues).every((value) => value.trim() === '') &&
      features.every((feature) => feature.title.trim() === '' && feature.description.trim() === '');
    if (allEmpty) {
      toast.error('Please fill at least one field before submitting.', {
        duration: 1000,
        className: 'toast-error',
      });
    } else {
      setSubmitConfirmation(true);
    }
  };

  // Confirm save action
  const confirmSave = async () => {
    setSubmitConfirmation(false);
    const dataToSubmit = { ...formValues, features };
    console.log('Updated Tailored Partnership Section Data:', dataToSubmit);
    // Example API call (uncomment to use):
    // try {
    //   await fetch('/api/update-partnership-tailored', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(dataToSubmit),
    //   });
    //   toast.success('Tailored Partnership content has been saved successfully!', {
    //     duration: 2000,
    //     className: 'toast-success',
    //   });
    // } catch (error) {
    //   toast.error('Failed to save content. Please try again.', {
    //     duration: 2000,
    //     className: 'toast-error',
    //   });
    // }
    toast.success('Tailored Partnership content has been saved successfully!', {
      duration: 2000,
      className: 'toast-success',
    });
  };

  // Handle form reset
  const handleReset = () => {
    setFormValues(initialFormValues);
    setFeatures(initialFeatures);
    toast.success('Form has been reset.', {
      duration: 1500,
      className: 'toast-success',
    });
    setResetConfirmation(false);
  };

  return (
    <div className="bg-zinc-950 main-container">
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex items-center gap-3 mb-8">
          <MdEdit className="text-yellow-400 w-6 h-6" />
          <h2 className="text-3xl font-bold text-white">Edit Tailored Partnership Section</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 text-white p-8 rounded-xl border border-yellow-400/20 shadow-lg shadow-black/50"
        >
          <div className="space-y-6">
            {/* Left Column: Crafted Experiences */}
            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-4">Left Column: Crafted Experiences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Left Heading */}
                <div>
                  <label className="block text-xs font-semibold text-yellow-400 uppercase tracking-wide mb-2 transform transition-transform duration-200 hover:scale-105">
                    Heading (Left Column)
                  </label>
                  <input
                    type="text"
                    value={formValues.leftHeading}
                    onChange={(e) => handleChange('leftHeading', e.target.value)}
                    className="w-full bg-zinc-800 border border-gray-700 rounded-lg p-3 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30 transition-all duration-200 hover:border-yellow-400/50"
                    placeholder="Enter heading for Crafted Experiences section"
                  />
                </div>
                {/* Left Description */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-yellow-400 uppercase tracking-wide mb-2 transform transition-transform duration-200 hover:scale-105">
                    Description (Left Column)
                  </label>
                  <textarea
                    value={formValues.leftDescription}
                    onChange={(e) => handleChange('leftDescription', e.target.value)}
                    className="w-full bg-zinc-800 border border-gray-700 rounded-lg p-3 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30 transition-all duration-200 hover:border-yellow-400/50"
                    rows={4}
                    placeholder="Enter description for Crafted Experiences section"
                  />
                </div>
                {/* Informational Packets Text */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-yellow-400 uppercase tracking-wide mb-2 transform transition-transform duration-200 hover:scale-105">
                    Informational Packets Text
                  </label>
                  <input
                    type="text"
                    value={formValues.packetsText}
                    onChange={(e) => handleChange('packetsText', e.target.value)}
                    className="w-full bg-zinc-800 border border-gray-700 rounded-lg p-3 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30 transition-all duration-200 hover:border-yellow-400/50"
                    placeholder="Enter text for informational packets"
                  />
                </div>
                {/* PDF Button Labels */}
                {[1, 2, 3, 4].map((num) => (
                  <div key={num}>
                    <label className="block text-xs font-semibold text-yellow-400 uppercase tracking-wide mb-2 transform transition-transform duration-200 hover:scale-105">
                      PDF Button {num} Label
                    </label>
                    <input
                      type="text"
                      value={formValues[`pdfButton${num}`]}
                      onChange={(e) => handleChange(`pdfButton${num}`, e.target.value)}
                      className="w-full bg-zinc-800 border border-gray-700 rounded-lg p-3 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30 transition-all duration-200 hover:border-yellow-400/50"
                      placeholder={`Enter label for PDF Button ${num}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Let’s Collaborate */}
            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-4">Right Column: Let’s Collaborate</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Right Heading */}
                <div>
                  <label className="block text-xs font-semibold text-yellow-400 uppercase tracking-wide mb-2 transform transition-transform duration-200 hover:scale-105">
                    Heading (Right Column)
                  </label>
                  <input
                    type="text"
                    value={formValues.rightHeading}
                    onChange={(e) => handleChange('rightHeading', e.target.value)}
                    className="w-full bg-zinc-800 border border-gray-700 rounded-lg p-3 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30 transition-all duration-200 hover:border-yellow-400/50"
                    placeholder="Enter heading for Let’s Collaborate section"
                  />
                </div>
                {/* Right Description */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-yellow-400 uppercase tracking-wide mb-2 transform transition-transform duration-200 hover:scale-105">
                    Description (Right Column)
                  </label>
                  <textarea
                    value={formValues.rightDescription}
                    onChange={(e) => handleChange('rightDescription', e.target.value)}
                    className="w-full bg-zinc-800 border border-gray-700 rounded-lg p-3 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30 transition-all duration-200 hover:border-yellow-400/50"
                    rows={4}
                    placeholder="Enter description for Let’s Collaborate section"
                  />
                </div>
                {/* Dynamic Features */}
                <div className="md:col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-xs font-semibold text-yellow-400 uppercase tracking-wide">
                      Features
                    </label>
                    <button
                      type="button"
                      onClick={addFeature}
                      className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
                    >
                      <MdAddCircle className="w-5 h-5" />
                      <span>Add Feature</span>
                    </button>
                  </div>
                  {features.map((feature, index) => (
                    <div key={index} className="mb-4 p-4 bg-zinc-800 rounded-lg border border-gray-700">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-semibold text-white">Feature {index + 1}</h4>
                        {features.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeFeature(index)}
                            className="text-red-400 hover:text-red-300 transition-colors duration-200"
                          >
                            <MdRemoveCircle className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-yellow-400 uppercase tracking-wide mb-2 transform transition-transform duration-200 hover:scale-105">
                            Feature {index + 1} Title
                          </label>
                          <input
                            type="text"
                            value={feature.title}
                            onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                            className="w-full bg-zinc-900 border border-gray-700 rounded-lg p-3 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30 transition-all duration-200 hover:border-yellow-400/50"
                            placeholder={`Enter title for Feature ${index + 1}`}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-yellow-400 uppercase tracking-wide mb-2 transform transition-transform duration-200 hover:scale-105">
                            Feature {index + 1} Description
                          </label>
                          <textarea
                            value={feature.description}
                            onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                            className="w-full bg-zinc-900 border border-gray-700 rounded-lg p-3 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30 transition-all duration-200 hover:border-yellow-400/50"
                            rows={3}
                            placeholder={`Enter description for Feature ${index + 1}`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* CTA Button */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-yellow-400 uppercase tracking-wide mb-2 transform transition-transform duration-200 hover:scale-105">
                    CTA Button Label
                  </label>
                  <input
                    type="text"
                    value={formValues.ctaButton}
                    onChange={(e) => handleChange('ctaButton', e.target.value)}
                    className="w-full bg-zinc-800 border border-gray-700 rounded-lg p-3 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30 transition-all duration-200 hover:border-yellow-400/50"
                    placeholder="Enter label for CTA button"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit & Reset Buttons */}
          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="submit"
              className="relative py-2 px-4 bg-[#111] border border-gray-600 text-white text-sm font-serif uppercase tracking-wide rounded-lg shadow-md shadow-black/50 overflow-hidden group cursor-pointer"
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                Save Changes
              </span>
              <span className="absolute inset-0 bg-yellow-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
            </button>
            <button
              type="button"
              onClick={() => setResetConfirmation(true)}
              className="relative py-2 px-4 bg-[#111] border border-gray-600 text-white text-sm font-serif uppercase tracking-wide rounded-lg shadow-md shadow-black/50 overflow-hidden group cursor-pointer"
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                Reset
              </span>
              <span className="absolute inset-0 bg-red-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
            </button>
          </div>
        </form>

        {/* Submit Confirmation */}
        <AlertDialog open={submitConfirmation} onOpenChange={setSubmitConfirmation}>
          <AlertDialogContent className="dialog-content">
            <AlertDialogHeader>
              <AlertDialogTitle className="dialog-title">Confirm Submit</AlertDialogTitle>
              <AlertDialogDescription className="dialog-description">
                Are you sure you want to submit this content? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="dialog-footer">
              <button
                className="dialog-button dialog-button-confirm"
                onClick={confirmSave}
              >
                Yes, Submit
              </button>
              <button
                className="dialog-button dialog-button-cancel"
                onClick={() => setSubmitConfirmation(false)}
              >
                Cancel
              </button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Reset Confirmation */}
        <AlertDialog open={resetConfirmation} onOpenChange={setResetConfirmation}>
          <AlertDialogContent className="dialog-content">
            <AlertDialogHeader>
              <AlertDialogTitle className="dialog-title">Confirm Reset</AlertDialogTitle>
              <AlertDialogDescription className="dialog-description">
                Are you sure you want to reset the form? This will remove all unsaved changes.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="dialog-footer">
              <button
                className="dialog-button dialog-button-confirm"
                onClick={handleReset}
              >
                Yes, Reset
              </button>
              <button
                className="dialog-button dialog-button-cancel"
                onClick={() => setResetConfirmation(false)}
              >
                Cancel
              </button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Tailored;