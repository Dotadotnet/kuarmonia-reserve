import React, { useState } from "react";
import Modal from "@/components/shared/modal/Modal";
import OutlineEye from "@/components/icons/OutlineEye";
import Computer from "@/components/icons/Computer";
import Mobile from "@/components/icons/Mobile";
import "./ContentPreviewModal.css";

const ContentPreviewModal = ({ isOpen, onClose, content }) => {
  const [viewMode, setViewMode] = useState("split"); // 'split', 'mobile', or 'desktop'

  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="w-11/12 max-w-6xl h-5/6 overflow-hidden"
    >
      <div className="flex flex-col h-full">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">پیش نمایش محتوا</h2>

          {/* View Mode Toggle Buttons */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => toggleViewMode("mobile")}
              className={`p-2 rounded-lg ${viewMode === "mobile" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              title="نمای موبایل"
            >
              <Mobile className="w-5 h-5" />
            </button>
            <button
              type="button"

              onClick={() => toggleViewMode("desktop")}
              className={`p-2 rounded-lg ${viewMode === "desktop" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              title="نمای دسکتاپ"
            >
              <Computer className="w-5 h-5" />
            </button>
            <button
              type="button"

              onClick={() => toggleViewMode("split")}
              className={`p-2 rounded-lg ${viewMode === "split" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              title="نمای ترکیبی"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </button>
          </div>

          <button
            onClick={onClose}
                        type="button"

            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-auto p-4">
          {viewMode === "split" ? (
            // Split View (Default)
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Mobile Preview */}
              <div className="flex-1">
                <h3 className="text-lg  mb-4 text-center">نمای موبایل</h3>
                <div className="border-2 border-gray-300 rounded-lg p-4 mx-auto" style={{ maxWidth: '375px' }}>
                  <div className="bg-white rounded-lg shadow-lg p-4">
                    <div
                      className="content-preview mobile-preview"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  </div>
                </div>
              </div>

              {/* Desktop Preview */}
              <div className="flex-1">
                <h3 className="text-lg  mb-4 text-center">نمای دسکتاپ</h3>
                <div className="border-2 border-gray-300 rounded-lg p-4">
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <div
                      className="content-preview desktop-preview"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : viewMode === "mobile" ? (
            // Mobile Full View
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <div className="border-2 border-gray-300 rounded-lg p-4 mx-auto">
                  <div className="bg-white rounded-lg shadow-lg p-4">
                    <div
                      className="content-preview mobile-preview"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Desktop Full View
            <div className="flex justify-center">
              <div className="w-full">
                <div className="border-2 border-gray-300 rounded-lg p-4">
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <div
                      className="content-preview desktop-preview"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ContentPreviewModal;