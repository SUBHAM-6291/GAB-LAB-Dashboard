'use client';

import React, { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';
import '@/components/ui/professional-ui.css';
import ButtonGroup from '../../Utilites/Btn';

export default function SliderSection() {
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [sliderImages, setSliderImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + sliderImages.length > 5) {
      alert('You can only upload up to 5 images.');
      return;
    }

    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setSliderImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    const updatedImages = [...sliderImages];
    updatedImages.splice(index, 1);
    setSliderImages(updatedImages);
  };

  const handleReset = () => {
    setHeading('');
    setDescription('');
    setSliderImages([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      heading,
      description,
      sliderImages,
    });
    alert('Submitted!');
  };

  return (
    <div className="main-container">
      <div>
        <div className="flex items-center gap-3 mb-8">
          <MdEdit className="text-yellow-400 w-6 h-6" />
          <h2 className="heading">Edit Trip Advisor Section</h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 text-white p-8 rounded-xl border border-yellow-400/20 shadow-lg shadow-black/50 space-y-6 relative"
        >
          {/* Heading */}
          <div>
            <label className="label">Heading</label>
            <input
              type="text"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
              placeholder="Enter slider heading"
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
              placeholder="Enter slider description"
            />
          </div>

          {/* Image Upload with Preview (Up to 5) */}
          <div>
            <label className="block text-sm font-medium text-yellow-400 mb-2">
              Upload Slider Images (max 5)
            </label>
            <div className="relative group border-2 border-dashed border-zinc-700 rounded-lg p-6 bg-zinc-800 hover:border-yellow-500 transition-all duration-300">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center justify-center text-zinc-400 group-hover:text-yellow-400 transition duration-300">
                <FaPlus className="text-2xl mb-1" />
                <span className="text-sm">
                  {sliderImages.length > 0 ? 'Add More Images' : 'Upload Images'}
                </span>
              </div>
            </div>

            {/* Image Preview */}
            {sliderImages.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
                {sliderImages.map((img, index) => (
                  <div key={index} className="relative group border border-zinc-700 rounded-lg overflow-hidden">
                    <img
                      src={img.url}
                      alt={`Slider ${index + 1}`}
                      className="w-full h-32 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-xs text-white px-2 py-1 rounded"
                    >
                      Remove
                    </button>
                  </div>
                ))}
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
