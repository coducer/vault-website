import type { Core } from '@strapi/strapi';

const PLACEHOLDER_PASSWORDS = [
  '',
  'your_app_password',
  'your-app-password',
  'yourpassword',
  'changeme',
  'password',
];

/**
 * Email: uses nodemailer+SMTP when SMTP_HOST is set and credentials are valid.
 * Falls back to sendmail when credentials are missing/placeholder (avoids 535 auth errors in local dev).
 * Env vars: SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD, EMAIL_FROM, EMAIL_REPLY_TO
 * Gmail: enable 2FA and use App Password, not normal password.
 */
const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => {
  const host = env('SMTP_HOST');
  const user = env('SMTP_USERNAME');
  const pass = env('SMTP_PASSWORD');
  const hasValidCreds =
    Boolean(host) &&
    Boolean(user) &&
    Boolean(pass) &&
    !PLACEHOLDER_PASSWORDS.includes(String(pass || '').trim().toLowerCase());

  const useNodemailer = hasValidCreds;
  if (host && !useNodemailer) {
    console.warn(
      '[Strapi email] SMTP_HOST is set but credentials missing or placeholder. Using sendmail. ' +
        'For SMTP: set SMTP_USERNAME and SMTP_PASSWORD (Gmail: use App Password).'
    );
  }

  return {
    email: {
      config: {
        provider: useNodemailer ? 'nodemailer' : 'sendmail',
        providerOptions: useNodemailer
          ? {
              host,
              port: env.int('SMTP_PORT', 587),
              secure: env.bool('SMTP_SECURE', false),
              auth: { user, pass },
            }
          : {},
        settings: {
          defaultFrom: env('EMAIL_FROM', 'no-reply@example.com'),
          defaultReplyTo: env('EMAIL_REPLY_TO', 'no-reply@example.com'),
        },
      },
    },
  };
};

export default config;
