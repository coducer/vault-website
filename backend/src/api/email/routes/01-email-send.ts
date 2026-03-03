/**
 * Custom route: POST /api/email - send email via Strapi email plugin
 */

/** @type {import('@strapi/strapi').Core.RouterConfig} */
export default {
  type: 'content-api',
  routes: [
    {
      method: 'POST',
      path: '/email',
      handler: 'api::email.email.send',
      config: {
        auth: false,
      },
    },
  ],
};
