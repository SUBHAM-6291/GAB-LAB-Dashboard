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

const QuestionnaireFormForm = () => {
  const initialSection = {
    heading: '',
    fields: [
      { name: '', type: 'text', label: '', options: '', placeholder: '', required: false },
    ],
  };

  const initialFormValues = {
    sectionTooltip: '',
    sectionHeading: '',
    sectionDescription: '',
    nextButtonLabel: '',
    previousButtonLabel: '',
    submitButtonLabel: '',
    thankYouTooltip: '',
    thankYouHeading: '',
    thankYouDescription: '',
    thankYouBackToHomeLabel: '',
    backgroundImageFile: null,
    thankYouBackgroundImageFile: null,
    sections: [
      { ...initialSection, heading: '' },
      { ...initialSection, heading: '' },
    ],
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  const [submitConfirmation, setSubmitConfirmation] = useState(false);
  const [resetConfirmation, setResetConfirmation] = useState(false);

  const handleChange = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSectionChange = (sectionIndex, field, value) => {
    setFormValues((prev) => {
      const newSections = [...prev.sections];
      newSections[sectionIndex] = { ...newSections[sectionIndex], [field]: value };
      return { ...prev, sections: newSections };
    });
  };

  const handleFieldChange = (sectionIndex, fieldIndex, field, value) => {
    setFormValues((prev) => {
      const newSections = [...prev.sections];
      newSections[sectionIndex].fields[fieldIndex] = {
        ...newSections[sectionIndex].fields[fieldIndex],
        [field]: value,
      };
      return { ...prev, sections: newSections };
    });
  };

  const addSection = () => {
    setFormValues((prev) => ({
      ...prev,
      sections: [...prev.sections, { ...initialSection, heading: '' }],
    }));
  };

  const removeSection = (sectionIndex) => {
    if (formValues.sections.length > 1) {
      setFormValues((prev) => ({
        ...prev,
        sections: prev.sections.filter((_, i) => i !== sectionIndex),
      }));
    } else {
      toast.error('At least one section is required.', {
        duration: 1000,
        className: 'toast-error',
      });
    }
  };

  const addField = (sectionIndex) => {
    setFormValues((prev) => {
      const newSections = [...prev.sections];
      newSections[sectionIndex].fields.push({
        name: '',
        type: 'text',
        label: '',
        options: '',
        placeholder: '',
        required: false,
      });
      return { ...prev, sections: newSections };
    });
  };

  const removeField = (sectionIndex, fieldIndex) => {
    setFormValues((prev) => {
      const newSections = [...prev.sections];
      if (newSections[sectionIndex].fields.length > 1) {
        newSections[sectionIndex].fields = newSections[sectionIndex].fields.filter(
          (_, i) => i !== fieldIndex
        );
        return { ...prev, sections: newSections };
      } else {
        toast.error('At least one field is required per section.', {
          duration: 1000,
          className: 'toast-error',
        });
        return prev;
      }
    });
  };

  const handleFileChange = (field, e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error(`Please select an image file for ${field.replace(/([A-Z])/g, ' $1').trim()}.`, {
          duration: 1000,
          className: 'toast-error',
        });
        return;
      }
      setFormValues((prev) => ({
        ...prev,
        [field]: file,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allEmpty =
      Object.entries(formValues)
        .filter(([key]) => key !== 'sections' && key !== 'backgroundImageFile' && key !== 'thankYouBackgroundImageFile')
        .every(([_, value]) => value === '') &&
      formValues.sections.every((section) =>
        section.heading === '' &&
        section.fields.every((field) =>
          Object.values(field).every((value) => value === '' || value === false)
        )
      ) &&
      !formValues.backgroundImageFile &&
      !formValues.thankYouBackgroundImageFile;
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
      backgroundImageFile: formValues.backgroundImageFile ? formValues.backgroundImageFile.name : null,
      thankYouBackgroundImageFile: formValues.thankYouBackgroundImageFile ? formValues.thankYouBackgroundImageFile.name : null,
    };
    console.log('Updated Client Questionnaire Form Data:', dataToSubmit);
    toast.success('Client questionnaire form content has been saved successfully!', {
      duration: 2000,
      className: 'toast-success',
    });
  };

  const handleReset = () => {
    setResetConfirmation(true);
  };

  const confirmReset = () => {
    setFormValues(initialFormValues);
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
          <h2 className="heading">Customize Client Questionnaire Form</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 text-white p-8 rounded-xl border border-yellow-400/20 shadow-lg shadow-black/50"
        >
          <div className="space-y-6">
            {/* Form Section Content */}
            <div>
              <h3 className="feature-title mb-4">Form Section Content</h3>
              <div className="space-y-4">
                <div>
                  <label className="label">Section Tooltip</label>
                  <input
                    type="text"
                    value={formValues.sectionTooltip}
                    onChange={(e) => handleChange('sectionTooltip', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter tooltip for the form section (e.g., Client Survey)"
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    A short phrase displayed as a tooltip for the form section.
                  </p>
                </div>
                <div>
                  <label className="label">Section Heading</label>
                  <input
                    type="text"
                    value={formValues.sectionHeading}
                    onChange={(e) => handleChange('sectionHeading', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter heading for the form section (e.g., Client Questionnaire)"
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    The main title for the client questionnaire form.
                  </p>
                </div>
                <div>
                  <label className="label">Section Description</label>
                  <textarea
                    value={formValues.sectionDescription}
                    onChange={(e) => handleChange('sectionDescription', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    rows={4}
                    placeholder="Enter description for the form section (e.g., Please provide us with some information...)"
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    A brief description of the form’s purpose.
                  </p>
                </div>
              </div>
            </div>
            {/* Button Labels */}
            <div>
              <h3 className="feature-title mb-4">Button Labels</h3>
              <div className="space-y-4">
                {[
                  { field: 'nextButtonLabel', label: 'Next Button Label', placeholder: 'Enter label for Next button (e.g., Next)' },
                  { field: 'previousButtonLabel', label: 'Previous Button Label', placeholder: 'Enter label for Previous button (e.g., Previous)' },
                  { field: 'submitButtonLabel', label: 'Submit Button Label', placeholder: 'Enter label for Submit button (e.g., Submit Form)' },
                ].map(({ field, label, placeholder }) => (
                  <div key={field}>
                    <label className="label">{label}</label>
                    <input
                      type="text"
                      value={formValues[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
                      className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                      placeholder={placeholder}
                    />
                    <p className="text-gray-400 text-sm mt-2">
                      The label for the {label.toLowerCase()} in the form.
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {/* Thank You Page Content */}
            <div>
              <h3 className="feature-title mb-4">Thank You Page Content</h3>
              <div className="space-y-4">
                <div>
                  <label className="label">Thank You Tooltip</label>
                  <input
                    type="text"
                    value={formValues.thankYouTooltip}
                    onChange={(e) => handleChange('thankYouTooltip', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter tooltip for the thank you page (e.g., Thank You!)"
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    A short phrase displayed as a tooltip for the thank you page.
                  </p>
                </div>
                <div>
                  <label className="label">Thank You Heading</label>
                  <input
                    type="text"
                    value={formValues.thankYouHeading}
                    onChange={(e) => handleChange('thankYouHeading', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter heading for the thank you page (e.g., Submission Successful)"
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    The main title for the thank you page.
                  </p>
                </div>
                <div>
                  <label className="label">Thank You Description</label>
                  <textarea
                    value={formValues.thankYouDescription}
                    onChange={(e) => handleChange('thankYouDescription', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    rows={4}
                    placeholder="Enter description for the thank you page (e.g., Thank you for completing the client questionnaire...)"
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    A brief message displayed on the thank you page.
                  </p>
                </div>
                <div>
                  <label className="label">Thank You Back to Home Button Label</label>
                  <input
                    type="text"
                    value={formValues.thankYouBackToHomeLabel}
                    onChange={(e) => handleChange('thankYouBackToHomeLabel', e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter label for Back to Home button (e.g., Back to Home)"
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    The label for the Back to Home button on the thank you page.
                  </p>
                </div>
              </div>
            </div>
            {/* Dynamic Sections */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="feature-title">Form Sections</h3>
                <button
                  type="button"
                  onClick={addSection}
                  className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
                >
                  <MdAddCircle className="w-5 h-5" />
                  <span>Add New Section</span>
                </button>
              </div>
              {formValues.sections.map((section, sectionIndex) => (
                <div
                  key={sectionIndex}
                  className="mb-4 p-4 bg-zinc-800 rounded-lg border border-gray-700"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="feature-title">Section {sectionIndex + 1}</h4>
                    {formValues.sections.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSection(sectionIndex)}
                        className="text-red-400 hover:text-red-300 transition-colors duration-200"
                      >
                        <MdRemoveCircle className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="label">Section Heading</label>
                      <input
                        type="text"
                        value={section.heading}
                        onChange={(e) => handleSectionChange(sectionIndex, 'heading', e.target.value)}
                        className="w-full bg-zinc-900 rounded-lg p-3 text-white transition-all duration-200"
                        placeholder={`Enter heading for Section ${sectionIndex + 1} (e.g., Personal Information)`}
                      />
                      <p className="text-gray-400 text-sm mt-2">
                        The heading for the section (e.g., Personal Information, Business Details).
                      </p>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="label">Fields</label>
                      <button
                        type="button"
                        onClick={() => addField(sectionIndex)}
                        className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
                      >
                        <MdAddCircle className="w-5 h-5" />
                        <span>Add Field</span>
                      </button>
                    </div>
                    {section.fields.map((field, fieldIndex) => (
                      <div
                        key={fieldIndex}
                        className="ml-4 p-4 bg-zinc-900 rounded-lg border border-gray-600"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-sm font-semibold text-gray-200">
                            Field {fieldIndex + 1}
                          </h5>
                          {section.fields.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeField(sectionIndex, fieldIndex)}
                              className="text-red-400 hover:text-red-300 transition-colors duration-200"
                            >
                              <MdRemoveCircle className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="label">Field Name</label>
                            <input
                              type="text"
                              value={field.name}
                              onChange={(e) => handleFieldChange(sectionIndex, fieldIndex, 'name', e.target.value)}
                              className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                              placeholder={`Enter name for Field ${fieldIndex + 1} (e.g., firstName)`}
                            />
                            <p className="text-gray-400 text-sm mt-2">
                              A unique identifier for the field (e.g., firstName, email).
                            </p>
                          </div>
                          <div>
                            <label className="label">Field Type</label>
                            <select
                              value={field.type}
                              onChange={(e) => handleFieldChange(sectionIndex, fieldIndex, 'type', e.target.value)}
                              className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                            >
                              <option value="text">Text</option>
                              <option value="email">Email</option>
                              <option value="phone">Phone</option>
                              <option value="select">Select</option>
                              <option value="checkbox">Checkbox</option>
                              <option value="textarea">Textarea</option>
                            </select>
                            <p className="text-gray-400 text-sm mt-2">
                              The type of input field (e.g., text, select, checkbox).
                            </p>
                          </div>
                          <div>
                            <label className="label">Field Label</label>
                            <input
                              type="text"
                              value={field.label}
                              onChange={(e) => handleFieldChange(sectionIndex, fieldIndex, 'label', e.target.value)}
                              className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                              placeholder={`Enter label for Field ${fieldIndex + 1} (e.g., First Name)`}
                            />
                            <p className="text-gray-400 text-sm mt-2">
                              The label displayed for the field.
                            </p>
                          </div>
                          {(field.type === 'select' || field.type === 'checkbox') && (
                            <div>
                              <label className="label">Options (Comma-Separated)</label>
                              <input
                                type="text"
                                value={field.options}
                                onChange={(e) => handleFieldChange(sectionIndex, fieldIndex, 'options', e.target.value)}
                                className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                                placeholder="Enter options (e.g., Option1,Option2,Option3)"
                              />
                              <p className="text-gray-400 text-sm mt-2">
                                Comma-separated list of options for select or checkbox fields.
                              </p>
                            </div>
                          )}
                          <div>
                            <label className="label">Placeholder</label>
                            <input
                              type="text"
                              value={field.placeholder}
                              onChange={(e) => handleFieldChange(sectionIndex, fieldIndex, 'placeholder', e.target.value)}
                              className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                              placeholder={`Enter placeholder for Field ${fieldIndex + 1} (e.g., Your first name)`}
                            />
                            <p className="text-gray-400 text-sm mt-2">
                              The placeholder text displayed in the field.
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={field.required}
                              onChange={(e) => handleFieldChange(sectionIndex, fieldIndex, 'required', e.target.checked)}
                              className="w-5 h-5 rounded border border-gray-600 bg-zinc-800 checked:bg-amber-400 checked:border-amber-400 transition-all"
                            />
                            <label className="text-sm text-gray-200">Required</label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {/* Media Uploads */}
            <div>
              <h3 className="feature-title mb-4">Media Uploads</h3>
              <div className="space-y-4">
                {[
                  { field: 'backgroundImageFile', label: 'Form Background Image', placeholder: 'Click or drag to upload a background image for the form' },
                  { field: 'thankYouBackgroundImageFile', label: 'Thank You Background Image', placeholder: 'Click or drag to upload a background image for the thank you page' },
                ].map(({ field, label, placeholder }) => (
                  <div key={field}>
                    <label className="label">{label}</label>
                    <div className="upload-box">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(field, e)}
                        className="hidden"
                        id={field}
                      />
                      <label
                        htmlFor={field}
                        className="w-full h-40 bg-zinc-900 rounded-lg flex items-center justify-center flex-col cursor-pointer border-2 border-dashed border-gray-600 hover:border-yellow-400 transition-all duration-200"
                      >
                        <span className="text-yellow-400 text-3xl">+</span>
                        <p className="text-gray-400 text-sm mt-2">{placeholder}</p>
                      </label>
                      {formValues[field] && (
                        <p className="text-gray-300 text-sm mt-2">
                          Selected: {formValues[field].name}
                        </p>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mt-2">
                      Select one image file for {label.toLowerCase()}. Only image files are allowed.
                    </p>
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

export default QuestionnaireFormForm;