import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DocumentTextIcon, DocumentIcon } from '@heroicons/react/24/outline';

function Dashboard() {
  const documents = useSelector(state => state.documents.documents);
  const invoices = useSelector(state => state.invoices.invoices);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <DocumentIcon className="h-8 w-8 text-primary-600" />
            <h2 className="ml-3 text-xl font-semibold text-gray-900">Documents</h2>
          </div>
          <p className="mt-2 text-gray-600">Total Documents: {documents.length}</p>
          <Link
            to="/documents"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            Manage Documents
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <DocumentTextIcon className="h-8 w-8 text-primary-600" />
            <h2 className="ml-3 text-xl font-semibold text-gray-900">Invoices</h2>
          </div>
          <p className="mt-2 text-gray-600">Total Invoices: {invoices.length}</p>
          <Link
            to="/invoices"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            Manage Invoices
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;