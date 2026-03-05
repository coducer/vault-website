'use strict';

const fs = require('fs-extra');
const path = require('path');
const mime = require('mime-types');
const rawData = require('../data/data.json');
const {
  about = {},
  news = [],
  events = [],
  vaultStory = {},
  ceoAnnualLetters = [],
  whatWeDo = {},
  ourStory = {},
  team = [],
  operatingPartners = [],
  contact = {},
  homeAboutUs = {},
  eventsPage = {},
  homePartnerWithUs = {},
  wantToKnowMore = [],
  blogs = [],
  portfolio = [],
  investment = [],
  wealthServices = [],
  peAdvisory = [],
  vaultPerspectives = {}
} = rawData;

// Register default admin user if it doesn't exist
// Uncomment and use if you need to register a default admin
/*
async function registerDefaultAdminUser(strapi) {
  const adminUserService = strapi.admin.services.user;
  const existing = await adminUserService.findOne({ email: 'admin@thevaultpartners.com' });
  if (existing) {
    return;
  }
  await adminUserService.create({
    firstname: 'vault',
    lastname: '',
    email: 'admin@thevaultpartners.com',
    password: 'TheVaultPartners@123#',
    roles: await strapi.admin.services.role.find(),
    blocked: false,
    isActive: true,
  });
}
*/

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

