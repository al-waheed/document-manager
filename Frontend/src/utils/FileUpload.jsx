import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";

const ACCEPTED_FILE_TYPES = {
  "application/pdf": [".pdf"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    ".docx",
  ],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
    ".xlsx",
  ],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
};

function FileUpload({ onFileUpload }) {
  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach((rejectedFile) => {
          const message =
            rejectedFile.errors?.[0]?.message ||
            "This file type is not supported.";

          alert(`${rejectedFile.file.name}: ${message}`);
        });
      }

      if (acceptedFiles.length > 0) {
        onFileUpload(acceptedFiles);
      }
    },
    [onFileUpload],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILE_TYPES,
    maxSize: 5 * 1024 * 1024,
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isDragActive
          ? "border-primary-500 bg-primary-50"
          : "border-gray-300 hover:border-primary-500"
      }`}
    >
      <input {...getInputProps()} />

      <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />

      <p className="mt-2 text-sm text-gray-600">
        {isDragActive
          ? "Drop the files here..."
          : "Drag 'n' drop files here, or click to select files"}
      </p>

      <p className="mt-2 text-xs text-gray-400">
        PDF, DOCX, XLSX, JPG, PNG or WEBP — Max 5MB
      </p>
    </div>
  );
}

export default FileUpload;
