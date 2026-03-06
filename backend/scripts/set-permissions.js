'use strict';

// Map of API content types to allowed public actions
const PERMISSIONS_TO_SET = {
  blog: ['find', 'findOne'],
  'news.newspost': ['find', 'findOne'],
  event: ['find', 'findOne'],
  category: ['find', 'findOne'],
  author: ['find', 'findOne'],
  global: ['find', 'findOne'],
  about: ['find', 'findOne'],
  'vault-story': ['find', 'findOne'],
  'ceo-annual-letter': ['find', 'findOne'],
  'what-we-do': ['find', 'findOne'],
  'our-story': ['find', 'findOne'],
  'home-about-us': ['find', 'findOne'],
  'home-partner-with-us': ['find', 'findOne'],
  'want-to-know-more': ['find', 'findOne'],
  team: ['find', 'findOne'],
  'operating-partner': ['find', 'findOne'],
  contact: ['find', 'findOne'],
  'contact-submission': ['create'],
  'events-page': ['find', 'findOne'],
  portfolio: ['find', 'findOne'],
  investment: ['find', 'findOne'],
  'wealth-service': ['find', 'findOne'],
  'pe-advisory': ['find', 'findOne'],
  'vault-perspectives': ['find', 'findOne'],
  career: ['find', 'findOne'],
  'career-list': ['find', 'findOne'],
  'email-template': ['find', 'findOne'],
};

async function setPublicPermissions() {
  // Fetch the "public" role
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) {
    throw new Error('Public role not found');
  }

  // Fetch all existing permissions for the "public" role
  const existingPermissions = await strapi.db
    .query('plugin::users-permissions.permission')
    .findMany({ where: { role: publicRole.id } });

  // Build a set of currently defined action strings
  const existingActions = new Set(existingPermissions.map((p) => p.action));

  // Array to collect missing permissions that need creation
  const toCreate = [];

  for (const [controller, actions] of Object.entries(PERMISSIONS_TO_SET)) {
    // For dot notation like 'news.newspost', split for correct API key
    const [apiId, contentTypeId] = controller.includes('.')
      ? controller.split('.')
      : [controller, controller];
    for (const action of actions) {
      const actionId = `api::${apiId}.${contentTypeId}.${action}`;
      if (!existingActions.has(actionId)) {
        toCreate.push({ action: actionId, role: publicRole.id });
      }
    }
  }

  // Explicitly add permissions for components under career-list if they're missing (Strapi v4+)
  // This is a workaround for cases where components might need explicit permission (edge case)
  // If your project has API endpoints for e.g. component careers, add here:
  /*
  const componentPermissions = [
    { action: 'api::career-list.career-list.find', role: publicRole.id },
    { action: 'api::career-list.career-list.findOne', role: publicRole.id }
  ];
  for (const perm of componentPermissions) {
    if (!existingActions.has(perm.action)) {
      toCreate.push(perm);
    }
  }
  */

  if (toCreate.length === 0) {
    console.log('All permissions already set. Nothing to do.');
    return;
  }

  // Sequentially create missing permissions and log progress
  for (const perm of toCreate) {
    await strapi.db.query('plugin::users-permissions.permission').create({
      data: perm,
    });
    console.log('Created permission:', perm.action);
  }

  console.log(`Set ${toCreate.length} permission(s) successfully.`);
}

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  // Provide the Strapi global so referenced code can access it as expected
  global.strapi = app;
  app.log.level = 'error';

  try {
    await setPublicPermissions();
  } catch (error) {
    console.error('Failed to set permissions:', error);
    process.exit(1);
  } finally {
    await app.destroy();
  }

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});