import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { addDocument, removeDocument } from "../store/documentsSlice";
import FileUpload from "../components/FileUpload";
import DocumentModal from "../components/DocumentModal";
import { TrashIcon, EyeIcon, DocumentIcon } from "@heroicons/react/24/outline";

function Documents() {
  const id = uuidv4();
  const dispatch = useDispatch();
  const documents = useSelector((state) => state.documents.documents);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileUpload = (files) => {
    files.forEach((file) => {
      if (
        file.type.startsWith("application/") ||
        file.type.startsWith("image/")
      ) {
        const reader = new FileReader();
        reader.onload = () => {
          const newDoc = {
            id: id,
            name: file.name,
            size: file.size,
            type: file.type,
            uploadDate: new Date().toISOString(),
            content: reader.result,
          };
          dispatch(addDocument(newDoc));
          toast.success(`${file.name} uploaded successfully!`);
        };
        reader.readAsDataURL(file);
      } else {
        toast.error(
          `Unsupported file type. Only images and document are allowed`
        );
      }
    });
  };

  const handleDelete = (id) => {
    dispatch(removeDocument(id));
    toast.success("Document deleted successfully!");
  };

  const openModal = (document) => {
    setSelectedDocument(document);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
          <p className="mt-1 text-sm text-gray-500">
            Upload and manage your documents in one place
          </p>
        </div>
        <div className="bg-primary-50 rounded-full px-4 py-2">
          <span className="text-primary-700 font-medium">
            {!documents.length
              ? null
              : `${documents.length} Document${
                  documents.length > 1 ? "s" : ""
                }`}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <FileUpload onFileUpload={handleFileUpload} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-primary-50 rounded-lg p-2">
                  <DocumentIcon className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                    {doc.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {Math.round(doc.size / 1024)} KB
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => openModal(doc)}
                  className="text-gray-400 hover:text-primary-600"
                >
                  <EyeIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="text-gray-400 hover:text-red-600"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-xs text-gray-500">
                Uploaded on {new Date(doc.uploadDate).toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-500 truncate">{doc.type}</p>
            </div>
          </div>
        ))}
      </div>

      <DocumentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
        document={selectedDocument}
      />
    </div>
  );
}

export default Documents;
