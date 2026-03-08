// app/utils/invoiceGenerator.js

// IMPORTANT: Import like this for compatibility
import { jsPDF } from 'jspdf';

// Initialize jsPDF first
const PDFDocument = jsPDF;

export const generateInvoice = (bookingData) => {
  // Create new PDF document
  const doc = new PDFDocument();
  
  // Set document properties
  doc.setProperties({
    title: `Invoice - ${bookingData.bookingId}`,
    subject: 'Travel Package Booking Invoice',
    author: 'Ambaari Tours and Travels'
  });
  
  // Header
  doc.setFontSize(24);
  doc.setTextColor(40, 40, 40);
  doc.text('AMBAARI TOURS AND TRAVELS', 105, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text('INVOICE', 105, 30, { align: 'center' });
  
  // Invoice details
  doc.setFontSize(10);
  doc.text(`Invoice Number: ${bookingData.bookingId}`, 20, 45);
  doc.text(`Invoice Date: ${bookingData.invoiceDate}`, 20, 52);
  
  // Company Info
  doc.setFontSize(9);
  doc.text('AMBAARI TOURS AND TRAVELS', 20, 65);
  doc.text('3rd Floor, No.879/e, next to Income tax office,', 20, 72);
  doc.text('6th Block, Koramangala, Bengaluru, Karnataka 560034', 20, 79);
  doc.text('+91-80730 97430', 20, 86);
  doc.text('ambaaritoursandtravels09@gmail.com', 20, 93);
  
  // Customer Info
  doc.setFontSize(11);
  doc.text('BILL TO:', 20, 110);
  
  doc.setFontSize(10);
  doc.text(bookingData.traveler.name, 20, 117);
  doc.text(bookingData.traveler.email, 20, 124);
  doc.text(bookingData.traveler.phone, 20, 131);
  
  // Draw table manually (without autoTable to avoid issues)
  drawTable(doc, bookingData);
  
  // Bank Details
  const tableBottom = 180; // Adjust based on your table height
  doc.setFontSize(12);
  doc.text('BANK DETAILS', 20, tableBottom);
  
  doc.setFontSize(10);
  doc.text('Bank: Bank Of Baroda', 20, tableBottom + 10);
  doc.text('Account Name: Sharath Naik', 20, tableBottom + 17);
  doc.text('Account Number: 84300001084', 20, tableBottom + 24);
  doc.text('IFSC Code: BARBOVJHALE', 20, tableBottom + 31);
  
  // Payment Info
  doc.text(`Payment Method: ${bookingData.payment.method.toUpperCase()}`, 20, tableBottom + 45);
  doc.text(`Payment Reference: ${bookingData.payment.reference || 'N/A'}`, 20, tableBottom + 52);
  doc.text(`Payment Status: ${bookingData.payment.verified ? 'Verified' : 'Pending'}`, 20, tableBottom + 59);
  
  // Footer
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text('Thank you for choosing Ambaari Tours and Travels!', 105, pageHeight - 40, { align: 'center' });
  doc.text('This is a computer-generated invoice.', 105, pageHeight - 30, { align: 'center' });
  
  // Signature
  doc.setFontSize(11);
  doc.setTextColor(40, 40, 40);
  doc.text('SHARATH NAIK', 20, pageHeight - 20);
  doc.setFontSize(9);
  doc.text('Manager', 20, pageHeight - 15);
  doc.text('Ambaari Tours and Travels', 20, pageHeight - 10);
  
  // Save PDF
  const fileName = `Invoice_${bookingData.bookingId}.pdf`;
  doc.save(fileName);
  
  return doc;
};

// Helper function to draw table manually
const drawTable = (doc, bookingData) => {
  const startY = 140;
  
  // Table header
  doc.setFontSize(10);
  doc.setFont(undefined, 'bold');
  doc.text('Item & Description', 20, startY);
  doc.text('Package Price', 110, startY);
  doc.text('No. Pax', 150, startY);
  doc.text('Amount', 180, startY);
  
  // Header line
  doc.setLineWidth(0.5);
  doc.line(20, startY + 2, 190, startY + 2);
  
  // Table content
  doc.setFont(undefined, 'normal');
  const packageInfo = `${bookingData.package.name}\nDuration: ${bookingData.package.duration}\nCategory: ${bookingData.package.category}`;
  
  // Split text to fit in column
  const lines = doc.splitTextToSize(packageInfo, 70);
  let yPos = startY + 10;
  
  lines.forEach((line, index) => {
    doc.text(line, 20, yPos);
    if (index === 0) {
      // First line has the prices
      doc.text(`₹${bookingData.package.price.toLocaleString('en-IN')}`, 110, yPos);
      doc.text(bookingData.traveler.travelers.toString(), 150, yPos);
      doc.text(`₹${(bookingData.package.price * bookingData.traveler.travelers).toLocaleString('en-IN')}`, 180, yPos);
    }
    yPos += 7;
  });
  
  // Separator
  yPos += 5;
  doc.line(20, yPos, 190, yPos);
  
  // Summary
  const subtotal = bookingData.package.price * bookingData.traveler.travelers;
  const gst = subtotal * 0.05;
  const total = subtotal + gst;
  
  yPos += 10;
  doc.setFont(undefined, 'bold');
  doc.text('Sub-Total', 140, yPos);
  doc.text(`₹${subtotal.toLocaleString('en-IN')}`, 180, yPos);
  
  yPos += 7;
  doc.text('Tax (5%)', 140, yPos);
  doc.text(`₹${gst.toLocaleString('en-IN')}`, 180, yPos);
  
  yPos += 7;
  doc.setFontSize(11);
  doc.text('Total', 140, yPos);
  doc.text(`₹${total.toLocaleString('en-IN')}`, 180, yPos);
  
  return yPos;
};

// Alternative: Generate invoice URL for preview/download
export const generateInvoiceUrl = (bookingData) => {
  const doc = generateInvoice(bookingData);
  return doc.output('datauristring');
};