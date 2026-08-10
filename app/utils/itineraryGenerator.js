// app/utils/itineraryGenerator.js
import { jsPDF } from 'jspdf';

const MARGIN = 18;
const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

// Brand palette (kept in sync with the site's amber/gold theme).
const COLOR = {
  black: [12, 12, 12],
  gold: [212, 168, 83],
  goldDark: [180, 120, 20],
  cardTint: [253, 246, 232],
  cardBorder: [235, 214, 170],
  heading: [30, 30, 30],
  body: [70, 70, 70],
  muted: [130, 130, 130],
  green: [21, 128, 61],
  red: [190, 40, 40],
  white: [255, 255, 255],
};

const FOOTER_HEIGHT = 16;

function ensureSpace(doc, y, needed) {
  if (y + needed > PAGE_HEIGHT - MARGIN - FOOTER_HEIGHT) {
    doc.addPage();
    return MARGIN;
  }
  return y;
}

function setFill(doc, [r, g, b]) {
  doc.setFillColor(r, g, b);
}
function setDraw(doc, [r, g, b]) {
  doc.setDrawColor(r, g, b);
}
function setText(doc, [r, g, b]) {
  doc.setTextColor(r, g, b);
}

function splitIntoSentences(text) {
  return text
    .split(/(?<=[.!?])\s+(?=[A-Z])/)
    .map((p) => p.trim())
    .filter(Boolean);
}

// Returns the wrapped line count a paragraph will take at a given width —
// used to pre-measure a block's height before drawing its background card.
function countLines(doc, text, width, fontSize) {
  doc.setFontSize(fontSize);
  return doc.splitTextToSize(text, width).length;
}

function writeParagraph(doc, text, x, y, width, { fontSize = 10, gap = 5.5, bulletColor = null } = {}) {
  doc.setFontSize(fontSize);
  const indent = bulletColor ? 5.5 : 0;
  const lines = doc.splitTextToSize(text, width - indent);
  lines.forEach((line, idx) => {
    if (bulletColor && idx === 0) {
      setText(doc, bulletColor);
      doc.text('-', x, y);
      setText(doc, COLOR.body);
    }
    doc.text(line, x + indent, y);
    y += gap;
  });
  return y;
}

function writeSectionHeading(doc, title, y, { icon = null } = {}) {
  // Reserve room for the heading *and* a first chunk of whatever follows —
  // not just the heading's own ~16mm — so a heading can't end up stranded
  // alone at the bottom of a page with its content pushed to the next.
  y = ensureSpace(doc, y, 40);
  y += 6;
  // Small gold accent bar, mirroring the site's section-heading style.
  setFill(doc, COLOR.gold);
  doc.rect(MARGIN, y - 4.5, 2, 6, 'F');
  doc.setFontSize(13.5);
  doc.setFont(undefined, 'bold');
  setText(doc, COLOR.goldDark);
  doc.text(title, MARGIN + 5, y);
  setText(doc, COLOR.heading);
  doc.setFont(undefined, 'normal');
  y += 3;
  setDraw(doc, COLOR.cardBorder);
  doc.setLineWidth(0.4);
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
  return y + 8;
}

