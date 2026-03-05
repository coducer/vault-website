import CommenHero from '@/components/CommenHero/CommenHero';
import CommenListCard from '@/components/CommenListCard/CommenListCard';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import WantToKnowMore from '@/components/WantToKnowMore/WantToKnowMore';
import { CardList, getEvents, getEventsPage, getWantToKnowMoreList } from '@/lib/strapi';
import '../homePage.css';

export default async function EventsPage() {
  const [events, eventsPage, wantToKnowMoreList] = await Promise.all([
    getEvents(),
    getEventsPage(),
    getWantToKnowMoreList(),
  ]);

  return (
    <main className="home-page position-relative">
      <Header />
      <CommenHero heroImageUrl={eventsPage?.heroImage} title={eventsPage?.title ?? ''} />
      <CommenListCard details={events as unknown as CardList[]} pathname="events" />
      <WantToKnowMore entries={wantToKnowMoreList ?? null} />
      <Footer />
    </main>
  );
}
