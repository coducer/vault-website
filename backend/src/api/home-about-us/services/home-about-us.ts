/**
 * home-about-us service.
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService(
  'api::home-about-us.home-about-us' as Parameters<typeof factories.createCoreService>[0]
);
