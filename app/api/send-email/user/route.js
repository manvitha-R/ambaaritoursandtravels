import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { to, subject, bookingData } = await request.json();
    
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content for user
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
          <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #f59e0b, #ea580c); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
              .booking-id { font-size: 24px; font-weight: bold; color: #f59e0b; }
              .details { margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>🎉 Booking Confirmed!</h1>
                  <p>Thank you for choosing Ambaari Tours and Travels</p>
              </div>
              <div class="content">
                  <h2>Dear ${bookingData.traveler.name},</h2>
                  <p>Your booking has been confirmed successfully!</p>
                  
                  <div class="details">
                      <h3>Booking Details</h3>
                      <p><strong>Booking ID:</strong> <span class="booking-id">${bookingData.bookingId}</span></p>
                      <p><strong>Package:</strong> ${bookingData.package.name}</p>
                      <p><strong>Duration:</strong> ${bookingData.package.duration}</p>
                      <p><strong>Travel Date:</strong> ${bookingData.traveler.travelDate}</p>
                      <p><strong>Travelers:</strong> ${bookingData.traveler.travelers}</p>
                      <p><strong>Total Amount:</strong> ₹${bookingData.totalAmount.toLocaleString('en-IN')}</p>
                      <p><strong>Payment Status:</strong> Verified ✅</p>
                  </div>
                  
                  <p>We will contact you within 24 hours with further details.</p>
                  <p>For any queries, contact us at support@ambaari.com or +91 98765 43210</p>
              </div>
              <div class="footer">
                  <p>© 2024 Ambaari Tours and Travels. All rights reserved.</p>
                  <p>Bangalore, Karnataka</p>
              </div>
          </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"Ambaari Tours and Travels" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    
    return NextResponse.json({ success: true, message: 'User email sent successfully' });
  } catch (error) {
    console.error('Error sending user email:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}