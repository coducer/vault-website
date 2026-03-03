/**
 * contact-submission router.
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::contact-submission.contact-submission', {
  only: ['find', 'findOne', 'create'],
  config: {
    create: {
      auth: false,
    },
  },
});
