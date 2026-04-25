/**
 * POST /api/newsletter
 * Send a travel update email to ALL subscribers.
 *
 * Body:
 * {
 *   "adminKey": "YOUR_ADMIN_SECRET",   <- must match ADMIN_SECRET in .env.local
 *   "subject": "Summer Deals – 40% Off Thailand!",
 *   "previewText": "Book before June 30 and save big",
 *   "heading": "🌴 Summer Sale is LIVE",
 *   "body": "We have amazing deals this summer...",
 *   "ctaText": "View Deals",
 *   "ctaUrl": "https://ambaaritoursandtravels.com/Packages"
 * }
 */
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { promises as fs } from "fs";
import path from "path";

const SUBSCRIBERS_FILE = path.join(process.cwd(), "data", "subscribers.json");

async function readSubscribers() {
  try {
    const content = await fs.readFile(SUBSCRIBERS_FILE, "utf-8");
    return JSON.parse(content);
  } catch {
    return [];
  }
}

export async function POST(request) {
  try {
    const { adminKey, subject, previewText, heading, body, ctaText, ctaUrl } =
      await request.json();

    if (adminKey !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!subject || !heading || !body) {
      return NextResponse.json(
        { message: "subject, heading, body are required" },
        { status: 400 }
      );
    }

    const subscribers = await readSubscribers();
    if (subscribers.length === 0) {
      return NextResponse.json({ message: "No subscribers yet" }, { status: 200 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const emailHtml = `
      <div style="font-family:Arial,sans-serif;background:#0a0a0a;padding:30px;">
        <div style="max-width:600px;margin:0 auto;background:#1a1a1a;border-radius:16px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#f59e0b,#d97706);padding:28px 32px;text-align:center;">
            <h1 style="color:#000;margin:0;font-size:24px;font-weight:800">Ambaari Tours & Travels</h1>
            ${previewText ? `<p style="color:#000;margin:6px 0 0;font-size:13px;opacity:0.8">${previewText}</p>` : ""}
          </div>
          <div style="padding:32px;color:#ccc;">
            <h2 style="color:#fff;font-size:22px;margin:0 0 16px">${heading}</h2>
            <div style="font-size:15px;line-height:1.8;white-space:pre-line;">${body}</div>
            ${ctaText && ctaUrl ? `
            <div style="text-align:center;margin:32px 0;">
              <a href="${ctaUrl}" style="display:inline-block;background:linear-gradient(135deg,#f59e0b,#d97706);color:#000;font-weight:700;padding:16px 36px;border-radius:50px;text-decoration:none;font-size:15px;">
                ${ctaText} →
              </a>
            </div>` : ""}
            <div style="background:#111;border:1px solid rgba(245,158,11,0.15);border-radius:12px;padding:20px;margin-top:28px;">
              <p style="color:#f59e0b;font-weight:700;font-size:13px;margin:0 0 10px">Need help planning your trip?</p>
              <p style="margin:0;font-size:13px">📞 <a href="tel:+918073097430" style="color:#f59e0b;text-decoration:none">+91 80730 97430</a></p>
              <p style="margin:6px 0 0;font-size:13px">💬 <a href="https://wa.me/918073097430" style="color:#25D366;text-decoration:none">WhatsApp us</a></p>
              <p style="margin:6px 0 0;font-size:13px">📧 <a href="mailto:ambaaritoursandtravels19@gmail.com" style="color:#f59e0b;text-decoration:none">ambaaritoursandtravels19@gmail.com</a></p>
            </div>
          </div>
          <div style="background:#111;padding:20px;text-align:center;color:#555;font-size:12px;">
            <p style="margin:0">© ${new Date().getFullYear()} Ambaari Tours & Travels · Koramangala, Bangalore</p>
            <p style="margin:6px 0 0">You received this because you subscribed on our website.</p>
          </div>
        </div>
      </div>
    `;

    const emails = subscribers.map((s) => s.email);
    const BATCH_SIZE = 10;
    let sent = 0;
    let failed = 0;

    for (let i = 0; i < emails.length; i += BATCH_SIZE) {
      const batch = emails.slice(i, i + BATCH_SIZE);
      await Promise.allSettled(
        batch.map((to) =>
          transporter
            .sendMail({ from: `"Ambaari Tours & Travels" <${process.env.GMAIL_USER}>`, to, subject, html: emailHtml })
            .then(() => sent++)
            .catch(() => failed++)
        )
      );
      // Pause between batches to stay within Gmail rate limits
      if (i + BATCH_SIZE < emails.length) {
        await new Promise((r) => setTimeout(r, 1500));
      }
    }

    return NextResponse.json({ message: "Newsletter sent", total: emails.length, sent, failed });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ message: "Failed to send", error: error.message }, { status: 500 });
  }
}