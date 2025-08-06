'use client';

import React, { useState, useEffect } from 'react';
import { MdEdit } from 'react-icons/md';
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
import ButtonGroup from '@/app/_components/Utilites/Btn'; // Adjust the import path as needed

const Discover = () => {
  // Initial state with no dummy data
  const initialFormValues = {
    tooltrip: '',
    heading: '',
    description: '',
    buttonLabel: '',
    backgroundImage: null,
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  const [submitConfirmation, setSubmitConfirmation] = useState(false);
  const [resetConfirmation, setResetConfirmation] = useState(false);

  // Clean up image preview URL
  useEffect(() => {
    return () => {
      if (formValues.backgroundImage) {
        URL.revokeObjectURL(URL.createObjectURL(formValues.backgroundImage));
      }
    };
  }, [formValues.backgroundImage]);

  // Handle text field changes
  const handleTextChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  // Handle image file change
  const handleFileChange = (e) => {
    const file = e.target.files[0] || e.dataTransfer?.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file.', {
          duration: 1000,
          className: 'toast-error',
        });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size exceeds 5MB limit.', {
          duration: 1000,
          className: 'toast-error',
        });
        return;
      }
      setFormValues((prev) => ({ ...prev, backgroundImage: file }));
    }
  };

  // Clear image file
  const clearFile = () => {
    setFormValues((prev) => ({ ...prev, backgroundImage: null }));
    toast.success('Image removed.', {
      duration: 1500,
      className: 'toast-success',
    });
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-yellow-400');
  };

  // Handle drag leave
  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('border-yellow-400');
  };

  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-yellow-400');
    handleFileChange(e);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const allEmpty =
      Object.values(formValues).every(
        (value) => (typeof value === 'string' && value.trim() === '') || value === null
      );
    if (allEmpty) {
      toast.error('Please fill at least one field or select an image before submitting.', {
        duration: 1000,
        className: 'toast-error',
      });
    } else {
      setSubmitConfirmation(true);
    }
  };

  // Confirm form submission
  const confirmSave = async () => {
    setSubmitConfirmation(false);
    const dataToSubmit = {
      ...formValues,
      backgroundImage: formValues.backgroundImage ? formValues.backgroundImage.name : null,
    };
    console.log('Updated Discover Data:', dataToSubmit);
    toast.success('Content saved successfully!', {
      duration: 2000,
      className: 'toast-success',
    });
  };

  // Handle form reset
  const handleReset = () => {
    setResetConfirmation(true);
  };

  // Confirm form reset
  const confirmReset = () => {
    setFormValues(initialFormValues);
    toast.success('Form reset successfully.', {
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
          <h2 className="heading">Edit Discover Content</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 text-white p-8 rounded-xl border border-yellow-400/20 shadow-lg shadow-black/50"
        >
          <div className="space-y-6">
            {/* Section Content */}
            <div>
              <h3 className="sub-heading">Section Content</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Tooltip</label>
                  <input
                    type="text"
                    value={formValues.tooltrip}
                    onChange={(e) => handleTextChange('tooltrip', e.target.value)}
                    className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter tooltip text"
                  />
                </div>
                <div>
                  <label className="label">Button Text</label>
                  <input
                    type="text"
                    value={formValues.buttonLabel}
                    onChange={(e) => handleTextChange('buttonLabel', e.target.value)}
                    className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter button text (e.g., Join Our Classes)"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="label">Heading</label>
                  <textarea
                    value={formValues.heading}
                    onChange={(e) => handleTextChange('heading', e.target.value)}
                    className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                    rows={4}
                    placeholder="Enter heading (use <br /> for line breaks, <span> for styling)"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="label">Description</label>
                  <textarea
                    value={formValues.description}
                    onChange={(e) => handleTextChange('description', e.target.value)}
                    className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                    rows={4}
                    placeholder="Enter description (use <br /> for line breaks)"
                  />
                </div>
              </div>
            </div>

            {/* Background Image */}
            <div>
              <h3 className="sub-heading">Background Image</h3>
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label className="label">Background Image</label>
                  <div
                    className="relative w-full h-40 bg-zinc-900 rounded-lg flex items-center justify-center flex-col cursor-pointer border-2 border-dashed border-gray-600 hover:border-yellow-400 transition-all duration-200"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                      id="backgroundImageUpload"
                    />
                    {formValues.backgroundImage ? (
                      <img
                        src={URL.createObjectURL(formValues.backgroundImage)}
                        alt="Preview"
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    ) : (
                      <>
                        <span className="text-yellow-400 text-3xl">+</span>
                        <p className="text-gray-400 text-sm mt-2">
                          Click or drag to upload an image
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                          Accepted: PNG, JPG, max 5MB
                        </p>
                      </>
                    )}
                  </div>
                  {formValues.backgroundImage && (
                    <div className="flex items-center gap-2 mt-2">
                      <p className="text-gray-300 text-sm truncate">
                        Selected: {formValues.backgroundImage.name}
                      </p>
                      <button
                        type="button"
                        onClick={clearFile}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Clear
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit & Reset Buttons */}
          <ButtonGroup onResetClick={handleReset} />
        </form>

        {/* Submit Confirmation */}
        <AlertDialog open={submitConfirmation} onOpenChange={setSubmitConfirmation}>
          <AlertDialogContent className="dialog-content">
            <AlertDialogHeader>
              <AlertDialogTitle className="dialog-title">Confirm Submit</AlertDialogTitle>
              <AlertDialogDescription className="dialog-description">
                Are you sure you want to submit these changes? This action cannot be undone.
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

export default Discover; 
