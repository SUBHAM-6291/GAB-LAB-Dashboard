'use client';

import React, { useState, useEffect } from 'react';
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

const CardsForm = () => {
  const initialFormValues = {
    tooltip: '',
    heading: '',
    description: '',
  };

  const initialCards = [
    { category: '', title: '', shortDescription: '', imageFile: null, readMoreText: '', imagePreview: null },
    { category: '', title: '', shortDescription: '', imageFile: null, readMoreText: '', imagePreview: null },
    { category: '', title: '', shortDescription: '', imageFile: null, readMoreText: '', imagePreview: null },
  ];

  const [formValues, setFormValues] = useState(initialFormValues);
  const [cards, setCards] = useState(initialCards);
  const [submitConfirmation, setSubmitConfirmation] = useState(false);
  const [resetConfirmation, setResetConfirmation] = useState(false);
  const [dragStates, setDragStates] = useState(initialCards.map(() => false)); // Track drag state for each card

  // Clean up image preview URLs on component unmount or when cards change
  useEffect(() => {
    return () => {
      cards.forEach((card) => {
        if (card.imagePreview) {
          URL.revokeObjectURL(card.imagePreview);
        }
      });
    };
  }, [cards]);

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

  const handleImageChange = (index, file) => {
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error(`Please select an image file for Card ${index + 1}.`, {
          duration: 1000,
          className: 'toast-error',
        });
        return;
      }
      setCards((prev) => {
        const newCards = [...prev];
        if (newCards[index].imagePreview) {
          URL.revokeObjectURL(newCards[index].imagePreview);
        }
        newCards[index] = {
          ...newCards[index],
          imageFile: file,
          imagePreview: URL.createObjectURL(file),
        };
        return newCards;
      });
    }
  };

  const handleFileInputChange = (index, e) => {
    const file = e.target.files[0];
    handleImageChange(index, file);
  };

  const handleDragOver = (index, e) => {
    e.preventDefault();
    setDragStates((prev) => {
      const newDragStates = [...prev];
      newDragStates[index] = true;
      return newDragStates;
    });
  };

  const handleDragLeave = (index, e) => {
    e.preventDefault();
    setDragStates((prev) => {
      const newDragStates = [...prev];
      newDragStates[index] = false;
      return newDragStates;
    });
  };

  const handleDrop = (index, e) => {
    e.preventDefault();
    setDragStates((prev) => {
      const newDragStates = [...prev];
      newDragStates[index] = false;
      return newDragStates;
    });
    const file = e.dataTransfer.files[0];
    handleImageChange(index, file);
  };

  const removeImage = (index) => {
    setCards((prev) => {
      const newCards = [...prev];
      if (newCards[index].imagePreview) {
        URL.revokeObjectURL(newCards[index].imagePreview);
      }
      newCards[index] = {
        ...newCards[index],
        imageFile: null,
        imagePreview: null,
      };
      return newCards;
    });
    toast.success(`Image for Card ${index + 1} removed.`, {
      duration: 1500,
      className: 'toast-success',
    });
  };

  const addCard = () => {
    setCards((prev) => [
      ...prev,
      { category: '', title: '', shortDescription: '', imageFile: null, readMoreText: '', imagePreview: null },
    ]);
    setDragStates((prev) => [...prev, false]);
  };

  const removeCard = (index) => {
    if (cards.length > 1) {
      setCards((prev) => {
        const newCards = prev.filter((_, i) => i !== index);
        if (prev[index].imagePreview) {
          URL.revokeObjectURL(prev[index].imagePreview);
        }
        return newCards;
      });
      setDragStates((prev) => prev.filter((_, i) => i !== index));
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

  const confirmSave = async () => {
    setSubmitConfirmation(false);
    const dataToSubmit = {
      ...formValues,
      cards: cards.map((card) => ({
        ...card,
        imageFile: card.imageFile ? card.imageFile.name : null,
        imagePreview: null,
      })),
    };
    console.log('Updated Cards Section Data:', dataToSubmit);
    toast.success('Cards content has been saved successfully!', {
      duration: 2000,
      className: 'toast-success',
    });
  };

  const handleReset = () => {
    setResetConfirmation(true);
  };

  const confirmReset = () => {
    setFormValues(initialFormValues);
    setCards(
      initialCards.map((card) => {
        if (card.imagePreview) {
          URL.revokeObjectURL(card.imagePreview);
        }
        return { ...card, imageFile: null, imagePreview: null };
      })
    );
    setDragStates(initialCards.map(() => false));
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
          <h2 className="heading">Edit Cards Section</h2>
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
                placeholder="Enter tooltip for Cards section"
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
                placeholder="Enter heading for Cards section"
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
                placeholder="Enter description for Cards section"
              />
            </div>
            {/* Dynamic Cards */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="label">Cards</label>
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
                      <label className="label">Card {index + 1} Category</label>
                      <input
                        type="text"
                        value={card.category}
                        onChange={(e) => handleCardChange(index, 'category', e.target.value)}
                        className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                        placeholder={`Enter category for Card ${index + 1}`}
                      />
                    </div>
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
                      <label className="label">Card {index + 1} Short Description</label>
                      <textarea
                        value={card.shortDescription}
                        onChange={(e) => handleCardChange(index, 'shortDescription', e.target.value)}
                        className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                        rows={3}
                        placeholder={`Enter short description for Card ${index + 1}`}
                      />
                    </div>
                    {/* Image Upload Section (Matched with BannerForm) */}
                    <div>
                      <label className="label">Card {index + 1} Image</label>
                      <div
                        className={`relative w-full h-40 bg-zinc-800 rounded-lg flex items-center justify-center flex-col cursor-pointer border-2 border-dashed transition-all duration-200 ${
                          dragStates[index] ? 'border-yellow-400 bg-yellow-400/20' : 'border-gray-600 hover:border-yellow-400'
                        }`}
                        onDragOver={(e) => handleDragOver(index, e)}
                        onDragLeave={(e) => handleDragLeave(index, e)}
                        onDrop={(e) => handleDrop(index, e)}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileInputChange(index, e)}
                          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                          id={`imageUpload-${index}`}
                        />
                        <span className="text-yellow-400 text-3xl">+</span>
                        <p className="text-gray-400 text-sm mt-2 text-center">
                          {dragStates[index]
                            ? 'Drop image here'
                            : 'Click or drag to upload an image'}
                        </p>
                      </div>
                      {card.imageFile && (
                        <p className="text-gray-300 text-sm mt-2">
                          Selected: {card.imageFile.name}
                        </p>
                      )}
                      <p className="text-gray-400 text-sm mt-2">
                        Select or drag one image file. Only image files are allowed.
                      </p>
                    </div>
                    {/* Image Preview */}
                    {card.imagePreview && (
                      <div className="grid grid-cols-1 gap-4 mt-4">
                        <div className="relative rounded-xl overflow-hidden border border-yellow-400/30 group">
                          <img
                            src={card.imagePreview}
                            alt={`Card ${index + 1}`}
                            className="w-full object-cover h-48 transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm text-center py-2">
                            Card {index + 1} Image
                          </div>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg"
                            title="Remove image"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    )}
                    <div>
                      <label className="label">Card {index + 1} Read More Text</label>
                      <input
                        type="text"
                        value={card.readMoreText}
                        onChange={(e) => handleCardChange(index, 'readMoreText', e.target.value)}
                        className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                        placeholder={`Enter read more text for Card ${index + 1}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
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

export default CardsForm;