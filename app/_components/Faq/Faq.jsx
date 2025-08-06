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
import ButtonGroup from '../Utilites/Btn';

const FaqForm = () => {
  const initialFormValues = {
    tooltip: '',
    heading: '',
    description: '',
  };

  const initialFaqs = [
    { title: '', content: '' },
    { title: '', content: '' },
    { title: '', content: '' },
  ];

  const [formValues, setFormValues] = useState(initialFormValues);
  const [faqs, setFaqs] = useState(initialFaqs);
  const [submitConfirmation, setSubmitConfirmation] = useState(false);
  const [resetConfirmation, setResetConfirmation] = useState(false);

  const handleChange = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFaqChange = (index, field, value) => {
    setFaqs((prev) => {
      const newFaqs = [...prev];
      newFaqs[index] = { ...newFaqs[index], [field]: value };
      return newFaqs;
    });
  };

  const addFaq = () => {
    setFaqs((prev) => [...prev, { title: '', content: '' }]);
  };

  const removeFaq = (index) => {
    if (faqs.length > 1) {
      setFaqs((prev) => prev.filter((_, i) => i !== index));
    } else {
      toast.error('At least one FAQ item is required.', {
        duration: 1000,
        className: 'toast-error',
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allEmpty =
      Object.values(formValues).every((value) => value.trim() === '') &&
      faqs.every((faq) => faq.title.trim() === '' && faq.content.trim() === '');
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
    const dataToSubmit = { ...formValues, faqs };
    console.log('Updated FAQ Section Data:', dataToSubmit);
    toast.success('FAQ content has been saved successfully!', {
      duration: 2000,
      className: 'toast-success',
    });
  };

  const handleReset = () => {
    setResetConfirmation(true);
  };

  const confirmReset = () => {
    setFormValues(initialFormValues);
    setFaqs(initialFaqs);
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
          <h2 className="heading">Edit FAQ Section</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 text-white p-8 rounded-xl border border-yellow-400/20 shadow-lg shadow-black/50"
        >
          <div className="space-y-6">
            {/* Tooltip */}
            <div>
              <label className="label">Tooltip</label>
              <input
                type="text"
                value={formValues.tooltip}
                onChange={(e) => handleChange('tooltip', e.target.value)}
                className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                placeholder="Enter tooltip for FAQ section"
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
                placeholder="Enter heading for FAQ section"
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
                placeholder="Enter description for FAQ section"
              />
            </div>
            {/* Dynamic FAQs */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="label">FAQ Items</label>
                <button
                  type="button"
                  onClick={addFaq}
                  className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
                >
                  <MdAddCircle className="w-5 h-5" />
                  <span>Add FAQ</span>
                </button>
              </div>
              {faqs.map((faq, index) => (
                <div key={index} className="mb-4 p-4 bg-zinc-800 rounded-lg border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="feature-title">FAQ Item {index + 1}</h4>
                    {faqs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFaq(index)}
                        className="text-red-400 hover:text-red-300 transition-colors duration-200"
                      >
                        <MdRemoveCircle className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="label">FAQ {index + 1} Title</label>
                      <input
                        type="text"
                        value={faq.title}
                        onChange={(e) => handleFaqChange(index, 'title', e.target.value)}
                        className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                        placeholder={`Enter title for FAQ ${index + 1}`}
                      />
                    </div>
                    <div>
                      <label className="label">FAQ {index + 1} Content</label>
                      <textarea
                        value={faq.content}
                        onChange={(e) => handleFaqChange(index, 'content', e.target.value)}
                        className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                        rows={3}
                        placeholder={`Enter content for FAQ ${index + 1}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
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

export default FaqForm;