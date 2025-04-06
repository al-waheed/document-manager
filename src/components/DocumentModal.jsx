import Modal from "react-modal";
import { XMarkIcon } from "@heroicons/react/24/outline";

Modal.setAppElement("#root");

function DocumentModal({ isOpen, onClose, document }) {
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
      maxWidth: "90vw",
      maxHeight: "90vh",
      overflow: "auto",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };

  const truncate = (filename, max = 50) => {
    const parts = filename.split(".");
    const ext = parts.length > 1 ? "." + parts.pop() : "";
    const namewithoutExt = parts.join(".");

    return namewithoutExt.length > max
      ? namewithoutExt.slice(0, max) + "..." + ext
      : filename;
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Document Preview"
    >
      <div className="bg-white rounded-lg shadow-xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {truncate(document.name)}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="p-4">
          {document.type.startsWith("image/") ? (
            <div className="flex items-center flex-col">
              <img
                src={document.content}
                alt={document.name}
                className="w-[60vw] h-auto rounded-md truncate"
              />
              <a
                href={document.content}
                download={document.name}
                className="mt-5 inline-flex items-center px-4 py-2 border border-transparent text-md font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Download File
              </a>
            </div>
          ) : document.type.startsWith("application/") ? (
            <iframe
              src={document.content}
              title={document.name}
              className="w-full h-[80vh]"
            />
          ) : null}
        </div>
      </div>
    </Modal>
  );
}

export default DocumentModal;
