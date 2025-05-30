import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  addInvoice,
  updateInvoice,
  deleteInvoice,
} from "../store/invoicesSlice";
import { format } from "date-fns";
import { toast } from "react-toastify";
import SignatureCanvas from "react-signature-canvas";
import {
  TrashIcon,
  PlusIcon,
  DocumentTextIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import InvoicePreview from "../components/InvoicePreview";

function Invoices() {
  const dispatch = useDispatch();
  const invoices = useSelector((state) => state.invoices.invoices);
  const [isCreating, setIsCreating] = useState(false);
  const [signatureRef, setSignatureRef] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const id = uuidv4();
  const [formData, setFormData] = useState({
    companyName: "",
    companyLogo: null,
    companyAddress: "",
    customerName: "",
    email: "",
    items: [{ description: "", quantity: 1, price: 0 }],
    notes: "",
    terms: "",
    signature: "",
    invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
    issueDate: format(
      new Date().setDate(new Date().getDate() + 30),
      "yyyy-MM-dd"
    ),
  });

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: "", quantity: 1, price: 0 }],
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
      id: id,
      ...formData,
      signature,
      issueDate: new Date().toISOString(),
      total: formData.items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      ),
    };
    dispatch(addInvoice(newInvoice));
    setFormData({
      companyName: "",
      companyLogo: "",
      companyAddress: "",
      customerName: "",
      email: "",
      items: [{ description: "", quantity: 1, price: 0 }],
      notes: "",
      terms: "",
      signature: "",
      invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
      issueDate: format(
        new Date().setDate(new Date().getDate() + 30),
        "yyyy-MM-dd"
      ),
    });
    signatureRef?.clear();
    setIsCreating(false);
    toast.success("Invoice created successfully!");
  };

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.match(/^image\//)) {
      toast.error("Please upload a valid image file.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, companyLogo: reader.result });
      toast.success(`${file.name} uploaded successfully!`);
    };
    reader.onerror = () => toast.error("Failed to read file");
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
          <p className="mt-1 text-sm text-gray-500">
            Create and manage your invoices
          </p>
        </div>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          {isCreating ? (
            "Cancel"
          ) : (
            <>
              <PlusIcon className="h-5 w-5 mr-2" />
              Create Invoice
            </>
          )}
        </button>
      </div>

      {isCreating && (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow rounded-lg p-6 space-y-6"
        >
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Company Information
            </h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  placeholder="Your Company Name"
                  required
                  className="mt-1 block w-full h-10 pl-3 rounded-md border"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Company Logo
                </label>
                <input
                  type="file"
                  id="companyLogoUpload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUploadImage}
                />
                <label
                  htmlFor="companyLogoUpload"
                  className="mt-1 block w-full h-10 px-3 py-2 rounded-md border border-gray-300 bg-white text-sm cursor-pointer hover:bg-gray-50"
                >
                  {formData.companyLogo ? "Change Image" : "Upload Image"}
                </label>
                {formData.companyLogo && (
                  <div className="mt-2">
                    <img
                      src={formData.companyLogo}
                      alt="Company Logo Preview"
                      className="max-w-[200px] max-h-[200px] object-contain"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, companyLogo: null })
                      }
                      className="text-red-600 text-sm hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Company Address
                </label>
                <input
                  className="mt-1 block w-full h-10 pl-3 rounded-md border"
                  required
                  placeholder="Your Company Address"
                  value={formData.companyAddress}
                  onChange={(e) =>
                    setFormData({ ...formData, companyAddress: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Invoice Details
            </h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Invoice Number
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 pl-3 block w-full h-8 rounded-md border"
                  value={formData.invoiceNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, invoiceNumber: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Issue Date
                </label>
                <input
                  type="date"
                  required
                  className="mt-1 pl-3 block w-full h-8 rounded-md border"
                  value={formData.issueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, issueDate: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Customer Information
            </h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Customer Name
                </label>
                <input
                  type="text"
                  placeholder="Your Customer Name"
                  required
                  className="mt-1 block w-full h-10 pl-3 rounded-md border"
                  value={formData.customerName}
                  onChange={(e) =>
                    setFormData({ ...formData, customerName: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Your Customer Email"
                  required
                  className="mt-1 block w-full h-10 pl-3 rounded-md border"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
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
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-100 rounded-lg"
              >
                <div className="md:col-span-2">
                  <input
                    type="text"
                    placeholder="Item Description"
                    required
                    className="block w-full rounded-md h-8 pl-3 border"
                    value={item.description}
                    onChange={(e) =>
                      handleItemChange(index, "description", e.target.value)
                    }
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Quantity"
                    required
                    min="1"
                    className="block w-full h-8 pl-3 rounded-md border"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        "quantity",
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Price"
                    required
                    min="0"
                    step="0.01"
                    className="block w-full h-8 pl-3 rounded-md border"
                    value={item.price}
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        "price",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Notes (Optional)
              </label>
              <textarea
                className="mt-1 block w-full pl-3 rounded-md border"
                rows="3"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Terms & Conditions (Optional)
              </label>
              <textarea
                className="mt-1 block w-full pl-3 rounded-md border"
                rows="3"
                value={formData.terms}
                onChange={(e) =>
                  setFormData({ ...formData, terms: e.target.value })
                }
              ></textarea>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Signature (Optional)
            </label>
            <div className="mt-1 border rounded-md">
              <SignatureCanvas
                ref={(ref) => setSignatureRef(ref)}
                canvasProps={{
                  className: "signature-canvas w-full h-40 bg-white",
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

      {isCreating ? null : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="bg-white rounded-lg shadow-sm p-4 border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary-50 rounded-lg p-2">
                    <DocumentTextIcon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {invoice.invoiceNumber}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {invoice.customerName}
                    </p>
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
                      toast.success("Invoice deleted successfully!");
                    }}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Issue Date:</span>
                  <span className="font-medium">
                    {format(new Date(invoice.issueDate), "MMM dd, yyyy")}
                  </span>
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
      )}

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
