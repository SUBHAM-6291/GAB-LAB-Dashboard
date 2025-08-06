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

const Navbar = () => {
  // Initial menu items (based on the Navbar component's navData)
  const initialMenuItems = [
    { label: '', href: '' },
    { label: '', href: '' },
    { label: '', href: '' },
    { label: '', href: '' },
    { label: '', href: '' },
    { label: '', href: '' },
    { label: '', href: '' },
    { label: '', href: '' },
  ];

  const initialLogo = { alt: '', imageFile: null, imagePreview: null };

  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [logo, setLogo] = useState(initialLogo);
  const [isDragging, setIsDragging] = useState(false); // Track drag state for logo
  const [submitConfirmation, setSubmitConfirmation] = useState(false);
  const [resetConfirmation, setResetConfirmation] = useState(false);

  // Clean up logo preview URL on component unmount or when logo changes
  useEffect(() => {
    return () => {
      if (logo.imagePreview) {
        URL.revokeObjectURL(logo.imagePreview);
      }
    };
  }, [logo.imagePreview]);

  // Handle changes to menu item fields
  const handleMenuItemChange = (index, field, value) => {
    setMenuItems((prev) => {
      const newMenuItems = [...prev];
      newMenuItems[index] = { ...newMenuItems[index], [field]: value };
      return newMenuItems;
    });
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

  // Add a new menu item
  const addMenuItem = () => {
    setMenuItems((prev) => [...prev, { label: '', href: '' }]);
  };

  // Remove a menu item
  const removeMenuItem = (index) => {
    if (menuItems.length > 1) {
      setMenuItems((prev) => prev.filter((_, i) => i !== index));
    } else {
      toast.error('At least one menu item is required.', {
        duration: 1000,
        className: 'toast-error',
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const allEmpty =
      menuItems.every((item) => item.label.trim() === '' && item.href.trim() === '') &&
      !logo.imageFile &&
      logo.alt.trim() === '';
    if (allEmpty) {
      toast.error('Please fill at least one menu item or logo field.', {
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
      menu: menuItems,
      logo: {
        alt: logo.alt,
        imageFile: logo.imageFile ? logo.imageFile.name : null,
      },
    };
    console.log('Updated Navbar Data:', dataToSubmit);
    toast.success('Navbar content saved successfully!', {
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
    setMenuItems(initialMenuItems);
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
          <h2 className="heading">Edit Navbar Content</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 text-white p-8 rounded-xl border border-yellow-400/20 shadow-lg shadow-black/50"
        >
          <div className="space-y-6">
            {/* Logo Section */}
            <div>
              <h3 className="sub-heading">Navbar Logo</h3>
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

            {/* Menu Items Section */}
            <div>
              <h3 className="sub-heading">Navigation Menu Items</h3>
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="label">Menu Items</label>
                    <button
                      type="button"
                      onClick={addMenuItem}
                      className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
                    >
                      <MdAddCircle className="w-5 h-5" />
                      <span>Add Menu Item</span>
                    </button>
                  </div>
                  {menuItems.map((item, index) => (
                    <div
                      key={index}
                      className="mb-4 p-4 bg-zinc-800 rounded-lg border border-gray-700"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="feature-title">Menu Item {index + 1}</h4>
                        {menuItems.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeMenuItem(index)}
                            className="text-red-400 hover:text-red-300 transition-colors duration-200"
                          >
                            <MdRemoveCircle className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="label">Menu Label</label>
                          <input
                            type="text"
                            value={item.label}
                            onChange={(e) =>
                              handleMenuItemChange(index, 'label', e.target.value)
                            }
                            className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                            placeholder="Menu Label"
                          />
                        </div>
                        <div>
                          <label className="label">Menu URL</label>
                          <input
                            type="text"
                            value={item.href}
                            onChange={(e) =>
                              handleMenuItemChange(index, 'href', e.target.value)
                            }
                            className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                            placeholder="Menu URL"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
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
                Are you sure you want to submit these navbar changes? This action cannot be undone.
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

export default Navbar;