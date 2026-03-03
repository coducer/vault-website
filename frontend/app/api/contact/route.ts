/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';

const STRAPI_URL =
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  'http://localhost:1337';

export const dynamic = 'force-dynamic';

export async function OPTIONS() {
  return NextResponse.json(null, { status: 204 });
}

// async function fetchContactSettings(): Promise<any | null> {
//   try {
//     const url = `${STRAPI_URL}/api/contact`;
//     const response = await fetch(url, {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//     });
//     if (!response.ok) {
//       console.warn(
//         '[Contact API] Failed to fetch contact single type:',
//         response.status
//       );
//       return null;
//     }
//     const json = await response.json();
//     return json?.data?.attributes || null;
//   } catch (error) {
//     console.error('[Contact API] Error fetching contact settings:', error);
//     return null;
//   }
// }

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, company = '', message } =
      (await request.json()) || {};

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'All required fields must be provided.' },
        { status: 400 }
      );
    }

    // Get admin email and address fields from Strapi
    // const contactSettings = await fetchContactSettings();
    // const adminEmail = contactSettings?.adminEmail;
    // const addressLine1 = contactSettings?.addressLine1 || '';
    // const addressLine2 = contactSettings?.addressLine2 || '';
    // const address = `${addressLine1}${addressLine2 ? ' ' + addressLine2 : ''}`.trim();

    const submissionUrl = `${STRAPI_URL}/api/contact-submissions`;
    const submissionResponse = await fetch(submissionUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: {
          firstName,
          lastName,
          email,
          company,
          message,
        },
      }),
    });

    const data = await submissionResponse.json().catch(() => ({}));
    if (!submissionResponse.ok) {
      const err =
        typeof data?.error === 'string'
          ? data.error
          : data?.error?.message || 'Failed to send message';
      console.error(
        '[Contact API] Strapi error:',
        submissionResponse.status,
        err
      );
      return NextResponse.json(
        { error: err },
        { status: submissionResponse.status }
      );
    }

    // Optionally, trigger an auto-reply (uncomment to enable)
    // if (adminEmail) {
    //   try {
    //     await fetch(`${STRAPI_URL}/api/contact-auto-reply`, {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({
    //         firstName,
    //         lastName,
    //         email,
    //         company,
    //         message,
    //         websiteName: WEBSITE_NAME,
    //         websiteUrl: WEBSITE_URL,
    //         address,
    //       }),
    //     });
    //   } catch (err) {
    //     console.warn('[Contact API] Failed to call contact-auto-reply:', err);
    //   }
    // }

    return NextResponse.json(data);
  } catch (err: any) {
    const errMsg = err?.message || String(err);
    const isConnErr =
      errMsg.includes('ECONNREFUSED') || errMsg.includes('fetch failed');
    const message = isConnErr
      ? 'Cannot reach Strapi server. Ensure Strapi is running (localhost:1337) and STRAPI_URL is correct.'
      : 'Something went wrong';
    console.error('Contact API error:', err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
