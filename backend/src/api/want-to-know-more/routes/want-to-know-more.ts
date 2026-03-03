/**
 * want-to-know-more router.
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter(
  'api::want-to-know-more.want-to-know-more' as Parameters<typeof factories.createCoreRouter>[0]
);
