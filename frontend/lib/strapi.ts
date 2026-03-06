const STRAPI_URL = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

const FETCH_TIMEOUT_MS = 8000;

type StrapiFetchOptions = RequestInit & {
  next?: { revalidate?: number };
};

async function strapiFetch<T>(
  endpoint: string,
  options?: StrapiFetchOptions
): Promise<{ data: T }> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  const { next, ...fetchOpts } = options ?? {};
  const response = await fetch(`${STRAPI_URL}${endpoint}`, {
    ...fetchOpts,
    signal: controller.signal,
    next: next ?? { revalidate: 60 },
  });
  clearTimeout(timeout);

  if (!response.ok) {
    const text = await response.text();
    console.error('Strapi response:', text);
    throw new Error(`Strapi API error: ${response.status}`);
  }

  return response.json();
}

export function getStrapiMediaUrl(url: string): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

// --- Rich text (Strapi 5 richtext blocks) ---
export type StrapiRichTextChild = {
  type: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
};

export type StrapiRichTextBlock = {
  type: string;
  format?: string;
  children?: Array<StrapiRichTextChild | StrapiRichTextBlock>;
};

/** Extract array of paragraph strings from Strapi richtext blocks for display. */
export function strapiRichTextToParagraphs(blocks: StrapiRichTextBlock[] | null | undefined): string[] {
  if (!blocks || !Array.isArray(blocks)) return [];
  return blocks
    .filter((b) => b.type === 'paragraph' && b.children?.length)
    .map((b) =>
      (b.children ?? [])
        .map((c) => ('text' in c && typeof c.text === 'string' ? c.text : ''))
        .join('')
    )
    .filter(Boolean);
}

/** Get plain text from Strapi richtext (first paragraph or concatenated). */
export function strapiRichTextToPlainText(blocks: StrapiRichTextBlock[] | null | undefined): string {
  const paragraphs = strapiRichTextToParagraphs(blocks);
  return paragraphs.join('\n\n') || '';
}

// --- About (single type) ---
export interface AboutDetailItem {
  id?: number;
  heading: string;
  body: string;
}

export interface AboutData {
  documentId?: string;
  id?: number;
  title?: string;
  heroImage?: { url: string; alternativeText?: string } | null;
  details?: Array<{ heading?: string; body?: string }>;
  blocks?: unknown[];
}

const ABOUT_POPULATE =
  'populate[0]=heroImage&populate[1]=details&populate[2]=blocks';

export async function getAboutPage(): Promise<AboutData | null> {
  try {
    const json = await strapiFetch<AboutData>(
      `/api/about?${ABOUT_POPULATE}`
    );
    const data = json?.data ?? null;
    // Add id to details for React keys (Strapi component has no id)
    if (data?.details) {
      data.details = data.details.map((d, i) => ({
        id: i + 1,
        heading: d?.heading ?? '',
        body: d?.body ?? '',
      })) as AboutDetailItem[];
    }
    return data;
  } catch (error) {
    console.error('Failed to fetch about page from Strapi:', error);
    return null;
  }
}

// --- Vault Story (single type, same shape as About) ---
export type VaultStoryData = AboutData;

const VAULT_STORY_POPULATE =
  'populate[0]=heroImage&populate[1]=details&populate[2]=blocks';

export async function getVaultStoryPage(): Promise<VaultStoryData | null> {
  try {
    const json = await strapiFetch<VaultStoryData>(
      `/api/vault-story?${VAULT_STORY_POPULATE}`
    );
    const data = json?.data ?? null;
    if (data?.details) {
      data.details = data.details.map((d, i) => ({
        id: i + 1,
        heading: d?.heading ?? '',
        body: d?.body ?? '',
      })) as AboutDetailItem[];
    }
    return data;
  } catch (error) {
    console.error('Failed to fetch vault story page from Strapi:', error);
    return null;
  }
}

