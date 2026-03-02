import AboutUs from '@/components/AboutUs/AboutUs';
import type { BlogCarouselItem } from '@/components/Blogs/Blogs';
import type { CeoLetterSlide } from '@/components/CeoAnnualLetters/CeoAnnualLetters';
import CeoAnnualLetters from '@/components/CeoAnnualLetters/CeoAnnualLetters';
import Events from '@/components/Events/Events';
import FoodForThought from '@/components/FoodForThought/FoodForThought';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import OurStory from '@/components/OurStory/OurStory';
import PartnerWithUs from '@/components/PartnerWithUs/PartnerWithUs';
import type { TeamCarouselItem } from '@/components/Vault/VaultPeople/VaultPeople';
import VaultPeople from '@/components/Vault/VaultPeople/VaultPeople';
import WantToKnowMore from '@/components/WantToKnowMore/WantToKnowMore';
import WhatWeDo from '@/components/WhatWeDo/WhatWeDo';
import {
  BlogItem,
  EventItem,
  getBlogs,
  getCeoAnnualLetters,
  getEvents,
  getHomeAboutUs,
  getHomePartnerWithUs,
  getOurStory,
  getStrapiMediaUrl,
  getTeams,
  getWantToKnowMoreList,
  getWhatWeDo,
  type CeoAnnualLetterItem,
} from '@/lib/strapi';
import './homePage.css';

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80';

type EventCarouselItem = {
  date: string;
  title: string;
  image: string;
  slug: string;
  id: string;
};

function formatEvent(event: EventItem): EventCarouselItem {
  const bgImageUrl = event?.bgImage?.url;
  const date =
    event?.date && !isNaN(new Date(event.date).getTime())
      ? new Date(event.date).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
      : '';

  return {
    date,
    title: event.title ?? '',
    image: bgImageUrl ? getStrapiMediaUrl(bgImageUrl) : DEFAULT_IMAGE,
    slug: event.slug ?? '',
    id: event.documentId ?? '',
  };
}

function formatBlog(blog: BlogItem): BlogCarouselItem {
  const bgImageUrl = blog?.bgImage?.url;
  const date =
    blog?.date && !isNaN(new Date(blog.date).getTime())
      ? new Date(blog.date).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
      : '';
  return {
    date,
    title: blog.title ?? '',
    image: bgImageUrl ? getStrapiMediaUrl(bgImageUrl) : DEFAULT_IMAGE,
    slug: blog.slug ?? '',
    id: blog.documentId ?? '',
  };
}

function formatTeam(team: {
  documentId: string;
  name?: string;
  image?: { url: string } | null;
  designation?: string;
}): TeamCarouselItem {
  const imageUrl = team?.image?.url;
  return {
    id: team.documentId ?? '',
    name: team.name ?? '',
    image: imageUrl ? getStrapiMediaUrl(imageUrl) : DEFAULT_IMAGE,
    designation: team.designation,
  };
}

function formatCeoLetter(letter: CeoAnnualLetterItem): CeoLetterSlide {
  const avatarUrl = letter.avatar?.url ? getStrapiMediaUrl(letter.avatar.url) : '';
  const imageUrl = letter.image?.url ? getStrapiMediaUrl(letter.image.url) : DEFAULT_IMAGE;
  return {
    quote: letter.quote ?? '',
    name: letter.name ?? '',
    designation: letter.designation ?? '',
    avatarUrl: avatarUrl || 'https://randomuser.me/api/portraits/men/75.jpg',
    imageUrl: imageUrl || DEFAULT_IMAGE,
  };
}

export default async function Home() {
  const [
    events,
    blogs,
    teams,
    ceoLetters,
    whatWeDo,
    ourStory,
    homeAboutUs,
    homePartnerWithUs,
    wantToKnowMoreList,
  ] = await Promise.all([
    getEvents(),
    getBlogs(),
    getTeams(),
    getCeoAnnualLetters(),
    getWhatWeDo(),
    getOurStory(),
    getHomeAboutUs(),
    getHomePartnerWithUs(),
    getWantToKnowMoreList(),
  ]);

  const eventsForCarousel: EventCarouselItem[] = (Array.isArray(events) ? events : []).map(
    formatEvent
  );
  const blogsForCarousel: BlogCarouselItem[] = (Array.isArray(blogs) ? blogs : []).map(formatBlog);
  const teamsForCarousel: TeamCarouselItem[] = (Array.isArray(teams) ? teams : []).map(formatTeam);
  const ceoLettersForSlides: CeoLetterSlide[] = (Array.isArray(ceoLetters) ? ceoLetters : []).map(
    formatCeoLetter
  );

  return (
    <main className="home-page position-relative">
      <Header />
      <Hero />
      <AboutUs data={homeAboutUs ?? null} />
      <OurStory data={ourStory ?? null} />
      <WhatWeDo data={whatWeDo ?? null} />
      <Events events={eventsForCarousel} />
      <VaultPeople teams={teamsForCarousel} />
      <CeoAnnualLetters letters={ceoLettersForSlides} />
      <FoodForThought blogs={blogsForCarousel} />
      <PartnerWithUs data={homePartnerWithUs ?? null} />
      <WantToKnowMore entries={wantToKnowMoreList ?? null} />
      <Footer />
    </main>
  );
}
