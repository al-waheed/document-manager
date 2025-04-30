import { useRef } from "react";
import { format } from "date-fns";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { waterMarkStyle } from "../utils/WaterMarkStyle";

function InvoicePreview({ invoice, onClose }) {
  const invoiceRef = useRef(null);

  const downloadPDF = async () => {
    const element = invoiceRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      logging: false,
      useCORS: true,
      backgroundColor: null,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`invoice-${invoice.customerName}-${invoice.invoiceNumber}.pdf`);
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Invoice - ${invoice.invoiceNumber}-${
      invoice.customerName
    }</title>
          <style>
            body { 
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
            }
            @media print {
              .watermark {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-image: ${waterMarkStyle(invoice.companyName)};
                background-repeat: repeat;
                opacity: 0.2;
                z-index: -1;
                pointer-events: none;
              }
              .no-print { display: none !important; }
              @page { margin: 0; }
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            th, td {
              padding: 8px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            th {
              background-color: #f2f2f2;
            }
            .text-right { text-align: right; }
            .font-semibold { font-weight: 600; }
            .text-primary-600 { color: #2563eb; }
          </style>
        </head>
        <body>
          <div class="watermark"></div>
          <div>${invoiceRef.current.innerHTML}</div>
          <script>
            setTimeout(() => {
              window.print();
              setTimeout(() => window.close(), 500);
            }, 200);
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
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
              onClick={handlePrint}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Print
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>

        <div className="p-6 relative min-h-[1100px]" ref={invoiceRef}>
          <div
            className="absolute inset-0 -z-10 opacity-10 pointer-events-none"
            style={{
              backgroundImage: waterMarkStyle(invoice.companyName),
              backgroundRepeat: "repeat",
              opacity: 0.2,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: -1,
              pointerEvents: "none",
            }}
          />
          <div className="relative z-10 bg-white bg-opacity-90 p-6">
            <div className="mb-8 flex justify-between items-start">
              <div>
                {invoice.companyLogo && (
                  <img
                    src={invoice.companyLogo}
                    alt="Company Logo"
                    className="h-16 object-contain"
                  />
                )}
                <h1 className="text-2xl font-bold text-gray-900 mt-2">
                  {invoice.companyName}
                </h1>
                <p className="text-gray-600 mt-2 whitespace-pre-line">
                  {invoice.companyAddress}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-semibold text-gray-900">
                  {invoice.invoiceNumber}
                </p>
                <p className="text-gray-600">
                  Issue Date:{" "}
                  {format(new Date(invoice.issueDate), "MMM dd, yyyy")}
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Bill To:
              </h2>
              <p className="text-gray-800 font-medium">
                {invoice.customerName}
              </p>
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
    </div>
  );
}

export default InvoicePreview;
