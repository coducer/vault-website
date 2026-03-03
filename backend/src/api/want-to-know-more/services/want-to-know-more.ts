/**
 * want-to-know-more service.
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService(
  'api::want-to-know-more.want-to-know-more' as Parameters<typeof factories.createCoreService>[0]
);
