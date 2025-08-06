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

const TestimonialForm = () => {
  // Initial state based on Testimonial component
  const initialFormValues = {
    sectionTitle: 'What Our Guests Say',
    sectionDescription:
      'Discover the culinary experiences that have delighted our guests. From cooking classes to private events, hear firsthand how our passion for gastronomy has created unforgettable memories.',
    sectionTooltip: 'Testimonials',
    sliderSettings: {
      autoplaySpeed: 4000,
      speed: 1000,
      slidesToShowDesktop: 3,
      slidesToShowTablet: 2,
      slidesToShowMobile: 1,
    },
  };

  const initialTestimonials = [
    {
      name: 'Francisco',
      quote:
        'Highly recommended! Paella is not a trivial dish to prepare. Chef Gabriel and his associates made everyone feel welcome, encouraged everyone to actively participate in cooking, demonstrated the basics and nuances of preparing seafood and vegetarian versions of the dish, fed us delightfully, and sent us on our way with recipes and a fresh appreciation for the culinary arts. We would cheerfully take this class again.',
      imageFile: null,
      imageAlt: 'Francisco',
      imageUrl: 'https://pub-f2300dc39d77486db13ba83d33a85773.r2.dev/gab%20lab/Home%20page/What%20Our%20Guests%20Say/Francisco%20.avif',
      date: 'July 2024',
      rating: 5,
    },
    {
      name: 'Bruce Girton',
      quote:
        'Highly recommended! Paella is not a trivial dish to prepare. Chef Gabriel and his associates made everyone feel welcome, encouraged everyone to actively participate in cooking, demonstrated the basics and nuances of preparing seafood and vegetarian versions of the dish, fed us delightfully, and sent us on our way with recipes and a fresh appreciation for the culinary arts. We would cheerfully take this class again.',
      imageFile: null,
      imageAlt: 'Bruce Girton',
      imageUrl: 'https://pub-f2300dc39d77486db13ba83d33a85773.r2.dev/gab%20lab/Home%20page/What%20Our%20Guests%20Say/Bruce%20Girton.avif',
      date: 'June 2024',
      rating: 5,
    },
    {
      name: 'Robin',
      quote:
        'Superb masterclass! I’ve attended other cooking classes before, but this one exceeded all my expectations. A lovely and cozy setup, high-quality ingredients, and the best vibe from the host and his wife. 100% recommended!',
      imageFile: null,
      imageAlt: 'Robin',
      imageUrl: 'https://pub-f2300dc39d77486db13ba83d33a85773.r2.dev/gab%20lab/Home%20page/What%20Our%20Guests%20Say/Robin%20.avif',
      date: 'May 2024',
      rating: 5,
    },
    {
      name: 'Ximena',
      quote:
        'Highly recommended! Paella is not a trivial dish to prepare. Chef Gabriel and his associates made everyone feel welcome, encouraged everyone to actively participate in cooking, demonstrated the basics and nuances of preparing seafood and vegetarian versions of the dish, fed us delightfully, and sent us on our way with recipes and a fresh appreciation for the culinary arts. We would cheerfully take this class again.',
      imageFile: null,
      imageAlt: 'Ximena',
      imageUrl: 'https://pub-f2300dc39d77486db13ba83d33a85773.r2.dev/gab%20lab/Home%20page/What%20Our%20Guests%20Say/Ximena%20M.avif',
      date: 'April 2024',
      rating: 5,
    },
  ];

  const [formValues, setFormValues] = useState(initialFormValues);
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [isDragging, setIsDragging] = useState({}); // Track drag state for each testimonial
  const [submitConfirmation, setSubmitConfirmation] = useState(false);
  const [resetConfirmation, setResetConfirmation] = useState(false);

  // Handle text field changes
  const handleTextChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  // Handle slider settings changes
  const handleSliderSettingsChange = (field, value) => {
    const numericValue = Number(value);
    if (isNaN(numericValue) || numericValue < 0) {
      toast.error('Please enter a valid number.', {
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

  // Handle testimonial field changes
  const handleTestimonialChange = (index, field, value) => {
    setTestimonials((prev) => {
      const newTestimonials = [...prev];
      if (field === 'rating') {
        const rating = Number(value);
        if (isNaN(rating) || rating < 1 || rating > 5) {
          toast.error('Rating must be between 1 and 5.', {
            duration: 1000,
            className: 'toast-error',
          });
          return prev;
        }
      }
      newTestimonials[index] = { ...newTestimonials[index], [field]: value };
      return newTestimonials;
    });
  };

  // Handle image file selection
  const handleFileChange = (index, file) => {
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file.', {
          duration: 1000,
          className: 'toast-error',
        });
        return;
      }
      setTestimonials((prev) => {
        const newTestimonials = [...prev];
        newTestimonials[index] = {
          ...newTestimonials[index],
          imageFile: file,
          imageUrl: null, // Clear existing URL when new file is uploaded
        };
        return newTestimonials;
      });
    }
  };

  // Handle file input change
  const handleFileInputChange = (index) => (e) => {
    const file = e.target.files[0];
    handleFileChange(index, file);
  };

  // Handle drag over
  const handleDragOver = (index) => (e) => {
    e.preventDefault();
    setIsDragging((prev) => ({ ...prev, [index]: true }));
  };

  // Handle drag leave
  const handleDragLeave = (index) => (e) => {
    e.preventDefault();
    setIsDragging((prev) => ({ ...prev, [index]: false }));
  };

  // Handle drop
  const handleDrop = (index) => (e) => {
    e.preventDefault();
    setIsDragging((prev) => ({ ...prev, [index]: false }));
    const file = e.dataTransfer.files[0];
    handleFileChange(index, file);
  };

  // Remove image
  const removeImage = (index) => {
    setTestimonials((prev) => {
      const newTestimonials = [...prev];
      newTestimonials[index] = {
        ...newTestimonials[index],
        imageFile: null,
        imageUrl: null,
        imageAlt: '',
      };
      return newTestimonials;
    });
    toast.success('Image removed.', {
      duration: 1500,
      className: 'toast-success',
    });
  };

  // Add a testimonial
  const addTestimonial = () => {
    setTestimonials((prev) => [
      ...prev,
      {
        name: '',
        quote: '',
        imageFile: null,
        imageAlt: '',
        imageUrl: null,
        date: '',
        rating: 5,
      },
    ]);
  };

  // Remove a testimonial
  const removeTestimonial = (index) => {
    if (testimonials.length > 1) {
      setTestimonials((prev) => prev.filter((_, i) => i !== index));
    } else {
      toast.error('At least one testimonial is required.', {
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
      testimonials.every(
        (t) =>
          t.name.trim() === '' &&
          t.quote.trim() === '' &&
          !t.imageFile &&
          t.imageAlt.trim() === '' &&
          t.imageUrl?.trim() === '' &&
          t.date.trim() === '' &&
          t.rating === 0
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

  // Confirm form submission
  const confirmSave = async () => {
    setSubmitConfirmation(false);
    const dataToSubmit = {
      ...formValues,
      testimonials: testimonials.map((t) => ({
        name: t.name,
        quote: t.quote,
        image: t.imageFile ? t.imageFile.name : t.imageUrl,
        imageAlt: t.imageAlt,
        date: t.date,
        rating: t.rating,
      })),
    };
    console.log('Updated Testimonial Data:', dataToSubmit);
    toast.success('Testimonial content saved successfully!', {
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
    setTestimonials(initialTestimonials);
    setIsDragging({});
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
          <h2 className="heading">Edit Testimonial Content</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 text-white p-8 rounded-xl border border-yellow-400/20 shadow-lg shadow-black/50"
        >
          <div className="space-y-6">
            {/* Section Content */}
            <div>
              <h3 className="sub-heading">Section Content</h3>
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label className="label">Section Title</label>
                  <input
                    type="text"
                    value={formValues.sectionTitle}
                    onChange={(e) => handleTextChange('sectionTitle', e.target.value)}
                    className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter section title"
                  />
                </div>
                <div>
                  <label className="label">Section Description</label>
                  <textarea
                    value={formValues.sectionDescription}
                    onChange={(e) => handleTextChange('sectionDescription', e.target.value)}
                    className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                    rows={4}
                    placeholder="Enter section description"
                  />
                </div>
                <div>
                  <label className="label">Tooltip</label>
                  <input
                    type="text"
                    value={formValues.sectionTooltip}
                    onChange={(e) => handleTextChange('sectionTooltip', e.target.value)}
                    className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter tooltip text"
                  />
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div>
              <h3 className="sub-heading">Testimonials</h3>
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="label">Testimonials</label>
                    <button
                      type="button"
                      onClick={addTestimonial}
                      className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
                    >
                      <MdAddCircle className="w-5 h-5" />
                      <span>Add Testimonial</span>
                    </button>
                  </div>
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className="mb-4 p-4 bg-zinc-800 rounded-lg border border-gray-700"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="feature-title">Testimonial {index + 1}</h4>
                        {testimonials.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeTestimonial(index)}
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
                              value={testimonial.name}
                              onChange={(e) =>
                                handleTestimonialChange(index, 'name', e.target.value)
                              }
                              className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                              placeholder="Enter name"
                            />
                          </div>
                          <div>
                            <label className="label">Date</label>
                            <input
                              type="text"
                              value={testimonial.date}
                              onChange={(e) =>
                                handleTestimonialChange(index, 'date', e.target.value)
                              }
                              className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                              placeholder="e.g., July 2024"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="label">Quote</label>
                          <textarea
                            value={testimonial.quote}
                            onChange={(e) =>
                              handleTestimonialChange(index, 'quote', e.target.value)
                            }
                            className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                            rows={4}
                            placeholder="Enter testimonial quote"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="label">Image Alt Text</label>
                            <input
                              type="text"
                              value={testimonial.imageAlt}
                              onChange={(e) =>
                                handleTestimonialChange(index, 'imageAlt', e.target.value)
                              }
                              className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                              placeholder="Image alt text"
                            />
                          </div>
                          <div>
                            <label className="label">Rating (1-5)</label>
                            <input
                              type="number"
                              value={testimonial.rating}
                              onChange={(e) =>
                                handleTestimonialChange(index, 'rating', e.target.value)
                              }
                              min="1"
                              max="5"
                              className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                              placeholder="Enter rating (1-5)"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="label">Testimonial Image</label>
                          <div
                            className={`relative w-full h-40 bg-zinc-800 rounded-lg flex items-center justify-center flex-col cursor-pointer border-2 border-dashed transition-all duration-200 ${
                              isDragging[index]
                                ? 'border-yellow-400 bg-yellow-400/20'
                                : 'border-gray-600 hover:border-yellow-400'
                            }`}
                            onDragOver={handleDragOver(index)}
                            onDragLeave={handleDragLeave(index)}
                            onDrop={handleDrop(index)}
                          >
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileInputChange(index)}
                              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                              id={`imageUpload-${index}`}
                            />
                            <span className="text-yellow-400 text-3xl">+</span>
                            <p className="text-gray-400 text-sm mt-2 text-center">
                              {isDragging[index] ? 'Drop image here' : 'Click or drag to upload image'}
                            </p>
                          </div>
                          {(testimonial.imageFile || testimonial.imageUrl) && (
                            <div className="flex items-center justify-between mt-2">
                              <p className="text-gray-300 text-sm">
                                Selected: {testimonial.imageFile?.name || testimonial.imageUrl}
                              </p>
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="text-red-400 hover:text-red-300 text-sm transition-colors duration-200"
                              >
                                Remove
                              </button>
                            </div>
                          )}
                          <p className="text-gray-400 text-sm mt-2">
                            Select or drag one image file. Only image files are allowed.
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

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
                    placeholder="e.g., 3"
                  />
                </div>
                <div>
                  <label className="label">Slides to Show (Tablet)</label>
                  <input
                    type="number"
                    value={formValues.sliderSettings.slidesToShowTablet}
                    onChange={(e) => handleSliderSettingsChange('slidesToShowTablet', e.target.value)}
                    className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="e.g., 2"
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
                Are you sure you want to submit these testimonial changes? This action cannot be undone.
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

export default TestimonialForm;