// --- Events Page (single type) ---
export interface EventsPageData {
  documentId?: string;
  title?: string;
  heroImage?: { url: string; alternativeText?: string } | null;
  email?: string;
}

const EVENTS_PAGE_POPULATE = 'populate=heroImage';

export async function getEventsPage(): Promise<EventsPageData | null> {
  try {
    const json = await strapiFetch<EventsPageData>(
      `/api/events-page?${EVENTS_PAGE_POPULATE}`
    );
    return json?.data ?? null;
  } catch (error) {
    console.error('Failed to fetch events page from Strapi:', error);
    return null;
  }
}

// --- Global (single type) ---
export interface GlobalData {
  documentId?: string;
  siteName?: string;
  siteDescription?: string;
  favicon?: { url: string } | null;
  defaultSeo?: {
    metaTitle?: string;
    metaDescription?: string;
    shareImage?: { url: string } | null;
  };
}

const GLOBAL_POPULATE = 'populate[0]=favicon&populate[1]=defaultSeo';

export async function getGlobal(): Promise<GlobalData | null> {
  try {
    const json = await strapiFetch<GlobalData>(
      `/api/global?${GLOBAL_POPULATE}`
    );
    return json?.data ?? null;
  } catch (error) {
    console.error('Failed to fetch global from Strapi:', error);
    return null;
  }
}

// --- Contact (single type) ---
export interface ContactData {
  documentId?: string;
  adminEmail?: string;
  displayEmail?: string;
  addressLine1?: string;
  addressLine2?: string;
}

export async function getContact(): Promise<ContactData | null> {
  try {
    const json = await strapiFetch<ContactData>('/api/contact');
    return json?.data ?? null;
  } catch (error) {
    console.error('Failed to fetch contact from Strapi:', error);
    return null;
  }
}

// --- CEO Annual Letters (collection) ---
export interface CeoAnnualLetterItem {
  documentId: string;
  name?: string;
  designation?: string;
  avatar?: { url: string; alternativeText?: string } | null;
  image?: { url: string; alternativeText?: string } | null;
  quote?: string;
}

export async function getCeoAnnualLetters(): Promise<CeoAnnualLetterItem[]> {
  try {
    const json = await strapiFetch<CeoAnnualLetterItem[] | CeoAnnualLetterItem>(
      '/api/ceo-annual-letters?populate[0]=avatar&populate[1]=image'
    );
    const data = json?.data;
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Failed to fetch CEO annual letters from Strapi:', error);
    return [];
  }
}

// --- What We Do (single type) ---
export interface WhatWeDoPoint {
  text?: string;
}

export interface WhatWeDoItem {
  title?: string;
  item_title?: string;
  description?: string;
  points?: WhatWeDoPoint[];
  link?: string;
}

export interface WhatWeDoData {
  header?: string;
  items?: WhatWeDoItem[];
}

const WHAT_WE_DO_POPULATE = 'populate[0]=items&populate[1]=items.points';

export async function getWhatWeDo(): Promise<WhatWeDoData | null> {
  try {
    const json = await strapiFetch<WhatWeDoData>(
      `/api/what-we-do?${WHAT_WE_DO_POPULATE}`
    );
    return json?.data ?? null;
  } catch (error) {
    console.error('Failed to fetch what we do from Strapi:', error);
    return null;
  }
}

// --- Our Story (single type) ---
export interface OurStoryDetailItem {
  text?: string;
}

export interface OurStoryItem {
  title?: string;
  image?: { url: string; alternativeText?: string } | null;
  details?: OurStoryDetailItem[];
}

export interface OurStoryData {
  header?: string;
  items?: OurStoryItem[];
}

const OUR_STORY_POPULATE =
  'populate[0]=items&populate[1]=items.image&populate[2]=items.details';

