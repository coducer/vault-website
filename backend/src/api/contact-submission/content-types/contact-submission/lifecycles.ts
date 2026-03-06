import { renderEmailTemplate } from '../../../../utils/emailTemplate';

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

      const context = { fullName, email, company, message, date };

      // Admin notification
      const adminTpl = await renderEmailTemplate('contact-admin', context);
      await strapi.plugin('email').service('email').send({
        to: adminEmail,
        replyTo: email,
        subject: adminTpl.subject,
        html: adminTpl.html,
        text: adminTpl.text,
      });

      // User thank-you email
      const userTpl = await renderEmailTemplate('contact-user', context);
      await strapi.plugin('email').service('email').send({
        to: email,
        subject: userTpl.subject,
        html: userTpl.html,
        text: userTpl.text,
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
