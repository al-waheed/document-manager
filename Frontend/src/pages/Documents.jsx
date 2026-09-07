import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addDocument,
  removeDocument,
  setDocuments,
} from "../store/documentsSlice";
import FileUpload from "../utils/FileUpload";
import DocumentModal from "../components/DocumentModal";
import { TrashIcon, EyeIcon, DocumentIcon } from "@heroicons/react/24/outline";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const mapDocument = (document) => ({
  id: document._id || document.id,
  name: document.name,
  size: document.fileSize,
  type: document.fileType,
  uploadDate: document.createdAt,
  content: document.fileUrl,
  fileUrl: document.fileUrl,
  cloudinaryPublicId: document.cloudinaryPublicId,
});

function Documents() {
  const dispatch = useDispatch();

  const documents = useSelector((state) => state.documents.documents);
  const token = useSelector((state) => state.auth.token);

  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch documents from backend
  useEffect(() => {
    const fetchDocuments = async () => {
      if (!token) {
        dispatch(setDocuments([]));
        return;
      }

      try {
        setIsLoading(true);

        const response = await fetch(`${API_URL}/api/documents`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch documents");
        }

        // IMPORTANT:
        // Replace the Redux list instead of adding the documents
        // one by one. This prevents duplicates after refresh/navigation.
        const mappedDocuments = data.map(mapDocument);

        dispatch(setDocuments(mappedDocuments));
      } catch (error) {
        console.error("Fetch documents error:", error);
        toast.error(error.message || "Failed to load documents");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, [token, dispatch]);

  // Upload documents
  const handleFileOrImageUpload = async (files) => {
    if (!token) {
      toast.error("Authentication required");
      return;
    }

    if (!files || files.length === 0) {
      return;
    }

    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(`${API_URL}/api/documents`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Upload failed");
        }

        const document = mapDocument(data);

        dispatch(addDocument(document));

        toast.success(`${file.name} uploaded successfully!`);
      } catch (error) {
        console.error(`Upload error for ${file.name}:`, error);
        toast.error(error.message || `Failed to upload ${file.name}`);
      }
    }
  };

  // Delete document
  const handleDelete = async (id) => {
    if (!token) {
      toast.error("Authentication required");
      return;
    }

    if (!id) {
      toast.error("Invalid document");
      return;
    }

    try {
      setDeletingId(id);

      const response = await fetch(`${API_URL}/api/documents/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete document");
      }

      dispatch(removeDocument(id));

      // If the deleted document is currently being viewed,
      // close the preview modal.
      if (selectedDocument?.id === id) {
        setSelectedDocument(null);
        setIsModalOpen(false);
      }

      toast.success("Document deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.message || "Failed to delete document");
    } finally {
      setDeletingId(null);
    }
  };

  // Open document preview
  const openModal = (document) => {
    setSelectedDocument(document);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDocument(null);
  };

  const formatFileSize = (size) => {
    if (!size || size <= 0) return "0 KB";

    if (size < 1024) {
      return `${size} B`;
    }

    if (size < 1024 * 1024) {
      return `${Math.round(size / 1024)} KB`;
    }

    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Documents</h1>

          <p className="mt-1 text-sm text-gray-500">
            Upload and manage your documents in one place
          </p>
        </div>

        {documents.length > 0 && (
          <div className="bg-primary-50 rounded-full px-4 py-2">
            <span className="text-primary-700 font-medium">
              {documents.length} Document
              {documents.length > 1 ? "s" : ""}
            </span>
          </div>
        )}
      </div>

      {/* Upload */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <FileUpload onFileUpload={handleFileOrImageUpload} />
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="text-center py-8 text-gray-500">
          Loading your documents...
        </div>
      )}

      {/* Empty state */}
      {!isLoading && documents.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No documents uploaded yet.
        </div>
      )}

      {/* Documents */}
      {!isLoading && documents.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="bg-primary-50 rounded-lg p-2">
                    <DocumentIcon className="h-6 w-6 text-primary-600" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                      {doc.name}
                    </h3>

                    <p className="text-xs text-gray-500">
                      {formatFileSize(doc.size)}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  {/* Preview */}
                  <button
                    type="button"
                    onClick={() => openModal(doc)}
                    disabled={deletingId === doc.id}
                    title="View document"
                    className="text-gray-400 hover:text-primary-600 disabled:opacity-50"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </button>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => handleDelete(doc.id)}
                    disabled={deletingId === doc.id}
                    title="Delete document"
                    className="text-gray-400 hover:text-red-600 disabled:opacity-50"
                  >
                    {deletingId === doc.id ? (
                      <span className="block h-5 w-5 border-2 border-gray-300 border-t-red-600 rounded-full animate-spin" />
                    ) : (
                      <TrashIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-2">
                <p className="text-xs text-gray-500">
                  Uploaded on{" "}
                  {doc.uploadDate
                    ? new Date(doc.uploadDate).toLocaleDateString()
                    : "Unknown date"}
                </p>

                <p className="text-xs text-gray-500 truncate">{doc.type}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Document Preview Modal */}
      <DocumentModal
        isOpen={isModalOpen}
        onClose={closeModal}
        document={selectedDocument}
      />
    </div>
  );
}

export default Documents;
