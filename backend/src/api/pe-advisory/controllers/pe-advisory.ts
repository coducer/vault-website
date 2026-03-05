/**
 * pe-advisory controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::pe-advisory.pe-advisory' as Parameters<typeof factories.createCoreController>[0]
);
