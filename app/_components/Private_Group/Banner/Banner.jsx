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
import '@/components/ui/professional-ui.css';
import ButtonGroup from '../../Utilites/Btn';

const BannerForm = () => {
  const initialFormValues = {
    tooltip: '',
    heading: '',
    description: '',
    buttonLabel: '',
  };

  const initialImages = [
    [{ file: null, height: 'h-64' }, { file: null, height: 'h-40' }],
    [{ file: null, height: 'h-40' }, { file: null, height: 'h-64' }],
    [{ file: null, height: 'h-64' }, { file: null, height: 'h-40' }],
  ];

  const [formValues, setFormValues] = useState(initialFormValues);
  const [images, setImages] = useState(initialImages);
  const [submitConfirmation, setSubmitConfirmation] = useState(false);
  const [resetConfirmation, setResetConfirmation] = useState(false);

  const handleChange = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (colIndex, imgIndex, e) => {
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
      setImages((prev) => {
        const newImages = [...prev];
        newImages[colIndex] = [...newImages[colIndex]];
        newImages[colIndex][imgIndex] = { ...newImages[colIndex][imgIndex], file };
        return newImages;
      });
    }
  };

  const clearFile = (colIndex, imgIndex) => {
    setImages((prev) => {
      const newImages = [...prev];
      newImages[colIndex] = [...newImages[colIndex]];
      newImages[colIndex][imgIndex] = { ...newImages[colIndex][imgIndex], file: null };
      return newImages;
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-yellow-400');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('border-yellow-400');
  };

  const handleDrop = (e, colIndex, imgIndex) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-yellow-400');
    handleFileChange(colIndex, imgIndex, e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allEmpty =
      Object.values(formValues).every((value) => value.trim() === '') &&
      images.every((column) => column.every((img) => img.file === null));

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
      images: images.map((column) =>
        column.map((img) => ({
          fileName: img.file ? img.file.name : null,
          height: img.height,
        }))
      ),
    };
    console.log('Updated Banner Section Data:', dataToSubmit);
    toast.success('Banner content has been saved successfully!', {
      duration: 2000,
      className: 'toast-success',
    });
  };

  const handleReset = () => {
    setResetConfirmation(true);
  };

  const confirmReset = () => {
    setFormValues(initialFormValues);
    setImages(initialImages);
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
          <h2 className="heading">Edit Banner Section</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 text-white p-8 rounded-xl border border-yellow-400/20 shadow-lg shadow-black/50"
        >
          <div className="space-y-6">
            {/* Banner Text Content */}
            <div>
              <h3 className="sub-heading">Banner Text Content</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="label">Tooltip</label>
                  <input
                    type="text"
                    value={formValues.tooltip}
                    onChange={(e) => handleChange('tooltip', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter tooltip for banner (e.g., Private Group)"
                  />
                </div>
                <div>
                  <label className="label">Heading</label>
                  <input
                    type="text"
                    value={formValues.heading}
                    onChange={(e) => handleChange('heading', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter heading for banner"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="label">Description</label>
                  <textarea
                    value={formValues.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    rows={4}
                    placeholder="Enter description for banner"
                  />
                </div>
                <div>
                  <label className="label">Button Label</label>
                  <input
                    type="text"
                    value={formValues.buttonLabel}
                    onChange={(e) => handleChange('buttonLabel', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter label for button (e.g., Request a Quote)"
                  />
                </div>
              </div>
            </div>

            {/* Image Grid Section */}
            <div>
              <h3 className="sub-heading">Image Grid</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {images.map((column, colIndex) => (
                  <div key={colIndex} className="space-y-3">
                    <label className="label text-sm font-medium text-gray-200">
                      Column {colIndex + 1}
                    </label>
                    {column.map((img, imgIndex) => (
                      <div
                        key={imgIndex}
                        className="p-3 bg-zinc-800 rounded-xl border border-gray-700/50 shadow-sm shadow-black/30"
                      >
                        <h4 className="text-sm font-medium text-gray-200 mb-2">
                          {imgIndex === 0 ? 'Top Image' : 'Bottom Image'} ({img.height})
                        </h4>
                        <div className="upload-box">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(colIndex, imgIndex, e)}
                            className="hidden"
                            id={`imageUpload-${colIndex}-${imgIndex}`}
                          />
                          <label
                            htmlFor={`imageUpload-${colIndex}-${imgIndex}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, colIndex, imgIndex)}
                            className="w-full h-40 bg-zinc-900 rounded-lg flex items-center justify-center flex-col cursor-pointer border-2 border-dashed border-gray-600 hover:border-yellow-400 transition-all duration-200"
                          >
                            {img.file ? (
                              <img
                                src={URL.createObjectURL(img.file)}
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
                          </label>
                          {img.file && (
                            <div className="flex items-center gap-2 mt-2">
                              <p className="text-gray-300 text-sm truncate">
                                Selected: {img.file.name}
                              </p>
                              <button
                                type="button"
                                onClick={() => clearFile(colIndex, imgIndex)}
                                className="text-red-400 hover:text-red-300"
                              >
                                Clear
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
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
    </div>
  );
};

export default BannerForm;