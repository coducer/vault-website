/**
 * want-to-know-more controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::want-to-know-more.want-to-know-more' as Parameters<typeof factories.createCoreController>[0]
);
