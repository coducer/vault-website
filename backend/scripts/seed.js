'use strict';

const fs = require('fs-extra');
const path = require('path');
const mime = require('mime-types');
const { categories, authors, articles, global, about, news, events } = require('../data/data.json');

const vaultAboutUsDetails = [
  {
    id: 1,
    heading: 'Vault is a mission-driven network.',
    body: 'Our mission is to promote growth in a responsible manner at all levels. In our network, capital grows responsibly towards funders; companies – towards their investors; founders – towards their companies; and industries – towards humans and environment.',
  },
  {
    id: 2,
    heading: 'We address the stated mission at',
    body: `all levels of value creation – from wealth structuring, down to direct investment and operational management. Such strategy of vertical engagement, normally slow and cumbersome, was made easily possible by diverse background of Vault's founders and its operating partners. Vertical engagement and the network of operating partners are key to performance of our ecosystem.`,
  },
  {
    id: 3,
    heading: 'To achieve our mission, we',
    body: 'orchestrate Vault Investments, Vault PE Advisory and Vault Wealth around talented and ambitious founders and companies. We accelerate their growth and improve their chances to deliver on their mission in a responsible manner.',
  },
];

async function seedExampleApp() {
  const shouldImportSeedData = await isFirstRun();

  if (shouldImportSeedData) {
    try {
      console.log('Setting up the template...');
      await importSeedData();
      console.log('Ready to go');
    } catch (error) {
      console.log('Could not import seed data');
      console.error(error);
    }
  } else {
    console.log(
      'Seed data has already been imported. We cannot reimport unless you clear your database first.'
    );
  }
}

async function isFirstRun() {
  const pluginStore = strapi.store({
    environment: strapi.config.environment,
    type: 'type',
    name: 'setup',
  });
  const initHasRun = await pluginStore.get({ key: 'initHasRun' });
  await pluginStore.set({ key: 'initHasRun', value: true });
  return !initHasRun;
}

async function setPublicPermissions(newPermissions) {
  const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
    where: {
      type: 'public',
    },
  });

  const allPermissionsToCreate = [];
  Object.keys(newPermissions).map((controller) => {
    const actions = newPermissions[controller];
    const [apiId, contentTypeId] = controller.includes('.')
      ? controller.split('.')
      : [controller, controller];
    const permissionsToCreate = actions.map((action) => {
      return strapi.query('plugin::users-permissions.permission').create({
        data: {
          action: `api::${apiId}.${contentTypeId}.${action}`,
          role: publicRole.id,
        },
      });
    });
    allPermissionsToCreate.push(...permissionsToCreate);
  });
  await Promise.all(allPermissionsToCreate);
}

// Seed images live in scripts/seed-data/images/ (recommended for CI/CD, keeps images in repo)
const SEED_IMAGES_DIR = path.join(__dirname, 'seed-data', 'images');

function getFileSizeInBytes(filePath) {
  const stats = fs.statSync(filePath);
  return stats['size'];
}

async function uploadImage(filePath) {
  const ext = path.extname(filePath);
  const mimeType = mime.lookup(ext) || 'image/jpeg';
  const fileName = path.basename(filePath);
  const name = path.basename(filePath, ext);

  const file = {
    filepath: path.resolve(filePath),
    originalFileName: fileName,
    size: getFileSizeInBytes(filePath),
    mimetype: mimeType,
  };

  const [uploadedFile] = await strapi
    .plugin('upload')
    .service('upload')
    .upload({
      data: {
        fileInfo: {
          alternativeText: `An image uploaded to Strapi called ${name}`,
          caption: name,
          name,
        },
      },
      files: file,
    });

  return uploadedFile;
}

