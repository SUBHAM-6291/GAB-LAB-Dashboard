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
import ButtonGroup from '../../Utilites/Btn';

const Tailored = () => {
  const initialFormValues = {
    leftHeading: '',
    leftDescription: '',
    packetsText: '',
    pdfButton1: '',
    pdfButton2: '',
    pdfButton3: '',
    pdfButton4: '',
    rightHeading: '',
    rightDescription: '',
    ctaButton: '',
  };

  const initialFeatures = [
    { title: '', description: '' },
    { title: '', description: '' },
    { title: '', description: '' },
  ];

  const [formValues, setFormValues] = useState(initialFormValues);
  const [features, setFeatures] = useState(initialFeatures);
  const [submitConfirmation, setSubmitConfirmation] = useState(false);
  const [resetConfirmation, setResetConfirmation] = useState(false);

  const handleChange = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFeatureChange = (index, field, value) => {
    setFeatures((prev) => {
      const newFeatures = [...prev];
      newFeatures[index] = { ...newFeatures[index], [field]: value };
      return newFeatures;
    });
  };

  const addFeature = () => {
    setFeatures((prev) => [...prev, { title: '', description: '' }]);
  };

  const removeFeature = (index) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  };

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

  const confirmSave = async () => {
    setSubmitConfirmation(false);
    const dataToSubmit = { ...formValues, features };
    console.log('Updated Tailored Partnership Section Data:', dataToSubmit);
    toast.success('Tailored Partnership content has been saved successfully!', {
      duration: 2000,
      className: 'toast-success',
    });
  };

  const handleReset = () => {
    setResetConfirmation(true); // Show confirmation dialog instead of resetting directly
  };

  const confirmReset = () => {
    setFormValues(initialFormValues);
    setFeatures(initialFeatures);
    toast.success('Form has been reset.', {
      duration: 1500,
      className: 'toast-success',
    });
    setResetConfirmation(false);
  };

  return (
    <div className="main-container">
      <div>
        <div className="flex items-center gap-3 mb-8">
          <MdEdit className="text-yellow-400 w-6 h-6" />
          <h2 className="heading">Edit Tailored Partnership Section</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 text-white p-8 rounded-xl border border-yellow-400/20 shadow-lg shadow-black/50"
        >
          <div className="space-y-6">
            {/* Left Column: Crafted Experiences */}
            <div>
              <h3 className="sub-heading">Left Column: Crafted Experiences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Left Heading */}
                <div>
                  <label className="label">Heading (Left Column)</label>
                  <input
                    type="text"
                    value={formValues.leftHeading}
                    onChange={(e) => handleChange('leftHeading', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter heading for Crafted Experiences section"
                  />
                </div>
                {/* Left Description */}
                <div className="md:col-span-2">
                  <label className="label">Description (Left Column)</label>
                  <textarea
                    value={formValues.leftDescription}
                    onChange={(e) => handleChange('leftDescription', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    rows={4}
                    placeholder="Enter description for Crafted Experiences section"
                  />
                </div>
                {/* Informational Packets Text */}
                <div className="md:col-span-2">
                  <label className="label">Informational Packets Text</label>
                  <input
                    type="text"
                    value={formValues.packetsText}
                    onChange={(e) => handleChange('packetsText', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter text for informational packets"
                  />
                </div>
                {/* PDF Button Labels */}
                {[1, 2, 3, 4].map((num) => (
                  <div key={num}>
                    <label className="label">PDF Button {num} Label</label>
                    <input
                      type="text"
                      value={formValues[`pdfButton${num}`]}
                      onChange={(e) => handleChange(`pdfButton${num}`, e.target.value)}
                      className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                      placeholder={`Enter label for PDF Button ${num}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Let’s Collaborate */}
            <div>
              <h3 className="sub-heading">Right Column: Let’s Collaborate</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Right Heading */}
                <div>
                  <label className="label">Heading (Right Column)</label>
                  <input
                    type="text"
                    value={formValues.rightHeading}
                    onChange={(e) => handleChange('rightHeading', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter heading for Let’s Collaborate section"
                  />
                </div>
                {/* Right Description */}
                <div className="md:col-span-2">
                  <label className="label">Description (Right Column)</label>
                  <textarea
                    value={formValues.rightDescription}
                    onChange={(e) => handleChange('rightDescription', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    rows={4}
                    placeholder="Enter description for Let’s Collaborate section"
                  />
                </div>
                {/* Dynamic Features */}
                <div className="md:col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <label className="label">Features</label>
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
                        <h4 className="feature-title">Feature {index + 1}</h4>
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
                          <label className="label">Feature {index + 1} Title</label>
                          <input
                            type="text"
                            value={feature.title}
                            onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                            className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                            placeholder={`Enter title for Feature ${index + 1}`}
                          />
                        </div>
                        <div>
                          <label className="label">Feature {index + 1} Description</label>
                          <textarea
                            value={feature.description}
                            onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                            className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
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
                  <label className="label">CTA Button Label</label>
                  <input
                    type="text"
                    value={formValues.ctaButton}
                    onChange={(e) => handleChange('ctaButton', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter label for CTA button"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit & Reset Buttons */}
          <ButtonGroup onResetClick={() => setResetConfirmation(true)} />

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
                onClick={confirmReset}
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