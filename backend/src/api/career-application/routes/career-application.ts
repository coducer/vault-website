/**
 * career-application router.
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::career-application.career-application', {
  only: ['create'],
  config: {
    create: {
      auth: false,
    },
  },
});