export async function getOurStory(): Promise<OurStoryData | null> {
  try {
    const json = await strapiFetch<OurStoryData>(
      `/api/our-story?${OUR_STORY_POPULATE}`
    );
    return json?.data ?? null;
  } catch (error) {
    console.error('Failed to fetch our story from Strapi:', error);
    return null;
  }
}

// --- Home About Us (single type) ---
export interface HomeAboutUsTextLine {
  text?: string;
}

export interface HomeAboutUsData {
  documentId?: string;
  title?: string;
  text?: HomeAboutUsTextLine[];
  buttonName?: string;
  link?: string;
}

const HOME_ABOUT_US_POPULATE = 'populate[0]=text';

export async function getHomeAboutUs(): Promise<HomeAboutUsData | null> {
  try {
    const json = await strapiFetch<HomeAboutUsData>(
      `/api/home-about-us?${HOME_ABOUT_US_POPULATE}`
    );
    return json?.data ?? null;
  } catch (error) {
    console.error('Failed to fetch home about us from Strapi:', error);
    return null;
  }
}

// --- Home Partner With Us (single type) ---
export interface HomePartnerWithUsItem {
  icon?: { url: string; alternativeText?: string } | null;
  title?: string;
  subtitle?: string;
}

export interface HomePartnerWithUsData {
  documentId?: string;
  title?: string;
  buttonName?: string;
  link?: string;
  items?: HomePartnerWithUsItem[];
}

const HOME_PARTNER_WITH_US_POPULATE = 'populate[0]=items&populate[1]=items.icon';

export async function getHomePartnerWithUs(): Promise<HomePartnerWithUsData | null> {
  try {
    const json = await strapiFetch<HomePartnerWithUsData>(
      `/api/home-partner-with-us?${HOME_PARTNER_WITH_US_POPULATE}`
    );
    return json?.data ?? null;
  } catch (error) {
    console.error('Failed to fetch home partner with us from Strapi:', error);
    return null;
  }
}

// --- Want To Know More (collection, keyed by path) ---
export interface WantToKnowMoreEntry {
  documentId?: string;
  path?: string;
  title?: string;
  buttonName?: string;
  link?: string;
}

export async function getWantToKnowMoreList(): Promise<WantToKnowMoreEntry[]> {
  try {
    const json = await strapiFetch<WantToKnowMoreEntry[] | WantToKnowMoreEntry>(
      '/api/want-to-know-mores'
    );
    const data = json?.data;
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Failed to fetch want to know more list from Strapi:', error);
    return [];
  }
}

/** Find entry for pathname: exact path match, else longest path prefix match (e.g. /event matches /event/123). */
export function findWantToKnowMoreForPath(
  entries: WantToKnowMoreEntry[],
  pathname: string
): WantToKnowMoreEntry | null {
  const normalized = pathname.replace(/\/$/, '') || '/';
  const withPath = entries.filter((e) => e.path != null && e.path !== '');
  const exact = withPath.find((e) => (e.path!.replace(/\/$/, '') || '/') === normalized);
  if (exact) return exact;
  const sorted = [...withPath].sort(
    (a, b) => (b.path?.length ?? 0) - (a.path?.length ?? 0)
  );
  return (
    sorted.find((e) => {
      const p = e.path!.replace(/\/$/, '') || '/';
      return normalized === p || (normalized.startsWith(p + '/') && p !== '/');
    }) ?? null
  );
}

// --- Blogs ---
export interface BlogItem {
  documentId: string;
  title?: string;
  description?: string | StrapiRichTextBlock[];
  slug?: string;
  date?: string;
  publishedAt?: string;
  bgImage?: { url: string; alternativeText?: string } | null;
}

export async function getBlogs(): Promise<BlogItem[]> {
  try {
    const json = await strapiFetch<BlogItem[] | BlogItem>(
      '/api/blogs?populate=bgImage'
    );
    const data = json?.data;
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Failed to fetch blogs from Strapi:', error);
    return [];
  }
}

