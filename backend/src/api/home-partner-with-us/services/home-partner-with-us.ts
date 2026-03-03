/**
 * home-partner-with-us service.
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService(
  'api::home-partner-with-us.home-partner-with-us' as Parameters<typeof factories.createCoreService>[0]
);
