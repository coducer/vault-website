/**
 * our-story controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::our-story.our-story' as Parameters<typeof factories.createCoreController>[0]
);
