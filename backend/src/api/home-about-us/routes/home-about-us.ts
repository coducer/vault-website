/**
 * home-about-us router.
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter(
  'api::home-about-us.home-about-us' as Parameters<typeof factories.createCoreRouter>[0]
);
