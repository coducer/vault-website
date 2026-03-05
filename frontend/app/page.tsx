import AboutUs from '@/components/AboutUs/AboutUs';
import CeoAnnualLetters from '@/components/CeoAnnualLetters/CeoAnnualLetters';
import Events from '@/components/Events/Events';
import FoodForThought from '@/components/FoodForThought/FoodForThought';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import OurStory from '@/components/OurStory/OurStory';
import PartnerWithUs from '@/components/PartnerWithUs/PartnerWithUs';
import VaultPeople from '@/components/Vault/VaultPeople/VaultPeople';
import WantToKnowMore from '@/components/WantToKnowMore/WantToKnowMore';
import WhatWeDo from '@/components/WhatWeDo/WhatWeDo';
import {
  getBlogs,
  getCeoAnnualLetters,
  getEvents,
  getHomeAboutUs,
  getHomePartnerWithUs,
  getOurStory,
  getTeams,
  getWantToKnowMoreList,
  getWhatWeDo,
} from '@/lib/strapi';
import './homePage.css';

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

  const eventsForCarousel = Array.isArray(events) ? events : [];
  const blogsForCarousel = Array.isArray(blogs) ? blogs : [];
  const teamsForCarousel = Array.isArray(teams) ? teams : [];
  const ceoLettersForSlides = Array.isArray(ceoLetters) ? ceoLetters : [];

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
