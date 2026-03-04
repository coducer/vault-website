/**
 * investment router.
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter(
  'api::investment.investment' as Parameters<typeof factories.createCoreRouter>[0]
);
