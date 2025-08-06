'use client';

import React, { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import '@/components/ui/professional-ui.css';
import ButtonGroup from '../../Utilites/Btn';
import { FaPlus } from 'react-icons/fa';

export default function SliderSection() {
  const [heading, setHeading] = useState('');
  const [subheading, setSubheading] = useState('');
  const [tooltip, setTooltip] = useState('');
  const [description, setDescription] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
  };

  const handleReset = () => {
    setHeading('');
    setSubheading('');
    setTooltip('');
    setDescription('');
    setButtonText('');
    setImageFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      heading,
      subheading,
      tooltip,
      description,
      buttonText,
      image: imageFile,
    });
    alert('Submitted!');
  };

  return (
    <div className="main-container">
      <div>
        <div className="flex items-center gap-3 mb-8">
          <MdEdit className="text-yellow-400 w-6 h-6" />
          <h2 className="heading">Edit Discover Section</h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 text-white p-8 rounded-xl border border-yellow-400/20 shadow-lg shadow-black/50 space-y-6 relative"
        >
          {/* Tooltip */}
          <div>
            <label className="label">Tooltip</label>
            <input
              type="text"
              value={tooltip}
              onChange={(e) => setTooltip(e.target.value)}
              className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
              placeholder="Enter tooltip"
            />
          </div>

          {/* Heading */}
          <div>
            <label className="label">Heading</label>
            <input
              type="text"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
              placeholder="Enter heading"
            />
          </div>

          {/* Subheading */}
          <div>
            <label className="label">Sub heading</label>
            <input
              type="text"
              value={subheading}
              onChange={(e) => setSubheading(e.target.value)}
              className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
              placeholder="Enter subheading"
            />
          </div>

          {/* Description */}
          <div>
            <label className="label">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
              rows={4}
              placeholder="Enter description"
            />
          </div>

          {/* Button Text */}
          <div>
            <label className="label">Button Text</label>
            <input
              type="text"
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
              className="w-full bg-zinc-800 rounded-lg p-3 text-white"
              placeholder="Enter button text"
            />
          </div>

          {/* Single Image Upload */}
          <div>
            <label className="label">Image Upload</label>
            <div className="relative group border-2 border-dashed border-zinc-700 rounded-lg p-6 bg-zinc-800 hover:border-yellow-500 transition-all duration-300">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center justify-center text-zinc-400 group-hover:text-yellow-400 transition duration-300">
                <FaPlus className="text-2xl mb-1" />
                <span className="text-sm">{imageFile ? 'Change Image' : 'Upload Image'}</span>
              </div>
            </div>

            {/* Preview */}
            {imageFile && (
              <div className="mt-4">
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Preview"
                  className="w-[40vh] h-auto object-cover rounded-md border border-zinc-700"
                />
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="text-sm px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition duration-300"
                  >
                    Remove Image
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Buttons */}
          <ButtonGroup onResetClick={handleReset} />
        </form>
      </div>
    </div>
  );
}
