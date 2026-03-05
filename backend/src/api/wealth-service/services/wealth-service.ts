/**
 * wealth-service service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService(
  'api::wealth-service.wealth-service'  as Parameters<typeof factories.createCoreRouter>[0]
);