function buildAdminNotificationHtml({
  fullName,
  email,
  company,
  message,
  date,
}: {
  fullName: string;
  email: string;
  company?: string;
  message: string;
  date: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>New Contact Submission</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f6f9;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
<tr>
<td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;">
  <tr>
    <td style="background:#1f2937;padding:24px 30px;">
      <h2 style="color:#ffffff;margin:0;font-size:20px;">
        🔔 New Contact Form Submission
      </h2>
    </td>
  </tr>
  <tr>
    <td style="padding:30px;">
      <p style="font-size:15px;color:#333;margin-top:0;">Hello Admin,</p>
      <p style="font-size:14px;color:#555;">
        A new enquiry has been submitted via the website contact form.
      </p>
      <table width="100%" cellpadding="6" cellspacing="0" style="font-size:14px;margin-top:15px;border-collapse:collapse;">
        <tr><td><strong>Full Name:</strong></td><td>${fullName}</td></tr>
        <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
        <tr><td><strong>Company:</strong></td><td>${company || '-'}</td></tr>
        <tr><td><strong>Date:</strong></td><td>${date}</td></tr>
      </table>
      <div style="margin-top:20px;">
        <strong style="font-size:14px;">Message:</strong>
        <div style="background:#f9fafb;border:1px solid #e5e7eb;padding:12px;border-radius:4px;margin-top:8px;font-size:14px;color:#444;white-space:pre-line;">
          ${message}
        </div>
      </div>
    </td>
  </tr>
  <tr>
    <td style="background:#f9fafb;padding:20px 30px;text-align:right;font-size:12px;color:#999;">
      ${date}
    </td>
  </tr>
</table>
<p style="font-size:12px;color:#aaa;margin-top:20px;">
  Website Notification System
</p>
</td>
</tr>
</table>
</body>
</html>
`;
}

function buildAdminNotificationText({
  fullName,
  email,
  company,
  date,
}: {
  fullName: string;
  email: string;
  company?: string;
  date: string;
}) {
  return `🔔 New Contact Form Submission – ${fullName}

Hello Admin,

You have received a new enquiry through the Contact Us form on your website.

Here are the submission details:

Full Name: ${fullName}
Email Address: ${email}
Company (if applicable): ${company || '-'}

Submission Date: ${date}

Please review the enquiry and respond accordingly.

Regards,
Website Notification System`;
}

export default {
  /**
   * Lifecycle after creating a contact submission
   */
  async afterCreate(event) {
    const { result } = event;
    const firstName = result?.firstName ?? '';
    const lastName = result?.lastName ?? '';
    const email = result?.email ?? '';
    const company = result?.company ?? '';
    const message = result?.message ?? '';

    // Basic validation: require email and message
    if (!email || !message) return;

    try {
      // Look up admin email address from contact singleton/document
      const contactDoc = await strapi.documents('api::contact.contact').findFirst();
      const adminEmail = (contactDoc && typeof contactDoc === 'object') ? (contactDoc as any).adminEmail : undefined;

      if (!adminEmail) {
        console.warn('[contact-submission] adminEmail not configured in Contact, skipping notification email');
        return;
      }

      // Format details for email
      const now = new Date();
      const date = now.toLocaleString();
      const fullName = [firstName, lastName].map(s => s.trim()).filter(Boolean).join(' ') || email;

      const subject = `🔔 New Contact Form Submission – ${fullName}`;

      const html = buildAdminNotificationHtml({
        fullName,
        email,
        company,
        message,
        date,
      });

      const text = buildAdminNotificationText({
        fullName,
        email,
        company,
        date,
      });

      // Send the email
      await strapi.plugin('email').service('email').send({
        to: adminEmail,
        replyTo: email,
        subject,
        html,
        text,
      });
    } catch (err) {
      // Error handling for authentication and others
      const isAuth = (e: unknown) =>
        (e as { code?: string })?.code === 'EAUTH' ||
        String((e as Error)?.message || '').includes('535') ||
        String((e as Error)?.message || '').toLowerCase().includes('authentication failed');
      console.error(
        '[contact-submission] Notification email error:',
        err,
        isAuth(err)
          ? '\n  → Gmail: enable 2FA and use App Password at https://myaccount.google.com/apppasswords'
          : ''
      );
      // Do not throw - creation has already succeeded; email errors should not fail the main request
    }
  },
};