export async function getBlogById(id: string): Promise<BlogItem | null> {
  try {
    const json = await strapiFetch<BlogItem>(
      `/api/blogs/${id}?populate=bgImage`
    );
    return json?.data ?? null;
  } catch (error) {
    console.error('Failed to fetch blog from Strapi:', error);
    return null;
  }
}

// --- News ---
export interface NewsItem {
  id: string
  documentId: string;
  title?: string;
  description?: string | StrapiRichTextBlock[];
  slug?: string;
  date?: string;
  publishedAt?: string;
  bgImage?: { url: string; alternativeText?: string } | null;
}

export async function getNews(): Promise<NewsItem[]> {
  try {
    const json = await strapiFetch<NewsItem[] | NewsItem>(
      '/api/news?populate=bgImage'
    );
    const data = json?.data;
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Failed to fetch news from Strapi:', error);
    return [];
  }
}

export async function getNewsById(id: string): Promise<NewsItem | null> {
  try {
    const json = await strapiFetch<NewsItem>(
      `/api/news/${id}?populate=bgImage`
    );
    return json?.data ?? null;
  } catch (error) {
    console.error('Failed to fetch news from Strapi:', error);
    return null;
  }
}

// --- Teams ---
export interface TeamItem {
  documentId: string;
  name?: string;
  image?: { url: string; alternativeText?: string } | null;
  description?: StrapiRichTextBlock[];
  linkedin?: string;
  email?: string;
  phone?: string;
  designation?: string;
}

export async function getTeams(): Promise<TeamItem[]> {
  try {
    const json = await strapiFetch<TeamItem[] | TeamItem>(
      '/api/teams?populate=image'
    );
    const data = json?.data;
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Failed to fetch teams from Strapi:', error);
    return [];
  }
}

// --- Operating Partners ---
export interface OperatingPartnerItem {
  documentId: string;
  name?: string;
  image?: { url: string; alternativeText?: string } | null;
  description?: StrapiRichTextBlock[];
  linkedin?: string;
  email?: string;
  phone?: string;
}

export async function getOperatingPartners(): Promise<OperatingPartnerItem[]> {
  try {
    const json = await strapiFetch<OperatingPartnerItem[] | OperatingPartnerItem>(
      '/api/operating-partners?populate=image'
    );
    const data = json?.data;
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Failed to fetch operating partners from Strapi:', error);
    return [];
  }
}

// --- Portfolio (collection) ---

export interface PortfolioItem {
  id: string;
  documentId: string;
  title: string;
  display_title: string;
  category: string;
  bgImage: { url: string; alternativeText: string } | null;
  description: string | StrapiRichTextBlock[];
  company_url: string;
}

export async function getAllPortfolio(): Promise<PortfolioItem[]> {
  try {
    const json = await strapiFetch<PortfolioItem[] | PortfolioItem>(
      '/api/portfolios?populate=bgImage'
    );
    const data = json?.data;
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Failed to fetch portfolios from Strapi:', error);
    return [];
  }
}

export async function getByIdPortfolio(id: string): Promise<PortfolioItem | null> {
  try {
    const json = await strapiFetch<PortfolioItem>(
      `/api/portfolios/${id}?populate=bgImage`
    );
    return json?.data ?? null;
  } catch (error) {
    console.error('Failed to fetch portfolio item from Strapi:', error);
    return null;
  }
}

// --- Investment (single type) ---
export interface InvestmentWhatWeDoItem {
  title?: string;
  link?: string;
}

export interface InvestmentInvestItem {
  text?: string;
  icon?: { url: string; alternativeText?: string } | null;
}

export interface InvestmentData {
  id?: number;
  bgImage?: { url: string; alternativeText?: string } | null;
  title?: string;
  introTitle?: string;
  introDescription?: string | StrapiRichTextBlock[];
  investTitle?: string;
  investItems?: InvestmentInvestItem[];
  buttonName?: string;
  buttonLink?: string;
  whatWeDoTitle?: string;
  whatWeDoItems?: InvestmentWhatWeDoItem[];
}

