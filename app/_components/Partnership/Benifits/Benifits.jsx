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
import ButtonGroup from '../../Utilites/Btn'; // Adjust the import path as needed

const BenifitsForm = () => {
  const initialFormValues = {
    tooltip: '',
    heading: '',
    description: '',
    buttonLabel: '',
  };

  const initialCards = [
    { title: '', description: '' },
    { title: '', description: '' },
    { title: '', description: '' },
    { title: '', description: '' },
    { title: '', description: '' },
  ];

  const [formValues, setFormValues] = useState(initialFormValues);
  const [cards, setCards] = useState(initialCards);
  const [submitConfirmation, setSubmitConfirmation] = useState(false);
  const [resetConfirmation, setResetConfirmation] = useState(false);

  const handleChange = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCardChange = (index, field, value) => {
    setCards((prev) => {
      const newCards = [...prev];
      newCards[index] = { ...newCards[index], [field]: value };
      return newCards;
    });
  };

  const addCard = () => {
    setCards((prev) => [...prev, { title: '', description: '' }]);
  };

  const removeCard = (index) => {
    if (cards.length > 1) {
      setCards((prev) => prev.filter((_, i) => i !== index));
    } else {
      toast.error('At least one card is required.', {
        duration: 1000,
        className: 'toast-error',
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allEmpty =
      Object.values(formValues).every((value) => value.trim() === '') &&
      cards.every((card) => card.title.trim() === '' && card.description.trim() === '');
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
    const dataToSubmit = { ...formValues, cards };
    console.log('Updated Benifits Section Data:', dataToSubmit);
    toast.success('Benefits content has been saved successfully!', {
      duration: 2000,
      className: 'toast-success',
    });
  };

  const handleReset = () => {
    setResetConfirmation(true);
  };

  const confirmReset = () => {
    setFormValues(initialFormValues);
    setCards(initialCards);
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
          <h2 className="heading">Edit Benefits Section</h2>
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
                placeholder="Enter tooltip for Benefits section"
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
                placeholder="Enter heading for Benefits section"
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
                placeholder="Enter description for Benefits section"
              />
            </div>
            {/* Button Label */}
            <div>
              <label className="label">Button Label</label>
              <input
                type="text"
                value={formValues.buttonLabel}
                onChange={(e) => handleChange('buttonLabel', e.target.value)}
                className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                placeholder="Enter label for Join Our Partnership Program button"
              />
            </div>
            {/* Dynamic Cards */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="label">Benefit Cards</label>
                <button
                  type="button"
                  onClick={addCard}
                  className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
                >
                  <MdAddCircle className="w-5 h-5" />
                  <span>Add Card</span>
                </button>
              </div>
              {cards.map((card, index) => (
                <div key={index} className="mb-4 p-4 bg-zinc-800 rounded-lg border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="feature-title">Card {index + 1}</h4>
                    {cards.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCard(index)}
                        className="text-red-400 hover:text-red-300 transition-colors duration-200"
                      >
                        <MdRemoveCircle className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="label">Card {index + 1} Title</label>
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) => handleCardChange(index, 'title', e.target.value)}
                        className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                        placeholder={`Enter title for Card ${index + 1}`}
                      />
                    </div>
                    <div>
                      <label className="label">Card {index + 1} Description</label>
                      <textarea
                        value={card.description}
                        onChange={(e) => handleCardChange(index, 'description', e.target.value)}
                        className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                        rows={3}
                        placeholder={`Enter description for Card ${index + 1}`}
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

export default BenifitsForm;