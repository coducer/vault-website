/**
 * wealth-service controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::wealth-service.wealth-service' as Parameters<typeof factories.createCoreController>[0]
);
