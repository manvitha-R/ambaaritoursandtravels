// app/utils/itineraryGenerator.js
import { jsPDF } from 'jspdf';

const MARGIN = 20;
const PAGE_WIDTH = 210;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

function ensureSpace(doc, y, needed) {
  const pageHeight = doc.internal.pageSize.height;
  if (y + needed > pageHeight - MARGIN) {
    doc.addPage();
    return MARGIN;
  }
  return y;
}

function writeParagraph(doc, text, y, { fontSize = 10, gap = 6, bullet = false } = {}) {
  doc.setFontSize(fontSize);
  const indent = bullet ? 6 : 0;
  const lines = doc.splitTextToSize(text, CONTENT_WIDTH - indent);
  lines.forEach((line, idx) => {
    y = ensureSpace(doc, y, gap);
    if (bullet && idx === 0) {
      doc.text('-', MARGIN, y);
    }
    doc.text(line, MARGIN + indent, y);
    y += gap;
  });
  return y;
}

function writeSectionHeading(doc, title, y) {
  y = ensureSpace(doc, y, 14);
  y += 4;
  doc.setFontSize(13);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(180, 120, 20);
  doc.text(title, MARGIN, y);
  doc.setTextColor(40, 40, 40);
  doc.setFont(undefined, 'normal');
  y += 3;
  doc.setDrawColor(230, 180, 90);
  doc.setLineWidth(0.4);
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
  return y + 8;
}

// Loads an image and returns it as a PNG data URL + its natural dimensions.
function loadImageAsDataURL(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      try {
        resolve({ dataUrl: canvas.toDataURL('image/png'), width: img.naturalWidth, height: img.naturalHeight });
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = reject;
    img.src = url;
  });
}

// The brand logo assets are all on a solid black background with white text,
// which would show as a black box on a white PDF page. This loads the icon
// mark and chroma-keys the near-black background to transparent so only the
// gold elephant/temple mark survives, then places it next to plain PDF text.
function loadLogoIconAsDataURL(url, threshold = 40) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          if (data[i] < threshold && data[i + 1] < threshold && data[i + 2] < threshold) {
            data[i + 3] = 0;
          }
        }
        ctx.putImageData(imageData, 0, 0);
        resolve({ dataUrl: canvas.toDataURL('image/png'), width: canvas.width, height: canvas.height });
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = reject;
    img.src = url;
  });
}

