'use strict';

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
  'about': ['find', 'findOne'],
  'want-to-know-more': ['find', 'findOne'],
};

async function setPublicPermissions() {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) {
    throw new Error('Public role not found');
  }

  const existingPermissions = await strapi.db
    .query('plugin::users-permissions.permission')
    .findMany({ where: { role: publicRole.id } });

  const existingActions = new Set(existingPermissions.map((p) => p.action));

  const toCreate = [];
  for (const [controller, actions] of Object.entries(PERMISSIONS_TO_SET)) {
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

  if (toCreate.length === 0) {
    console.log('All permissions already set. Nothing to do.');
    return;
  }

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

  // Scripts expect global strapi (e.g. seed.js); set it so setPublicPermissions can run
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