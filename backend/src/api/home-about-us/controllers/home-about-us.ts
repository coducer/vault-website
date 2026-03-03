/**
 * home-about-us controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::home-about-us.home-about-us' as Parameters<typeof factories.createCoreController>[0]
);
