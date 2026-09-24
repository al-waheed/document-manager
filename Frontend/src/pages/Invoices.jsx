import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addInvoice, deleteInvoice } from "../store/invoicesSlice";
import { format } from "date-fns";
import { toast } from "react-toastify";
import SignatureCanvas from "react-signature-canvas";
import {
  TrashIcon,
  PlusIcon,
  DocumentTextIcon,
  EyeIcon,
  BuildingOffice2Icon,
  UserIcon,
  ClipboardDocumentListIcon,
  PencilSquareIcon,
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
      "yyyy-MM-dd",
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

    newItems[index] = {
      ...newItems[index],
      [field]: value,
    };

    setFormData({
      ...formData,
      items: newItems,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const signature = signatureRef?.getTrimmedCanvas().toDataURL();

    const newInvoice = {
      id,
      ...formData,
      signature,
      issueDate: new Date().toISOString(),
      total: formData.items.reduce(
        (sum, item) => sum + Number(item.quantity) * Number(item.price),
        0,
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
        "yyyy-MM-dd",
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
      setFormData({
        ...formData,
        companyLogo: reader.result,
      });

      toast.success(`${file.name} uploaded successfully!`);
    };

    reader.onerror = () => {
      toast.error("Failed to read file");
    };

    reader.readAsDataURL(file);
  };

  const handleCancel = () => {
    setIsCreating(false);
    signatureRef?.clear();
  };

  return (
    <div className="space-y-8">
      {/* PAGE HEADER */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-600">
            Billing workspace
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-950">
            Invoices
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
            Create professional invoices, keep track of your billing, and
            preview invoices before sending them.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {!isCreating && (
            <div className="hidden rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 sm:block">
              {invoices.length} {invoices.length === 1 ? "invoice" : "invoices"}
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              if (isCreating) {
                handleCancel();
              } else {
                setIsCreating(true);
              }
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700"
          >
            {isCreating ? (
              "Cancel"
            ) : (
              <>
                <PlusIcon className="h-5 w-5" />
                Create invoice
              </>
            )}
          </button>
        </div>
      </div>

      {/* CREATE INVOICE */}
      {isCreating && (
        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
        >
          {/* FORM HEADER */}
          <div className="border-b border-gray-100 bg-gray-50/70 px-6 py-5 sm:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50">
                <DocumentTextIcon className="h-6 w-6 text-primary-600" />
              </div>

              <div>
                <h2 className="text-base font-semibold text-gray-950">
                  Create new invoice
                </h2>

                <p className="mt-0.5 text-sm text-gray-500">
                  Add your business, customer, and billing details.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8 p-6 sm:p-8">
            {/* COMPANY INFORMATION */}
            <section>
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                  <BuildingOffice2Icon className="h-5 w-5 text-gray-600" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-950">
                    Business information
                  </h3>

                  <p className="text-xs text-gray-500">
                    Information displayed on your invoice.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Company name
                  </label>

                  <input
                    type="text"
                    placeholder="Your Company Name"
                    required
                    className="block h-11 w-full rounded-xl border border-gray-200 bg-white px-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-50"
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        companyName: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Company logo
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
                    className="flex h-11 cursor-pointer items-center rounded-xl border border-gray-200 bg-white px-3.5 text-sm text-gray-600 transition hover:border-primary-300 hover:bg-primary-50/40"
                  >
                    {formData.companyLogo
                      ? "Change company logo"
                      : "Upload company logo"}
                  </label>

                  {formData.companyLogo && (
                    <div className="mt-3 flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-gray-200 bg-white">
                        <img
                          src={formData.companyLogo}
                          alt="Company Logo Preview"
                          className="max-h-11 max-w-11 object-contain"
                        />
                      </div>

                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">
                          Logo uploaded
                        </p>

                        <button
                          type="button"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              companyLogo: null,
                            })
                          }
                          className="mt-1 text-xs font-medium text-red-600 hover:text-red-700"
                        >
                          Remove logo
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Company address
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="Your Company Address"
                    className="block h-11 w-full rounded-xl border border-gray-200 bg-white px-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-50"
                    value={formData.companyAddress}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        companyAddress: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </section>

            {/* INVOICE DETAILS */}
            <section className="border-t border-gray-100 pt-8">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                  <ClipboardDocumentListIcon className="h-5 w-5 text-gray-600" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-950">
                    Invoice details
                  </h3>

                  <p className="text-xs text-gray-500">
                    Set the invoice reference and issue date.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Invoice number
                  </label>

                  <input
                    type="text"
                    required
                    className="block h-11 w-full rounded-xl border border-gray-200 bg-white px-3.5 text-sm text-gray-900 outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-50"
                    value={formData.invoiceNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        invoiceNumber: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Issue date
                  </label>

                  <input
                    type="date"
                    required
                    className="block h-11 w-full rounded-xl border border-gray-200 bg-white px-3.5 text-sm text-gray-900 outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-50"
                    value={formData.issueDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        issueDate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </section>

            {/* CUSTOMER */}
            <section className="border-t border-gray-100 pt-8">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                  <UserIcon className="h-5 w-5 text-gray-600" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-950">
                    Customer information
                  </h3>

                  <p className="text-xs text-gray-500">
                    Who is this invoice being issued to?
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Customer name
                  </label>

                  <input
                    type="text"
                    placeholder="Customer Name"
                    required
                    className="block h-11 w-full rounded-xl border border-gray-200 bg-white px-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-50"
                    value={formData.customerName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        customerName: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Customer email
                  </label>

                  <input
                    type="email"
                    placeholder="customer@example.com"
                    required
                    className="block h-11 w-full rounded-xl border border-gray-200 bg-white px-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-50"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </section>

            {/* ITEMS */}
            <section className="border-t border-gray-100 pt-8">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-gray-950">
                    Invoice items
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    Add the products or services being billed.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddItem}
                  className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-primary-200 bg-primary-50 px-3 py-2 text-xs font-semibold text-primary-700 transition hover:bg-primary-100"
                >
                  <PlusIcon className="h-4 w-4" />
                  Add item
                </button>
              </div>

              <div className="overflow-hidden rounded-xl border border-gray-200">
                <div className="hidden grid-cols-12 gap-4 border-b border-gray-200 bg-gray-50 px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500 md:grid">
                  <div className="col-span-6">Description</div>
                  <div className="col-span-2">Quantity</div>
                  <div className="col-span-4">Price</div>
                </div>

                <div className="divide-y divide-gray-100">
                  {formData.items.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 gap-4 bg-white p-4 md:grid-cols-12 md:items-center"
                    >
                      <div className="md:col-span-6">
                        <label className="mb-1.5 block text-xs font-medium text-gray-500 md:hidden">
                          Description
                        </label>

                        <input
                          type="text"
                          placeholder="Item or service description"
                          required
                          className="block h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-50"
                          value={item.description}
                          onChange={(e) =>
                            handleItemChange(
                              index,
                              "description",
                              e.target.value,
                            )
                          }
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="mb-1.5 block text-xs font-medium text-gray-500 md:hidden">
                          Quantity
                        </label>

                        <input
                          type="number"
                          required
                          min="1"
                          className="block h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-50"
                          value={item.quantity}
                          onChange={(e) =>
                            handleItemChange(
                              index,
                              "quantity",
                              parseInt(e.target.value),
                            )
                          }
                        />
                      </div>

                      <div className="md:col-span-4">
                        <label className="mb-1.5 block text-xs font-medium text-gray-500 md:hidden">
                          Price
                        </label>

                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                            $
                          </span>

                          <input
                            type="number"
                            required
                            min="0"
                            step="0.01"
                            className="block h-11 w-full rounded-lg border border-gray-200 pl-7 pr-3 text-sm outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-50"
                            value={item.price}
                            onChange={(e) =>
                              handleItemChange(
                                index,
                                "price",
                                parseFloat(e.target.value),
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end border-t border-gray-200 bg-gray-50 px-5 py-4">
                  <div className="flex items-center gap-8">
                    <span className="text-sm font-medium text-gray-500">
                      Total
                    </span>

                    <span className="text-lg font-bold text-gray-950">
                      $
                      {formData.items
                        .reduce(
                          (sum, item) =>
                            sum + Number(item.quantity) * Number(item.price),
                          0,
                        )
                        .toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* NOTES + TERMS */}
            <section className="border-t border-gray-100 pt-8">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Notes
                    <span className="ml-1 text-xs font-normal text-gray-400">
                      Optional
                    </span>
                  </label>

                  <textarea
                    rows="4"
                    placeholder="Add a note for your customer..."
                    className="block w-full resize-none rounded-xl border border-gray-200 px-3.5 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-50"
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        notes: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Terms & conditions
                    <span className="ml-1 text-xs font-normal text-gray-400">
                      Optional
                    </span>
                  </label>

                  <textarea
                    rows="4"
                    placeholder="Payment terms, due dates, or other conditions..."
                    className="block w-full resize-none rounded-xl border border-gray-200 px-3.5 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-50"
                    value={formData.terms}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        terms: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </section>

            {/* SIGNATURE */}
            <section className="border-t border-gray-100 pt-8">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                  <PencilSquareIcon className="h-5 w-5 text-gray-600" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-950">
                    Signature
                  </h3>

                  <p className="text-xs text-gray-500">
                    Add a signature to your invoice if required.
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
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
                className="mt-2 text-xs font-medium text-gray-500 transition hover:text-gray-800"
              >
                Clear signature
              </button>
            </section>

            {/* FORM ACTIONS */}
            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700"
              >
                <DocumentTextIcon className="h-5 w-5" />
                Create invoice
              </button>
            </div>
          </div>
        </form>
      )}

      {/* INVOICE LIST */}
      {!isCreating && (
        <>
          {invoices.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50">
                <DocumentTextIcon className="h-7 w-7 text-primary-600" />
              </div>

              <h2 className="mt-5 text-base font-semibold text-gray-950">
                No invoices yet
              </h2>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                Create your first professional invoice and keep your billing
                records organized in one place.
              </p>

              <button
                type="button"
                onClick={() => setIsCreating(true)}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700"
              >
                <PlusIcon className="h-5 w-5" />
                Create invoice
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md"
                >
                  {/* CARD TOP */}
                  <div className="border-b border-gray-100 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50">
                          <DocumentTextIcon className="h-6 w-6 text-primary-600" />
                        </div>

                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                            Invoice
                          </p>

                          <h3 className="mt-0.5 truncate text-sm font-bold text-gray-950">
                            {invoice.invoiceNumber}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setSelectedInvoice(invoice)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-primary-50 hover:text-primary-600"
                          title="View invoice"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            dispatch(deleteInvoice(invoice.id));
                            toast.success("Invoice deleted successfully!");
                          }}
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                          title="Delete invoice"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* CARD BODY */}
                  <div className="p-5">
                    <div className="mb-5">
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Billed to
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-gray-900">
                        {invoice.customerName}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-gray-500">
                        {invoice.email}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          Issue date
                        </span>

                        <span className="text-sm font-medium text-gray-800">
                          {format(new Date(invoice.issueDate), "MMM dd, yyyy")}
                        </span>
                      </div>

                      <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                        <span className="text-sm text-gray-500">Total</span>

                        <span className="text-lg font-bold text-primary-600">
                          ${invoice.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CARD FOOTER */}
                  <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/70 px-5 py-3">
                    <span className="text-xs text-gray-400">
                      Professional invoice
                    </span>

                    <button
                      type="button"
                      onClick={() => setSelectedInvoice(invoice)}
                      className="text-xs font-semibold text-primary-600 transition hover:text-primary-700"
                    >
                      View invoice →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* PREVIEW */}
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