export const generateItineraryPDF = async (pkg) => {
  const doc = new jsPDF();

  doc.setProperties({
    title: `Itinerary - ${pkg.title}`,
    subject: 'Travel Package Itinerary',
    author: 'Ambaari Tours and Travels',
  });

  // Header - logo icon (chroma-keyed transparent) + company name
  try {
    const logo = await loadLogoIconAsDataURL('/Images/icon.jpeg');
    const logoWidth = 16;
    const logoHeight = (logoWidth / logo.width) * logo.height;
    doc.addImage(logo.dataUrl, 'PNG', MARGIN, 8, logoWidth, logoHeight);
  } catch (err) {
    // Logo is a nice-to-have; continue without it if it fails to load.
  }

  doc.setFontSize(20);
  doc.setTextColor(40, 40, 40);
  doc.setFont(undefined, 'bold');
  doc.text('AMBAARI TOURS AND TRAVELS', PAGE_WIDTH / 2, 18, { align: 'center' });
  doc.setFont(undefined, 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('No 25 1st A Main Road, Byraveshwaranagara, Nagarabhavi Main Road, Bengaluru-560072', PAGE_WIDTH / 2, 25, { align: 'center' });

  let y = 40;
  doc.setFontSize(16);
  doc.setTextColor(20, 20, 20);
  doc.setFont(undefined, 'bold');
  const titleLines = doc.splitTextToSize(pkg.title, CONTENT_WIDTH);
  titleLines.forEach((line) => {
    doc.text(line, MARGIN, y);
    y += 8;
  });
  doc.setFont(undefined, 'normal');

  y += 2;
  doc.setFontSize(10.5);
  doc.setTextColor(70, 70, 70);
  if (pkg.duration) {
    doc.text(`Duration: ${pkg.duration}`, MARGIN, y);
    y += 6;
  }
  if (pkg.destination) {
    doc.text(`Destination: ${pkg.destination}`, MARGIN, y);
    y += 6;
  }
  if (pkg.price) {
    doc.setTextColor(180, 120, 20);
    doc.setFont(undefined, 'bold');
    doc.text(`Price: Rs. ${Number(pkg.price).toLocaleString('en-IN')} per person`, MARGIN, y);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(70, 70, 70);
    y += 6;
  }

  // Poster image
  if (pkg.images && pkg.images[0]) {
    try {
      const poster = await loadImageAsDataURL(pkg.images[0]);
      const maxWidth = CONTENT_WIDTH;
      const maxHeight = 80;
      let w = maxWidth;
      let h = (maxWidth / poster.width) * poster.height;
      if (h > maxHeight) {
        h = maxHeight;
        w = (maxHeight / poster.height) * poster.width;
      }
      y = ensureSpace(doc, y, h + 10);
      y += 4;
      const x = MARGIN + (CONTENT_WIDTH - w) / 2;
      doc.addImage(poster.dataUrl, 'PNG', x, y, w, h);
      y += h + 10;
    } catch (err) {
      // Poster is a nice-to-have; continue without it if it fails to load.
    }
  }

  // Itinerary
  if (pkg.itinerary && pkg.itinerary.length > 0) {
    y = writeSectionHeading(doc, 'Day-wise Itinerary', y + 4);
    pkg.itinerary.forEach((day) => {
      y = ensureSpace(doc, y, 12);
      doc.setFontSize(11.5);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(40, 40, 40);
      doc.text(`Day ${day.day} - ${day.title}`, MARGIN, y);
      doc.setFont(undefined, 'normal');
      y += 7;

      if (day.description) {
        doc.setTextColor(70, 70, 70);
        const points = day.description
          .split(/(?<=[.!?])\s+(?=[A-Z])/)
          .map((p) => p.trim())
          .filter(Boolean);
        points.forEach((point) => {
          y = writeParagraph(doc, point, y, { fontSize: 10, gap: 5.5, bullet: true });
        });
      }

      if (day.meals && day.meals.length > 0) {
        y = ensureSpace(doc, y, 6);
        doc.setFontSize(9.5);
        doc.setTextColor(120, 120, 120);
        doc.text(`Meals: ${day.meals.join(', ')}`, MARGIN + 6, y);
        y += 5.5;
      }
      if (day.accommodation) {
        y = ensureSpace(doc, y, 6);
        doc.setFontSize(9.5);
        doc.setTextColor(120, 120, 120);
        doc.text(`Stay: ${day.accommodation}`, MARGIN + 6, y);
        y += 5.5;
      }
      y += 4;
    });
  }

  // Inclusions
  if (pkg.inclusions && pkg.inclusions.length > 0) {
    y = writeSectionHeading(doc, 'Inclusions', y);
    doc.setTextColor(70, 70, 70);
    pkg.inclusions.forEach((item) => {
      y = writeParagraph(doc, item, y, { fontSize: 10, gap: 6, bullet: true });
    });
  }

  // Exclusions
  if (pkg.exclusions && pkg.exclusions.length > 0) {
    y = writeSectionHeading(doc, 'Exclusions', y);
    doc.setTextColor(70, 70, 70);
    pkg.exclusions.forEach((item) => {
      y = writeParagraph(doc, item, y, { fontSize: 10, gap: 6, bullet: true });
    });
  }

  // Cancellation Policy
  if (pkg.cancellationPolicy) {
    y = writeSectionHeading(doc, 'Cancellation & Refund Policy', y);
    doc.setTextColor(70, 70, 70);
    y = writeParagraph(doc, pkg.cancellationPolicy, y, { fontSize: 10, gap: 6 });
  }

  // Terms & Conditions
  if (pkg.termsConditions) {
    y = writeSectionHeading(doc, 'Terms & Conditions', y);
    doc.setTextColor(70, 70, 70);
    y = writeParagraph(doc, pkg.termsConditions, y, { fontSize: 10, gap: 6 });
  }

  // Footer contact block
  y = ensureSpace(doc, y, 30);
  y += 6;
  doc.setDrawColor(220, 220, 220);
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
  y += 8;
  doc.setFontSize(9.5);
  doc.setTextColor(100, 100, 100);
  doc.text('Ambaari Tours and Travels', MARGIN, y);
  y += 5;
  doc.text('Phone: +91 80730 97430  |  Email: ambaaritoursandtravels09@gmail.com', MARGIN, y);
  y += 5;
  doc.text('Website: www.ambaaritoursandtravels.com', MARGIN, y);

  const slugSafeName = pkg.title.replace(/[^a-zA-Z0-9]+/g, '_').slice(0, 60);
  doc.save(`Itinerary_${slugSafeName}.pdf`);

  return doc;
};
