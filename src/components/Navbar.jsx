import { Link } from "react-router-dom";
import { useState } from "react";
import {
  DocumentTextIcon,
  DocumentIcon,
  HomeIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

function Navbar() {
  const [showIcon, setShowIcon] = useState(true);
  const toggleShowIcon = () => {
    setShowIcon(!showIcon);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex  items-center justify-between h-20">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <DocumentTextIcon className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">
                DocManager
              </span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/dashboard"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >
                <HomeIcon className="h-5 w-5 mr-1" />
                Dashboard
              </Link>
              <Link
                to="/documents"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                <DocumentIcon className="h-5 w-5 mr-1" />
                Documents
              </Link>
              <Link
                to="/invoices"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                <DocumentTextIcon className="h-5 w-5 mr-1" />
                Invoices
              </Link>
            </div>
            <div className="sm:hidden flex ml-auto">
              <button onClick={toggleShowIcon}>
                {showIcon ? (
                  <Bars3Icon className="h-8 w-8 text-primary-600" />
                ) : (
                  <XMarkIcon className="h-8 w-8 text-primary-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
