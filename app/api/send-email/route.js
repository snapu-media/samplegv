// app/api/send-email/route.js
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    // Create a transporter using environment variables
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use your email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER, // Send to yourself
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #2e7d32; border-bottom: 2px solid #4caf50; padding-bottom: 10px;">New Contact Form Submission</h2>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <h3 style="color: #2e7d32; margin-top: 0;">Message:</h3>
            <p>${message}</p>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 14px;">
            <p>This message was sent from the contact form on Crunchy Pickles Co.</p>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to send email' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}