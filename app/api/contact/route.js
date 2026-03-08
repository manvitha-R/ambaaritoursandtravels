import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const formData = await request.json();

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD, // Use App Password, not regular password
      },
    });

    // Email content
    const mailOptions = {
      from: `"Ambaari Contact Form" <${process.env.GMAIL_USER}>`,
      to: 'ambaaritoursandtravels19@gmail.com',
      subject: `New ${formData.travelType} Travel Inquiry: ${formData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #f59e0b; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">
              New ${formData.travelType === 'international' ? 'International' : 'Local'} Travel Inquiry
            </h2>
            
            <div style="margin: 20px 0;">
              <h3 style="color: #333;">Customer Details:</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.phone}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Subject:</strong></td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.subject}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Travel Type:</strong></td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.travelType}</td>
                </tr>
              </table>
            </div>

            <div style="margin: 20px 0;">
              <h3 style="color: #333;">Message:</h3>
              <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #f59e0b;">
                ${formData.message.replace(/\n/g, '<br>')}
              </div>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
              <p>This inquiry was submitted through the Ambaari Tours and Travels website.</p>
              <p>Received at: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { message: 'Error sending email', error: error.message },
      { status: 500 }
    );
  }
}