/**
 * pe-advisory router.
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter(
  'api::pe-advisory.pe-advisory' as Parameters<typeof factories.createCoreRouter>[0]
);
