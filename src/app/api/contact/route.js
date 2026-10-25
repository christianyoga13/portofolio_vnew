import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // Read environment variables (supports standard server env and legacy NEXT_PUBLIC fallback)
    const serviceId =
      process.env.EMAILJS_SERVICE_ID || process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId =
      process.env.EMAILJS_TEMPLATE_ID || process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey =
      process.env.EMAILJS_PUBLIC_KEY || process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    const privateKey =
      process.env.EMAILJS_PRIVATE_KEY || process.env.EMAILJS_ACCESS_TOKEN;

    if (!serviceId || !templateId || !publicKey) {
      console.error(
        'EmailJS Server Error: Missing environment variables (EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY).'
      );
      return NextResponse.json(
        {
          error:
            'Email service is not properly configured on the server. Please check environment variables.'
        },
        { status: 500 }
      );
    }

    // Prepare EmailJS REST API payload
    const payload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        name: name.trim(),
        from_name: name.trim(),
        email: email.trim(),
        from_email: email.trim(),
        message: message.trim(),
        reply_to: email.trim(),
        to_name: process.env.EMAILJS_TO_NAME || 'Christian Yoga'
      }
    };

    if (privateKey) {
      payload.accessToken = privateKey;
    }

    // Call EmailJS REST API
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'NextJS-Portfolio/1.0'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('EmailJS REST API Error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });

      let userFriendlyMessage = 'Failed to send message via email service.';
      if (errorText.includes('Invalid grant') || errorText.includes('reconnect')) {
        userFriendlyMessage =
          'Email provider account connection expired in EmailJS dashboard. Please reconnect.';
      } else if (errorText.includes('service') && errorText.includes('not found')) {
        userFriendlyMessage = 'Invalid EmailJS Service ID configured.';
      } else if (errorText.includes('template') && errorText.includes('not found')) {
        userFriendlyMessage = 'Invalid EmailJS Template ID configured.';
      } else if (errorText.includes('user') || errorText.includes('public key')) {
        userFriendlyMessage = 'Invalid EmailJS Public Key configured.';
      }

      return NextResponse.json(
        { error: userFriendlyMessage, details: errorText },
        { status: response.status || 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully.' },
      { status: 200 }
    );
  } catch (err) {
    console.error('Internal contact API route error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred while sending your message.' },
      { status: 500 }
    );
  }
}
