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
import "@/components/ui/professional-ui.css";
import ButtonGroup from '../../Utilites/Btn'; // Adjust the import path as needed

const QuestionnaireFormEditor = () => {
  const initialFormValues = {
    tooltip: '',
    heading: '',
    description: '',
    nextButtonLabel: '',
    previousButtonLabel: '',
    submitButtonLabel: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const allEmpty = Object.values(formValues).every((value) => value.trim() === '');
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
    console.log('Updated Questionnaire Form Content:', formValues);
    toast.success('Questionnaire form content has been saved successfully!', {
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
          <h2 className="heading">Edit Questionnaire Form Content</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 text-white p-8 rounded-xl border border-yellow-400/20 shadow-lg shadow-black/50"
        >
          <div className="space-y-6">
            {/* Tooltip */}
            <div>
              <label className="label">Tooltip Text</label>
              <input
                type="text"
                value={formValues.tooltip}
                onChange={(e) => handleChange('tooltip', e.target.value)}
                className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                placeholder="Enter tooltip text for Questionnaire section"
              />
            </div>
            {/* Heading */}
            <div>
              <label className="label">Heading</label>
              <input
                type="text"
                value={formValues.heading}
                onChange={(e) => handleChange('heading', e.target.value)}
                className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                placeholder="Enter heading for Questionnaire section"
              />
            </div>
            {/* Description */}
            <div>
              <label className="label">Description</label>
              <textarea
                value={formValues.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                rows={4}
                placeholder="Enter description for Questionnaire section"
              />
            </div>
            {/* Next Button Label */}
            <div>
              <label className="label">Next Button Label</label>
              <input
                type="text"
                value={formValues.nextButtonLabel}
                onChange={(e) => handleChange('nextButtonLabel', e.target.value)}
                className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                placeholder="Enter label for Next button"
              />
            </div>
            {/* Previous Button Label */}
            <div>
              <label className="label">Previous Button Label</label>
              <input
                type="text"
                value={formValues.previousButtonLabel}
                onChange={(e) => handleChange('previousButtonLabel', e.target.value)}
                className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                placeholder="Enter label for Previous button"
              />
            </div>
            {/* Submit Button Label */}
            <div>
              <label className="label">Submit Button Label</label>
              <input
                type="text"
                value={formValues.submitButtonLabel}
                onChange={(e) => handleChange('submitButtonLabel', e.target.value)}
                className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                placeholder="Enter label for Submit Form button"
              />
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

export default QuestionnaireFormEditor;