/**
 * email router - disable core routes (only custom POST is used)
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::email.email', { only: [] });
