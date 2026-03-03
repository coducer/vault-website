/**
 * email controller
 * POST /api/email - sends an email via Strapi email plugin
 */

import { Context } from 'koa';

export default {
  async send(ctx: Context) {
    const body = ctx.request.body as {
      to?: string;
      replyTo?: string;
      subject?: string;
      html?: string;
      text?: string;
    };

    const { to, replyTo, subject, html, text } = body;

    if (!to || !subject) {
      ctx.status = 400;
      ctx.body = {
        error: { message: 'Missing required fields: to, subject' },
      };
      return;
    }

    if (!html && !text) {
      ctx.status = 400;
      ctx.body = {
        error: { message: 'Either html or text is required' },
      };
      return;
    }

    try {
      await strapi.plugin('email').service('email').send({
        to,
        replyTo: replyTo ?? undefined,
        subject,
        html: html ?? undefined,
        text: text ?? undefined,
      });
      ctx.body = { ok: true };
    } catch (err) {
      const isAuth = (e: unknown) =>
        (e as { code?: string })?.code === 'EAUTH' ||
        String((e as Error)?.message || '').includes('535');
      const hint = isAuth(err)
        ? ' Gmail: enable 2FA and use App Password at https://myaccount.google.com/apppasswords'
        : '';
      console.error('Email send error:', err, hint);
      ctx.status = 500;
      ctx.body = {
        error: {
          message:
            (err instanceof Error ? err.message : 'Failed to send email') + hint,
        },
      };
    }
  },
};
