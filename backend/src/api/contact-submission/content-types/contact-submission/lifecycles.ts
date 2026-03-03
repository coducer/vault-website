/**
 * contact-submission lifecycles
 * Sends email notification to admin when a new submission is created.
 */

export default {
  async afterCreate(event) {
    const { result } = event;
    const firstName = result?.firstName ?? '';
    const lastName = result?.lastName ?? '';
    const email = result?.email ?? '';
    const company = result?.company ?? '';
    const message = result?.message ?? '';

    if (!email || !message) return;

    try {
      const contact = await strapi.documents('api::contact.contact').findFirst();
      const adminEmail = (contact as { adminEmail?: string } | undefined)?.adminEmail;

      if (!adminEmail) {
        console.warn('Contact form: adminEmail not configured, skipping email');
        return;
      }

      const subject = `Contact form: ${firstName} ${lastName}`.trim() || 'Contact form submission';
      const html = `
        <p><strong>From:</strong> ${firstName} ${lastName} &lt;${email}&gt;</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${String(message).replace(/\n/g, '<br>')}</p>
      `;

      await strapi.plugin('email').service('email').send({
        to: adminEmail,
        replyTo: email,
        subject,
        html,
        text: `From: ${firstName} ${lastName} <${email}>\n${company ? `Company: ${company}\n` : ''}\nMessage:\n${message}`,
      });
    } catch (err) {
      const isAuth = (e: unknown) =>
        (e as { code?: string })?.code === 'EAUTH' ||
        String((e as Error)?.message || '').includes('535') ||
        String((e as Error)?.message || '').includes('Authentication failed');
      console.error(
        'Contact submission email error:',
        err,
        isAuth(err)
          ? '\n  → Gmail: enable 2FA and use App Password at https://myaccount.google.com/apppasswords'
          : ''
      );
      // Do not throw - create already succeeded; email failure should not fail the request
    }
  },
};
