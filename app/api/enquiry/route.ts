import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { ConfidentialClientApplication } from "@azure/msal-node";

const cca = new ConfidentialClientApplication({
  auth: {
    clientId: process.env.CLIENT_ID!,
    authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
    clientSecret: process.env.CLIENT_SECRET!,
  },
});

async function getAccessToken() {
  const result = await cca.acquireTokenByClientCredential({
    scopes: ["https://graph.microsoft.com/.default"],
  });
  return result?.accessToken;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, mobile, date, travellers, destination } = body;

  try {
    const token = await getAccessToken();

    await axios.post(
      `https://graph.microsoft.com/v1.0/users/${process.env.SENDER_EMAIL}/sendMail`,
      {
        message: {
          subject: `New Enquiry from ${name} - ${destination}`,
          body: {
            contentType: "HTML",
           content: `
  <div style="font-family: Arial, sans-serif; background:#f5f5f5; padding:20px;">
    
    <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
      
      <!-- Header -->
      <div style="background:#f59e0b; padding:20px; text-align:center;">
        <h1 style="margin:0; color:white; font-size:22px;">Ambaari Tours & Travels</h1>
        <p style="margin:5px 0 0; color:white; font-size:14px;">
          New Travel Enquiry Received
        </p>
      </div>

      <!-- Body -->
      <div style="padding:20px;">
        
        <table style="width:100%; border-collapse:collapse;">
          
          <tr>
            <td style="padding:10px; font-weight:bold; color:#555;">Name</td>
            <td style="padding:10px; color:#111;">${name}</td>
          </tr>

          <tr style="background:#fafafa;">
            <td style="padding:10px; font-weight:bold; color:#555;">Email</td>
            <td style="padding:10px; color:#111;">${email || "Not provided"}</td>
          </tr>

          <tr>
            <td style="padding:10px; font-weight:bold; color:#555;">Mobile</td>
            <td style="padding:10px; color:#111;">${mobile}</td>
          </tr>

          <tr style="background:#fafafa;">
            <td style="padding:10px; font-weight:bold; color:#555;">Travel Date</td>
            <td style="padding:10px; color:#111;">${date || "Not specified"}</td>
          </tr>

          <tr>
            <td style="padding:10px; font-weight:bold; color:#555;">Travellers</td>
            <td style="padding:10px; color:#111;">${travellers || "Not specified"}</td>
          </tr>

          <tr style="background:#fafafa;">
            <td style="padding:10px; font-weight:bold; color:#555;">Destination</td>
            <td style="padding:10px; color:#111;">${destination}</td>
          </tr>

        </table>

        <!-- CTA -->
        <div style="margin-top:20px; text-align:center;">
          <a href="tel:${mobile}" 
             style="display:inline-block; background:#f59e0b; color:white; padding:10px 18px; border-radius:6px; text-decoration:none; font-weight:bold;">
             Call Customer
          </a>
        </div>

      </div>

      <!-- Footer -->
      <div style="background:#fff7ed; padding:12px; text-align:center;">
        <p style="margin:0; font-size:12px; color:#92400e;">
          This enquiry was submitted via your website.
        </p>
      </div>

    </div>

  </div>
`,
          },
          toRecipients: [
            {
              emailAddress: {
                address: process.env.SENDER_EMAIL,
              },
            },
          ],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}