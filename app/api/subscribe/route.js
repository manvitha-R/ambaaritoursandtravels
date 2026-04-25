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

async function saveSubscribers(list) {
  await fs.mkdir(path.dirname(SUBSCRIBERS_FILE), { recursive: true });
  await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(list, null, 2));
}

function makeTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    }

    const subscribers = await readSubscribers();

    if (subscribers.find((s) => s.email === email)) {
      return NextResponse.json({ message: "already_subscribed" }, { status: 200 });
    }

    subscribers.push({ email, subscribedAt: new Date().toISOString() });
    await saveSubscribers(subscribers);

    const transporter = makeTransporter();

    // Notify admin
    await transporter.sendMail({
      from: `"Ambaari Website" <${process.env.GMAIL_USER}>`,
      to: "ambaaritoursandtravels19@gmail.com",
      subject: "📬 New Newsletter Subscriber – Ambaari Tours",
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px;background:#f5f5f5;">
          <div style="max-width:500px;margin:0 auto;background:#fff;padding:24px;border-radius:10px;border-left:4px solid #f59e0b;">
            <h2 style="color:#f59e0b;margin:0 0 12px">New Subscriber</h2>
            <p style="color:#333;font-size:15px;margin:0 0 8px"><strong>Email:</strong> ${email}</p>
            <p style="color:#888;font-size:13px;margin:0">Subscribed at: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
            <p style="color:#555;font-size:13px;margin:16px 0 0">Total subscribers: <strong>${subscribers.length}</strong></p>
          </div>
        </div>
      `,
    });

    // Welcome email to subscriber
    await transporter.sendMail({
      from: `"Ambaari Tours & Travels" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Welcome to Ambaari Tours! ✈ Exclusive deals inside",
      html: `
        <div style="font-family:Arial,sans-serif;background:#0a0a0a;padding:30px;">
          <div style="max-width:560px;margin:0 auto;background:#1a1a1a;border-radius:16px;overflow:hidden;">
            <div style="background:linear-gradient(135deg,#f59e0b,#d97706);padding:32px;text-align:center;">
              <h1 style="color:#000;margin:0;font-size:26px;font-weight:800">Ambaari Tours & Travels</h1>
              <p style="color:#000;margin:8px 0 0;font-size:13px;opacity:0.8">Your journey begins here ✈</p>
            </div>
            <div style="padding:32px;color:#ccc;">
              <h2 style="color:#fff;font-size:20px;margin:0 0 12px">Welcome aboard! 🎉</h2>
              <p style="font-size:15px;line-height:1.7;margin:0 0 20px">
                You're now part of the Ambaari family — the first to hear about exclusive deals,
                early-bird discounts, and curated destination guides.
              </p>
              <div style="background:#111;border:1px solid rgba(245,158,11,0.2);border-radius:12px;padding:20px;margin:24px 0;">
                <p style="color:#f59e0b;font-weight:700;font-size:14px;margin:0 0 10px">📞 Ready to plan your trip?</p>
                <p style="margin:0;font-size:14px">Call: <a href="tel:+918073097430" style="color:#f59e0b;text-decoration:none">+91 80730 97430</a></p>
                <p style="margin:6px 0 0;font-size:14px">WhatsApp: <a href="https://wa.me/918073097430" style="color:#25D366;text-decoration:none">Chat with us</a></p>
              </div>
              <a href="https://ambaaritoursandtravels.com/Packages" style="display:inline-block;background:linear-gradient(135deg,#f59e0b,#d97706);color:#000;font-weight:700;padding:14px 28px;border-radius:50px;text-decoration:none;font-size:14px;">
                Browse Packages →
              </a>
            </div>
            <div style="background:#111;padding:20px;text-align:center;color:#555;font-size:12px;">
              <p style="margin:0">© ${new Date().getFullYear()} Ambaari Tours & Travels · Koramangala, Bangalore</p>
              <p style="margin:6px 0 0">You received this because you subscribed on our website.</p>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ message: "Subscribed successfully" }, { status: 200 });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json({ message: "Failed to subscribe", error: error.message }, { status: 500 });
  }
}

// GET – admin use only, returns subscriber list
export async function GET() {
  const subscribers = await readSubscribers();
  return NextResponse.json({ count: subscribers.length, subscribers });
}