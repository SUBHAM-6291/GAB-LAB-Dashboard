
"use client";

import React, { useState } from "react";
import { MdEdit, MdAddCircle, MdRemoveCircle } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import "@/components/ui/professional-ui.css";
import ButtonGroup from "@/app/_components/Utilites/Btn";

const FirstCourseCustomizationForm = () => {
  const initialCourse = {
    courseImageFile: null,
    courseTitle: "",
    courseDescription: "",
    courseLocation: "",
    coursePrice: "",
    courseSchedule: "",
    courseCategory: "",
    courseSlug: "",
  };

  const initialFormValues = {
    courses: [initialCourse],
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  const [submitConfirmation, setSubmitConfirmation] = useState(false);
  const [resetConfirmation, setResetConfirmation] = useState(false);
  const [buttonText, setButtonText] = useState("Enroll Now");
  const [buttonUrl, setButtonUrl] = useState("");
  const [primaryButtonText, setPrimaryButtonText] = useState("");
  const [primaryButtonUrl, setPrimaryButtonUrl] = useState("");
  const [secondaryButtonText, setSecondaryButtonText] = useState("");
  const [secondaryButtonUrl, setSecondaryButtonUrl] = useState("");

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleChange = (field, value, courseIndex) => {
    setFormValues((prev) => {
      const newCourses = [...prev.courses];
      newCourses[courseIndex] = {
        ...newCourses[courseIndex],
        [field]: value,
        ...(field === "courseTitle" && { courseSlug: generateSlug(value) }),
      };
      return { ...prev, courses: newCourses };
    });
  };

  const handleButtonTextChange = (e) => {
    setButtonText(e.target.value);
  };

  const handleButtonUrlChange = (e) => {
    setButtonUrl(e.target.value);
  };

  const handlePrimaryButtonTextChange = (e) => {
    setPrimaryButtonText(e.target.value);
  };

  const handlePrimaryButtonUrlChange = (e) => {
    setPrimaryButtonUrl(e.target.value);
  };

  const handleSecondaryButtonTextChange = (e) => {
    setSecondaryButtonText(e.target.value);
  };

  const handleSecondaryButtonUrlChange = (e) => {
    setSecondaryButtonUrl(e.target.value);
  };

  const handleFileChange = (field, e, courseIndex) => {
    const file = e.target.files[0];
    if (file) {
      const isImage = !file.type.startsWith("image/");
      if (isImage) {
        toast.error(`Please select an image file.`, {
          duration: 1000,
          className: "toast-error",
        });
        return;
      }
      setFormValues((prev) => {
        const newCourses = [...prev.courses];
        newCourses[courseIndex] = {
          ...newCourses[courseIndex],
          [field]: file,
        };
        return { ...prev, courses: newCourses };
      });
    }
  };

  const addCourse = () => {
    setFormValues((prev) => ({
      ...prev,
      courses: [...prev.courses, initialCourse],
    }));
  };

  const removeCourse = (index) => {
    setFormValues((prev) => ({
      ...prev,
      courses: prev.courses.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allEmpty = formValues.courses.every((course) =>
      Object.values(course).every((value) => value === "" || value === null)
    ) && buttonText === "" && buttonUrl === "" && primaryButtonText === "" && primaryButtonUrl === "" && secondaryButtonText === "" && secondaryButtonUrl === "";
    if (allEmpty) {
      toast.error(
        "Please fill at least one field or select a file before submitting.",
        {
          duration: 1000,
          className: "toast-error",
        }
      );
    } else {
      setSubmitConfirmation(true);
    }
  };

  const confirmSave = async () => {
    setSubmitConfirmation(false);
    const dataToSubmit = {
      buttonText,
      buttonUrl,
      primaryButtonText,
      primaryButtonUrl,
      secondaryButtonText,
      secondaryButtonUrl,
      courses: formValues.courses.map((course) => ({
        ...course,
        courseImageFile: course.courseImageFile
          ? course.courseImageFile.name
          : null,
      })),
    };
    console.log("Updated Course Data:", dataToSubmit);
    toast.success("Course content has been saved successfully!", {
      duration: 2000,
      className: "toast-success",
    });
  };

  const handleReset = () => {
    setResetConfirmation(true);
  };

  const confirmReset = () => {
    setFormValues(initialFormValues);
    setButtonText("Enroll Now");
    setButtonUrl("");
    setPrimaryButtonText("");
    setPrimaryButtonUrl("");
    setSecondaryButtonText("");
    setSecondaryButtonUrl("");
    toast.success("Form has been reset.", {
      duration: 1500,
      className: "toast-success",
    });
    setResetConfirmation(false);
  };

  return (
    <div className="md:p-8  md:ml-64 pt-[4.5rem] md:pt-26 2xl:pt-30  bg-zinc-950">
      <div>
        <div className="flex items-center gap-3 mb-8">
          <MdEdit className="text-yellow-400 w-6 h-6" />
          <h2 className="heading">Customize Course Cards</h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 text-white p-4 md:p-8 rounded-xl border border-yellow-400/20 shadow-lg shadow-black/50"
        >
          <div className="space-y-6">
            <div>
              <h3 className="feature-title mb-4">Course Cards</h3>
              <div className="flex items-center justify-between mb-4">
                <label className="label">Courses</label>
                <button
                  type="button"
                  onClick={addCourse}
                  className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition-colors duration-200 global-btn"
                >
                  <MdAddCircle className="w-5 h-5" />
                  <span>Add More</span>
                </button>
              </div>

              <div className="grid grid-cols-1  xl:grid-cols-2 gap-5 xl:gap-10">
                {formValues.courses.map((course, index) => (
                  <div
                    key={index}
                    className="border border-gray-600 rounded-lg p-4 space-y-4 bg-zinc-800"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="text-lg font-semibold text-white">
                        Course {index + 1}
                      </h4>
                      {formValues.courses.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeCourse(index)}
                          className="text-red-400 hover:text-red-300 transition-colors duration-200 global-btn"
                        >
                          <MdRemoveCircle className="w-5 h-5" />
                        </button>
                      )}
                    </div>

                    {/* Image Upload */}
                    <div>
                      <label className="label">Course Image</label>
                      <div className="upload-box">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleFileChange("courseImageFile", e, index)
                          }
                          className="hidden"
                          id={`course-image-${index}`}
                        />
                        <label
                          htmlFor={`course-image-${index}`}
                          className="w-full h-20 bg-zinc-900 rounded-lg flex items-center justify-center flex-col cursor-pointer border-2 border-dashed border-gray-600 hover:border-yellow-400 transition-all duration-200"
                        >
                          <span className="text-yellow-400 text-3xl">+</span>
                          <p className="text-gray-300 text-[10px] md:text-sm mt-2">
                            Click or drag to upload an image for the course
                          </p>
                        </label>
                        {course.courseImageFile && (
                          <p className="text-gray-300 text-sm mt-2">
                            Selected: {course.courseImageFile.name}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Course Fields */}
                    {[
                      {
                        field: "courseTitle",
                        label: "Course Title",
                        placeholder: "Enter course title",
                      },
                      {
                        field: "courseDescription",
                        label: "Course Description",
                        placeholder: "Enter course description",
                        isTextarea: true,
                      },
                      {
                        field: "courseLocation",
                        label: "Location",
                        placeholder: "Enter course location",
                      },
                      {
                        field: "coursePrice",
                        label: "Price",
                        placeholder: "Enter course price (e.g., €54)",
                      },
                      {
                        field: "courseSchedule",
                        label: "Schedule",
                        placeholder: "Enter course schedule",
                      },
                      {
                        field: "courseCategory",
                        label: "Category",
                        placeholder: "Enter course category (e.g., Baking)",
                      },
                    ].map(({ field, label, placeholder, isTextarea }) => (
                      <div key={field}>
                        <label className="label">{label}</label>
                        {isTextarea ? (
                          <textarea
                            value={course[field]}
                            onChange={(e) =>
                              handleChange(field, e.target.value, index)
                            }
                            className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                            rows={4}
                            placeholder={placeholder}
                          />
                        ) : (
                          <input
                            type="text"
                            value={course[field]}
                            onChange={(e) =>
                              handleChange(field, e.target.value, index)
                            }
                            className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                            placeholder={placeholder}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Button Text and URL */}
          <div className="pt-8">
            <h2 className="feature-title">
              Customize Card Buttons
            </h2>

            <div className="mt-5 flex flex-col lg:flex-row gap-5">
              <div className="flex flex-col md:flex-row gap-5">
              <div>
                <label htmlFor="primary-button-text" className="subHeading">
                  Button Text 1
                </label>
                <input
                  type="text"
                  name="primary-button-text"
                  id="primary-button-text"
                  value={primaryButtonText}
                  onChange={handlePrimaryButtonTextChange}
                  placeholder="Enter button text"
                  className="border border-gray-300 px-3 py-2 rounded w-full"
                />
              </div>
                 <div>
                <label htmlFor="primary-button-url" className="subHeading">
                  Button 1 Url
                </label>
                <input
                  type="text"
                  name="primary-button-url"
                  id="primary-button-url"
                  value={primaryButtonUrl}
                  onChange={handlePrimaryButtonUrlChange}
                  placeholder="Enter button url"
                  className="border border-gray-300 px-3 py-2 rounded w-full"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-5">
              <div>
                <label htmlFor="secondary-button-text" className="subHeading">
                  Button Text 1
                </label>
                <input
                  type="text"
                  name="secondary-button-text"
                  id="secondary-button-text"
                  value={secondaryButtonText}
                  onChange={handleSecondaryButtonTextChange}
                  placeholder="Enter button text"
                  className="border border-gray-300 px-3 py-2 rounded w-full"
                />
              </div>
                 <div>
                <label htmlFor="secondary-button-url" className="subHeading">
                  Button 1 Url
                </label>
                <input
                  type="text"
                  name="secondary-button-url"
                  id="secondary-button-url"
                  value={secondaryButtonUrl}
                  onChange={handleSecondaryButtonUrlChange}
                  placeholder="Enter button url"
                  className="border border-gray-300 px-3 py-2 rounded w-full"
                />
              </div>
            </div>
            </div>
          </div>

          <div className="mt-8">
            <ButtonGroup onResetClick={handleReset} />
          </div>
        </form>

        {/* Submit Confirmation Dialog */}
        <AlertDialog
          open={submitConfirmation}
          onOpenChange={setSubmitConfirmation}
        >
          <AlertDialogContent className="dialog-content">
            <AlertDialogHeader>
              <AlertDialogTitle className="dialog-title">
                Confirm Submit
              </AlertDialogTitle>
              <AlertDialogDescription className="dialog-description">
                Are you sure you want to submit this content? This action cannot
                be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="dialog-footer">
              <button className="global-btn" onClick={confirmSave}>
                Yes, Submit
              </button>
              <button
                className="global-btn"
                onClick={() => setSubmitConfirmation(false)}
              >
                Cancel
              </button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Reset Confirmation Dialog */}
        <AlertDialog
          open={resetConfirmation}
          onOpenChange={setResetConfirmation}
        >
          <AlertDialogContent className="dialog-content">
            <AlertDialogHeader>
              <AlertDialogTitle className="dialog-title">
                Confirm Reset
              </AlertDialogTitle>
              <AlertDialogDescription className="dialog-description">
                Are you sure you want to reset the form? This will remove all
                unsaved changes.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="dialog-footer">
              <button className="global-btn" onClick={confirmReset}>
                Yes, Reset
              </button>
              <button
                className="global-btn"
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

export default FirstCourseCustomizationForm;
