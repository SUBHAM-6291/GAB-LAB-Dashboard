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

const ContactUsForm = () => {
  const initialFormValues = {
    sectionTooltip: '',
    sectionHeading: '',
    sectionDescription: '',
    nameLabel: '',
    emailLabel: '',
    phoneLabel: '',
    messageLabel: '',
    submitButtonLabel: '',
    contactInfoDescription: '',
    mapUrl: '',
  };

  const initialContactDetails = [{ title: '', value: '' }];

  const [formValues, setFormValues] = useState(initialFormValues);
  const [contactDetails, setContactDetails] = useState(initialContactDetails);
  const [submitConfirmation, setSubmitConfirmation] = useState(false);
  const [resetConfirmation, setResetConfirmation] = useState(false);

  const handleChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleContactDetailChange = (index, field, value) => {
    setContactDetails((prev) => {
      const newDetails = [...prev];
      newDetails[index] = { ...newDetails[index], [field]: value };
      return newDetails;
    });
  };

  const addContactDetail = () => {
    setContactDetails((prev) => [...prev, { title: '', value: '' }]);
  };

  const removeContactDetail = (index) => {
    if (contactDetails.length > 1) {
      setContactDetails((prev) => prev.filter((_, i) => i !== index));
    } else {
      toast.error('At least one contact detail is required.', {
        duration: 1000,
        className: 'toast-error',
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allEmpty =
      Object.values(formValues).every((value) => value.trim() === '') &&
      contactDetails.every((detail) =>
        Object.values(detail).every((value) => value.trim() === '')
      );

    if (allEmpty) {
      toast.error('Please fill at least one field before submitting.', {
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
      contactDetails,
    };
    console.log('Submitted Contact Us Data:', dataToSubmit);
    toast.success('Contact Us section content has been saved successfully!', {
      duration: 2000,
      className: 'toast-success',
    });
  };

  const handleReset = () => setResetConfirmation(true);

  const confirmReset = () => {
    setFormValues(initialFormValues);
    setContactDetails(initialContactDetails);
    setResetConfirmation(false);
    toast.success('Form has been reset.', {
      duration: 1500,
      className: 'toast-success',
    });
  };

  return (
    <div className="main-container">
      <div className="flex items-center gap-3 mb-8">
        <MdEdit className="text-yellow-400 w-6 h-6" />
        <h2 className="heading">Edit Contact Us Section</h2>
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
              {[
                ['sectionTooltip', 'Section Tooltip'],
                ['sectionHeading', 'Section Heading'],
              ].map(([field, label]) => (
                <div key={field}>
                  <label className="label">{label}</label>
                  <input
                    type="text"
                    value={formValues[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white"
                    placeholder={`Enter ${label.toLowerCase()}`}
                  />
                </div>
              ))}
              <div>
                <label className="label">Section Description</label>
                <textarea
                  value={formValues.sectionDescription}
                  onChange={(e) => handleChange('sectionDescription', e.target.value)}
                  className="w-full bg-zinc-800 rounded-lg p-3 text-white"
                  rows={4}
                  placeholder="Enter description"
                />
              </div>
            </div>
          </div>

          {/* Form Labels */}
          <div>
            <h3 className="feature-title mb-4">Form Field Labels</h3>
            <div className="space-y-4">
              {['nameLabel', 'emailLabel', 'phoneLabel', 'messageLabel'].map((field) => (
                <div key={field}>
                  <label className="label">{field.replace('Label', '')} Label</label>
                  <input
                    type="text"
                    value={formValues[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white"
                    placeholder={`Enter label for ${field.replace('Label', '').toLowerCase()} field`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button Label */}
          <div>
            <h3 className="feature-title mb-4">Button Label</h3>
            <div className="space-y-4">
              <div>
                <label className="label">Submit Button Label</label>
                <input
                  type="text"
                  value={formValues.submitButtonLabel}
                  onChange={(e) => handleChange('submitButtonLabel', e.target.value)}
                  className="w-full bg-zinc-800 rounded-lg p-3 text-white"
                  placeholder="Enter label for submit button"
                />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="feature-title mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div>
                <label className="label">Contact Info Description</label>
                <textarea
                  value={formValues.contactInfoDescription}
                  onChange={(e) => handleChange('contactInfoDescription', e.target.value)}
                  className="w-full bg-zinc-800 rounded-lg p-3 text-white"
                  rows={4}
                  placeholder="Enter description for contact info"
                />
              </div>
              <div>
                <h4 className="feature-title mb-2">Contact Details</h4>
                {contactDetails.map((detail, index) => (
                  <div key={index} className="p-4 bg-zinc-800 rounded-lg border border-gray-700 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="feature-title">Contact Detail {index + 1}</h5>
                      {contactDetails.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeContactDetail(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <MdRemoveCircle className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="label">Title</label>
                        <input
                          type="text"
                          value={detail.title}
                          onChange={(e) => handleContactDetailChange(index, 'title', e.target.value)}
                          className="w-full bg-zinc-900 rounded-lg p-3 text-white"
                          placeholder="Enter title (e.g. Phone)"
                        />
                      </div>
                      <div>
                        <label className="label">Value</label>
                        <input
                          type="text"
                          value={detail.value}
                          onChange={(e) => handleContactDetailChange(index, 'value', e.target.value)}
                          className="w-full bg-zinc-900 rounded-lg p-3 text-white"
                          placeholder="Enter value (e.g. +1 123 456 7890)"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addContactDetail}
                  className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300"
                >
                  <MdAddCircle className="w-5 h-5" />
                  <span>Add Contact Detail</span>
                </button>
              </div>
            </div>
          </div>

          {/* Map URL */}
          <div>
            <h3 className="feature-title mb-4">Google Map</h3>
            <div>
              <label className="label">Map URL</label>
              <input
                type="text"
                value={formValues.mapUrl}
                onChange={(e) => handleChange('mapUrl', e.target.value)}
                className="w-full bg-zinc-800 rounded-lg p-3 text-white"
                placeholder="Enter Google Maps iframe URL"
              />
            </div>
          </div>

          {/* Buttons */}
          <ButtonGroup onResetClick={handleReset} />
        </div>
      </form>

      {/* Submit Confirmation */}
      <AlertDialog open={submitConfirmation} onOpenChange={setSubmitConfirmation}>
        <AlertDialogContent className="dialog-content">
          <AlertDialogHeader>
            <AlertDialogTitle className="dialog-title">Confirm Submit</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to submit this content? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <button className="dialog-button dialog-button-confirm" onClick={confirmSave}>
              Yes, Submit
            </button>
            <button className="dialog-button dialog-button-cancel" onClick={() => setSubmitConfirmation(false)}>
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
            <AlertDialogDescription>
              Are you sure you want to reset the form? This will remove all unsaved changes.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <button className="dialog-button dialog-button-confirm" onClick={confirmReset}>
              Yes, Reset
            </button>
            <button className="dialog-button dialog-button-cancel" onClick={() => setResetConfirmation(false)}>
              Cancel
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ContactUsForm;
