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

const FooterForm = () => {
  // Initial state based on Footer component
  const initialFormValues = {
    description: 'Authentic cooking classes in the heart of Barcelona. Learn traditional Spanish recipes with our expert chefs.',
    address: 'Carrer de Lancaster, 10, Bajo 1a,\n08001, Barcelona',
    phone: '+91 7797756092',
    newsletterDescription: 'Stay updated with the latest classes and fitness tips.',
    copyrightText: '© Gastronomic Arts Barcelona 2025',
    designerName: 'Ethicaldan',
  };

  const initialLogo = { alt: 'Logo', imageFile: null, imagePreview: null };

  const initialQuickLinks = [
    { label: 'Our Classes', href: '/our-class' },
    { label: 'Private Group', href: '/private-group' },
    { label: 'FAQ', href: '/our-story' },
    { label: 'Blog', href: '/blog' },
    { label: 'Terms and Conditions', href: '#' },
    { label: 'Privacy Policy', href: '#' },
  ];

  const initialSocialIcons = [
    { icon: 'FaFacebookF', href: '#' },
    { icon: 'FaInstagram', href: '#' },
    { icon: 'FaTwitter', href: '#' },
    { icon: 'FaLinkedinIn', href: '#' },
  ];

  const [formValues, setFormValues] = useState(initialFormValues);
  const [logo, setLogo] = useState(initialLogo);
  const [quickLinks, setQuickLinks] = useState(initialQuickLinks);
  const [socialIcons, setSocialIcons] = useState(initialSocialIcons);
  const [isDragging, setIsDragging] = useState(false); // Track drag state for logo
  const [submitConfirmation, setSubmitConfirmation] = useState(false);
  const [resetConfirmation, setResetConfirmation] = useState(false);

  // Clean up logo preview URL
  useEffect(() => {
    return () => {
      if (logo.imagePreview) {
        URL.revokeObjectURL(logo.imagePreview);
      }
    };
  }, [logo.imagePreview]);

  // Handle text field changes
  const handleTextChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  // Handle logo alt text change
  const handleLogoChange = (field, value) => {
    setLogo((prev) => ({ ...prev, [field]: value }));
  };

  // Handle logo file selection
  const handleFileChange = (file) => {
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file for the logo.', {
          duration: 1000,
          className: 'toast-error',
        });
        return;
      }
      if (logo.imagePreview) {
        URL.revokeObjectURL(logo.imagePreview);
      }
      setLogo((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  // Handle file input change
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileChange(file);
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Handle drag leave
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  // Remove logo
  const removeLogo = () => {
    if (logo.imagePreview) {
      URL.revokeObjectURL(logo.imagePreview);
    }
    setLogo({ alt: '', imageFile: null, imagePreview: null });
    toast.success('Logo removed.', {
      duration: 1500,
      className: 'toast-success',
    });
  };

  // Handle quick link changes
  const handleQuickLinkChange = (index, field, value) => {
    setQuickLinks((prev) => {
      const newLinks = [...prev];
      newLinks[index] = { ...newLinks[index], [field]: value };
      return newLinks;
    });
  };

  // Add a quick link
  const addQuickLink = () => {
    setQuickLinks((prev) => [...prev, { label: '', href: '' }]);
  };

  // Remove a quick link
  const removeQuickLink = (index) => {
    if (quickLinks.length > 1) {
      setQuickLinks((prev) => prev.filter((_, i) => i !== index));
    } else {
      toast.error('At least one quick link is required.', {
        duration: 1000,
        className: 'toast-error',
      });
    }
  };

  // Handle social icon changes
  const handleSocialIconChange = (index, field, value) => {
    setSocialIcons((prev) => {
      const newIcons = [...prev];
      newIcons[index] = { ...newIcons[index], [field]: value };
      return newIcons;
    });
  };

  // Add a social icon
  const addSocialIcon = () => {
    setSocialIcons((prev) => [...prev, { icon: '', href: '' }]);
  };

  // Remove a social icon
  const removeSocialIcon = (index) => {
    if (socialIcons.length > 1) {
      setSocialIcons((prev) => prev.filter((_, i) => i !== index));
    } else {
      toast.error('At least one social icon is required.', {
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
      !logo.imageFile &&
      logo.alt.trim() === '' &&
      quickLinks.every((link) => link.label.trim() === '' && link.href.trim() === '') &&
      socialIcons.every((icon) => icon.icon.trim() === '' && icon.href.trim() === '');
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
      logo: {
        alt: logo.alt,
        imageFile: logo.imageFile ? logo.imageFile.name : null,
      },
      quickLinks,
      socialIcons,
    };
    console.log('Updated Footer Data:', dataToSubmit);
    toast.success('Footer content saved successfully!', {
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
    setQuickLinks(initialQuickLinks);
    setSocialIcons(initialSocialIcons);
    if (logo.imagePreview) {
      URL.revokeObjectURL(logo.imagePreview);
    }
    setLogo(initialLogo);
    setIsDragging(false);
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
          <h2 className="heading">Edit Footer Content</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 text-white p-8 rounded-xl border border-yellow-400/20 shadow-lg shadow-black/50"
        >
          <div className="space-y-6">
            {/* Logo Section */}
            <div>
              <h3 className="sub-heading">Footer Logo</h3>
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label className="label">Logo Alt Text</label>
                  <input
                    type="text"
                    value={logo.alt}
                    onChange={(e) => handleLogoChange('alt', e.target.value)}
                    className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Logo alt text"
                  />
                </div>
                <div>
                  <label className="label">Logo Image</label>
                  <div
                    className={`relative w-full h-40 bg-zinc-800 rounded-lg flex items-center justify-center flex-col cursor-pointer border-2 border-dashed transition-all duration-200 ${
                      isDragging ? 'border-yellow-400 bg-yellow-400/20' : 'border-gray-600 hover:border-yellow-400'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileInputChange}
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                      id="logoUpload"
                    />
                    <span className="text-yellow-400 text-3xl">+</span>
                    <p className="text-gray-400 text-sm mt-2 text-center">
                      {isDragging ? 'Drop image here' : 'Click or drag to upload logo'}
                    </p>
                  </div>
                  {logo.imageFile && (
                    <p className="text-gray-300 text-sm mt-2">
                      Selected: {logo.imageFile.name}
                    </p>
                  )}
                  <p className="text-gray-400 text-sm mt-2">
                    Select or drag one image file. Only image files are allowed.
                  </p>
                  {logo.imagePreview && (
                    <div className="grid grid-cols-1 gap-4 mt-4">
                      <div className="relative rounded-xl overflow-hidden border border-yellow-400/30 group">
                        <img
                          src={logo.imagePreview}
                          alt="Logo Preview"
                          className="w-full object-cover h-48 transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm text-center py-2">
                          Logo Preview
                        </div>
                        <button
                          type="button"
                          onClick={removeLogo}
                          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg"
                          title="Remove logo"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div>
              <h3 className="sub-heading">Footer Description</h3>
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label className="label">Description</label>
                  <textarea
                    value={formValues.description}
                    onChange={(e) => handleTextChange('description', e.target.value)}
                    className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                    rows={4}
                    placeholder="Enter footer description"
                  />
                </div>
              </div>
            </div>

            {/* Social Icons Section */}
            <div>
              <h3 className="sub-heading">Social Icons</h3>
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="label">Social Icons</label>
                    <button
                      type="button"
                      onClick={addSocialIcon}
                      className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
                    >
                      <MdAddCircle className="w-5 h-5" />
                      <span>Add Social Icon</span>
                    </button>
                  </div>
                  {socialIcons.map((icon, index) => (
                    <div
                      key={index}
                      className="mb-4 p-4 bg-zinc-800 rounded-lg border border-gray-700"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="feature-title">Social Icon {index + 1}</h4>
                        {socialIcons.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSocialIcon(index)}
                            className="text-red-400 hover:text-red-300 transition-colors duration-200"
                          >
                            <MdRemoveCircle className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="label">Icon Name</label>
                          <input
                            type="text"
                            value={icon.icon}
                            onChange={(e) =>
                              handleSocialIconChange(index, 'icon', e.target.value)
                            }
                            className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                            placeholder="e.g., FaFacebookF"
                          />
                        </div>
                        <div>
                          <label className="label">Icon URL</label>
                          <input
                            type="text"
                            value={icon.href}
                            onChange={(e) =>
                              handleSocialIconChange(index, 'href', e.target.value)
                            }
                            className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                            placeholder="Social URL"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links Section */}
            <div>
              <h3 className="sub-heading">Quick Links</h3>
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="label">Quick Links</label>
                    <button
                      type="button"
                      onClick={addQuickLink}
                      className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
                    >
                      <MdAddCircle className="w-5 h-5" />
                      <span>Add Quick Link</span>
                    </button>
                  </div>
                  {quickLinks.map((link, index) => (
                    <div
                      key={index}
                      className="mb-4 p-4 bg-zinc-800 rounded-lg border border-gray-700"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="feature-title">Quick Link {index + 1}</h4>
                        {quickLinks.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeQuickLink(index)}
                            className="text-red-400 hover:text-red-300 transition-colors duration-200"
                          >
                            <MdRemoveCircle className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="label">Link Label</label>
                          <input
                            type="text"
                            value={link.label}
                            onChange={(e) =>
                              handleQuickLinkChange(index, 'label', e.target.value)
                            }
                            className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                            placeholder="Link Label"
                          />
                        </div>
                        <div>
                          <label className="label">Link URL</label>
                          <input
                            type="text"
                            value={link.href}
                            onChange={(e) =>
                              handleQuickLinkChange(index, 'href', e.target.value)
                            }
                            className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                            placeholder="Link URL"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Us Section */}
            <div>
              <h3 className="sub-heading">Contact Us</h3>
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label className="label">Address</label>
                  <textarea
                    value={formValues.address}
                    onChange={(e) => handleTextChange('address', e.target.value)}
                    className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                    rows={3}
                    placeholder="Enter address"
                  />
                </div>
                <div>
                  <label className="label">Phone Number</label>
                  <input
                    type="text"
                    value={formValues.phone}
                    onChange={(e) => handleTextChange('phone', e.target.value)}
                    className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
            </div>

            {/* Newsletter Section */}
            <div>
              <h3 className="sub-heading">Newsletter</h3>
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label className="label">Newsletter Description</label>
                  <textarea
                    value={formValues.newsletterDescription}
                    onChange={(e) => handleTextChange('newsletterDescription', e.target.value)}
                    className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                    rows={3}
                    placeholder="Enter newsletter description"
                  />
                </div>
              </div>
            </div>

            {/* Copyright Section */}
            <div>
              <h3 className="sub-heading">Copyright</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Copyright Text</label>
                  <input
                    type="text"
                    value={formValues.copyrightText}
                    onChange={(e) => handleTextChange('copyrightText', e.target.value)}
                    className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="e.g., © Gastronomic Arts Barcelona 2025"
                  />
                </div>
                <div>
                  <label className="label">Designer Name</label>
                  <input
                    type="text"
                    value={formValues.designerName}
                    onChange={(e) => handleTextChange('designerName', e.target.value)}
                    className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="e.g., Ethicaldan"
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
                Are you sure you want to submit these footer changes? This action cannot be undone.
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

export default FooterForm;