import { useEffect, useState } from "react";
import Modal from "react-modal";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { truncateFileName } from "../utils/truncateFileName";

function DocumentModal({ isOpen, onClose, document }) {
  const [previewError, setPreviewError] = useState(false);

  useEffect(() => {
    setPreviewError(false);
  }, [document]);

  if (!document) return null;

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "0",
      border: "none",
      borderRadius: "0.5rem",
      width: "90vw",
      height: "90vh",
      maxWidth: "1200px",
      maxHeight: "90vh",
      overflow: "hidden",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      zIndex: 50,
    },
  };

  const fileUrl = document.fileUrl || document.content || "";
  const fileType = document.type || "";

  const isImage = fileType.startsWith("image/");
  const isPdf = fileType === "application/pdf";

  const isOfficeDocument = [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/msword",
    "application/vnd.ms-excel",
  ].includes(fileType);

  const officeViewerUrl = isOfficeDocument
    ? `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
        fileUrl,
      )}`
    : "";

  const handlePreviewError = () => {
    setPreviewError(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Document Preview"
      ariaHideApp={false}
    >
      <div className="bg-white rounded-lg shadow-xl h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b shrink-0">
          <h2
            className="text-xl font-semibold text-gray-900 truncate pr-4"
            title={document.name}
          >
            {truncateFileName(document.name)}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 shrink-0"
            aria-label="Close preview"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Preview */}
        <div className="p-4 flex-1 min-h-0 overflow-auto">
          {previewError ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <p className="text-gray-600 mb-4">
                This document could not be previewed in the browser.
              </p>

              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Open File
              </a>
            </div>
          ) : isImage ? (
            <div className="h-full flex flex-col items-center justify-center">
              <img
                src={fileUrl}
                alt={document.name}
                onError={handlePreviewError}
                className="max-w-full max-h-[70vh] object-contain rounded-md"
              />

              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Open Image
              </a>
            </div>
          ) : isPdf ? (
            <div className="h-full w-full">
              <iframe
                src={fileUrl}
                title={document.name}
                onError={handlePreviewError}
                className="w-full h-full min-h-[70vh] rounded-md border"
              />
            </div>
          ) : isOfficeDocument ? (
            <div className="h-full w-full flex flex-col">
              <iframe
                src={officeViewerUrl}
                title={document.name}
                onError={handlePreviewError}
                className="w-full flex-1 min-h-[70vh] rounded-md border"
              />

              <div className="flex justify-center mt-4 shrink-0">
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                >
                  Open Original File
                </a>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <p className="text-gray-600 mb-4">
                This file type cannot be previewed in the browser.
              </p>

              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Open File
              </a>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default DocumentModal;
