/**
 * wealth-service router.
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter(
  'api::wealth-service.wealth-service' as Parameters<typeof factories.createCoreRouter>[0]
);