const INVESTMENT_POPULATE =
  "populate[0]=bgImage&populate[1]=investItems.icon&populate[2]=whatWeDoItems";

export async function getInvestment(): Promise<InvestmentData | null> {
  try {
    const json = await strapiFetch<InvestmentData>(
      `/api/investment?${INVESTMENT_POPULATE}`
    );
    return json?.data ?? null;
  } catch (error) {
    console.error('Failed to fetch investment data from Strapi:', error);
    return null;
  }
}

// --- Wealth Service (single type) ---
export interface WealthServiceSectionItem {
  id?: number;
  title?: string;
  icon?: { url: string; alternativeText?: string } | null;
  items?: { id: string, text: string }[];
}

export interface WealthServiceWhatWeDoItem {
  id?: number;
  title?: string;
  link?: string;
}

export interface WealthServiceData {
  id?: number;
  bgImage?: { url: string; alternativeText?: string } | null;
  documentId?: string;
  title?: string;
  introTitle?: string;
  introDescription?: string | StrapiRichTextBlock[];
  wealthServicesTitle?: string;
  wealthServicesButtonName?: string;
  wealthServicesButtonLink?: string;
  sections?: WealthServiceSectionItem[];
  sectionsImage?: { url: string; alternativeText?: string } | null;
  whatWeDoItems?: WealthServiceWhatWeDoItem[];
  whatWeDoTitle?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

const WEALTH_SERVICE_POPULATE =
  "populate[0]=bgImage&populate[1]=sections.icon&populate[2]=sections.items&populate[3]=sectionsImage&populate[4]=whatWeDoItems";


export async function getWealthService(): Promise<WealthServiceData | null> {
  try {
    const json = await strapiFetch<WealthServiceData>(
      `/api/wealth-service?${WEALTH_SERVICE_POPULATE}`
    );
    return json?.data ?? null;
  } catch (error) {
    console.error('Failed to fetch wealth service data from Strapi:', error);
    return null;
  }
}

// --- PE Advisory (single type) ---
export interface PeAdvisorySectionItem {
  id?: number;
  title?: string;
  icon?: { url: string; alternativeText?: string } | null;
  items?: { id: string, text: string }[];
}

export interface PeAdvisoryWhatWeDoItem {
  id?: number;
  title?: string;
  link?: string;
}

export interface PeAdvisoryData {
  id?: number;
  bgImage?: { url: string; alternativeText?: string } | null;
  documentId?: string;
  title?: string;
  introTitle?: string;
  introDescription?: string | StrapiRichTextBlock[];
  peAdvisoryTitle?: string;
  peAdvisoryButtonName?: string;
  peAdvisoryButtonLink?: string;
  sections?: PeAdvisorySectionItem[];
  sectionsFirstImage?: { url: string; alternativeText?: string } | null;
  sectionsLastImage?: { url: string; alternativeText?: string } | null;
  whatWeDoItems?: PeAdvisoryWhatWeDoItem[];
  whatWeDoTitle?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

const PE_ADVISORY_POPULATE =
  "populate[0]=bgImage&populate[1]=sections.icon&populate[2]=sections.items&populate[3]=sectionsFirstImage&populate[4]=sectionsLastImage&populate[5]=whatWeDoItems";

export async function getPeAdvisory(): Promise<PeAdvisoryData | null> {
  try {
    const json = await strapiFetch<PeAdvisoryData>(
      `/api/pe-advisory?${PE_ADVISORY_POPULATE}`
    );
    return json?.data ?? null;
  } catch (error) {
    console.error('Failed to fetch PE advisory data from Strapi:', error);
    return null;
  }
}

// --- Events ---
export interface EventDetailBlock {
  header: string;
  description: string;
  image?: { url: string; alternativeText?: string } | null;
}

export interface EventItem {
  documentId: string;
  title?: string;
  date?: string;
  description?: string;
  slug?: string;
  bgImage?: { url: string; alternativeText?: string } | null;
  detailsImage?: EventDetailBlock[] | null;
  participants?: Array<{ url: string; alternativeText?: string }> | null;
  partners?: Array<{ url: string; alternativeText?: string }> | null;
}

export interface CardList {
  documentId: string
  title?: string;
  date?: string;
  description?: string;
  slug?: string;
  bgImage?: { url: string; alternativeText?: string } | null;
}

type MediaItem = { url: string; alternativeText?: string };
type StrapiMediaArray = { data?: Array<{ attributes?: MediaItem; url?: string }> } | MediaItem[];

function normalizeMediaArray(raw: StrapiMediaArray | null | undefined): MediaItem[] | null {
  if (!raw) return null;
  if (Array.isArray(raw)) {
    return raw.map((p) => ({
      url: (p as MediaItem).url ?? '',
      alternativeText: (p as MediaItem).alternativeText,
    }));
  }
  const data = raw.data;
  if (!Array.isArray(data)) return null;
  return data.map((item) => {
    const attrs = (item as { attributes?: MediaItem }).attributes ?? (item as MediaItem);
    return { url: attrs.url ?? '', alternativeText: attrs.alternativeText };
  });
}

function normalizeMediaSingle(
  raw: { url?: string; alternativeText?: string; data?: { attributes?: MediaItem } } | null | undefined
): MediaItem | null {
  if (!raw) return null;
  if (typeof raw === 'object' && 'url' in raw && raw.url) {
    return { url: raw.url, alternativeText: raw.alternativeText };
  }
  const data = raw as { data?: { attributes?: MediaItem } };
  const attrs = data.data?.attributes;
  return attrs?.url ? { url: attrs.url, alternativeText: attrs.alternativeText } : null;
}

type RawDetailBlock = { header?: string; description?: string; image?: unknown };

function normalizeDetailsImage(raw: RawDetailBlock[] | null | undefined): EventDetailBlock[] | null {
  if (!raw || !Array.isArray(raw)) return null;
  return raw.map((block) => ({
    header: block.header ?? '',
    description: block.description ?? '',
    image: normalizeMediaSingle(block.image as { url?: string; data?: { attributes?: MediaItem } }),
  }));
}

function normalizeEvent(raw: Record<string, unknown>): EventItem {
  const e = raw as unknown as EventItem & {
    participants?: StrapiMediaArray;
    partners?: StrapiMediaArray;
    detailsImage?: RawDetailBlock[];
  };
  const participants = normalizeMediaArray(e.participants);
  const partners = normalizeMediaArray(e.partners);
  const detailsImage = normalizeDetailsImage(e.detailsImage);
  return {
    ...e,
    participants: participants ?? e.participants ?? null,
    partners: partners ?? e.partners ?? null,
    detailsImage: detailsImage ?? e.detailsImage ?? null,
  } as EventItem;
}

const EVENTS_POPULATE =
  'populate[0]=bgImage&populate[1]=participants&populate[2]=partners&populate[3]=detailsImage&populate[4]=detailsImage.image';

export async function getEvents(): Promise<EventItem[]> {
  try {
    const json = await strapiFetch<{ data: EventItem[] | EventItem }>(
      `/api/events?${EVENTS_POPULATE}`
    );
    const data = json?.data;
    const list = Array.isArray(data) ? data : data ? [data] : [];
    return list.map((item) => normalizeEvent(item as Record<string, unknown>));
  } catch (error) {
    console.error('Failed to fetch events from Strapi:', error);
    return [];
  }
}

export async function getEventById(id: string): Promise<EventItem | null> {
  try {
    const json = await strapiFetch<{ data: EventItem }>(
      `/api/events/${id}?${EVENTS_POPULATE}`
    );
    const raw = json?.data ?? null;
    return raw ? normalizeEvent(raw as Record<string, unknown>) : null;
  } catch (error) {
    console.error('Failed to fetch event from Strapi:', error);
    return null;
  }
}


// Vault Perspectives API

export interface VaultPerspectivesItem {
  id?: number;
  bgImage?: MediaItem | null;
  title?: string | null;
  newsTitle?: string | null;
  ceoAnnualLettersSectionTitle?: string | null;
  ceoAnnualLettersSectionImage?: MediaItem | null;
  downloadfile?: MediaItem | null;
  downloadButtonLabel?: string | null;
}



const VAULT_PERSPECTIVES_POPULATE =
  'populate[0]=bgImage&populate[1]=ceoAnnualLettersSectionImage&populate[2]=downloadfile';

export async function getVaultPerspectives(): Promise<VaultPerspectivesItem | null> {
  try {
    const json = await strapiFetch<{ data: VaultPerspectivesItem | null }>(
      `/api/vault-perspectives?${VAULT_PERSPECTIVES_POPULATE}`
    );
    return (json?.data ?? null) as VaultPerspectivesItem;
  } catch (error) {
    console.error('Failed to fetch Vault Perspectives from Strapi:', error);
    return null;
  }
}


// --- Career API ---

export interface CareerItem {
  id?: number;
  bgImage?: MediaItem | null;
  title?: string | null;
  findOpportunitiesText?: string | null;
}

const CAREER_POPULATE = 'populate[0]=bgImage';

export async function getCareer(): Promise<CareerItem | null> {
  try {
    const json = await strapiFetch<{ data: CareerItem | null }>(
      `/api/career?${CAREER_POPULATE}`
    );
    return (json?.data ?? null) as CareerItem;
  } catch (error) {
    console.error('Failed to fetch Career from Strapi:', error);
    return null;
  }
}

// --- Career List API ---

export interface CareerListResponsibility {
  responsibility: string;
}

export interface CareerListQualification {
  qualification: string;
}

export interface CareerListWhatWeOffer {
  offer: string;
}

export interface OpportunityOverview {
  icon: MediaItem | null;
  title: string;
  subTitle: string;
}

export interface CareerListItem {
  documentId: string;
  id?: number;
  department?: string;
  title?: string;
  description?: string;
  headerTitle?: string;
  location?: string;
  whoWeLookFor?: string;
  responsibilities?: CareerListResponsibility[];
  qualifications?: CareerListQualification[];
  whatWeOffer?: CareerListWhatWeOffer[];
  aboutVaultPartners?: string;
  opportunityOverview?: OpportunityOverview[];
  publishedAt?: string;
}

const CAREER_LIST_POPULATE =
  [
    'populate[0]=responsibilities',
    'populate[1]=qualifications',
    'populate[2]=whatWeOffer',
    'populate[3]=opportunityOverview.icon',
  ].join('&');

export async function getCareerList(): Promise<CareerListItem[]> {
  try {
    const json = await strapiFetch<{ data: CareerListItem[] }>(
      `/api/career-lists?${CAREER_LIST_POPULATE}`
    );
    // handle normalization if needed
    return (json?.data ?? []) as unknown as CareerListItem[];
  } catch (error) {
    console.error('Failed to fetch Career List from Strapi:', error);
    return [];
  }
}


// --- Career List: get by id ---
export async function getCareerById(id: string): Promise<CareerListItem | null> {
  try {
    const json = await strapiFetch<{ data: CareerListItem }>(
      `/api/career-lists/${id}?${CAREER_LIST_POPULATE}`
    );
    return (json?.data ?? null) as unknown as CareerListItem;
  } catch (error) {
    console.error('Failed to fetch Career by id from Strapi:', error);
    return null;
  }
}


export function formatEventDate(date?: string) {
  if (!date || isNaN(Date.parse(date))) return '';
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function resolveStrapiMediaUrl(url?: string) {
  if (!url) return '';
  return getStrapiMediaUrl(url);
}