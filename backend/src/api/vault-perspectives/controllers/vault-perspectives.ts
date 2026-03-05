/**
 * vault-perspectives controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::vault-perspectives.vault-perspectives' as Parameters<typeof factories.createCoreController>[0]
);
