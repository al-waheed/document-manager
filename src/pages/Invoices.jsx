import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addInvoice, updateInvoice, deleteInvoice } from '../store/invoicesSlice';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import SignatureCanvas from 'react-signature-canvas';
import { TrashIcon, PlusIcon, DocumentTextIcon, EyeIcon } from '@heroicons/react/24/outline';
import InvoicePreview from '../components/InvoicePreview';

function Invoices() {
  const dispatch = useDispatch();
  const invoices = useSelector(state => state.invoices.invoices);
  const [isCreating, setIsCreating] = useState(false);
  const [signatureRef, setSignatureRef] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [formData, setFormData] = useState({
    companyName: '',
    companyLogo: '',
    companyAddress: '',
    customerName: '',
    email: '',
    items: [{ description: '', quantity: 1, price: 0 }],
    notes: '',
    terms: '',
    signature: '',
    invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
    dueDate: format(new Date().setDate(new Date().getDate() + 30), 'yyyy-MM-dd'),
  });

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: '', quantity: 1, price: 0 }],
    });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, items: newItems });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const signature = signatureRef?.getTrimmedCanvas().toDataURL();
    const newInvoice = {
      id: Date.now().toString(),
      ...formData,
      signature,
      date: new Date().toISOString(),
      total: formData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0),
    };
    dispatch(addInvoice(newInvoice));
    setFormData({
      companyName: '',
      companyLogo: '',
      companyAddress: '',
      customerName: '',
      email: '',
      items: [{ description: '', quantity: 1, price: 0 }],
      notes: '',
      terms: '',
      signature: '',
      invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
      dueDate: format(new Date().setDate(new Date().getDate() + 30), 'yyyy-MM-dd'),
    });
    signatureRef?.clear();
    setIsCreating(false);
    toast.success('Invoice created successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
          <p className="mt-1 text-sm text-gray-500">Create and manage your invoices</p>
        </div>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          {isCreating ? (
            'Cancel'
          ) : (
            <>
              <PlusIcon className="h-5 w-5 mr-2" />
              Create Invoice
            </>
          )}
        </button>
      </div>

      {isCreating && (
        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold text-gray-900">Company Information</h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Company Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Company Logo URL</label>
                <input
                  type="url"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  value={formData.companyLogo}
                  onChange={(e) => setFormData({ ...formData, companyLogo: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Company Address</label>
                <textarea
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  rows="2"
                  value={formData.companyAddress}
                  onChange={(e) => setFormData({ ...formData, companyAddress: e.target.value })}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold text-gray-900">Invoice Details</h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Invoice Number</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  value={formData.invoiceNumber}
                  onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Due Date</label>
                <input
                  type="date"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold text-gray-900">Customer Information</h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Customer Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Items</h2>
              <button
                type="button"
                onClick={handleAddItem}
                className="inline-flex items-center text-primary-600 hover:text-primary-700"
              >
                <PlusIcon className="h-5 w-5 mr-1" />
                Add Item
              </button>
            </div>
            {formData.items.map((item, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="md:col-span-2">
                  <input
                    type="text"
                    placeholder="Item Description"
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Quantity"
                    required
                    min="1"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Price"
                    required
                    min="0"
                    step="0.01"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                rows="3"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Terms & Conditions</label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                rows="3"
                value={formData.terms}
                onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
              ></textarea>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Signature</label>
            <div className="mt-1 border rounded-md">
              <SignatureCanvas
                ref={(ref) => setSignatureRef(ref)}
                canvasProps={{
                  className: 'signature-canvas w-full h-40 bg-white',
                }}
              />
            </div>
            <button
              type="button"
              onClick={() => signatureRef?.clear()}
              className="mt-2 text-sm text-gray-500 hover:text-gray-700"
            >
              Clear Signature
            </button>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              Create Invoice
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {invoices.map((invoice) => (
          <div key={invoice.id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-primary-50 rounded-lg p-2">
                  <DocumentTextIcon className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{invoice.invoiceNumber}</h3>
                  <p className="text-xs text-gray-500">{invoice.customerName}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedInvoice(invoice)}
                  className="text-gray-400 hover:text-primary-600"
                >
                  <EyeIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => {
                    dispatch(deleteInvoice(invoice.id));
                    toast.success('Invoice deleted successfully!');
                  }}
                  className="text-gray-400 hover:text-red-600"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Date:</span>
                <span className="font-medium">{format(new Date(invoice.date), 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-500">Due Date:</span>
                <span className="font-medium">{format(new Date(invoice.dueDate), 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-500">Total:</span>
                <span className="font-medium text-primary-600">
                  ${invoice.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedInvoice && (
        <InvoicePreview
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
        />
      )}
    </div>
  );
}

export default Invoices;