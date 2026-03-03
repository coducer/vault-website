import type { Core } from '@strapi/strapi';

const PLACEHOLDER_PASSWORDS = [
  '',
  'your_app_password',
  'your-app-password',
  'yourpassword',
  'changeme',
  'password',
];

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => {
  const host = env('SMTP_HOST');
  const user = env('SMTP_USERNAME');
  const pass = env('SMTP_PASSWORD');
  const emailFrom = env('EMAIL_FROM', user || '');
  const hasValidCreds =
    Boolean(host) &&
    Boolean(user) &&
    Boolean(pass) &&
    !PLACEHOLDER_PASSWORDS.includes(String(pass || '').trim().toLowerCase());

  const useNodemailer = hasValidCreds;
  if (host && !useNodemailer) {
    console.warn(
      '[Strapi email] SMTP_HOST is set but credentials missing or placeholder. Using sendmail. ' +
      'For SMTP: set SMTP_USERNAME and SMTP_PASSWORD. ' +
      'DO NOT use Gmail addresses as senders. Use a domain you control, with SPF/DKIM configured.'
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
          defaultFrom: emailFrom,
          defaultReplyTo: emailFrom,
        },
      },
    },
  };
};

export default config;
