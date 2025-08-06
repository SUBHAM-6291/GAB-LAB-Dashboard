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

const LiveFlamencoShowsForm = () => {
  const initialFormValues = {
    sectionTooltip: '',
    sectionHeading: '',
    sectionDescription: '',
    mainImageSrc: null,
    mainImageAlt: '',
    description: '',
    checkAvailabilityLabel: '',
    playVideoLabel: '',
  };

  const initialSideImages = [
    { src: null, alt: '' },
    { src: null, alt: '' },
  ];

  const initialStats = [
    { number: '', label: '' },
    { number: '', label: '' },
    { number: '', label: '' },
  ];

  const [formValues, setFormValues] = useState(initialFormValues);
  const [sideImages, setSideImages] = useState(initialSideImages);
  const [stats, setStats] = useState(initialStats);
  const [submitConfirmation, setSubmitConfirmation] = useState(false);
  const [resetConfirmation, setResetConfirmation] = useState(false);

  const handleChange = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSideImageChange = (index, field, value) => {
    setSideImages((prev) => {
      const newImages = [...prev];
      newImages[index] = { ...newImages[index], [field]: value };
      return newImages;
    });
  };

  const handleStatChange = (index, field, value) => {
    setStats((prev) => {
      const newStats = [...prev];
      newStats[index] = { ...newStats[index], [field]: value };
      return newStats;
    });
  };

  const handleFileChange = (type, index, e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file.', {
          duration: 1000,
          className: 'toast-error',
        });
        return;
      }
      if (type === 'mainImage') {
        handleChange('mainImageSrc', file);
      } else if (type === 'sideImage') {
        handleSideImageChange(index, 'src', file);
      }
      toast.success('Image uploaded successfully!', {
        duration: 1500,
        className: 'toast-success',
      });
    }
  };

  const addSideImage = () => {
    setSideImages((prev) => [...prev, { src: null, alt: '' }]);
  };

  const removeSideImage = (index) => {
    if (sideImages.length > 2) {
      setSideImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      toast.error('At least two side images are required.', {
        duration: 1000,
        className: 'toast-error',
      });
    }
  };

  const addStat = () => {
    setStats((prev) => [...prev, { number: '', label: '' }]);
  };

  const removeStat = (index) => {
    if (stats.length > 1) {
      setStats((prev) => prev.filter((_, i) => i !== index));
    } else {
      toast.error('At least one stat is required.', {
        duration: 1000,
        className: 'toast-error',
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allEmpty =
      Object.entries(formValues).every(([key, value]) =>
        key === 'mainImageSrc' ? value === null : value.trim() === ''
      ) &&
      sideImages.every((image) =>
        Object.values(image).every((value) => value === null || value.trim() === '')
      ) &&
      stats.every((stat) =>
        Object.values(stat).every((value) => value.trim() === '')
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
    const dataToSubmit = {
      ...formValues,
      mainImageSrc: formValues.mainImageSrc ? formValues.mainImageSrc.name : null,
      sideImages: sideImages.map((image) => ({
        ...image,
        src: image.src ? image.src.name : null,
      })),
      stats,
    };
    console.log('Updated Live Flamenco Shows Section Data:', dataToSubmit);
    toast.success('Live Flamenco Shows section content has been saved successfully!', {
      duration: 2000,
      className: 'toast-success',
    });
  };

  const handleReset = () => {
    setResetConfirmation(true);
  };

  const confirmReset = () => {
    setFormValues(initialFormValues);
    setSideImages(initialSideImages);
    setStats(initialStats);
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
          <h2 className="heading">Edit Live Flamenco Shows Section</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 text-white p-8 rounded-xl border border-yellow-400/20 shadow-lg shadow-black/50"
        >
          <div className="space-y-6">
            {/* Section Content */}
            <div>
              <h3 className="feature-title mb-4">Section Content</h3>
              <div className="space-y-4">
                <div>
                  <label className="label">Section Tooltip</label>
                  <input
                    type="text"
                    value={formValues.sectionTooltip}
                    onChange={(e) => handleChange('sectionTooltip', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter tooltip for the section"
                  />
                </div>
                <div>
                  <label className="label">Section Heading</label>
                  <input
                    type="text"
                    value={formValues.sectionHeading}
                    onChange={(e) => handleChange('sectionHeading', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter heading for the section"
                  />
                </div>
                <div>
                  <label className="label">Section Description</label>
                  <textarea
                    value={formValues.sectionDescription}
                    onChange={(e) => handleChange('sectionDescription', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    rows={4}
                    placeholder="Enter description for the section"
                  />
                </div>
              </div>
            </div>
            {/* Main Image */}
            <div>
              <h3 className="feature-title mb-4">Main Image</h3>
              <div className="space-y-4">
                <div>
                  <label className="label">Main Image</label>
                  <div className="upload-box">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange('mainImage', null, e)}
                      className="hidden"
                      id="main-image-file"
                    />
                    <label
                      htmlFor="main-image-file"
                      className="w-full h-40 bg-zinc-900 rounded-lg flex items-center justify-center flex-col cursor-pointer border-2 border-dashed border-gray-600 hover:border-yellow-400 transition-all duration-200"
                    >
                      <span className="text-yellow-400 text-3xl">+</span>
                      <p className="text-gray-400 text-sm mt-2">
                        Click or drag to upload the main image
                      </p>
                    </label>
                    {formValues.mainImageSrc && (
                      <p className="text-gray-300 text-sm mt-2">
                        Selected: {formValues.mainImageSrc.name}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="label">Main Image Alt Text</label>
                  <input
                    type="text"
                    value={formValues.mainImageAlt}
                    onChange={(e) => handleChange('mainImageAlt', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter alt text for the main image"
                  />
                </div>
              </div>
            </div>
            {/* Side Images */}
            <div>
              <h3 className="feature-title mb-4">Side Images</h3>
              <div className="space-y-4">
                {sideImages.map((image, index) => (
                  <div key={index} className="p-4 bg-zinc-800 rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="feature-title">Side Image {index + 1}</h4>
                      {sideImages.length > 2 && (
                        <button
                          type="button"
                          onClick={() => removeSideImage(index)}
                          className="text-red-400 hover:text-red-300 transition-colors duration-200"
                        >
                          <MdRemoveCircle className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="label">Image</label>
                        <div className="upload-box">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange('sideImage', index, e)}
                            className="hidden"
                            id={`side-image-file-${index}`}
                          />
                          <label
                            htmlFor={`side-image-file-${index}`}
                            className="w-full h-40 bg-zinc-900 rounded-lg flex items-center justify-center flex-col cursor-pointer border-2 border-dashed border-gray-600 hover:border-yellow-400 transition-all duration-200"
                          >
                            <span className="text-yellow-400 text-3xl">+</span>
                            <p className="text-gray-400 text-sm mt-2">
                              Click or drag to upload a side image
                            </p>
                          </label>
                          {image.src && (
                            <p className="text-gray-300 text-sm mt-2">
                              Selected: {image.src.name}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="label">Alt Text</label>
                        <input
                          type="text"
                          value={image.alt}
                          onChange={(e) => handleSideImageChange(index, 'alt', e.target.value)}
                          className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                          placeholder="Enter alt text for the side image"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSideImage}
                  className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
                >
                  <MdAddCircle className="w-5 h-5" />
                  <span>Add Side Image</span>
                </button>
              </div>
            </div>
            {/* Description */}
            <div>
              <h3 className="feature-title mb-4">Description</h3>
              <div className="space-y-4">
                <div>
                  <label className="label">Description</label>
                  <textarea
                    value={formValues.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    rows={4}
                    placeholder="Enter description for the section"
                  />
                </div>
              </div>
            </div>
            {/* Stats */}
            <div>
              <h3 className="feature-title mb-4">Stats</h3>
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <div key={index} className="p-4 bg-zinc-800 rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="feature-title">Stat {index + 1}</h4>
                      {stats.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeStat(index)}
                          className="text-red-400 hover:text-red-300 transition-colors duration-200"
                        >
                          <MdRemoveCircle className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="label">Number</label>
                        <input
                          type="text"
                          value={stat.number}
                          onChange={(e) => handleStatChange(index, 'number', e.target.value)}
                          className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                          placeholder="Enter number (e.g., 1000+)"
                        />
                      </div>
                      <div>
                        <label className="label">Label</label>
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                          className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                          placeholder="Enter label (e.g., Happy Cooking Class)"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addStat}
                  className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
                >
                  <MdAddCircle className="w-5 h-5" />
                  <span>Add Stat</span>
                </button>
              </div>
            </div>
            {/* Button Labels */}
            <div>
              <h3 className="feature-title mb-4">Button Labels</h3>
              <div className="space-y-4">
                <div>
                  <label className="label">Check Availability Button Label</label>
                  <input
                    type="text"
                    value={formValues.checkAvailabilityLabel}
                    onChange={(e) => handleChange('checkAvailabilityLabel', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter label for Check Availability button"
                  />
                </div>
                <div>
                  <label className="label">Play Video Button Label</label>
                  <input
                    type="text"
                    value={formValues.playVideoLabel}
                    onChange={(e) => handleChange('playVideoLabel', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter label for Play Video button"
                  />
                </div>
              </div>
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

export default LiveFlamencoShowsForm;