// Fix: use process.env.NODE_ENV directly to get environment 
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
  if (!publicRole) {
    throw new Error('Could not find the public role for permissions');
  }

  const allPermissionsToCreate = [];
  Object.keys(newPermissions).forEach((controller) => {
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

const SEED_IMAGES_DIR = path.join(__dirname, 'seed-data', 'images');

function getFileSizeInBytes(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats['size'];
  } catch (err) {
    console.error(`Cannot get size for file ${filePath}:`, err);
    return 0;
  }
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

  const uploaded = await strapi
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

  return Array.isArray(uploaded) ? uploaded[0] : null;
}

async function uploadImageByName(fileName, options = {}) {
  if (!fileName || !String(fileName).trim()) return null;

  const name = path.basename(fileName, path.extname(fileName));
  const existingFile = await strapi.query('plugin::upload.file').findOne({
    where: { name },
  });

  if (existingFile) {
    return existingFile;
  }

  const filePath = path.join(SEED_IMAGES_DIR, fileName);
  if (!fs.existsSync(filePath)) {
    if (!options.silent) {
      console.warn(`Seed image not found: ${fileName}. Skipping. Add to scripts/seed-data/images/`);
    }
    return null;
  }

  return uploadImage(filePath);
}

async function createEntry({ model, entry, publish = false }) {
  try {
    const uid = model.includes('.') ? `api::${model}` : `api::${model}.${model}`;
    const options = {
      data: { ...entry, publishedAt: entry.publishedAt ?? new Date().toISOString() },
    };
    if (publish) {
      options.status = 'published';
    }
    await strapi.documents(uid).create(options);
  } catch (error) {
    console.error({ model, entry, error });
  }
}

async function uploadImagesByName(fileNames) {
  if (!Array.isArray(fileNames)) return null;
  const results = await Promise.all(fileNames.map((name) => uploadImageByName(name)));
  return results.length === 1 ? results[0] : results;
}

async function updateBlocks(blocks) {
  const updatedBlocks = [];
  for (const block of blocks) {
    if (block.__component === 'shared.media') {
      const uploadedFiles = await uploadImagesByName([block.file]);
      const blockCopy = { ...block, file: uploadedFiles };
      updatedBlocks.push(blockCopy);
    } else if (block.__component === 'shared.slider') {
      const existingAndUploadedFiles = await uploadImagesByName(block.files);
      const blockCopy = { ...block, files: existingAndUploadedFiles };
      updatedBlocks.push(blockCopy);
    } else {
      updatedBlocks.push(block);
    }
  }
  return updatedBlocks;
}

async function importBlogs() {
  for (const blog of blogs) {
    let bgImageFile = null;
    try {
      bgImageFile =
        (blog.bgImage && (await uploadImageByName(blog.bgImage))) ||
        (await uploadImageByName(`${blog.slug}.jpg`)) ||
        (await uploadImageByName('default_image.png'));
    } catch (e) {
      bgImageFile = null;
    }
    const { cover, blocks, category, author, ...rest } = blog;
    await createEntry({
      model: 'blog',
      entry: {
        ...rest,
        bgImage: bgImageFile?.id ?? null,
        date: rest.date ?? new Date().toISOString(),
        publishedAt: new Date().toISOString(),
      },
      publish: true,
    });
  }
}

async function importNews() {
  for (const newsItem of news) {
    const bgImageFile =
      (newsItem.bgImage && (await uploadImageByName(newsItem.bgImage))) ||
      (await uploadImageByName('default_image.png'));
    const { cover, blocks, author, ...rest } = newsItem;
    await createEntry({
      model: 'news.newspost',
      entry: {
        ...rest,
        bgImage: bgImageFile?.id ?? null,
        date: rest.date ?? new Date().toISOString(),
        publishedAt: new Date().toISOString(),
      },
      publish: true,
    });
  }
}

async function importEvents() {
  for (const event of events) {
    const { cover, bgImage: bgImageName, detailsImage, participants: participantFiles, partners: partnerFiles, ...rest } = event;

    const bgImageFile =
      (bgImageName && (await uploadImageByName(bgImageName))) ||
      (await uploadImageByName('event_bg.jpg')) ||
      (await uploadImageByName('default_image.png'));

    const resolvedDetailsImage = detailsImage
      ? await Promise.all(
        detailsImage.map(async (block) => {
          const imageFile = block.image ? await uploadImageByName(String(block.image).replace(/'$/, '')) : null;
          return {
            header: block.header,
            description: block.description,
            image: imageFile?.id ?? null,
          };
        })
      )
      : [];

    const participantIds = participantFiles
      ? (await Promise.all((participantFiles || []).map((name) => uploadImageByName(name))))
        .filter(Boolean)
        .map((f) => f.id)
      : [];

    const partnerIds = partnerFiles
      ? (await Promise.all((partnerFiles || []).map((name) => uploadImageByName(name))))
        .filter(Boolean)
        .map((f) => f.id)
      : [];

    await createEntry({
      model: 'event',
      entry: {
        ...rest,
        bgImage: bgImageFile?.id ?? null,
        detailsImage: resolvedDetailsImage,
        participants: participantIds,
        partners: partnerIds,
        publishedAt: new Date().toISOString(),
      },
      publish: true,
    });
  }
}

async function importAbout() {
  const heroImageFile = about?.heroImage ? await uploadImageByName(about.heroImage) : null;
  const details = (about?.details || []).map((d, i) => ({
    id: i + 1,
    heading: d.heading,
    body: d.body,
  }));
  await createEntry({
    model: 'about',
    entry: {
      ...about,
      heroImage: heroImageFile?.id ?? null,
      details,
      publishedAt: new Date().toISOString(),
    },
  });
}

async function importVaultStory() {
  const updatedBlocks = vaultStory.blocks?.length ? await updateBlocks(vaultStory.blocks) : [];
  const heroImageFile = vaultStory.heroImage ? await uploadImageByName(vaultStory.heroImage) : null;

  const { heroImage: _, ...vaultStoryData } = vaultStory;

  const details = (vaultStoryData.details || []).map((d, i) => ({
    id: i + 1,
    heading: d.heading,
    body: d.body,
  }));

  await createEntry({
    model: 'vault-story',
    entry: {
      ...vaultStoryData,
      heroImage: heroImageFile?.id ?? null,
      details,
      blocks: updatedBlocks,
      publishedAt: new Date().toISOString(),
    },
  });
}

async function importCeoAnnualLetters() {
  for (const letter of ceoAnnualLetters) {
    const avatarFile = letter.avatar ? await uploadImageByName(letter.avatar) : null;
    const imageFile = letter.image ? await uploadImageByName(letter.image) : null;
    const downloadFile =
      letter.downloadFile
        ? await uploadImageByName(letter.downloadFile)
        : await uploadImageByName('default_image.png');
    await createEntry({
      model: 'ceo-annual-letter',
      entry: {
        name: letter.name,
        designation: letter.designation || null,
        avatar: avatarFile?.id ?? null,
        image: imageFile?.id ?? null,
        downloadFile: downloadFile?.id ?? null,
        quote: letter.quote || null,
        publishedAt: new Date().toISOString(),
      },
      publish: true,
    });
  }
}

async function importWhatWeDo() {
  await createEntry({
    model: 'what-we-do',
    entry: {
      header: whatWeDo.header || null,
      items: whatWeDo.items || [],
      publishedAt: new Date().toISOString(),
    },
  });
}

async function importOurStory() {
  const items = await Promise.all(
    (ourStory.items || []).map(async (item) => {
      const imageFile = item.image && String(item.image).trim() ? await uploadImageByName(String(item.image).replace(/'$/, '')) : null;
      return {
        title: item.title || null,
        image: imageFile?.id ?? null,
        details: (item.details || []).map((d) => ({ text: d.text })),
      };
    })
  );

  await createEntry({
    model: 'our-story',
    entry: {
      header: ourStory.header || null,
      items,
      publishedAt: new Date().toISOString(),
    },
  });
}

async function importTeam() {
  for (const member of team) {
    const imageFile = member.image ? await uploadImageByName(member.image) : null;

    await createEntry({
      model: 'team',
      entry: {
        name: member.name,
        designation: member.designation || null,
        description: member.description || null,
        image: imageFile?.id ?? null,
        linkedin: member.linkedin || null,
        email: member.email || null,
        phone: member.phone || null,
        publishedAt: new Date().toISOString(),
      },
      publish: true,
    });
  }
}

async function importOperatingPartners() {
  for (const partner of operatingPartners) {
    const imageFile = partner.image ? await uploadImageByName(partner.image) : null;

    await createEntry({
      model: 'operating-partner',
      entry: {
        name: partner.name,
        description: partner.description || null,
        image: imageFile?.id ?? null,
        linkedin: partner.linkedin || null,
        email: partner.email || null,
        phone: partner.phone || null,
        publishedAt: new Date().toISOString(),
      },
      publish: true,
    });
  }
}

async function importContact() {
  await createEntry({
    model: 'contact',
    entry: {
      adminEmail: contact.adminEmail || 'admin@example.com',
      displayEmail: contact.displayEmail || null,
      addressLine1: contact.addressLine1 || null,
      addressLine2: contact.addressLine2 || null,
      publishedAt: new Date().toISOString(),
    },
  });
}

async function importHomeAboutUs() {
  await createEntry({
    model: 'home-about-us',
    entry: {
      title: homeAboutUs.title || null,
      text: homeAboutUs.text || [],
      buttonName: homeAboutUs.buttonName || null,
      link: homeAboutUs.link || null,
      publishedAt: new Date().toISOString(),
    },
  });
}

async function importEventsPage() {
  const heroImageFile = eventsPage.heroImage ? await uploadImageByName(eventsPage.heroImage) : null;

  await createEntry({
    model: 'events-page',
    entry: {
      title: eventsPage.title || null,
      heroImage: heroImageFile?.id ?? null,
      publishedAt: new Date().toISOString(),
    },
  });
}

async function importHomePartnerWithUs() {
  const items = await Promise.all(
    (homePartnerWithUs.items || []).map(async (item) => {
      const iconFile = item.icon ? await uploadImageByName(item.icon) : null;
      return {
        icon: iconFile?.id ?? null,
        title: item.title || null,
        subtitle: item.subtitle || null,
      };
    })
  );

  await createEntry({
    model: 'home-partner-with-us',
    entry: {
      title: homePartnerWithUs.title || null,
      buttonName: homePartnerWithUs.buttonName || null,
      link: homePartnerWithUs.link || null,
      items,
      publishedAt: new Date().toISOString(),
    },
  });
}

async function importWantToKnowMore() {
  for (const item of wantToKnowMore) {
    await createEntry({
      model: 'want-to-know-more',
      entry: {
        path: item.path,
        title: item.title || null,
        buttonName: item.buttonName || null,
        link: item.link || null,
        publishedAt: new Date().toISOString(),
      },
    });
  }
}

async function importPortfolio() {
  for (const item of portfolio) {
    let imageFile = null;
    if (item.bgImage) {
      imageFile = await uploadImageByName(item.bgImage);
    }
    await createEntry({
      model: 'portfolio',
      entry: {
        title: item.title,
        display_title: item.display_title || null,
        description: item.description || null,
        company_url: item.company_url || null,
        category: item.category || null,
        bgImage: imageFile?.id ?? null,
        publishedAt: new Date().toISOString(),
      },
      publish: true,
    });
  }
}

async function importInvestment() {
  if (!investment) return;

  let bgImageFile = null;
  if (investment.bgImage) {
    bgImageFile = await uploadImageByName(investment.bgImage);
  }

  const investItems = [];
  for (const item of investment.investItems || []) {
    let iconFile = null;
    if (item.icon) {
      iconFile = await uploadImageByName(item.icon);
    }
    investItems.push({
      text: item.text,
      icon: iconFile?.id || null,
    });
  }


  const whatWeDoItems = (investment.whatWeDoItems || []).map(item => ({
    title: item.title,
    link: item.link,
  }));

  await createEntry({
    model: 'investment',
    entry: {
      bgImage: bgImageFile?.id || null,
      title: investment.title || null,
      introTitle: investment.introTitle || null,
      introDescription: investment.introDescription || null,
      investTitle: investment.investTitle || null,
      investItems,
      buttonName: investment.buttonName || null,
      buttonLink: investment.buttonLink || null,
      whatWeDoTitle: investment.whatWeDoTitle || null,
      whatWeDoItems,
      publishedAt: new Date().toISOString(),
    },
    publish: true,
  });
}

async function importWealthService() {
  if (!wealthServices) return;

  let bgImageFile = null;
  if (wealthServices.bgImage) {
    bgImageFile = await uploadImageByName(wealthServices.bgImage);
  }

  let sectionsImageFile = null;
  if (wealthServices.sectionsImage) {
    sectionsImageFile = await uploadImageByName(wealthServices.sectionsImage);
  }

  let sections = [];
  if (Array.isArray(wealthServices.sections)) {
    for (const section of wealthServices.sections) {
      let items = [];
      if (Array.isArray(section.items)) {
        items = section.items.map(i =>
          typeof i === "string"
            ? { text: i }
            : (i && typeof i === "object" && typeof i.text === "string")
              ? { text: i.text }
              : null
        ).filter(Boolean);
      }

      let iconFile = null;
      if (section.icon) {
        iconFile = await uploadImageByName(section.icon);
      }

      sections.push({
        title: section.title ?? "",
        icon: iconFile?.id ?? null,
        items,
      });
    }
  }

  let whatWeDoItems = [];
  if (Array.isArray(wealthServices.whatWeDoItems)) {
    whatWeDoItems = wealthServices.whatWeDoItems.map(item => ({
      title: item.title ?? "",
      link: item.link ?? "",
    }));
  }

  await createEntry({
    model: 'wealth-service',
    entry: {
      bgImage: bgImageFile?.id ?? null,
      title: wealthServices.title ?? "",
      introTitle: wealthServices.introTitle ?? "",
      introDescription: wealthServices.introDescription ?? "",
      wealthServicesTitle: wealthServices.wealthServicesTitle ?? "",
      wealthServicesButtonName: wealthServices.wealthServicesButtonName ?? "",
      wealthServicesButtonLink: wealthServices.wealthServicesButtonLink ?? "",
      whatWeDoTitle: wealthServices?.whatWeDoTitle ?? "",
      sections,
      sectionsImage: sectionsImageFile?.id ?? null,
      whatWeDoItems,
      publishedAt: new Date().toISOString(),
    },
    publish: true,
  });
}

async function importPeAdvisory() {
  if (!peAdvisory) return;

  let bgImageFile = null;
  if (peAdvisory.bgImage) {
    bgImageFile = await uploadImageByName(peAdvisory.bgImage);
  }

  let sectionsFirstImageFile = null;
  if (peAdvisory.sectionsFirstImage) {
    sectionsFirstImageFile = await uploadImageByName(peAdvisory.sectionsFirstImage);
  }

  let sectionsLastImageFile = null;
  if (peAdvisory.sectionsLastImage) {
    sectionsLastImageFile = await uploadImageByName(peAdvisory.sectionsLastImage);
  }

  let sections = [];
  if (Array.isArray(peAdvisory.sections)) {
    for (const section of peAdvisory.sections) {
      let items = [];
      if (Array.isArray(section.items)) {
        items = section.items.map(i =>
          typeof i === "string"
            ? { text: i }
            : (i && typeof i === "object" && typeof i.text === "string")
              ? { text: i.text }
              : null
        ).filter(Boolean);
      }

      let iconFile = null;
      if (section.icon) {
        iconFile = await uploadImageByName(section.icon);
      }

      sections.push({
        title: section.title ?? "",
        icon: iconFile?.id ?? null,
        items,
      });
    }
  }

  let whatWeDoItems = [];
  if (Array.isArray(peAdvisory.whatWeDoItems)) {
    whatWeDoItems = peAdvisory.whatWeDoItems.map(item => ({
      title: item.title ?? "",
      link: item.link ?? "",
    }));
  }

  await createEntry({
    model: 'pe-advisory',
    entry: {
      bgImage: bgImageFile?.id ?? null,
      title: peAdvisory.title ?? "",
      introTitle: peAdvisory.introTitle ?? "",
      introDescription: peAdvisory.introDescription ?? "",
      peAdvisoryTitle: peAdvisory.peAdvisoryTitle ?? "",
      peAdvisoryButtonName: peAdvisory.peAdvisoryButtonName ?? "",
      peAdvisoryButtonLink: peAdvisory.peAdvisoryButtonLink ?? "",
      sections,
      sectionsFirstImage: sectionsFirstImageFile?.id ?? null,
      sectionsLastImage: sectionsLastImageFile?.id ?? null,
      whatWeDoTitle: peAdvisory.whatWeDoTitle ?? "",
      whatWeDoItems,
      publishedAt: new Date().toISOString(),
    },
    publish: true,
  });
}

async function importVaultPerspectives() {
  if (!vaultPerspectives) return;

  // Upload bgImage if exists
  let bgImageFile = null;
  if (vaultPerspectives.bgImage) {
    bgImageFile = await uploadImageByName(vaultPerspectives.bgImage);
  }

  // Upload ceoAnnualLettersSectionImage if exists
  let ceoAnnualLettersSectionImageFile = null;
  if (vaultPerspectives.ceoAnnualLettersSectionImage) {
    ceoAnnualLettersSectionImageFile = await uploadImageByName(
      vaultPerspectives.ceoAnnualLettersSectionImage
    );
  }

  // Upload downloadfile if exists
  let downloadfile = null;
  if (vaultPerspectives.downloadfile) {
    downloadfile = await uploadImageByName(vaultPerspectives.downloadfile);
  }

  await createEntry({
    model: 'vault-perspectives',
    entry: {
      bgImage: bgImageFile?.id ?? null,
      title: vaultPerspectives.title ?? "",
      newsTitle: vaultPerspectives.newsTitle ?? "",
      ceoAnnualLettersSectionTitle: vaultPerspectives.ceoAnnualLettersSectionTitle ?? "",
      ceoAnnualLettersSectionImage: ceoAnnualLettersSectionImageFile?.id ?? null,
      downloadfile: downloadfile?.id ?? null,
      downloadButtonLabel: vaultPerspectives.downloadButtonLabel ?? undefined,
      publishedAt: new Date().toISOString(),
    },
    publish: true,
  });
}



async function importSeedData() {
  await setPublicPermissions({
    blog: ['find', 'findOne'],
    'news.newspost': ['find', 'findOne'],
    event: ['find', 'findOne'],
    category: ['find', 'findOne'],
    author: ['find', 'findOne'],
    about: ['find', 'findOne'],
    'vault-story': ['find', 'findOne'],
    'ceo-annual-letter': ['find', 'findOne'],
    'what-we-do': ['find', 'findOne'],
    'our-story': ['find', 'findOne'],
    team: ['find', 'findOne'],
    'operating-partner': ['find', 'findOne'],
    contact: ['find', 'findOne'],
    'home-about-us': ['find', 'findOne'],
    'home-partner-with-us': ['find', 'findOne'],
    'events-page': ['find', 'findOne'],
    'want-to-know-more': ['find', 'findOne'],
    'portfolio': ['find', 'findOne'],
    'investment': ['find', 'findOne'],
    'wealthservice': ['find', 'findOne'], // <-- ADDED WEALTHSERVICE PERMISSIONS
    'vault-perspectives': ['find', 'findOne'],
  });

  await importAbout();
  await importVaultStory();
  await importWhatWeDo();
  await importOurStory();
  await importHomeAboutUs();
  await importEventsPage();
  await importHomePartnerWithUs();
  await importContact();
  await importBlogs();
  await importNews();
  await importEvents();
  await importCeoAnnualLetters();
  await importTeam();
  await importOperatingPartners();
  await importWantToKnowMore();
  await importPortfolio();
  await importInvestment();
  await importWealthService();
  await importPeAdvisory();
  await importVaultPerspectives();
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