async function uploadImageByName(fileName) {
  const name = path.basename(fileName, path.extname(fileName));
  const existingFile = await strapi.query('plugin::upload.file').findOne({
    where: { name },
  });

  if (existingFile) {
    return existingFile;
  }

  const filePath = path.join(SEED_IMAGES_DIR, fileName);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Seed image not found: ${filePath}. Add images to scripts/seed-data/images/`);
  }

  return uploadImage(filePath);
}

// Create an entry and attach files if there are any
async function createEntry({ model, entry }) {
  try {
    const uid = model.includes('.') ? `api::${model}` : `api::${model}.${model}`;
    await strapi.documents(uid).create({
      data: entry,
    });
  } catch (error) {
    console.error({ model, entry, error });
  }
}

async function uploadImagesByName(fileNames) {
  const results = await Promise.all(fileNames.map((name) => uploadImageByName(name)));
  return results.length === 1 ? results[0] : results;
}

async function updateBlocks(blocks) {
  const updatedBlocks = [];
  for (const block of blocks) {
    if (block.__component === 'shared.media') {
      const uploadedFiles = await uploadImagesByName([block.file]);
      // Copy the block to not mutate directly
      const blockCopy = { ...block };
      // Replace the file name on the block with the actual file
      blockCopy.file = uploadedFiles;
      updatedBlocks.push(blockCopy);
    } else if (block.__component === 'shared.slider') {
      // Get files already uploaded to Strapi or upload new files
      const existingAndUploadedFiles = await uploadImagesByName(block.files);
      // Copy the block to not mutate directly
      const blockCopy = { ...block };
      // Replace the file names on the block with the actual files
      blockCopy.files = existingAndUploadedFiles;
      // Push the updated block
      updatedBlocks.push(blockCopy);
    } else {
      // Just push the block as is
      updatedBlocks.push(block);
    }
  }

  return updatedBlocks;
}

async function importBlogs() {
  for (const blog of articles) {
    let bgImageFile = null;
    try {
      bgImageFile = await uploadImagesByName([`${blog.slug}.jpg`]);
    } catch {
      try {
        bgImageFile = await uploadImagesByName(['coffee-art.jpg']);
      } catch {
        bgImageFile = null;
      }
    }
    const { cover, blocks, category, author, ...rest } = blog;
    await createEntry({
      model: 'blog',
      entry: {
        ...rest,
        bgImage: bgImageFile?.id ?? null,
        date: rest.date ?? new Date().toISOString(),
        publishedAt: Date.now(),
      },
    });
  }
}

async function importNews() {
  for (const newsItem of news) {
    let bgImageFile = null;
    try {
      bgImageFile = await uploadImagesByName(['coffee-art.jpg']);
    } catch {
      bgImageFile = null;
    }
    const { cover, blocks, author, ...rest } = newsItem;
    await createEntry({
      model: 'news.newspost',
      entry: {
        ...rest,
        bgImage: bgImageFile?.id ?? null,
        date: rest.date ?? new Date().toISOString(),
        publishedAt: Date.now(),
      },
    });
  }
}

async function importEvents() {
  for (const event of events) {
    let bgImageFile = null;
    try {
      bgImageFile = await uploadImagesByName(['coffee-art.jpg']);
    } catch {
      bgImageFile = null;
    }
    const { cover, ...rest } = event;
    await createEntry({
      model: 'event',
      entry: {
        ...rest,
        bgImage: bgImageFile?.id ?? null,
        publishedAt: Date.now(),
      },
    });
  }
}

async function importGlobal() {
  const faviconFile = await uploadImagesByName(['favicon.png']);
  const shareImageFile = await uploadImagesByName(['default-image.png']);
  return createEntry({
    model: 'global',
    entry: {
      ...global,
      favicon: faviconFile?.id ?? null,
      publishedAt: Date.now(),
      defaultSeo: {
        ...global.defaultSeo,
        shareImage: shareImageFile?.id ?? null,
      },
    },
  });
}

async function importAbout() {
  const updatedBlocks = about.blocks?.length ? await updateBlocks(about.blocks) : [];
  const heroImageFile = about.heroImage ? await uploadImageByName(about.heroImage) : null;

  const { heroImage: _heroImage, ...aboutData } = about;

  await createEntry({
    model: 'about',
    entry: {
      ...aboutData,
      heroImage: heroImageFile?.id ?? null,
      details: vaultAboutUsDetails,
      blocks: updatedBlocks,
      publishedAt: Date.now(),
    },
  });
}

async function importCategories() {
  for (const category of categories) {
    await createEntry({ model: 'category', entry: category });
  }
}

async function importAuthors() {
  for (const author of authors) {
    const avatarFile = await uploadImageByName(author.avatar);

    await createEntry({
      model: 'author',
      entry: {
        ...author,
        avatar: avatarFile?.id ?? null,
      },
    });
  }
}

async function importSeedData() {
  // Allow read of application content types
  await setPublicPermissions({
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
    team: ['find', 'findOne'],
    'operating-partner': ['find', 'findOne'],
  });

  // Create all entries
  await importCategories();
  await importAuthors();
  await importBlogs();
  await importNews();
  await importEvents();
  await importGlobal();
  await importAbout();
}

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  app.log.level = 'error';

  await seedExampleApp();
  await app.destroy();

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
