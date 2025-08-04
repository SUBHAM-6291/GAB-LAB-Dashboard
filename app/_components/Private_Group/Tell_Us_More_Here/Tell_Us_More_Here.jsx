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
import ButtonGroup from '@/app/_components/Utilites/Btn'; // Adjust the import path as needed

const TellUsMoreHereForm = () => {
  const initialFormValues = {
    sectionTooltip: '',
    sectionHeading: '',
    sectionDescription: '',
    firstNameLabel: '',
    lastNameLabel: '',
    emailLabel: '',
    phoneLabel: '',
    guestsLabel: '',
    dobLabel: '',
    dateLabel: '',
    timeSlots: [], // Stored as array
    descriptionLabel: '',
    nextButtonLabel: '',
    backButtonLabel: '',
    submitButtonLabel: '',
    thankYouTooltip: '',
    thankYouHeading: '',
    thankYouDescription: '',
    thankYouBackToHomeLabel: '',
    readMoreText: '',
    page1VideoFile: null,
    page1PosterFile: null,
    page2VideoFile: null,
    page2PosterFile: null,
    thankYouBackgroundImageFile: null,
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  const [submitConfirmation, setSubmitConfirmation] = useState(false);
  const [resetConfirmation, setResetConfirmation] = useState(false);

  const handleChange = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (field, e) => {
    const file = e.target.files[0]; // Only allow one file
    if (file) {
      const isVideo = field.includes('VideoFile') && !file.type.startsWith('video/');
      const isImage = field.includes('PosterFile') || field.includes('BackgroundImageFile') && !file.type.startsWith('image/');
      if (isVideo || isImage) {
        toast.error(`Please select a ${isVideo ? 'video' : 'image'} file for ${field.replace(/([A-Z])/g, ' $1').trim()}.`, {
          duration: 1000,
          className: 'toast-error',
        });
        return;
      }
      setFormValues((prev) => ({
        ...prev,
        [field]: file,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allEmpty = Object.entries(formValues).every(([key, value]) => {
      if (key === 'timeSlots') {
        return value.length === 0 || value.every((slot) => slot === '');
      }
      return value === '' || value === null;
    });
    if (allEmpty) {
      toast.error('Please fill at least one field or select a file before submitting.', {
        duration: 1000,
        className: 'toast-error',
      });
    } else {
      setSubmitConfirmation(true);
    }
  };

  const confirmSave = async () => {
    setSubmitConfirmation(false);
    const dataToSubmit = {
      ...formValues,
      timeSlots: formValues.timeSlots.filter((slot) => slot !== ''), // Filter out empty slots
      page1VideoFile: formValues.page1VideoFile ? formValues.page1VideoFile.name : null,
      page1PosterFile: formValues.page1PosterFile ? formValues.page1PosterFile.name : null,
      page2VideoFile: formValues.page2VideoFile ? formValues.page2VideoFile.name : null,
      page2PosterFile: formValues.page2PosterFile ? formValues.page2PosterFile.name : null,
      thankYouBackgroundImageFile: formValues.thankYouBackgroundImageFile ? formValues.thankYouBackgroundImageFile.name : null,
    };
    console.log('Updated Event Planning Form Data:', dataToSubmit);
    toast.success('Event planning form content has been saved successfully!', {
      duration: 2000,
      className: 'toast-success',
    });
  };

  const handleReset = () => {
    setResetConfirmation(true);
  };

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
          <h2 className="heading">Customize Event Planning Form</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 text-white p-8 rounded-xl border border-yellow-400/20 shadow-lg shadow-black/50"
        >
          <div className="space-y-6">
            {/* Section Content */}
            <div>
              <h3 className="feature-title mb-4">Form Section Content</h3>
              <div className="space-y-4">
                <div>
                  <label className="label">Section Tooltip</label>
                  <input
                    type="text"
                    value={formValues.sectionTooltip}
                    onChange={(e) => handleChange('sectionTooltip', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter tooltip for the form section (e.g., Plan Your Event)"
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    A short phrase displayed as a tooltip for the form section.
                  </p>
                </div>
                <div>
                  <label className="label">Section Heading</label>
                  <input
                    type="text"
                    value={formValues.sectionHeading}
                    onChange={(e) => handleChange('sectionHeading', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter heading for the form section (e.g., Tell Us More)"
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    The main title for the event planning form.
                  </p>
                </div>
                <div>
                  <label className="label">Section Description</label>
                  <textarea
                    value={formValues.sectionDescription}
                    onChange={(e) => handleChange('sectionDescription', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    rows={4}
                    placeholder="Enter description for the form section (e.g., Let’s start planning your private culinary experience.)"
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    A brief description of the form’s purpose.
                  </p>
                </div>
              </div>
            </div>
            {/* Form Labels */}
            <div>
              <h3 className="feature-title mb-4">Form Field Labels</h3>
              <div className="space-y-4">
                {[
                  { field: 'firstNameLabel', label: 'First Name Label', placeholder: 'Enter label for first name (e.g., First Name)' },
                  { field: 'lastNameLabel', label: 'Last Name Label', placeholder: 'Enter label for last name (e.g., Last Name)' },
                  { field: 'emailLabel', label: 'Email Address Label', placeholder: 'Enter label for email address (e.g., Email Address)' },
                  { field: 'phoneLabel', label: 'Phone Number Label', placeholder: 'Enter label for phone number (e.g., Phone Number)' },
                  { field: 'guestsLabel', label: 'Number of Guests Label', placeholder: 'Enter label for number of guests (e.g., Number of Guests)' },
                  { field: 'dobLabel', label: 'Date of Birth Label', placeholder: 'Enter label for date of birth (e.g., Date of Birth)' },
                  { field: 'dateLabel', label: 'Event Date Label', placeholder: 'Enter label for event date (e.g., Event Date)' },
                  { field: 'descriptionLabel', label: 'Event Description Label', placeholder: 'Enter label for event description (e.g., Tell Us About Your Event)' },
                ].map(({ field, label, placeholder }) => (
                  <div key={field}>
                    <label className="label">{label}</label>
                    <input
                      type="text"
                      value={formValues[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
                      className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                      placeholder={placeholder}
                    />
                    <p className="text-gray-400 text-sm mt-2">
                      The label displayed for the {label.toLowerCase()} field in the form.
                    </p>
                  </div>
                ))}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="label">Preferred Time Slots</label>
                    <button
                      type="button"
                      onClick={() => handleChange('timeSlots', [...formValues.timeSlots, ''])}
                      className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
                    >
                      <MdAddCircle className="w-5 h-5" />
                      <span>Add Time Slot</span>
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formValues.timeSlots.map((slot, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={slot}
                          onChange={(e) => {
                            const newSlots = [...formValues.timeSlots];
                            newSlots[index] = e.target.value;
                            handleChange('timeSlots', newSlots);
                          }}
                          className="w-full bg-zinc-800 rounded-lg p-2 text-white transition-all duration-200"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newSlots = formValues.timeSlots.filter((_, i) => i !== index);
                            handleChange('timeSlots', newSlots);
                          }}
                          className="text-red-400 hover:text-red-300 transition-colors duration-200"
                        >
                          <MdRemoveCircle className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="label">Read More Text</label>
                  <input
                    type="text"
                    value={formValues.readMoreText}
                    onChange={(e) => handleChange('readMoreText', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter read more text (e.g., Read More)"
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    The text for the 'Read More' link in the form (if applicable).
                  </p>
                </div>
              </div>
            </div>
            {/* Button Labels */}
            <div>
              <h3 className="feature-title mb-4">Button Labels</h3>
              <div className="space-y-4">
                {[
                  { field: 'nextButtonLabel', label: 'Next Button Label', placeholder: 'Enter label for Next button (e.g., Next)' },
                  { field: 'backButtonLabel', label: 'Back Button Label', placeholder: 'Enter label for Back button (e.g., Back)' },
                  { field: 'submitButtonLabel', label: 'Submit Button Label', placeholder: 'Enter label for Submit button (e.g., Submit)' },
                ].map(({ field, label, placeholder }) => (
                  <div key={field}>
                    <label className="label">{label}</label>
                    <input
                      type="text"
                      value={formValues[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
                      className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                      placeholder={placeholder}
                    />
                    <p className="text-gray-400 text-sm mt-2">
                      The label for the {label.toLowerCase()} in the form.
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {/* Thank You Section */}
            <div>
              <h3 className="feature-title mb-4">Thank You Page Content</h3>
              <div className="space-y-4">
                <div>
                  <label className="label">Thank You Tooltip</label>
                  <input
                    type="text"
                    value={formValues.thankYouTooltip}
                    onChange={(e) => handleChange('thankYouTooltip', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter tooltip for the thank you page (e.g., Thank You!)"
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    A short phrase displayed as a tooltip for the thank you page.
                  </p>
                </div>
                <div>
                  <label className="label">Thank You Heading</label>
                  <input
                    type="text"
                    value={formValues.thankYouHeading}
                    onChange={(e) => handleChange('thankYouHeading', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter heading for the thank you page (e.g., Submission Successful)"
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    The main title for the thank you page.
                  </p>
                </div>
                <div>
                  <label className="label">Thank You Description</label>
                  <textarea
                    value={formValues.thankYouDescription}
                    onChange={(e) => handleChange('thankYouDescription', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    rows={4}
                    placeholder="Enter description for the thank you page (e.g., We’ll contact you soon to craft your culinary journey.)"
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    A brief message displayed on the thank you page.
                  </p>
                </div>
                <div>
                  <label className="label">Thank You Back to Home Button Label</label>
                  <input
                    type="text"
                    value={formValues.thankYouBackToHomeLabel}
                    onChange={(e) => handleChange('thankYouBackToHomeLabel', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter label for Back to Home button (e.g., Back to Home)"
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    The label for the Back to Home button on the thank you page.
                  </p>
                </div>
              </div>
            </div>
            {/* Media Uploads */}
            <div>
              <h3 className="feature-title mb-4">Media Uploads</h3>
              <div className="space-y-4">
                {[
                  { field: 'page1VideoFile', label: 'Page 1 Video', type: 'video/*', placeholder: 'Click or drag to upload a video for page 1' },
                  { field: 'page1PosterFile', label: 'Page 1 Poster Image', type: 'image/*', placeholder: 'Click or drag to upload a poster image for page 1' },
                  { field: 'page2VideoFile', label: 'Page 2 Video', type: 'video/*', placeholder: 'Click or drag to upload a video for page 2' },
                  { field: 'page2PosterFile', label: 'Page 2 Poster Image', type: 'image/*', placeholder: 'Click or drag to upload a poster image for page 2' },
                  { field: 'thankYouBackgroundImageFile', label: 'Thank You Background Image', type: 'image/*', placeholder: 'Click or drag to upload a background image for the thank you page' },
                ].map(({ field, label, type, placeholder }) => (
                  <div key={field}>
                    <label className="label">{label}</label>
                    <div className="upload-box">
                      <input
                        type="file"
                        accept={type}
                        onChange={(e) => handleFileChange(field, e)}
                        className="hidden"
                        id={field}
                      />
                      <label
                        htmlFor={field}
                        className="w-full h-40 bg-zinc-900 rounded-lg flex items-center justify-center flex-col cursor-pointer border-2 border-dashed border-gray-600 hover:border-yellow-400 transition-all duration-200"
                      >
                        <span className="text-yellow-400 text-3xl">+</span>
                        <p className="text-gray-400 text-sm mt-2">{placeholder}</p>
                      </label>
                      {formValues[field] && (
                        <p className="text-gray-300 text-sm mt-2">
                          Selected: {formValues[field].name}
                        </p>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mt-2">
                      Select one {type.startsWith('video') ? 'video' : 'image'} file for {label.toLowerCase()}. Only {type.startsWith('video') ? 'video' : 'image'} files are allowed.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <ButtonGroup onResetClick={handleReset} />
        </form>
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

export default TellUsMoreHereForm;