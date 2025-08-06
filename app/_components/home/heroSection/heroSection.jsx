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

const HeroSectionForm = () => {
  const initialSlide = {
    title: '',
    sublineText: '',
    bookBtn: '',
    eventBtn: '',
    img: null,
  };

  const initialSlides = [
    { ...initialSlide },
    { ...initialSlide },
  ];

  const [slides, setSlides] = useState(initialSlides);
  const [submitConfirmation, setSubmitConfirmation] = useState(false);
  const [resetConfirmation, setResetConfirmation] = useState(false);

  const handleSlideChange = (index, field, value) => {
    setSlides((prev) => {
      const newSlides = [...prev];
      newSlides[index] = { ...newSlides[index], [field]: value };
      return newSlides;
    });
  };

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file for the banner.', {
          duration: 1000,
          className: 'toast-error',
        });
        return;
      }
      handleSlideChange(index, 'img', file);
      toast.success('Image uploaded successfully!', {
        duration: 1500,
        className: 'toast-success',
      });
    }
  };

  const addSlide = () => {
    setSlides((prev) => [...prev, { ...initialSlide }]);
  };

  const removeSlide = (index) => {
    if (slides.length > 1) {
      setSlides((prev) => prev.filter((_, i) => i !== index));
    } else {
      toast.error('At least one slide is required.', {
        duration: 1000,
        className: 'toast-error',
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allEmpty = slides.every((slide) =>
      Object.entries(slide).every(([key, value]) => {
        if (key === 'img') {
          return value === null;
        }
        return value.trim() === '';
      })
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

  const confirmSave = () => {
    setSubmitConfirmation(false);
    const dataToSubmit = slides.map((slide) => ({
      ...slide,
      img: slide.img ? slide.img.name : null,
    }));
    console.log('Updated Hero Section Data:', dataToSubmit);
    toast.success('Hero Section content has been saved successfully!', {
      duration: 2000,
      className: 'toast-success',
    });
  };

  const handleReset = () => {
    setResetConfirmation(true);
  };

  const confirmReset = () => {
    setSlides(initialSlides);
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
          <h2 className="heading">Edit Hero Section</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 text-white p-8 rounded-xl border border-yellow-400/20 shadow-lg shadow-black/50"
        >
          <div className="space-y-6">
            {slides.map((slide, index) => (
              <div key={index} className="p-4 bg-zinc-800 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="feature-title">Slide {index + 1}</h3>
                  {slides.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSlide(index)}
                      className="text-red-400 hover:text-red-300 transition-colors duration-200"
                    >
                      <MdRemoveCircle className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Title */}
                  <div>
                    <label className="label">Title</label>
                    <input
                      type="text"
                      value={slide.title}
                      onChange={(e) => handleSlideChange(index, 'title', e.target.value)}
                      className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                      placeholder="Enter slide title"
                    />
                  </div>
                  {/* Book Button Label */}
                  <div>
                    <label className="label">Book Button Label</label>
                    <input
                      type="text"
                      value={slide.bookBtn}
                      onChange={(e) => handleSlideChange(index, 'bookBtn', e.target.value)}
                      className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                      placeholder="Enter label for Book Now button"
                    />
                  </div>
                  {/* Event Button Label */}
                  <div>
                    <label className="label">Event Button Label</label>
                    <input
                      type="text"
                      value={slide.eventBtn}
                      onChange={(e) => handleSlideChange(index, 'eventBtn', e.target.value)}
                      className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                      placeholder="Enter label for Plan a Group Event button"
                    />
                  </div>
                  {/* Image Upload */}
                  <div>
                    <label className="label">Banner Image</label>
                    <div className="upload-box">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(index, e)}
                        className="hidden"
                        id={`file-input-${index}`}
                      />
                      <label
                        htmlFor={`file-input-${index}`}
                        className="w-full h-40 bg-zinc-900 rounded-lg flex items-center justify-center flex-col cursor-pointer border-2 border-dashed border-gray-600 hover:border-yellow-400 transition-all duration-200"
                      >
                        <span className="text-yellow-400 text-3xl">+</span>
                        <p className="text-gray-400 text-sm mt-2">
                          Click or drag to upload a banner image
                        </p>
                      </label>
                      {slide.img && (
                        <p className="text-gray-300 text-sm mt-2">
                          Selected: {slide.img.name}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* Subline Text */}
                  <div className="md:col-span-2">
                    <label className="label">Description</label>
                    <textarea
                      value={slide.sublineText}
                      onChange={(e) => handleSlideChange(index, 'sublineText', e.target.value)}
                      className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                      rows={4}
                      placeholder="Enter slide description"
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between mb-4">
              <label className="label">Slides</label>
              <button
                type="button"
                onClick={addSlide}
                className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
              >
                <MdAddCircle className="w-5 h-5" />
                <span>Add Slide</span>
              </button>
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

export default HeroSectionForm;