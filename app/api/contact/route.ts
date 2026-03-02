import { NextResponse } from 'next/server';

const STRAPI_URL =
  process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export const dynamic = 'force-dynamic';

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}

// Fetch adminEmail from Strapi single type "contact"
async function fetchAdminEmail(): Promise<string | null> {
  try {
    const url = `${STRAPI_URL}/api/contact`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      // Optionally, add authorization header if required
    });
    if (!response.ok) {
      console.warn('[Contact API] Failed to fetch contact single type:', response.status);
      return null;
    }
    const json = await response.json();
    // Strapi v4+ single type likely: { data: { attributes: { adminEmail: ... } } }
    return (
      json?.data?.attributes?.adminEmail ||
      json?.data?.adminEmail ||
      null
    );
  } catch (error) {
    console.error('[Contact API] Error fetching adminEmail:', error);
    return null;
  }
}

// Send an email using Strapi's /api/email plugin endpoint
async function sendEmail({
  to,
  replyTo,
  subject,
  html,
  text,
}: {
  to: string;
  replyTo: string;
  subject: string;
  html: string;
  text: string;
}) {
  const url = `${STRAPI_URL}/api/email`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to,
      replyTo,
      subject,
      html,
      text,
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(
      typeof errData?.error === 'string'
        ? errData.error
        : errData?.error?.message || 'Failed to send email'
    );
  }
  return response.json();
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      firstName?: string;
      lastName?: string;
      email?: string;
      company?: string;
      message?: string;
    };

    // --- Validate input ---
    if (!body.email || !body.firstName || !body.lastName || !body.message) {
      return NextResponse.json(
        { error: 'All required fields must be provided.' },
        { status: 400 }
      );
    }

    // --- Save to Strapi collection ---
    const submissionUrl = `${STRAPI_URL}/api/contact-submissions`;
    console.log('[Contact API] POST', submissionUrl);
    const response = await fetch(submissionUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: {
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          company: body.company ?? '',
          message: body.message,
        },
      }),
    });
    const data = (await response.json().catch(() => ({}))) as {
      error?: string | { message?: string };
    };
    if (!response.ok) {
      const err = data?.error;
      const message =
        typeof err === 'string' ? err : err?.message ?? 'Failed to send message';
      console.error('Contact Strapi error:', response.status, message);
      return NextResponse.json({ error: message }, { status: response.status });
    }

    // --- Fetch adminEmail dynamically from Strapi contact single type ---
    const adminEmail = await fetchAdminEmail();
    if (!adminEmail) {
      console.warn('Contact API: admin email not configured in Strapi Contact single type; skipping email send.');
    } else {
      const subject = `Contact form: ${body.firstName} ${body.lastName}`.trim() || 'Contact form submission';
      const html = `
        <p><strong>From:</strong> ${body.firstName} ${body.lastName} &lt;${body.email}&gt;</p>
        ${body.company ? `<p><strong>Company:</strong> ${body.company}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${String(body.message).replace(/\n/g, '<br>')}</p>
      `;
      const text = `From: ${body.firstName} ${body.lastName} <${body.email}>
${body.company ? `Company: ${body.company}\n` : ''}Message:
${body.message}`;

      try {
        await sendEmail({
          to: adminEmail,
          replyTo: body.email,
          subject,
          html,
          text,
        });
      } catch (emailError) {
        // Log the email send error, but do NOT fail the client request if email fails
        console.error('Contact API: email notification failed:', emailError);
      }
    }

    return NextResponse.json(data);
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    const causeCode = err instanceof Error && err.cause && typeof err.cause === 'object' && 'code' in err.cause ? (err.cause as { code?: string }).code : undefined;
    const isConnectionError =
      causeCode === 'ECONNREFUSED' || errMsg.includes('ECONNREFUSED') || errMsg.includes('fetch failed');
    const message = isConnectionError
      ? 'Cannot reach Strapi server. Ensure Strapi is running (localhost:1337) and STRAPI_URL is correct.'
      : 'Something went wrong';
    console.error('Contact API error:', err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
