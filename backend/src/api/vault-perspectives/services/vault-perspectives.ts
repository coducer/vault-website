/**
 * vault-perspectives service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService(
  'api::vault-perspectives.vault-perspectives' as Parameters<typeof factories.createCoreRouter>[0]
);