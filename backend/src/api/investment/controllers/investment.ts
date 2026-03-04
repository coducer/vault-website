/**
 * investment controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::investment.investment' as Parameters<typeof factories.createCoreController>[0]
);
