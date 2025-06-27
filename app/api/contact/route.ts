import { NextRequest, NextResponse } from 'next/server';
import { EmailModel } from '@/lib/models/email';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, company, subject, message, type = 'contact' } = await request.json();

    // Validate required fields
    if (!firstName || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Save to database
    const submission = EmailModel.createContactSubmission({
      name: type === 'footer' ? firstName : `${firstName} ${lastName || ''}`.trim(),
      email,
      subject: subject || 'Contact Form Submission',
      message,
      type
    });

    // Get email settings
    const emailSettings = EmailModel.getSettings();
    
    if (emailSettings) {
      try {
        // Create transporter
        const transporter = nodemailer.createTransporter({
          host: emailSettings.smtp_host,
          port: emailSettings.smtp_port,
          secure: emailSettings.smtp_secure,
          auth: {
            user: emailSettings.smtp_user,
            pass: emailSettings.smtp_password,
          },
        });

        // Send email
        await transporter.sendMail({
          from: `"${emailSettings.from_name}" <${emailSettings.from_email}>`,
          to: emailSettings.from_email,
          subject: `New ${type === 'footer' ? 'Footer' : 'Contact'} Form Submission: ${subject || 'No Subject'}`,
          html: `
            <h2>New ${type === 'footer' ? 'Footer' : 'Contact'} Form Submission</h2>
            <p><strong>Name:</strong> ${submission.name}</p>
            <p><strong>Email:</strong> ${submission.email}</p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><small>Submitted on: ${new Date().toLocaleString()}</small></p>
          `,
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Continue even if email fails - submission is saved
      }
    }

    return NextResponse.json(
      { message: 'Message sent successfully', id: submission.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}