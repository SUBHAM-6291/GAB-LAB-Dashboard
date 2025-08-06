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

const BannerForm = () => {
  const initialFormValues = {
    sectionTooltip: '',
    sectionHeading: '',
    sectionDescription: '',
    backgroundImageSrc: null,
    backgroundImageAlt: '',
    joinEventLabel: '',
  };

  const initialSocialLinks = [
    { href: '', name: '' },
    { href: '', name: '' },
  ];

  const [formValues, setFormValues] = useState(initialFormValues);
  const [socialLinks, setSocialLinks] = useState(initialSocialLinks);
  const [submitConfirmation, setSubmitConfirmation] = useState(false);
  const [resetConfirmation, setResetConfirmation] = useState(false);

  const handleChange = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSocialLinkChange = (index, field, value) => {
    setSocialLinks((prev) => {
      const newLinks = [...prev];
      newLinks[index] = { ...newLinks[index], [field]: value };
      return newLinks;
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file.', {
          duration: 1000,
          className: 'toast-error',
        });
        return;
      }
      handleChange('backgroundImageSrc', file);
      toast.success('Image uploaded successfully!', {
        duration: 1500,
        className: 'toast-success',
      });
    }
  };

  const addSocialLink = () => {
    setSocialLinks((prev) => [...prev, { href: '', name: '' }]);
  };

  const removeSocialLink = (index) => {
    if (socialLinks.length > 1) {
      setSocialLinks((prev) => prev.filter((_, i) => i !== index));
    } else {
      toast.error('At least one social link is required.', {
        duration: 1000,
        className: 'toast-error',
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allEmpty =
      Object.entries(formValues).every(([key, value]) =>
        key === 'backgroundImageSrc' ? value === null : value.trim() === ''
      ) &&
      socialLinks.every((link) =>
        Object.values(link).every((value) => value.trim() === '')
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
      backgroundImageSrc: formValues.backgroundImageSrc ? formValues.backgroundImageSrc.name : null,
      socialLinks,
    };
    console.log('Updated Blog Banner Section Data:', dataToSubmit);
    toast.success('Blog Banner section content has been saved successfully!', {
      duration: 2000,
      className: 'toast-success',
    });
  };

  const handleReset = () => {
    setResetConfirmation(true);
  };

  const confirmReset = () => {
    setFormValues(initialFormValues);
    setSocialLinks(initialSocialLinks);
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
          <h2 className="heading">Edit Our Classes Banner Section</h2>
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
            {/* Background Image */}
            <div>
              <h3 className="feature-title mb-4">Background Image</h3>
              <div className="space-y-4">
                <div>
                  <label className="label">Background Image</label>
                  <div className="upload-box">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="background-image-file"
                    />
                    <label
                      htmlFor="background-image-file"
                      className="w-full h-40 bg-zinc-900 rounded-lg flex items-center justify-center flex-col cursor-pointer border-2 border-dashed border-gray-600 hover:border-yellow-400 transition-all duration-200"
                    >
                      <span className="text-yellow-400 text-3xl">+</span>
                      <p className="text-gray-400 text-sm mt-2">
                        Click or drag to upload the background image
                      </p>
                    </label>
                    {formValues.backgroundImageSrc && (
                      <p className="text-gray-300 text-sm mt-2">
                        Selected: {formValues.backgroundImageSrc.name}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="label">Background Image Alt Text</label>
                  <input
                    type="text"
                    value={formValues.backgroundImageAlt}
                    onChange={(e) => handleChange('backgroundImageAlt', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter alt text for the background image"
                  />
                </div>
              </div>
            </div>
            {/* Button Label */}
            <div>
              <h3 className="feature-title mb-4">Button Label</h3>
              <div className="space-y-4">
                <div>
                  <label className="label">Join Event Button Label</label>
                  <input
                    type="text"
                    value={formValues.joinEventLabel}
                    onChange={(e) => handleChange('joinEventLabel', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter label for Join Event button"
                  />
                </div>
              </div>
            </div>
            {/* Social Links */}
            <div>
              <h3 className="feature-title mb-4">Social Links</h3>
              <div className="space-y-4">
                {socialLinks.map((link, index) => (
                  <div key={index} className="p-4 bg-zinc-800 rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="feature-title">Social Link {index + 1}</h4>
                      {socialLinks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSocialLink(index)}
                          className="text-red-400 hover:text-red-300 transition-colors duration-200"
                        >
                          <MdRemoveCircle className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="label">Link URL</label>
                        <input
                          type="text"
                          value={link.href}
                          onChange={(e) => handleSocialLinkChange(index, 'href', e.target.value)}
                          className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                          placeholder="Enter URL for the social link"
                        />
                      </div>
                      <div>
                        <label className="label">Link Name</label>
                        <input
                          type="text"
                          value={link.name}
                          onChange={(e) => handleSocialLinkChange(index, 'name', e.target.value)}
                          className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                          placeholder="Enter name for the social link"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSocialLink}
                  className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
                >
                  <MdAddCircle className="w-5 h-5" />
                  <span>Add Social Link</span>
                </button>
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

export default BannerForm;