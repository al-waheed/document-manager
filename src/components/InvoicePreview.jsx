import { useRef } from "react";
import { format } from "date-fns";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function InvoicePreview({ invoice, onClose, isModalOpen }) {
  const invoiceRef = useRef(null);

  const downloadPDF = async () => {
    const element = invoiceRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      logging: false,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`invoice-${invoice.customerName}-${invoice.invoiceNumber}.pdf`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Invoice Preview
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={downloadPDF}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              Download PDF
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>

        <div className="p-6" ref={invoiceRef}>
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {invoice.companyName}
              </h1>
              {invoice.companyLogo && (
                <img
                  src={invoice.companyLogo}
                  alt="Company Logo"
                  className="h-16 object-contain mt-2"
                />
              )}
              <p className="text-gray-600 mt-2 whitespace-pre-line">
                {invoice.companyAddress}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xl font-semibold text-gray-900">
                {invoice.invoiceNumber}
              </p>
              <p className="text-gray-600">
                Issue Date: {format(new Date(invoice.issueDate), "MMM dd, yyyy")}
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Bill To:
            </h2>
            <p className="text-gray-800 font-medium">{invoice.customerName}</p>
            <p className="text-gray-600">{invoice.email}</p>
          </div>

          <table className="w-full mb-8">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 text-gray-600">Description</th>
                <th className="text-right py-2 text-gray-600">Quantity</th>
                <th className="text-right py-2 text-gray-600">Price</th>
                <th className="text-right py-2 text-gray-600">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 text-gray-800">{item.description}</td>
                  <td className="py-2 text-right text-gray-800">
                    {item.quantity}
                  </td>
                  <td className="py-2 text-right text-gray-800">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="py-2 text-right text-gray-800">
                    ${(item.quantity * item.price).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="py-2 text-right font-semibold">
                  Total:
                </td>
                <td className="py-2 text-right font-semibold text-primary-600">
                  ${invoice.total.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>

          {(invoice.notes || invoice.terms) && (
            <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {invoice.notes && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    Notes
                  </h2>
                  <p className="text-gray-600 whitespace-pre-line">
                    {invoice.notes}
                  </p>
                </div>
              )}
              {invoice.terms && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    Terms & Conditions
                  </h2>
                  <p className="text-gray-600 whitespace-pre-line">
                    {invoice.terms}
                  </p>
                </div>
              )}
            </div>
          )}

          {invoice.signature && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Signature
              </h2>
              <img
                src={invoice.signature}
                alt="Signature"
                className="max-h-20 object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InvoicePreview;
