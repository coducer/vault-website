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

export async function POST(request: Request) {
  try {
    const incoming = await request.formData();

    const fullName = String(incoming.get('fullName') || '').trim();
    const email = String(incoming.get('email') || '').trim();
    const phone = String(incoming.get('phone') || '').trim();
    const jobTitle = String(incoming.get('jobTitle') || '').trim();
    const jobLocation = String(incoming.get('jobLocation') || '').trim();
    const jobUrl = String(incoming.get('jobUrl') || '').trim();
    const cvFile = incoming.get('cvFile') as File | null;
    const coverLetterFile = incoming.get('coverLetterFile') as File | null;

    if (!fullName || !email || !phone || !jobUrl || !cvFile || !coverLetterFile) {
      return NextResponse.json(
        { error: 'Full name, email, phone, job and both attachments are required.' },
        { status: 400 }
      );
    }

    const apiToken = process.env.STRAPI_API_TOKEN;
    if (!apiToken) {
      return NextResponse.json(
        { error: 'Missing STRAPI_API_TOKEN on the server. Please configure it in your environment.' },
        { status: 500 }
      );
    }

    // 1) Upload files to Strapi upload plugin (server-side, authenticated)
    async function uploadFile(file: File) {
      const form = new FormData();
      form.append('files', file, file.name);

      const headers: Record<string, string> = {};
      headers['Authorization'] = `Bearer ${apiToken}`;

      const uploadRes = await fetch(`${STRAPI_URL}/api/upload`, {
        method: 'POST',
        headers,
        body: form,
      });

      const uploadJson = await uploadRes.json().catch(() => ({}));
      if (!uploadRes.ok) {
        const baseMsg =
          typeof uploadJson?.error === 'string'
            ? uploadJson.error
            : uploadJson?.error?.message || 'Failed to upload file';
        const errMsg =
          uploadRes.status === 403
            ? `${baseMsg || 'Forbidden'} – check Strapi upload permissions or STRAPI_UPLOAD_TOKEN.`
            : baseMsg;
        throw new Error(errMsg);
      }
      return uploadJson;
    }

    const cvUpload = await uploadFile(cvFile);
    const coverUpload = await uploadFile(coverLetterFile);

    const cvId =
      (Array.isArray(cvUpload) ? cvUpload[0]?.id : cvUpload?.id) ?? null;
    const coverId =
      (Array.isArray(coverUpload) ? coverUpload[0]?.id : coverUpload?.id) ??
      null;

    if (!cvId || !coverId) {
      return NextResponse.json(
        { error: 'Failed to store attachments. Please try again.' },
        { status: 500 }
      );
    }

    // 2) Create the career-application entry with media relations (authenticated JSON request)
    const submissionUrl = `${STRAPI_URL}/api/career-applications`;
    const response = await fetch(submissionUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          fullName,
          email,
          phone,
          jobTitle,
          jobLocation,
          jobUrl,
          cvFile: cvId,
          coverLetterFile: coverId,
        },
      }),
    });

    const json = await response.json().catch(() => ({}));

    if (!response.ok) {
      const err =
        typeof json?.error === 'string'
          ? json.error
          : json?.error?.message || 'Failed to submit application';

      console.error('[Career Apply API] Strapi error:', response.status, err);
      return NextResponse.json({ error: err }, { status: response.status });
    }

    return NextResponse.json(json);
  } catch (err: any) {
    const errMsg = err?.message || String(err);
    const isConnErr =
      errMsg.includes('ECONNREFUSED') || errMsg.includes('fetch failed');
    const message = isConnErr
      ? 'Cannot reach Strapi server. Ensure Strapi is running and STRAPI_URL is correct.'
      : 'Something went wrong while submitting the application.';

    console.error('[Career Apply API] error:', err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

