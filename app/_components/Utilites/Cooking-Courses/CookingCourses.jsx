
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

const CookingCourses = () => {
  const initialLoveItCard = {
    id: 1,
    title: "Learn traditional paella from a pro chef",
    description:
      "Our experienced local chefs will guide you through authentic techniques and share family secrets to create the perfect paella.",
  };

  const initialIncluded = {
    id: 1,
    text: "Guided local market visit",
  };

  const initialFaq = {
    id: 1,
    question: "Do I need cooking experience?",
    answer:
      "Not at all! This class is designed for all skill levels, from beginners to experienced home cooks. Our chef will guide you through every step of the process.",
  };

  const initialReview = {
    id: 1,
    name: "Maria T.",
    quote:
      "Amazing! Chef Marta was incredible and made us feel like family. The paella was the best I've had in Barcelona, and I can't wait to try making it at home with the recipes she shared.",
  };

  const initialMapDetails = {
    iframeSrc: "https://www.google.com/maps/embed?pb=...",
    locationName: "Cooking School Barcelona",
    address: "Carrer de la Boqueria, 25, 08002 Barcelona, Spain",
  };

  const initialFormValues = {
    loveItCards: [initialLoveItCard],
    included: [initialIncluded],
    faqs: [initialFaq],
    reviews: [initialReview],
    mapDetails: initialMapDetails,
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  const [submitConfirmation, setSubmitConfirmation] = useState(false);
  const [resetConfirmation, setResetConfirmation] = useState(false);

  const handleChange = (section, id, field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [section]: prev[section].map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleMapDetailsChange = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      mapDetails: { ...prev.mapDetails, [field]: value },
    }));
  };

  const addItem = (section, initialItem) => {
    setFormValues((prev) => ({
      ...prev,
      [section]: [
        ...prev[section],
        { ...initialItem, id: prev[section].length + 1, text: "", question: "", answer: "", name: "", quote: "" },
      ],
    }));
  };

  const removeItem = (section, id) => {
    if (formValues[section].length > 1) {
      setFormValues((prev) => ({
        ...prev,
        [section]: prev[section].filter((item) => item.id !== id),
      }));
    } else {
      toast.error(`At least one ${section} item is required.`, {
        duration: 1000,
        className: "toast-error",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allEmpty = Object.values(formValues).every((section) =>
      Array.isArray(section)
        ? section.every((item) =>
            Object.values(item).every((value) => value === "" || value === null)
          )
        : Object.values(section).every((value) => value === "" || value === null)
    );
    if (allEmpty) {
      toast.error(
        "Please fill at least one field before submitting.",
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
      loveItCards: formValues.loveItCards,
      included: formValues.included,
      faqs: formValues.faqs,
      reviews: formValues.reviews,
      mapDetails: formValues.mapDetails,
    };
    console.log("Updated Course Detail Data:", dataToSubmit);
    toast.success("Content has been saved successfully!", {
      duration: 2000,
      className: "toast-success",
    });
  };

  const handleReset = () => {
    setResetConfirmation(true);
  };

  const confirmReset = () => {
    setFormValues(initialFormValues);
    toast.success("Form has been reset.", {
      duration: 1500,
      className: "toast-success",
    });
    setResetConfirmation(false);
  };

  return (
    <div className="main-container">
      <div>
        <div className="flex items-center gap-3 mb-8">
          <MdEdit className="text-yellow-400 w-6 h-6" />
          <h2 className="heading">Customize Course Details</h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 text-white p-8 rounded-xl border border-yellow-400/20 shadow-lg shadow-black/50"
        >
          <div className="space-y-6">
            {/* Why You'll Love It */}
            <div>
              <h3 className="feature-title mb-4">Why You'll Love It</h3>
              <div className="flex items-center justify-between mb-4">
                <label className="label">Cards</label>
                <button
                  type="button"
                  onClick={() => addItem("loveItCards", initialLoveItCard)}
                  className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition-colors duration-200 global-btn"
                >
                  <MdAddCircle className="w-5 h-5" />
                  <span>Add More</span>
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {formValues.loveItCards.map((card) => (
                  <div
                    key={card.id}
                    className="border border-gray-600 rounded-lg p-4 space-y-4 bg-zinc-800"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="text-lg font-semibold text-white">
                        Card {card.id}
                      </h4>
                      {formValues.loveItCards.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem("loveItCards", card.id)}
                          className="text-red-400 hover:text-red-300 transition-colors duration-200 global-btn"
                        >
                          <MdRemoveCircle className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <div>
                      <label className="label">Title</label>
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) =>
                          handleChange("loveItCards", card.id, "title", e.target.value)
                        }
                        className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                        placeholder="Enter card title"
                      />
                    </div>
                    <div>
                      <label className="label">Description</label>
                      <textarea
                        value={card.description}
                        onChange={(e) =>
                          handleChange("loveItCards", card.id, "description", e.target.value)
                        }
                        className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                        rows={4}
                        placeholder="Enter card description"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What's Included */}
            <div>
              <h3 className="feature-title mb-4">What's Included</h3>
              <div className="flex items-center justify-between mb-4">
                <label className="label">Items</label>
                <button
                  type="button"
                  onClick={() => addItem("included", initialIncluded)}
                  className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition-colors duration-200 global-btn"
                >
                  <MdAddCircle className="w-5 h-5" />
                  <span>Add More</span>
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {formValues.included.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-600 rounded-lg p-4 space-y-4 bg-zinc-800"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="text-lg font-semibold text-white">
                        Item {item.id}
                      </h4>
                      {formValues.included.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem("included", item.id)}
                          className="text-red-400 hover:text-red-300 transition-colors duration-200 global-btn"
                        >
                          <MdRemoveCircle className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <div>
                      <label className="label">Text</label>
                      <input
                        type="text"
                        value={item.text}
                        onChange={(e) =>
                          handleChange("included", item.id, "text", e.target.value)
                        }
                        className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                        placeholder="Enter item text"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Frequently Asked Questions */}
            <div>
              <h3 className="feature-title mb-4">Frequently Asked Questions</h3>
              <div className="flex items-center justify-between mb-4">
                <label className="label">FAQs</label>
                <button
                  type="button"
                  onClick={() => addItem("faqs", initialFaq)}
                  className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition-colors duration-200 global-btn"
                >
                  <MdAddCircle className="w-5 h-5" />
                  <span>Add More</span>
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {formValues.faqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="border border-gray-600 rounded-lg p-4 space-y-4 bg-zinc-800"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="text-lg font-semibold text-white">
                        FAQ {faq.id}
                      </h4>
                      {formValues.faqs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem("faqs", faq.id)}
                          className="text-red-400 hover:text-red-300 transition-colors duration-200 global-btn"
                        >
                          <MdRemoveCircle className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <div>
                      <label className="label">Question</label>
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) =>
                          handleChange("faqs", faq.id, "question", e.target.value)
                        }
                        className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                        placeholder="Enter FAQ question"
                      />
                    </div>
                    <div>
                      <label className="label">Answer</label>
                      <textarea
                        value={faq.answer}
                        onChange={(e) =>
                          handleChange("faqs", faq.id, "answer", e.target.value)
                        }
                        className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                        rows={4}
                        placeholder="Enter FAQ answer"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Reviews */}
            <div>
              <h3 className="feature-title mb-4">Customer Reviews</h3>
              <div className="flex items-center justify-between mb-4">
                <label className="label">Reviews</label>
                <button
                  type="button"
                  onClick={() => addItem("reviews", initialReview)}
                  className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition-colors duration-200 global-btn"
                >
                  <MdAddCircle className="w-5 h-5" />
                  <span>Add More</span>
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {formValues.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border border-gray-600 rounded-lg p-4 space-y-4 bg-zinc-800"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="text-lg font-semibold text-white">
                        Review {review.id}
                      </h4>
                      {formValues.reviews.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem("reviews", review.id)}
                          className="text-red-400 hover:text-red-300 transition-colors duration-200 global-btn"
                        >
                          <MdRemoveCircle className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <div>
                      <label className="label">Name</label>
                      <input
                        type="text"
                        value={review.name}
                        onChange={(e) =>
                          handleChange("reviews", review.id, "name", e.target.value)
                        }
                        className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                        placeholder="Enter reviewer name"
                      />
                    </div>
                    <div>
                      <label className="label">Quote</label>
                      <textarea
                        value={review.quote}
                        onChange={(e) =>
                          handleChange("reviews", review.id, "quote", e.target.value)
                        }
                        className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                        rows={4}
                        placeholder="Enter review quote"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Find Us on the Map */}
            <div>
              <h3 className="feature-title mb-4">Find Us on the Map</h3>
              <div className="border border-gray-600 rounded-lg p-4 space-y-4 bg-zinc-800">
                <div>
                  <label className="label">Map iFrame URL</label>
                  <input
                    type="text"
                    value={formValues.mapDetails.iframeSrc}
                    onChange={(e) => handleMapDetailsChange("iframeSrc", e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter Google Maps iFrame URL"
                  />
                </div>
                <div>
                  <label className="label">Location Name</label>
                  <input
                    type="text"
                    value={formValues.mapDetails.locationName}
                    onChange={(e) => handleMapDetailsChange("locationName", e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter location name"
                  />
                </div>
                <div>
                  <label className="label">Address</label>
                  <input
                    type="text"
                    value={formValues.mapDetails.address}
                    onChange={(e) => handleMapDetailsChange("address", e.target.value)}
                    className="w-full bg-zinc-800 rounded-lg p-3 text-white transition-all duration-200"
                    placeholder="Enter address"
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

export default CookingCourses;

 