// A row of pill badges, centered on the page and wrapped onto additional
// rows if they don't all fit at once — used for Duration/Destination/Price
// on the dark cover page. `highlight` chips get a solid gold fill instead of
// an outline, so the price stands out.
function drawCenteredChipRow(doc, chips, y) {
  const fontSize = 10.5;
  const padX = 8;
  const chipHeight = 10;
  const gap = 6;
  const rowMaxWidth = CONTENT_WIDTH - 10;

  doc.setFontSize(fontSize);
  const measured = chips.map((chip) => ({ ...chip, w: doc.getTextWidth(chip.text) + padX * 2 }));

  const rows = [];
  let current = [];
  let currentWidth = 0;
  measured.forEach((chip) => {
    const addedWidth = current.length > 0 ? gap + chip.w : chip.w;
    if (current.length > 0 && currentWidth + addedWidth > rowMaxWidth) {
      rows.push({ items: current, width: currentWidth });
      current = [];
      currentWidth = 0;
    }
    currentWidth += current.length > 0 ? gap + chip.w : chip.w;
    current.push(chip);
  });
  if (current.length > 0) rows.push({ items: current, width: currentWidth });

  rows.forEach((row) => {
    let x = PAGE_WIDTH / 2 - row.width / 2;
    row.items.forEach((chip) => {
      if (chip.highlight) {
        setFill(doc, COLOR.gold);
        doc.roundedRect(x, y, chip.w, chipHeight, 5, 5, 'F');
        setText(doc, COLOR.black);
        doc.setFont(undefined, 'bold');
      } else {
        setDraw(doc, COLOR.gold);
        doc.setLineWidth(0.5);
        doc.roundedRect(x, y, chip.w, chipHeight, 5, 5, 'S');
        setText(doc, COLOR.gold);
        doc.setFont(undefined, 'normal');
      }
      doc.setFontSize(fontSize);
      doc.text(chip.text, x + chip.w / 2, y + chipHeight / 2 + 1.5, { align: 'center' });
      doc.setFont(undefined, 'normal');
      x += chip.w + gap;
    });
    y += chipHeight + 6;
  });

  return y;
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

// The brand logo assets are on a solid black background, which would show as
// a black box on a white PDF page. This chroma-keys the near-black
// background to transparent so only the gold/white mark survives — used on
// a dark header band below so the (now-transparent) white wordmark stays legible.
function loadChromaKeyedDataURL(url, threshold = 40) {
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
        // Logo source files are letterboxed (lots of black padding around the
        // actual mark) — track the bounding box of surviving pixels as we key
        // out the background, so the result can be cropped to just the logo
        // instead of shrinking the whole padded canvas down to a speck.
        let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;
        for (let py = 0; py < canvas.height; py++) {
          for (let px = 0; px < canvas.width; px++) {
            const i = (py * canvas.width + px) * 4;
            if (data[i] < threshold && data[i + 1] < threshold && data[i + 2] < threshold) {
              data[i + 3] = 0;
            } else {
              if (px < minX) minX = px;
              if (px > maxX) maxX = px;
              if (py < minY) minY = py;
              if (py > maxY) maxY = py;
            }
          }
        }
        ctx.putImageData(imageData, 0, 0);

        if (maxX <= minX || maxY <= minY) {
          // Nothing survived the keying (shouldn't happen) — fall back to the full canvas.
          resolve({ dataUrl: canvas.toDataURL('image/png'), width: canvas.width, height: canvas.height });
          return;
        }

        const pad = 6;
        const cropX = Math.max(0, minX - pad);
        const cropY = Math.max(0, minY - pad);
        const cropW = Math.min(canvas.width, maxX + pad) - cropX;
        const cropH = Math.min(canvas.height, maxY + pad) - cropY;

        const cropped = document.createElement('canvas');
        cropped.width = cropW;
        cropped.height = cropH;
        cropped.getContext('2d').drawImage(canvas, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

        resolve({ dataUrl: cropped.toDataURL('image/png'), width: cropW, height: cropH });
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = reject;
    img.src = url;
  });
}

// jsPDF's built-in fonts (Helvetica) only cover the WinAnsi/Latin-1 code
// page. Emoji and other astral/symbol characters don't just fail to render —
// they measure as the wrong width via getTextWidth/splitTextToSize, which is
// what was throwing off the chip sizing and cutting text off. Strip anything
// outside that range before it ever reaches doc.text().
function sanitizeText(value) {
  if (value === null || value === undefined) return value;
  return String(value)
    .replace(/[\u{1F000}-\u{1FFFF}]/gu, '') // emoji (astral plane)
    .replace(/[☀-➿]/g, '') // misc symbols & dingbats
    .replace(/[←-⇿]/g, '') // arrows
    .replace(/[^\x00-\xFF]/g, '') // anything else outside Latin-1
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

// Picks a distinct photo per itinerary day from the package's image set,
// skipping images[0] (already used as the hero poster) where possible so
// day cards don't just repeat the cover shot.
function pickDayImage(images, index) {
  if (!images || images.length === 0) return null;
  if (images.length === 1) return images[0];
  return images[1 + (index % (images.length - 1))];
}

const imageCache = new Map();
async function getCachedImage(url) {
  if (!url) return null;
  if (imageCache.has(url)) return imageCache.get(url);
  try {
    const img = await loadImageAsDataURL(url);
    imageCache.set(url, img);
    return img;
  } catch {
    imageCache.set(url, null);
    return null;
  }
}

function fitImage(img, maxWidth, maxHeight) {
  let w = maxWidth;
  let h = (maxWidth / img.width) * img.height;
  if (h > maxHeight) {
    h = maxHeight;
    w = (maxHeight / img.height) * img.width;
  }
  return { w, h };
}

// Repeating footer (thin gold rule + contact line + page number) drawn on
// every page in a final pass, once the total page count is known.
function drawFooters(doc) {
  // Page 1 is the cover, which already has its own contact line baked in —
  // the repeating footer bar only applies from the content pages onward.
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 2; i <= totalPages; i++) {
    doc.setPage(i);
    const y = PAGE_HEIGHT - FOOTER_HEIGHT + 4;
    setDraw(doc, COLOR.gold);
    doc.setLineWidth(0.6);
    doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
    doc.setFontSize(8.5);
    setText(doc, COLOR.muted);
    doc.text('Ambaari Tours and Travels  |  +91 96866 26428  |  ambaaritoursandtravels19@gmail.com', MARGIN, y + 5);
    doc.text(`Page ${i} of ${totalPages}`, PAGE_WIDTH - MARGIN, y + 5, { align: 'right' });
  }
}

