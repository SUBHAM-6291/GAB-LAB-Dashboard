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
import ButtonGroup from '@/app/_components/Utilites/Btn'; // Adjust the import path as needed

const BlogPostForm = () => {
  const initialFormValues = {
    category: '',
    title: '',
    shortDescription: '',
    longDescription: '',
    author: '',
    date: '',
    imageFile: null,
    suggestedPostsHeading: '',
  };

  const initialSuggestedPosts = [
    { title: '', link: '' },
    { title: '', link: '' },
  ];

  const [formValues, setFormValues] = useState(initialFormValues);
  const [suggestedPosts, setSuggestedPosts] = useState(initialSuggestedPosts);
  const [submitConfirmation, setSubmitConfirmation] = useState(false);
  const [resetConfirmation, setResetConfirmation] = useState(false);

  const handleChange = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file for the blog post.', {
          duration: 1000,
          className: 'toast-error',
        });
        return;
      }
      setFormValues((prev) => ({
        ...prev,
        imageFile: file,
      }));
    }
  };

  const handleSuggestedPostChange = (index, field, value) => {
    setSuggestedPosts((prev) => {
      const newPosts = [...prev];
      newPosts[index] = { ...newPosts[index], [field]: value };
      return newPosts;
    });
  };

  const addSuggestedPost = () => {
    setSuggestedPosts((prev) => [...prev, { title: '', link: '' }]);
  };

  const removeSuggestedPost = (index) => {
    if (suggestedPosts.length > 1) {
      setSuggestedPosts((prev) => prev.filter((_, i) => i !== index));
    } else {
      toast.error('At least one suggested post is required.', {
        duration: 1000,
        className: 'toast-error',
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allEmpty =
      Object.values(formValues).every((value) => value === '' || value === null) &&
      suggestedPosts.every((post) => post.title.trim() === '' && post.link.trim() === '');
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
      imageFile: formValues.imageFile ? formValues.imageFile.name : null,
      suggestedPosts,
    };
    console.log('Updated Blog Post Data:', dataToSubmit);
    toast.success('Blog post content has been saved successfully!', {
      duration: 2000,
      className: 'toast-success',
    });
  };

  const handleReset = () => {
    setResetConfirmation(true);
  };

  const confirmReset = () => {
    setFormValues(initialFormValues);
    setSuggestedPosts(initialSuggestedPosts);
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
          <h2 className="heading">Customize Blog Post Content</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 text-white p-8 rounded-xl border border-yellow-400/20 shadow-lg shadow-black/50"
        >
          <div className="space-y-6">
            {/* Post Content */}
            <div>
              <h3 className="feature-title mb-4">Post Content</h3>
              <div className="space-y-4">
                <div>
                  <label className="label">Post Category</label>
                  <input
                    type="text"
                    value={formValues.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter category for the blog post "
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    The category or topic of the blog post, displayed as the main heading.
                  </p>
                </div>
                <div>
                  <label className="label">Post Title</label>
                  <input
                    type="text"
                    value={formValues.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter title for the blog post "
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    The title of the blog post, displayed below the image.
                  </p>
                </div>
                <div>
                  <label className="label">Short Description</label>
                  <textarea
                    value={formValues.shortDescription}
                    onChange={(e) => handleChange('shortDescription', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    rows={3}
                    placeholder="Enter a short description for the blog post "
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    A brief summary of the blog post, displayed if different from the long description.
                  </p>
                </div>
                <div>
                  <label className="label">Long Description</label>
                  <textarea
                    value={formValues.longDescription}
                    onChange={(e) => handleChange('longDescription', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    rows={6}
                    placeholder="Enter the full content for the blog post"
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    The main content of the blog post.
                  </p>
                </div>
                <div>
                  <label className="label">Author</label>
                  <input
                    type="text"
                    value={formValues.author}
                    onChange={(e) => handleChange('author', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter the author’s name "
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    The name of the blog post’s author, displayed in the header.
                  </p>
                </div>
                <div>
                  <label className="label">Publication Date</label>
                  <input
                    type="text"
                    value={formValues.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter publication date (YYYY-MM-DD, e.g., 2025-08-04)"
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    The publication date of the blog post, displayed in the header (format: YYYY-MM-DD).
                  </p>
                </div>
              </div>
            </div>
            {/* Media Upload */}
            <div>
              <h3 className="feature-title mb-4">Media Upload</h3>
              <div>
                <label className="label">Blog Post Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                />
                {formValues.imageFile && (
                  <p className="text-gray-400 text-sm mt-2">
                    Selected file: {formValues.imageFile.name}
                  </p>
                )}
                <p className="text-gray-400 text-sm mt-2">
                  Upload an image for the blog post .
                </p>
              </div>
            </div>
            {/* Suggested Posts */}
            <div>
              <h3 className="feature-title mb-4">Suggested Posts</h3>
              <div className="space-y-4">
                <div>
                  <label className="label">Suggested Posts Heading</label>
                  <input
                    type="text"
                    value={formValues.suggestedPostsHeading}
                    onChange={(e) => handleChange('suggestedPostsHeading', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter heading for suggested posts "
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    The heading for the suggested posts section.
                  </p>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <label className="label">Suggested Posts</label>
                  <button
                    type="button"
                    onClick={addSuggestedPost}
                    className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
                  >
                    <MdAddCircle className="w-5 h-5" />
                    <span>Add Post</span>
                  </button>
                </div>
                {suggestedPosts.map((post, index) => (
                  <div key={index} className="mb-4 p-4 bg-zinc-800 rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="feature-title">Suggested Post {index + 1}</h4>
                      {suggestedPosts.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSuggestedPost(index)}
                          className="text-red-400 hover:text-red-300 transition-colors duration-200"
                        >
                          <MdRemoveCircle className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="label">Post {index + 1} Title</label>
                        <input
                          type="text"
                          value={post.title}
                          onChange={(e) => handleSuggestedPostChange(index, 'title', e.target.value)}
                          className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                          placeholder={`Enter title for Suggested Post ${index + 1}`}
                        />
                      </div>
                      <div>
                        <label className="label">Post {index + 1} Link</label>
                        <input
                          type="text"
                          value={post.link}
                          onChange={(e) => handleSuggestedPostChange(index, 'link', e.target.value)}
                          className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                          placeholder={`Enter link for Suggested Post ${index + 1} `}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <ButtonGroup onResetClick={handleReset} />
        </form>
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

export default BlogPostForm;