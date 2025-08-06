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
import '@/components/ui/professional-ui.css';
import ButtonGroup from '@/app/_components/Utilites/Btn';

const RankedForm = () => {
  const initialFormValues = {
    heading: '',
  };

  const initialAwards = [
    { src: null },
    { src: null },
  ];

  const initialReviewLogos = [
    { src: null },
    { src: null },
  ];

  const [formValues, setFormValues] = useState(initialFormValues);
  const [awards, setAwards] = useState(initialAwards);
  const [reviewLogos, setReviewLogos] = useState(initialReviewLogos);
  const [submitConfirmation, setSubmitConfirmation] = useState(false);
  const [resetConfirmation, setResetConfirmation] = useState(false);

  const handleChange = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAwardChange = (index, field, value) => {
    setAwards((prev) => {
      const newAwards = [...prev];
      newAwards[index] = { ...newAwards[index], [field]: value };
      return newAwards;
    });
  };

  const handleReviewLogoChange = (index, field, value) => {
    setReviewLogos((prev) => {
      const newReviewLogos = [...prev];
      newReviewLogos[index] = { ...newReviewLogos[index], [field]: value };
      return newReviewLogos;
    });
  };

  const handleFileChange = (type, index, e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file.', {
          duration: 1000,
          className: 'toast-error',
        });
        return;
      }
      if (type === 'award') {
        handleAwardChange(index, 'src', file);
      } else if (type === 'reviewLogo') {
        handleReviewLogoChange(index, 'src', file);
      }
      toast.success('Image uploaded successfully!', {
        duration: 1500,
        className: 'toast-success',
      });
    }
  };

  const addAward = () => {
    setAwards((prev) => [...prev, { src: null }]);
  };

  const removeAward = (index) => {
    if (awards.length > 1) {
      setAwards((prev) => prev.filter((_, i) => i !== index));
    } else {
      toast.error('At least one award is required.', {
        duration: 1000,
        className: 'toast-error',
      });
    }
  };

  const addReviewLogo = () => {
    setReviewLogos((prev) => [...prev, { src: null }]);
  };

  const removeReviewLogo = (index) => {
    if (reviewLogos.length > 1) {
      setReviewLogos((prev) => prev.filter((_, i) => i !== index));
    } else {
      toast.error('At least one review logo is required.', {
        duration: 1000,
        className: 'toast-error',
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allEmpty =
      Object.values(formValues).every((value) => value.trim() === '') &&
      awards.every((award) => award.src === null) &&
      reviewLogos.every((logo) => logo.src === null);
    if (allEmpty) {
      toast.error('Please fill at least one field or select an image before submitting.', {
        duration: 1000,
        className: 'toast-error',
      });
    } else {
      setSubmitConfirmation(true);
    }
  };

  const confirmSave = () => {
    setSubmitConfirmation(false);
    const dataToSubmit = {
      ...formValues,
      awards: awards.map((award) => ({ src: award.src ? award.src.name : null })),
      reviewLogos: reviewLogos.map((logo) => ({
        src: logo.src ? logo.src.name : null,
      })),
    };
    console.log('Updated Ranked Section Data:', dataToSubmit);
    toast.success('Ranked section content has been saved successfully!', {
      duration: 2000,
      className: 'toast-success',
    });
  };

  const handleReset = () => {
    setResetConfirmation(true);
  };

  const confirmReset = () => {
    setFormValues(initialFormValues);
    setAwards(initialAwards);
    setReviewLogos(initialReviewLogos);
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
          <h2 className="heading">Edit Ranked Section</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 text-white p-8 rounded-xl border border-yellow-400/20 shadow-lg shadow-black/50"
        >
          <div className="space-y-6">
            {/* Heading */}
            <div>
              <h3 className="feature-title mb-4">Section Content</h3>
              <div className="space-y-4">
                <div>
                  <label className="label">Heading</label>
                  <textarea
                    value={formValues.heading}
                    onChange={(e) => handleChange('heading', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    rows={3}
                    placeholder="Enter heading for the ranked section"
                  />
                </div>
              </div>
            </div>
            {/* Awards */}
            <div>
              <h3 className="feature-title mb-4">Awards</h3>
              <div className="space-y-4">
                {awards.map((award, index) => (
                  <div key={index} className="p-4 bg-zinc-800 rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="feature-title">Award {index + 1}</h4>
                      {awards.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeAward(index)}
                          className="text-red-400 hover:text-red-300 transition-colors duration-200"
                        >
                          <MdRemoveCircle className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <div className="upload-box">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange('award', index, e)}
                        className="hidden"
                        id={`award-file-${index}`}
                      />
                      <label
                        htmlFor={`award-file-${index}`}
                        className="w-full h-40 bg-zinc-900 rounded-lg flex items-center justify-center flex-col cursor-pointer border-2 border-dashed border-gray-600 hover:border-yellow-400 transition-all duration-200"
                      >
                        <span className="text-yellow-400 text-3xl">+</span>
                        <p className="text-gray-400 text-sm mt-2">
                          Click or drag to upload an award image
                        </p>
                      </label>
                      {award.src && (
                        <p className="text-gray-300 text-sm mt-2">
                          Selected: {award.src.name}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addAward}
                  className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
                >
                  <MdAddCircle className="w-5 h-5" />
                  <span>Add Award</span>
                </button>
              </div>
            </div>
            {/* Review Logos */}
            <div>
              <h3 className="feature-title mb-4">Review Logos</h3>
              <div className="space-y-4">
                {reviewLogos.map((logo, index) => (
                  <div key={index} className="p-4 bg-zinc-800 rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="feature-title">Review Logo {index + 1}</h4>
                      {reviewLogos.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeReviewLogo(index)}
                          className="text-red-400 hover:text-red-300 transition-colors duration-200"
                        >
                          <MdRemoveCircle className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <div className="upload-box">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange('reviewLogo', index, e)}
                        className="hidden"
                        id={`review-logo-file-${index}`}
                      />
                      <label
                        htmlFor={`review-logo-file-${index}`}
                        className="w-full h-40 bg-zinc-900 rounded-lg flex items-center justify-center flex-col cursor-pointer border-2 border-dashed border-gray-600 hover:border-yellow-400 transition-all duration-200"
                      >
                        <span className="text-yellow-400 text-3xl">+</span>
                        <p className="text-gray-400 text-sm mt-2">
                          Click or drag to upload a review logo image
                        </p>
                      </label>
                      {logo.src && (
                        <p className="text-gray-300 text-sm mt-2">
                          Selected: {logo.src.name}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addReviewLogo}
                  className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
                >
                  <MdAddCircle className="w-5 h-5" />
                  <span>Add Review Logo</span>
                </button>
              </div>
            </div>
          </div>
          <ButtonGroup onResetClick={handleReset} />
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

export default RankedForm;