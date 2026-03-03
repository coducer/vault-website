/**
 * our-story service.
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService(
  'api::our-story.our-story' as Parameters<typeof factories.createCoreService>[0]
);
