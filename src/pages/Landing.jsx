import { Link } from "react-router-dom";
import { DocumentTextIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { howItsworks, keyFeatures } from "../utils/data";

function Landing() {
  return (
    <div className="min-h-screen">
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

      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {keyFeatures.map((feature, index) => {
              return (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <feature.icon className="h-12 w-12 text-primary-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {howItsworks.map((step, index) => {
                return (
                  <div key={index} className="text-center">
                    <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary-600">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

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
