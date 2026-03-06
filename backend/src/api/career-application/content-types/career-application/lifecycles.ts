import { renderEmailTemplate } from '../../../../utils/emailTemplate';

type CareerApplicationResult = {
  documentId?: string;
  id?: number;
  fullName?: string;
  email?: string;
  phone?: string;
  jobTitle?: string;
  jobLocation?: string;
  jobUrl?: string;
};
const STRAPI_URL = process.env.STRAPI_URL || '';


function getStrapiBaseUrl(): string {
  // Prefer .env value if set, fallback to Strapi config, else empty string
  return (
    process.env.STRAPI_URL ||
    (strapi.config.get('server.url') as string | undefined) ||
    ''
  );
}

export function getStrapiMediaUrl(url: string): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

export function resolveStrapiMediaUrl(url?: string) {
  if (!url) return '';
  return getStrapiMediaUrl(url);
}

function makeAttachment(file: any, fallback: string): { filename: string; path: string } | null {
  if (!file?.url) return null;
  const baseUrl = getStrapiBaseUrl();
  if (!baseUrl) return null;
  // Use original uploaded name, fallback otherwise
  let filename = file.name || fallback;
  // Ensure it looks like a normal PDF name if possible
  if (fallback && !filename.toLowerCase().endsWith('.pdf')) {
    filename += '.pdf';
  }
  return {
    filename,
    path: `${baseUrl}${file.url}`,
  };
}

export default {
  async afterCreate(event: { result?: CareerApplicationResult }) {
    const { result } = event;
    if (!result) return;

    // Sanitize and validate
    const email = typeof result.email === 'string' ? result.email.trim() : '';
    if (!email) return;

    try {
      // Get admin email from Contact singleton
      const contactDoc = await strapi
        .documents('api::contact.contact')
        .findFirst();
      const adminEmail =
        contactDoc && typeof contactDoc === 'object'
          ? (contactDoc as any).adminEmail
          : undefined;

      if (!adminEmail) {
        console.warn(
          '[career-application] adminEmail not configured in Contact, skipping notification email'
        );
        return;
      }

      // Current timestamp
      const now = new Date();
      const date = now.toLocaleString();

      // Reload application with CV/CL relation populated
      const appDoc = await strapi
        .documents('api::career-application.career-application')
        .findOne({
          documentId: result.documentId,
          populate: ['cvFile', 'coverLetterFile'],
        });

      const application = (appDoc ?? result) as any;
      const fullName = (application.fullName || email).trim();
      const phone = (application.phone || '').trim();
      const jobTitle = (application.jobTitle || '').trim();
      const jobLocation = (application.jobLocation || '').trim();
      const jobUrl = (application.jobUrl || '').trim();

      const cvFile = application.cvFile || null;
      const coverLetterFile = application.coverLetterFile || null;

      const attachments: Array<{ filename: string; path: string }> = [];
      if (cvFile && cvFile.url) {
        attachments.push({
          filename: cvFile.name || 'CV.pdf',
          path: resolveStrapiMediaUrl(cvFile.url),
        });
      }
      if (coverLetterFile && coverLetterFile.url) {
        attachments.push({
          filename: coverLetterFile.name || 'CoverLetter.pdf',
          path: resolveStrapiMediaUrl(coverLetterFile.url),
        });
      }

      const context = {
        fullName,
        email,
        phone,
        jobTitle,
        jobLocation,
        jobUrl,
        date,
        cvLink: resolveStrapiMediaUrl((appDoc as { cvFile?: { url?: string } })?.cvFile?.url),
        clLink: resolveStrapiMediaUrl((appDoc as { coverLetterFile?: { url?: string } })?.coverLetterFile?.url),
      };

      // Admin notification email (attachments: CV, CL)
      const adminTpl = await renderEmailTemplate('career-admin', context);
      await strapi.plugin('email').service('email').send({
        to: adminEmail,
        replyTo: email,
        subject: adminTpl.subject,
        html: adminTpl.html,
        text: adminTpl.text,
        attachments, // Gmail/Outlook etc.: proper preview with download buttons, icons, etc.
      });

      // User thank-you email (no attachments, just info)
      const userTpl = await renderEmailTemplate('career-user', context);
      await strapi.plugin('email').service('email').send({
        to: email,
        subject: userTpl.subject,
        html: userTpl.html,
        text: userTpl.text,
      });
    } catch (err) {
      // For common auth errors, print hint
      const isAuth = (e: unknown) =>
        (e as { code?: string })?.code === 'EAUTH' ||
        String((e as Error)?.message || '').includes('535') ||
        String((e as Error)?.message || '')
          .toLowerCase()
          .includes('authentication failed');
      console.error(
        '[career-application] Notification email error:',
        err,
        isAuth(err)
          ? '\n  → Gmail: enable 2FA and use App Password at https://myaccount.google.com/apppasswords'
          : ''
      );
    }
  },
};
