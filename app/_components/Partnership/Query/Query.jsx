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

const QuestionnaireForm = () => {
  const initialFormValues = {
    tooltip: '',
    heading: '',
    description: '',
    querySectionHeading: '',
    thankYouLogo: null,
    thankYouTooltip: '',
    thankYouHeading: '',
    thankYouDescription: '',
    thankYouButton1Label: '',
    thankYouButton1Link: '',
    thankYouButton2Label: '',
    thankYouButton2Link: '',
    thankYouButton3Label: '',
    thankYouButton3Link: '',
  };

  const initialQueries = [
    { title: '', category: '', response: '' },
    { title: '', category: '', response: '' },
  ];

  const initialSocialMediaButtons = [
    { label: '', link: '' },
    { label: '', link: '' },
  ];

  const queryCategories = ['General', 'Technical', 'Billing', 'Support', 'Other'];

  const [formValues, setFormValues] = useState(initialFormValues);
  const [queries, setQueries] = useState(initialQueries);
  const [socialMediaButtons, setSocialMediaButtons] = useState(initialSocialMediaButtons);
  const [submitConfirmation, setSubmitConfirmation] = useState(false);
  const [resetConfirmation, setResetConfirmation] = useState(false);

  const handleChange = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file for the Thank You page logo.', {
          duration: 1000,
          className: 'toast-error',
        });
        return;
      }
      setFormValues((prev) => ({
        ...prev,
        thankYouLogo: file,
      }));
    }
  };

  const handleQueryChange = (index, field, value) => {
    setQueries((prev) => {
      const newQueries = [...prev];
      newQueries[index] = { ...newQueries[index], [field]: value };
      return newQueries;
    });
  };

  const addQuery = () => {
    setQueries((prev) => [...prev, { title: '', category: '', response: '' }]);
  };

  const removeQuery = (index) => {
    if (queries.length > 1) {
      setQueries((prev) => prev.filter((_, i) => i !== index));
    } else {
      toast.error('At least one query is required.', {
        duration: 1000,
        className: 'toast-error',
      });
    }
  };

  const handleSocialMediaButtonChange = (index, field, value) => {
    setSocialMediaButtons((prev) => {
      const newButtons = [...prev];
      newButtons[index] = { ...newButtons[index], [field]: value };
      return newButtons;
    });
  };

  const addSocialMediaButton = () => {
    setSocialMediaButtons((prev) => [...prev, { label: '', link: '' }]);
  };

  const removeSocialMediaButton = (index) => {
    if (socialMediaButtons.length > 1) {
      setSocialMediaButtons((prev) => prev.filter((_, i) => i !== index));
    } else {
      toast.error('At least one social media button is required.', {
        duration: 1000,
        className: 'toast-error',
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allEmpty =
      Object.values(formValues).every((value) => value === '' || value === null) &&
      queries.every(
        (query) => query.title.trim() === '' && query.category.trim() === '' && query.response.trim() === ''
      ) &&
      socialMediaButtons.every((button) => button.label.trim() === '' && button.link.trim() === '');
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
      thankYouLogo: formValues.thankYouLogo ? formValues.thankYouLogo.name : null,
      queries,
      socialMediaButtons,
    };
    console.log('Updated Questionnaire Form Data:', dataToSubmit);
    toast.success('Questionnaire form content has been saved successfully!', {
      duration: 2000,
      className: 'toast-success',
    });
  };

  const handleReset = () => {
    setResetConfirmation(true);
  };

  const confirmReset = () => {
    setFormValues(initialFormValues);
    setQueries(initialQueries);
    setSocialMediaButtons(initialSocialMediaButtons);
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
          <h2 className="heading">Customize Questionnaire Form</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 text-white p-8 rounded-xl border border-yellow-400/20 shadow-lg shadow-black/50"
        >
          <div className="space-y-6">
            {/* Tooltip */}
            <div>
              <label className="label">Tooltip</label>
              <input
                type="text"
                value={formValues.tooltip}
                onChange={(e) => handleChange('tooltip', e.target.value)}
                className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                placeholder="Enter tooltip for Questionnaire section"
              />
              <p className="text-gray-400 text-sm mt-2">
                A brief tooltip for the Questionnaire section, displayed on hover.
              </p>
            </div>
            {/* Heading */}
            <div>
              <label className="label">Heading</label>
              <input
                type="text"
                value={formValues.heading}
                onChange={(e) => handleChange('heading', e.target.value)}
                className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                placeholder="Enter heading for Questionnaire section (e.g., Customer Feedback)"
              />
              <p className="text-gray-400 text-sm mt-2">
                The main heading for the Questionnaire section.
              </p>
            </div>
            {/* Description */}
            <div>
              <label className="label">Description</label>
              <textarea
                value={formValues.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                rows={4}
                placeholder="Enter description for Questionnaire section"
              />
              <p className="text-gray-400 text-sm mt-2">
                A brief description of the Questionnaire section, displayed below the heading.
              </p>
            </div>
            {/* Query Section */}
            <div>
              <h3 className="feature-title mb-4">Query Section</h3>
              <div className="space-y-4">
                <div>
                  <label className="label">Query Section Heading</label>
                  <input
                    type="text"
                    value={formValues.querySectionHeading}
                    onChange={(e) => handleChange('querySectionHeading', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter heading for queries (e.g., Your Questions)"
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    The heading for the queries list, displayed above the query items.
                  </p>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <label className="label">Query Items</label>
                  <button
                    type="button"
                    onClick={addQuery}
                    className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
                  >
                    <MdAddCircle className="w-5 h-5" />
                    <span>Add Query</span>
                  </button>
                </div>
                {queries.map((query, index) => (
                  <div key={index} className="mb-4 p-4 bg-zinc-800 rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="feature-title">Query {index + 1}</h4>
                      {queries.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeQuery(index)}
                          className="text-red-400 hover:text-red-300 transition-colors duration-200"
                        >
                          <MdRemoveCircle className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="label">Query {index + 1} Title</label>
                        <input
                          type="text"
                          value={query.title}
                          onChange={(e) => handleQueryChange(index, 'title', e.target.value)}
                          className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                          placeholder={`Enter title for Query ${index + 1} (e.g., What is your preferred contact method?)`}
                        />
                        <p className="text-gray-400 text-sm mt-2">
                          The question or title of the query.
                        </p>
                      </div>
                      <div>
                        <label className="label">Query {index + 1} Category</label>
                        <select
                          value={query.category}
                          onChange={(e) => handleQueryChange(index, 'category', e.target.value)}
                          className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                        >
                          <option value="" disabled>
                            Select a category
                          </option>
                          {queryCategories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                        <p className="text-gray-400 text-sm mt-2">
                          The category of the query (e.g., General, Technical).
                        </p>
                      </div>
                      <div>
                        <label className="label">Query {index + 1} Response</label>
                        <textarea
                          value={query.response}
                          onChange={(e) => handleQueryChange(index, 'response', e.target.value)}
                          className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                          rows={4}
                          placeholder={`Enter response for Query ${index + 1}`}
                        />
                        <p className="text-gray-400 text-sm mt-2">
                          The detailed response or answer to the query (optional for form input).
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Thank You Page */}
            <div>
              <h3 className="feature-title mb-4">Thank You Page</h3>
              <div className="space-y-4">
                <div>
                  <label className="label">Thank You Page Logo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                  />
                  {formValues.thankYouLogo && (
                    <p className="text-gray-400 text-sm mt-2">
                      Selected file: {formValues.thankYouLogo.name}
                    </p>
                  )}
                  <p className="text-gray-400 text-sm mt-2">
                    Upload a logo for the Thank You page.
                  </p>
                </div>
                <div>
                  <label className="label">Thank You Page Tooltip</label>
                  <input
                    type="text"
                    value={formValues.thankYouTooltip}
                    onChange={(e) => handleChange('thankYouTooltip', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter tooltip for Thank You page"
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    A brief tooltip for the Thank You page, displayed on hover.
                  </p>
                </div>
                <div>
                  <label className="label">Thank You Page Heading</label>
                  <input
                    type="text"
                    value={formValues.thankYouHeading}
                    onChange={(e) => handleChange('thankYouHeading', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter heading for Thank You page (e.g., Thank You for Your Submission!)"
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    The main heading for the Thank You page.
                  </p>
                </div>
                <div>
                  <label className="label">Thank You Page Description</label>
                  <textarea
                    value={formValues.thankYouDescription}
                    onChange={(e) => handleChange('thankYouDescription', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    rows={4}
                    placeholder="Enter description for Thank You page"
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    A brief description for the Thank You page, displayed below the heading.
                  </p>
                </div>
                <div>
                  <label className="label">Thank You Page Button 1</label>
                  <input
                    type="text"
                    value={formValues.thankYouButton1Label}
                    onChange={(e) => handleChange('thankYouButton1Label', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter label for Button 1 (e.g., Return to Home)"
                  />
                  <input
                    type="text"
                    value={formValues.thankYouButton1Link}
                    onChange={(e) => handleChange('thankYouButton1Link', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200 mt-2"
                    placeholder="Enter link for Button 1 (e.g., /home)"
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    The label and link for the first button on the Thank You page.
                  </p>
                </div>
                <div>
                  <label className="label">Thank You Page Button 2</label>
                  <input
                    type="text"
                    value={formValues.thankYouButton2Label}
                    onChange={(e) => handleChange('thankYouButton2Label', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter label for Button 2 (e.g., Explore More)"
                  />
                  <input
                    type="text"
                    value={formValues.thankYouButton2Link}
                    onChange={(e) => handleChange('thankYouButton2Link', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200 mt-2"
                    placeholder="Enter link for Button 2 (e.g., /explore)"
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    The label and link for the second button on the Thank You page.
                  </p>
                </div>
                <div>
                  <label className="label">Thank You Page Button 3</label>
                  <input
                    type="text"
                    value={formValues.thankYouButton3Label}
                    onChange={(e) => handleChange('thankYouButton3Label', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter label for Button 3 (e.g., Contact Us)"
                  />
                  <input
                    type="text"
                    value={formValues.thankYouButton3Link}
                    onChange={(e) => handleChange('thankYouButton3Link', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200 mt-2"
                    placeholder="Enter link for Button 3 (e.g., /contact)"
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    The label and link for the third button on the Thank You page.
                  </p>
                </div>
              </div>
            </div>
            {/* Social Media Buttons for Small Devices */}
            <div>
              <h3 className="feature-title mb-4">Social Media Buttons (Small Devices)</h3>
              <div className="flex items-center justify-between mb-4">
                <label className="label">Social Media Buttons</label>
                <button
                  type="button"
                  onClick={addSocialMediaButton}
                  className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
                >
                  <MdAddCircle className="w-5 h-5" />
                  <span>Add Button</span>
                </button>
              </div>
              {socialMediaButtons.map((button, index) => (
                <div key={index} className="mb-4 p-4 bg-zinc-800 rounded-lg border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="feature-title">Social Media Button {index + 1}</h4>
                    {socialMediaButtons.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSocialMediaButton(index)}
                        className="text-red-400 hover:text-red-300 transition-colors duration-200"
                      >
                        <MdRemoveCircle className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="label">Button {index + 1} Label</label>
                      <input
                        type="text"
                        value={button.label}
                        onChange={(e) => handleSocialMediaButtonChange(index, 'label', e.target.value)}
                        className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                        placeholder={`Enter label for Social Media Button ${index + 1} (e.g., Twitter)`}
                      />
                    </div>
                    <div>
                      <label className="label">Button {index + 1} Link</label>
                      <input
                        type="text"
                        value={button.link}
                        onChange={(e) => handleSocialMediaButtonChange(index, 'link', e.target.value)}
                        className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                        placeholder={`Enter link for Social Media Button ${index + 1} (e.g., https://twitter.com)`}
                      />
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">
                    The label and link for a social media button, optimized for small devices.
                  </p>
                </div>
              ))}
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

export default QuestionnaireForm;