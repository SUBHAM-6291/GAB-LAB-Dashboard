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

const LeaveUsReview = () => {
  // Initial state with no dummy data
  const initialFormValues = {
    sliderSettings: {
      autoplaySpeed: 4000,
      speed: 1000,
      slidesToShowDesktop: 2,
      slidesToShowTablet: 1,
      slidesToShowMobile: 1,
    },
    buttonLink: '',
    buttonText: '', // Added buttonText field
  };

  const initialReviews = [
    {
      name: '',
      quote: '',
      imageFile: null,
      date: '',
    },
  ];

  const [formValues, setFormValues] = useState(initialFormValues);
  const [reviews, setReviews] = useState(initialReviews);
  const [submitConfirmation, setSubmitConfirmation] = useState(false);
  const [resetConfirmation, setResetConfirmation] = useState(false);

  // Clean up image preview URLs
  useEffect(() => {
    return () => {
      reviews.forEach((review) => {
        if (review.imageFile) {
          URL.revokeObjectURL(URL.createObjectURL(review.imageFile));
        }
      });
    };
  }, [reviews]);

  // Handle text field changes
  const handleTextChange = (field, value) => {
    if (field === 'buttonLink' && value) {
      // Basic URL validation
      if (!/^https?:\/\//i.test(value)) {
        toast.error('Please enter a valid URL starting with http:// or https://', {
          duration: 1000,
          className: 'toast-error',
        });
        return;
      }
    }
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  // Handle slider settings changes
  const handleSliderSettingsChange = (field, value) => {
    const numericValue = Number(value);
    if (isNaN(numericValue) || numericValue < 0) {
      toast.error('Please enter a valid non-negative number.', {
        duration: 1000,
        className: 'toast-error',
      });
      return;
    }
    setFormValues((prev) => ({
      ...prev,
      sliderSettings: { ...prev.sliderSettings, [field]: numericValue },
    }));
  };

  // Handle review field changes
  const handleReviewChange = (index, field, value) => {
    setReviews((prev) => {
      const newReviews = [...prev];
      newReviews[index] = { ...newReviews[index], [field]: value };
      return newReviews;
    });
  };

  // Handle image file changes
  const handleFileChange = (index, e) => {
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
      setReviews((prev) => {
        const newReviews = [...prev];
        newReviews[index] = { ...newReviews[index], imageFile: file };
        return newReviews;
      });
    }
  };

  // Clear image file
  const clearFile = (index) => {
    setReviews((prev) => {
      const newReviews = [...prev];
      newReviews[index] = { ...newReviews[index], imageFile: null };
      return newReviews;
    });
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
  const handleDrop = (e, index) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-yellow-400');
    handleFileChange(index, e);
  };

  // Add a review
  const addReview = () => {
    setReviews((prev) => [
      ...prev,
      {
        name: '',
        quote: '',
        imageFile: null,
        date: '',
      },
    ]);
  };

  // Remove a review
  const removeReview = (index) => {
    if (reviews.length > 1) {
      setReviews((prev) => prev.filter((_, i) => i !== index));
    } else {
      toast.error('At least one review is required.', {
        duration: 1000,
        className: 'toast-error',
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const allEmpty =
      Object.values(formValues).every((value) => value.trim() === '') &&
      Object.values(formValues.sliderSettings).every((value) => value === 0) &&
      reviews.every(
        (review) =>
          review.name.trim() === '' &&
          review.quote.trim() === '' &&
          review.imageFile === null &&
          review.date.trim() === ''
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
      reviews: reviews.map((review) => ({
        name: review.name,
        quote: review.quote,
        image: review.imageFile ? review.imageFile.name : null,
        date: review.date,
      })),
    };
    console.log('Updated LeaveUsReview Data:', dataToSubmit);
    toast.success('Review content saved successfully!', {
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
    setReviews(initialReviews);
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
          <h2 className="heading">Edit Review Content</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 text-white p-8 rounded-xl border border-yellow-400/20 shadow-lg shadow-black/50"
        >
          <div className="space-y-6">
            {/* Slider Settings */}
            <div>
              <h3 className="sub-heading">Slider Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Autoplay Speed (ms)</label>
                  <input
                    type="number"
                    value={formValues.sliderSettings.autoplaySpeed}
                    onChange={(e) => handleSliderSettingsChange('autoplaySpeed', e.target.value)}
                    className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="e.g., 4000"
                  />
                </div>
                <div>
                  <label className="label">Transition Speed (ms)</label>
                  <input
                    type="number"
                    value={formValues.sliderSettings.speed}
                    onChange={(e) => handleSliderSettingsChange('speed', e.target.value)}
                    className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="e.g., 1000"
                  />
                </div>
                <div>
                  <label className="label">Slides to Show (Desktop)</label>
                  <input
                    type="number"
                    value={formValues.sliderSettings.slidesToShowDesktop}
                    onChange={(e) => handleSliderSettingsChange('slidesToShowDesktop', e.target.value)}
                    className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="e.g., 2"
                  />
                </div>
                <div>
                  <label className="label">Slides to Show (Tablet)</label>
                  <input
                    type="number"
                    value={formValues.sliderSettings.slidesToShowTablet}
                    onChange={(e) => handleSliderSettingsChange('slidesToShowTablet', e.target.value)}
                    className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="e.g., 1"
                  />
                </div>
                <div>
                  <label className="label">Slides to Show (Mobile)</label>
                  <input
                    type="number"
                    value={formValues.sliderSettings.slidesToShowMobile}
                    onChange={(e) => handleSliderSettingsChange('slidesToShowMobile', e.target.value)}
                    className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="e.g., 1"
                  />
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h3 className="sub-heading">Reviews</h3>
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="label">Reviews</label>
                    <button
                      type="button"
                      onClick={addReview}
                      className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
                    >
                      <MdAddCircle className="w-5 h-5" />
                      <span>Add Review</span>
                    </button>
                  </div>
                  {reviews.map((review, index) => (
                    <div
                      key={index}
                      className="mb-4 p-4 bg-zinc-800 rounded-lg border border-gray-700"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="feature-title">Review {index + 1}</h4>
                        {reviews.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeReview(index)}
                            className="text-red-400 hover:text-red-300 transition-colors duration-200"
                          >
                            <MdRemoveCircle className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="label">Name</label>
                            <input
                              type="text"
                              value={review.name}
                              onChange={(e) =>
                                handleReviewChange(index, 'name', e.target.value)
                              }
                              className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                              placeholder="Enter name"
                            />
                          </div>
                          <div>
                            <label className="label">Date</label>
                            <input
                              type="text"
                              value={review.date}
                              onChange={(e) =>
                                handleReviewChange(index, 'date', e.target.value)
                              }
                              className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                              placeholder="e.g., 2025-07-27"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="label">Quote</label>
                          <textarea
                            value={review.quote}
                            onChange={(e) =>
                              handleReviewChange(index, 'quote', e.target.value)
                            }
                            className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                            rows={4}
                            placeholder="Enter review quote"
                          />
                        </div>
                        <div>
                          <label className="label">Review Image</label>
                          <div
                            className="relative w-full h-40 bg-zinc-900 rounded-lg flex items-center justify-center flex-col cursor-pointer border-2 border-dashed border-gray-600 hover:border-yellow-400 transition-all duration-200"
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, index)}
                          >
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileChange(index, e)}
                              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                              id={`imageUpload-${index}`}
                            />
                            {review.imageFile ? (
                              <img
                                src={URL.createObjectURL(review.imageFile)}
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
                          {review.imageFile && (
                            <div className="flex items-center gap-2 mt-2">
                              <p className="text-gray-300 text-sm truncate">
                                Selected: {review.imageFile.name}
                              </p>
                              <button
                                type="button"
                                onClick={() => clearFile(index)}
                                className="text-red-400 hover:text-red-300 text-sm"
                              >
                                Clear
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Button Link */}
            <div>
              <h3 className="sub-heading">Button Link</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Button Text</label>
                  <input
                    type="text"
                    value={formValues.buttonText}
                    onChange={(e) => handleTextChange('buttonText', e.target.value)}
                    className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="e.g., Verified Reviews"
                  />
                </div>
                <div>
                  <label className="label">Verified Reviews Link</label>
                  <input
                    type="text"
                    value={formValues.buttonLink}
                    onChange={(e) => handleTextChange('buttonLink', e.target.value)}
                    className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter URL (e.g., https://example.com)"
                  />
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
                Are you sure you want to submit these review changes? This action cannot be undone.
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
                onClick={() => setSubmitConfirmation(false)}
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

export default LeaveUsReview;