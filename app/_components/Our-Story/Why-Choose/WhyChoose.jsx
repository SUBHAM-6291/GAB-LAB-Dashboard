'use client';

import React, { useState } from 'react';
import { MdEdit, MdAddCircle, MdRemoveCircle } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';
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

const CardsForm = () => {
  const initialFormValues = {
    tooltip: '',
    heading: '',
    subheading: '',
    description: '',
    buttonText: '',
  };

  const initialCards = [
    { title: '', shortDescription: '', readMoreText: '' },
  ];

  const [formValues, setFormValues] = useState(initialFormValues);
  const [cards, setCards] = useState(initialCards);
  const [imageFile, setImageFile] = useState(null);
  const [submitConfirmation, setSubmitConfirmation] = useState(false);
  const [resetConfirmation, setResetConfirmation] = useState(false);

  const handleChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleCardChange = (index, field, value) => {
    setCards((prev) => {
      const newCards = [...prev];
      newCards[index] = { ...newCards[index], [field]: value };
      return newCards;
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error(`Please select a valid image file.`, {
          duration: 1000,
          className: 'toast-error',
        });
        return;
      }
      setImageFile(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    toast.success(`Image removed successfully`, {
      duration: 1000,
      className: 'toast-success',
    });
  };

  const addCard = () => {
    setCards((prev) => [
      ...prev,
      {
        title: '',
        shortDescription: '',
        readMoreText: '',
      },
    ]);
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
      cards.every((card) =>
        Object.values(card).every((value) => value === '' || value === null)
      ) &&
      !imageFile;

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
      image: imageFile ? imageFile.name : null,
      cards,
    };
    console.log('Submitted Data:', dataToSubmit);
    toast.success('Cards content has been saved successfully!', {
      duration: 2000,
      className: 'toast-success',
    });
  };

  const handleReset = () => setResetConfirmation(true);

  const confirmReset = () => {
    setFormValues(initialFormValues);
    setCards(initialCards);
    setImageFile(null);
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
        <h2 className="heading">Edit Why Choose Us Section</h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 text-white p-8 rounded-xl border border-yellow-400/20 shadow-lg shadow-black/50"
      >
        <div className="space-y-6">
          <div>
            <label className="label">Tooltip</label>
            <input
              type="text"
              value={formValues.tooltip}
              onChange={(e) => handleChange('tooltip', e.target.value)}
              className="w-full bg-zinc-800 rounded-lg p-3 text-white"
              placeholder="Enter tooltip"
            />
          </div>

          <div>
            <label className="label">Heading</label>
            <input
              type="text"
              value={formValues.heading}
              onChange={(e) => handleChange('heading', e.target.value)}
              className="w-full bg-zinc-800 rounded-lg p-3 text-white"
              placeholder="Enter heading"
            />
          </div>

          <div>
            <label className="label">Button Text</label>
            <input
              type="text"
              value={formValues.buttonText}
              onChange={(e) => handleChange('buttonText', e.target.value)}
              className="w-full bg-zinc-800 rounded-lg p-3 text-white"
              placeholder="Enter button text"
            />
          </div>

          {/* ✅ Global Image Upload Section with Preview */}
          <div>
            <label className="block text-sm font-medium text-yellow-400 mb-2">Section Image</label>
            <div className="relative group border-2 border-dashed border-zinc-700 rounded-lg p-6 bg-zinc-800 hover:border-yellow-500 transition-all duration-300">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center justify-center text-zinc-400 group-hover:text-yellow-400 transition duration-300">
                <FaPlus className="text-2xl mb-1" />
                <span className="text-sm">
                  {imageFile ? 'Change Image' : 'Upload Image'}
                </span>
              </div>
            </div>

            {/* ✅ Preview and Remove */}
            {imageFile && (
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4">
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-md border border-zinc-700"
                />
                <div className="flex flex-col">
                  <span className="text-sm text-green-400">{imageFile.name}</span>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="mt-2 w-fit text-sm px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition duration-300"
                  >
                    Remove Image
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Cards Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="label">Sub Heading</label>
              <button
                type="button"
                onClick={addCard}
                className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300"
              >
                <MdAddCircle className="w-5 h-5" />
                <span>Add Sub Heading</span>
              </button>
            </div>

            {cards.map((card, index) => (
              <div
                key={index}
                className="mb-6 p-4 bg-zinc-800 rounded-lg border border-gray-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="feature-title">Description {index + 1}</h4>
                  {cards.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCard(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <MdRemoveCircle className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="label">Title</label>
                    <input
                      type="text"
                      value={card.title}
                      onChange={(e) => handleCardChange(index, 'title', e.target.value)}
                      className="w-full bg-zinc-900 rounded-lg p-3 text-white"
                      placeholder={`Enter title for Card ${index + 1}`}
                    />
                  </div>

                  <div>
                    <label className="label">Short Description</label>
                    <textarea
                      value={card.shortDescription}
                      onChange={(e) => handleCardChange(index, 'shortDescription', e.target.value)}
                      className="w-full bg-zinc-900 rounded-lg p-3 text-white"
                      rows={3}
                      placeholder={`Enter short description for Card ${index + 1}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <ButtonGroup onSubmitClick={handleSubmit} onResetClick={handleReset} />
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
  );
};

export default CardsForm;
