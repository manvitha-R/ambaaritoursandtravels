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

    // Email content for admin
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
          <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
              .booking-id { font-size: 24px; font-weight: bold; color: #dc2626; }
              .details { margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>📋 New Booking Received!</h1>
                  <p>Ambaari Tours and Travels - New Booking Alert</p>
              </div>
              <div class="content">
                  <h2>New Booking Notification</h2>
                  <p>A new booking has been made and requires your attention.</p>
                  
                  <div class="details">
                      <h3>Booking Details</h3>
                      <p><strong>Booking ID:</strong> <span class="booking-id">${bookingData.bookingId}</span></p>
                      <p><strong>Package:</strong> ${bookingData.package.name}</p>
                      <p><strong>Customer Name:</strong> ${bookingData.traveler.name}</p>
                      <p><strong>Customer Email:</strong> ${bookingData.traveler.email}</p>
                      <p><strong>Customer Phone:</strong> ${bookingData.traveler.phone}</p>
                      <p><strong>Travel Date:</strong> ${bookingData.traveler.travelDate}</p>
                      <p><strong>Travelers:</strong> ${bookingData.traveler.travelers}</p>
                      <p><strong>Total Amount:</strong> ₹${bookingData.totalAmount.toLocaleString('en-IN')}</p>
                      <p><strong>Payment Method:</strong> ${bookingData.payment.method}</p>
                      <p><strong>Payment Reference:</strong> ${bookingData.payment.reference}</p>
                      ${bookingData.traveler.specialRequests ? `<p><strong>Special Requests:</strong> ${bookingData.traveler.specialRequests}</p>` : ''}
                  </div>
                  
                  <p><strong>Action Required:</strong> Please process this booking and contact the customer within 24 hours.</p>
              </div>
              <div class="footer">
                  <p>© 2024 Ambaari Tours and Travels. All rights reserved.</p>
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
    
    return NextResponse.json({ success: true, message: 'Admin email sent successfully' });
  } catch (error) {
    console.error('Error sending admin email:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}