// Page 1: a proper brochure cover — full black background, logo, package
// title, duration, and the hero poster. Nothing else — the itinerary detail
// starts fresh on page 2.
async function drawCoverPage(doc, pkg) {
  setFill(doc, COLOR.black);
  doc.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, 'F');

  setDraw(doc, COLOR.gold);
  doc.setLineWidth(0.5);
  doc.rect(8, 8, PAGE_WIDTH - 16, PAGE_HEIGHT - 16, 'S');

  let cy = 26;

  doc.setFontSize(9);
  setText(doc, COLOR.gold);
  doc.text('T R A V E L   I T I N E R A R Y', PAGE_WIDTH / 2, cy, { align: 'center' });
  cy += 14;

  try {
    const logo = await loadChromaKeyedDataURL('/Images/logo.jpeg');
    const logoHeight = 24;
    const logoWidth = (logoHeight / logo.height) * logo.width;
    doc.addImage(logo.dataUrl, 'PNG', PAGE_WIDTH / 2 - logoWidth / 2, cy, logoWidth, logoHeight);
    cy += logoHeight + 10;
  } catch (err) {
    // Logo is a nice-to-have; fall back to plain text if it fails to load.
    doc.setFontSize(20);
    setText(doc, COLOR.white);
    doc.setFont(undefined, 'bold');
    doc.text('AMBAARI TOURS AND TRAVELS', PAGE_WIDTH / 2, cy + 8, { align: 'center' });
    doc.setFont(undefined, 'normal');
    cy += 24;
  }

  setDraw(doc, COLOR.gold);
  doc.setLineWidth(0.4);
  doc.line(PAGE_WIDTH / 2 - 20, cy, PAGE_WIDTH / 2 + 20, cy);
  cy += 12;

  doc.setFontSize(20);
  doc.setFont(undefined, 'bold');
  setText(doc, COLOR.white);
  const titleLines = doc.splitTextToSize(pkg.title, CONTENT_WIDTH - 20);
  titleLines.forEach((line) => {
    doc.text(line, PAGE_WIDTH / 2, cy, { align: 'center' });
    cy += 9;
  });
  doc.setFont(undefined, 'normal');
  cy += 4;

  const coverChips = [];
  if (pkg.duration) coverChips.push({ text: pkg.duration });
  if (pkg.destination) coverChips.push({ text: pkg.destination });
  if (pkg.price) coverChips.push({ text: `Rs. ${Number(pkg.price).toLocaleString('en-IN')} / person`, highlight: true });
  if (coverChips.length > 0) {
    cy = drawCenteredChipRow(doc, coverChips, cy);
    cy += 8;
  }

  const posterImg = pkg.images && pkg.images[0] ? await getCachedImage(pkg.images[0]) : null;
  const bottomReserved = 24; // room for the contact line at the very bottom
  const maxPosterHeight = PAGE_HEIGHT - bottomReserved - cy - 6;
  if (posterImg && maxPosterHeight > 40) {
    const { w, h } = fitImage(posterImg, CONTENT_WIDTH - 8, maxPosterHeight);
    const px = PAGE_WIDTH / 2 - w / 2;
    const py = cy + (maxPosterHeight - h) / 2;
    setDraw(doc, COLOR.gold);
    doc.setLineWidth(0.8);
    doc.rect(px - 1.5, py - 1.5, w + 3, h + 3, 'S');
    doc.addImage(posterImg.dataUrl, 'PNG', px, py, w, h);
  }

  doc.setFontSize(8.5);
  setText(doc, [180, 180, 180]);
  doc.text(
    'Ambaari Tours and Travels  |  +91 96866 26428  |  www.ambaaritoursandtravels.com',
    PAGE_WIDTH / 2,
    PAGE_HEIGHT - 14,
    { align: 'center' }
  );
}

