import { Link } from "react-router-dom";
import {
  DocumentTextIcon,
  DocumentIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Streamline Your Document & Invoice Management
            </h1>
            <p className="text-xl mb-8 text-primary-50">
              A powerful solution for managing documents and creating
              professional invoices in one place.
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center px-6 py-3 bg-white text-primary-600 rounded-full font-semibold hover:bg-primary-50 transition-colors"
            >
              Get Started
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <DocumentIcon className="h-12 w-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Document Management
              </h3>
              <p className="text-gray-600">
                Securely upload, store, and organize all your important
                documents in one centralized location.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <DocumentTextIcon className="h-12 w-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Professional Invoices
              </h3>
              <p className="text-gray-600">
                Create and customize professional invoices with your company
                branding, digital signatures, and more.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <svg
                className="h-12 w-12 text-primary-600 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Easy Export</h3>
              <p className="text-gray-600">
                Download your documents and invoices in PDF format for
                professional sharing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Upload Documents</h3>
                <p className="text-gray-600">
                  Easily upload your documents using drag-and-drop or file
                  selection.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Create Invoices</h3>
                <p className="text-gray-600">
                  Generate professional invoices with your branding and digital
                  signature.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Download & Manage</h3>
                <p className="text-gray-600">
                  Organize and save your files, Download in PDF format for easy
                  sharing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-primary-50">
            Join businesses managing their documents and invoices efficiently.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center px-6 py-3 bg-white text-primary-600 rounded-full font-semibold hover:bg-primary-50 transition-colors"
          >
            Access DocManager
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <DocumentTextIcon className="h-8 w-8 text-primary-400" />
                <span className="ml-2 text-xl font-bold">DocManager</span>
              </div>
              <p className="text-gray-400">
                Your complete solution for document and invoice management.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Document Upload</li>
                <li>Invoice Generation</li>
                <li>Digital Signatures</li>
                <li>PDF Export</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Support Center</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>support@docmanager.com</li>
                <li>(+234) 123-4567-890</li>
                <li>123 Ajisegiri Street</li>
                <li>KLM 100, Oshodi Road</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} DocManager. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
