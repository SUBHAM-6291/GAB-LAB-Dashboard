'use client';

import React, { useState } from 'react';
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
import ButtonGroup from '../../Utilites/Btn';

const QuestionnaireFormEdit = () => {
  const initialFormValues = {
    formContent: {
      tooltip: '',
      heading: '',
      description: '',
      cardHeadings: {
        personalInfo: '',
        businessDetails: '',
      },
    },
    thankYouContent: {
      tooltip: '',
      heading: '',
      description: '',
      bannerImage: null,
    },
    buttonLabels: {
      singleColumn: {
        next: '',
        previous: '',
        submit: '',
      },
      twoColumn: {
        submit: '',
      },
      thankYou: {
        backToHome: '',
      },
    },
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  const [submitConfirmation, setSubmitConfirmation] = useState(false);
  const [resetConfirmation, setResetConfirmation] = useState(false);

  // Handle text input changes for form and thank you content
  const handleChange = (section, field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  // Handle card heading changes
  const handleCardHeadingChange = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      formContent: {
        ...prev.formContent,
        cardHeadings: {
          ...prev.formContent.cardHeadings,
          [field]: value,
        },
      },
    }));
  };

  // Handle button label changes
  const handleButtonLabelChange = (layout, button, value) => {
    setFormValues((prev) => ({
      ...prev,
      buttonLabels: {
        ...prev.buttonLabels,
        [layout]: {
          ...prev.buttonLabels[layout],
          [button]: value,
        },
      },
    }));
  };

  // Handle banner image file change
  const handleFileChange = (section, e) => {
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
      setFormValues((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          bannerImage: file,
        },
      }));
    }
  };

  // Clear banner image
  const clearFile = (section) => {
    setFormValues((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        bannerImage: null,
      },
    }));
  };

  // Handle drag-and-drop events
  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-yellow-400');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('border-yellow-400');
  };

  const handleDrop = (section, e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-yellow-400');
    handleFileChange(section, e);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const allEmpty =
      Object.values(formValues.formContent).every((value) => {
        if (typeof value === 'string') return value.trim() === '';
        if (value === formValues.formContent.cardHeadings) {
          return Object.values(formValues.formContent.cardHeadings).every((v) => v.trim() === '');
        }
        return true;
      }) &&
      Object.values(formValues.thankYouContent).every((value) => {
        if (typeof value === 'string') return value.trim() === '';
        if (value === formValues.thankYouContent.bannerImage) return value === null;
        return true;
      }) &&
      Object.values(formValues.buttonLabels).every((layout) =>
        Object.values(layout).every((v) => v.trim() === '')
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
      formContent: {
        tooltip: formValues.formContent.tooltip,
        heading: formValues.formContent.heading,
        description: formValues.formContent.description,
        cardHeadings: {
          personalInfo: formValues.formContent.cardHeadings.personalInfo,
          businessDetails: formValues.formContent.cardHeadings.businessDetails,
        },
      },
      thankYouContent: {
        tooltip: formValues.thankYouContent.tooltip,
        heading: formValues.thankYouContent.heading,
        description: formValues.thankYouContent.description,
        bannerImage: formValues.thankYouContent.bannerImage
          ? formValues.thankYouContent.bannerImage.name
          : null,
      },
      buttonLabels: {
        singleColumn: {
          next: formValues.buttonLabels.singleColumn.next,
          previous: formValues.buttonLabels.singleColumn.previous,
          submit: formValues.buttonLabels.singleColumn.submit,
        },
        twoColumn: {
          submit: formValues.buttonLabels.twoColumn.submit,
        },
        thankYou: {
          backToHome: formValues.buttonLabels.thankYou.backToHome,
        },
      },
    };
    console.log('Updated Questionnaire Form Content:', JSON.stringify(dataToSubmit, null, 2));
    toast.success('Questionnaire form content has been saved successfully!', {
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
          <h2 className="heading">Edit Questionnaire Form Content</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 text-white p-8 rounded-xl border border-yellow-400/20 shadow-lg shadow-black/50"
        >
          <div className="space-y-6">
            {/* Form Section Content */}
            <div>
              <h3 className="sub-heading">Form Section Content</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="label">Tooltip</label>
                  <input
                    type="text"
                    value={formValues.formContent.tooltip}
                    onChange={(e) => handleChange('formContent', 'tooltip', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter tooltip (e.g., Client Survey)"
                  />
                </div>
                <div>
                  <label className="label">Heading</label>
                  <input
                    type="text"
                    value={formValues.formContent.heading}
                    onChange={(e) => handleChange('formContent', 'heading', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter heading (e.g., Client Questionnaire)"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="label">Description</label>
                  <textarea
                    value={formValues.formContent.description}
                    onChange={(e) => handleChange('formContent', 'description', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    rows={4}
                    placeholder="Enter description for the questionnaire"
                  />
                </div>
              </div>
            </div>

            {/* Form Card Headings */}
            <div>
              <h3 className="sub-heading">Form Card Headings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="label">Personal Information (Page 1)</label>
                  <input
                    type="text"
                    value={formValues.formContent.cardHeadings.personalInfo}
                    onChange={(e) => handleCardHeadingChange('personalInfo', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter heading (e.g., Personal Information)"
                  />
                </div>
                <div>
                  <label className="label">Business Details (Page 2)</label>
                  <input
                    type="text"
                    value={formValues.formContent.cardHeadings.businessDetails}
                    onChange={(e) => handleCardHeadingChange('businessDetails', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter heading (e.g., Business Details)"
                  />
                </div>
              </div>
            </div>

            {/* Thank You Page Content */}
            <div>
              <h3 className="sub-heading">Thank You Page Content</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="label">Tooltip</label>
                  <input
                    type="text"
                    value={formValues.thankYouContent.tooltip}
                    onChange={(e) => handleChange('thankYouContent', 'tooltip', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter tooltip (e.g., Thank You!)"
                  />
                </div>
                <div>
                  <label className="label">Heading</label>
                  <input
                    type="text"
                    value={formValues.thankYouContent.heading}
                    onChange={(e) => handleChange('thankYouContent', 'heading', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter heading (e.g., Submission Successful)"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="label">Description</label>
                  <textarea
                    value={formValues.thankYouContent.description}
                    onChange={(e) => handleChange('thankYouContent', 'description', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    rows={4}
                    placeholder="Enter description for the thank you page"
                  />
                </div>
              </div>
            </div>

            {/* Thank You Page Banner Image */}
            <div>
              <h3 className="sub-heading">Thank You Page Banner Image</h3>
              <div className="p-3 bg-zinc-800 rounded-xl border border-gray-700/50 shadow-sm shadow-black/30">
                <div className="upload-box">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange('thankYouContent', e)}
                    className="hidden"
                    id="thankYouBannerImageUpload"
                  />
                  <label
                    htmlFor="thankYouBannerImageUpload"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop('thankYouContent', e)}
                    className="w-full h-40 bg-zinc-900 rounded-lg flex items-center justify-center flex-col cursor-pointer border-2 border-dashed border-gray-600 hover:border-yellow-400 transition-all duration-200"
                  >
                    {formValues.thankYouContent.bannerImage ? (
                      <img
                        src={URL.createObjectURL(formValues.thankYouContent.bannerImage)}
                        alt="Preview"
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    ) : (
                      <>
                        <span className="text-yellow-400 text-3xl">+</span>
                        <p className="text-gray-400 text-sm mt-2">Click or drag to upload an image</p>
                        <p className="text-gray-500 text-xs mt-1">Accepted: PNG, JPG, max 5MB</p>
                      </>
                    )}
                  </label>
                  {formValues.thankYouContent.bannerImage && (
                    <div className="flex items-center gap-2 mt-2">
                      <p className="text-gray-300 text-sm truncate">
                        Selected: {formValues.thankYouContent.bannerImage.name}
                      </p>
                      <button
                        type="button"
                        onClick={() => clearFile('thankYouContent')}
                        className="text-red-400 hover:text-red-300"
                      >
                        Clear
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Button Labels */}
            <div>
              <h3 className="sub-heading">Button Labels</h3>
              <div className="space-y-6">
                {/* Single Column Layout (<1024px) */}
                <div>
                  <h4 className="text-sm font-medium text-gray-200 mb-3">Single Column Layout (1024px) devices</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="label">Next Button (Page 1)</label>
                      <input
                        type="text"
                        value={formValues.buttonLabels.singleColumn.next}
                        onChange={(e) => handleButtonLabelChange('singleColumn', 'next', e.target.value)}
                        className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                        placeholder="Enter label (e.g., Next)"
                      />
                    </div>
                    <div>
                      <label className="label">Previous Button (Page 2)</label>
                      <input
                        type="text"
                        value={formValues.buttonLabels.singleColumn.previous}
                        onChange={(e) => handleButtonLabelChange('singleColumn', 'previous', e.target.value)}
                        className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                        placeholder="Enter label (e.g., Previous)"
                      />
                    </div>
                    <div>
                      <label className="label">Submit Button (Page 2)</label>
                      <input
                        type="text"
                        value={formValues.buttonLabels.singleColumn.submit}
                        onChange={(e) => handleButtonLabelChange('singleColumn', 'submit', e.target.value)}
                        className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                        placeholder="Enter label (e.g., Submit Form)"
                      />
                    </div>
                  </div>
                </div>
                {/* Two Column Layout (>=1024px) */}
                <div>
                  <h4 className="text-sm font-medium text-gray-200 mb-3">Two Column Layout (1024px) Devices</h4>
                  <div>
                    <label className="label">Submit Button</label>
                    <input
                      type="text"
                      value={formValues.buttonLabels.twoColumn.submit}
                      onChange={(e) => handleButtonLabelChange('twoColumn', 'submit', e.target.value)}
                      className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                      placeholder="Enter label (e.g., Submit Form)"
                    />
                  </div>
                </div>
                {/* Thank You Page */}
                <div>
                  <h4 className="text-sm font-medium text-gray-200 mb-3">Thank You Page</h4>
                  <div>
                    <label className="label">Back to Home Button</label>
                    <input
                      type="text"
                      value={formValues.buttonLabels.thankYou.backToHome}
                      onChange={(e) => handleButtonLabelChange('thankYou', 'backToHome', e.target.value)}
                      className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                      placeholder="Enter label (e.g., Back to Home)"
                    />
                  </div>
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
                Are you sure you want to submit this content? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="dialog-footer">
              <button className="dialog-button dialog-button-confirm" onClick={confirmSave}>
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
              <button className="dialog-button dialog-button-confirm" onClick={confirmReset}>
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

export default QuestionnaireFormEdit;