export const generateItineraryPDF = async (rawPkg) => {
  // Clean every piece of free-text content once, up front, so nothing below
  // has to remember to sanitize — see sanitizeText() for why this matters.
  const pkg = {
    ...rawPkg,
    title: sanitizeText(rawPkg.title),
    duration: sanitizeText(rawPkg.duration),
    destination: sanitizeText(rawPkg.destination),
    inclusions: (rawPkg.inclusions || []).map(sanitizeText),
    exclusions: (rawPkg.exclusions || []).map(sanitizeText),
    cancellationPolicy: sanitizeText(rawPkg.cancellationPolicy),
    termsConditions: sanitizeText(rawPkg.termsConditions),
    itinerary: (rawPkg.itinerary || []).map((day) => ({
      ...day,
      title: sanitizeText(day.title),
      description: sanitizeText(day.description),
      meals: (day.meals || []).map(sanitizeText),
      accommodation: sanitizeText(day.accommodation),
    })),
  };

  const doc = new jsPDF();

  doc.setProperties({
    title: `Itinerary - ${pkg.title}`,
    subject: 'Travel Package Itinerary',
    author: 'Ambaari Tours and Travels',
  });

  // ---- Page 1: cover — logo, title, duration, destination, price, poster. ----
  await drawCoverPage(doc, pkg);
  doc.addPage();
  let y = MARGIN;

  // ---- Day-wise itinerary — each day is its own image + tinted card ----
  if (pkg.itinerary && pkg.itinerary.length > 0) {
    y = writeSectionHeading(doc, 'Day-wise Itinerary', y);

    for (let index = 0; index < pkg.itinerary.length; index++) {
      const day = pkg.itinerary[index];
      const dayImgUrl = pickDayImage(pkg.images, index);
      const dayImg = dayImgUrl ? await getCachedImage(dayImgUrl) : null;

      const cardX = MARGIN;
      const cardWidth = CONTENT_WIDTH;
      const innerX = cardX + 5;
      const innerWidth = cardWidth - 10;

      // Image sits in a fixed left column with the text in a column to its
      // right — matching the site's day-card layout — instead of stacking
      // the photo above the text.
      const IMG_COL_WIDTH = 52;
      const COL_GAP = 5;
      const hasImage = !!dayImg;
      const textX = hasImage ? innerX + IMG_COL_WIDTH + COL_GAP : innerX;
      const textWidth = hasImage ? innerWidth - IMG_COL_WIDTH - COL_GAP : innerWidth;
      const fittedImg = hasImage ? fitImage(dayImg, IMG_COL_WIDTH, 42) : null;

      // Pre-measure the text column's height so the tinted card can be drawn
      // behind the content (jsPDF has no z-ordering, so this has to be a
      // measure-then-draw two-pass), then take the taller of the two columns.
      let textH = 0;
      if (day.description) {
        splitIntoSentences(day.description).forEach((point) => {
          textH += countLines(doc, point, textWidth - 5.5, 10) * 5.5;
        });
      }
      if (day.meals && day.meals.length > 0) textH += 5.5;
      if (day.accommodation) textH += 5.5;

      const columnsH = Math.max(fittedImg ? fittedImg.h : 0, textH);
      const measuredH = 9 + columnsH + 6; // heading + taller column + bottom padding

      // Keep each day card intact on one page rather than splitting it.
      if (y + measuredH > PAGE_HEIGHT - MARGIN - FOOTER_HEIGHT) {
        doc.addPage();
        y = MARGIN;
      }

      const cardTop = y - 3;
      setFill(doc, COLOR.cardTint);
      setDraw(doc, COLOR.cardBorder);
      doc.setLineWidth(0.3);
      doc.roundedRect(cardX, cardTop, cardWidth, measuredH + 6, 2.5, 2.5, 'FD');
      setFill(doc, COLOR.gold);
      doc.rect(cardX, cardTop, 1.6, measuredH + 6, 'F');

      // Day badge + title
      doc.setFontSize(11.5);
      doc.setFont(undefined, 'bold');
      setText(doc, COLOR.goldDark);
      doc.text(`Day ${day.day}`, innerX, y + 2);
      const dayLabelWidth = doc.getTextWidth(`Day ${day.day}`);
      setText(doc, COLOR.heading);
      doc.text(` - ${day.title}`, innerX + dayLabelWidth, y + 2);
      doc.setFont(undefined, 'normal');
      y += 9;

      const columnsTop = y;

      // Left column: day photo
      if (fittedImg) {
        setDraw(doc, COLOR.gold);
        doc.setLineWidth(0.5);
        doc.rect(innerX - 0.5, columnsTop - 0.5, fittedImg.w + 1, fittedImg.h + 1, 'S');
        doc.addImage(dayImg.dataUrl, 'PNG', innerX, columnsTop, fittedImg.w, fittedImg.h);
      }

      // Right column: description, then meals / stay
      let ty = columnsTop;
      if (day.description) {
        setText(doc, COLOR.body);
        splitIntoSentences(day.description).forEach((point) => {
          ty = writeParagraph(doc, point, textX, ty, textWidth, { fontSize: 10, gap: 5.5, bulletColor: COLOR.gold });
        });
      }
      if (day.meals && day.meals.length > 0) {
        doc.setFontSize(9.5);
        setText(doc, COLOR.green);
        doc.text(`Meals: ${day.meals.join(', ')}`, textX, ty);
        ty += 5.5;
      }
      if (day.accommodation) {
        doc.setFontSize(9.5);
        setText(doc, COLOR.muted);
        doc.text(`Stay: ${day.accommodation}`, textX, ty);
        ty += 5.5;
      }

      y = cardTop + measuredH + 6 + 8; // move past the card, plus gap to next
    }
  }

  // ---- Inclusions / Exclusions ----
  if (pkg.inclusions && pkg.inclusions.length > 0) {
    y = writeSectionHeading(doc, 'Inclusions', y);
    pkg.inclusions.forEach((item) => {
      y = ensureSpace(doc, y, 6);
      setText(doc, COLOR.body);
      y = writeParagraph(doc, item, MARGIN, y, CONTENT_WIDTH, { fontSize: 10, gap: 6, bulletColor: COLOR.green });
    });
  }

  if (pkg.exclusions && pkg.exclusions.length > 0) {
    y = writeSectionHeading(doc, 'Exclusions', y);
    pkg.exclusions.forEach((item) => {
      y = ensureSpace(doc, y, 6);
      setText(doc, COLOR.body);
      y = writeParagraph(doc, item, MARGIN, y, CONTENT_WIDTH, { fontSize: 10, gap: 6, bulletColor: COLOR.red });
    });
  }

  // ---- Policies ----
  if (pkg.cancellationPolicy) {
    y = writeSectionHeading(doc, 'Cancellation & Refund Policy', y);
    setText(doc, COLOR.body);
    y = writeParagraph(doc, pkg.cancellationPolicy, MARGIN, y, CONTENT_WIDTH, { fontSize: 10, gap: 6 });
  }

  if (pkg.termsConditions) {
    y = writeSectionHeading(doc, 'Terms & Conditions', y);
    setText(doc, COLOR.body);
    y = writeParagraph(doc, pkg.termsConditions, MARGIN, y, CONTENT_WIDTH, { fontSize: 10, gap: 6 });
  }

  // ---- Closing note ----
  y = ensureSpace(doc, y, 20);
  y += 6;
  setFill(doc, COLOR.black);
  doc.roundedRect(MARGIN, y, CONTENT_WIDTH, 16, 2, 2, 'F');
  doc.setFontSize(10);
  setText(doc, COLOR.gold);
  doc.setFont(undefined, 'bold');
  doc.text('Ready to book this trip?', MARGIN + 5, y + 6.5);
  doc.setFont(undefined, 'normal');
  setText(doc, COLOR.white);
  doc.setFontSize(9);
  doc.text('Call +91 96866 26428 or visit www.ambaaritoursandtravels.com to confirm your dates.', MARGIN + 5, y + 12);

  // ---- Footers on every page ----
  drawFooters(doc);

  const slugSafeName = pkg.title.replace(/[^a-zA-Z0-9]+/g, '_').slice(0, 60);
  doc.save(`Itinerary_${slugSafeName}.pdf`);

  return doc;
};
