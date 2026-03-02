import EventsCard, { type EventCardItem } from '@/components/Events/EventComponents/EventsCard';
import Hero from '@/components/Events/EventComponents/Hero';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import WantToKnowMore from '@/components/WantToKnowMore/WantToKnowMore';
import {
  type EventItem,
  getEvents,
  getEventsPage,
  getStrapiMediaUrl,
  getWantToKnowMoreList,
} from '@/lib/strapi';
import '../homePage.css';

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80';

function formatEvent(event: EventItem): EventCardItem {
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
    id: event.documentId ?? '',
    title: event.title ?? '',
    date,
    image: bgImageUrl ? getStrapiMediaUrl(bgImageUrl) : DEFAULT_IMAGE,
  };
}

export default async function EventsPage() {
  const [events, eventsPage, wantToKnowMoreList] = await Promise.all([
    getEvents(),
    getEventsPage(),
    getWantToKnowMoreList(),
  ]);
  const eventCards = events.map(formatEvent);

  console.log('eventsPage', eventsPage);

  return (
    <main className="home-page position-relative">
      <Header />
      <Hero heroImage={eventsPage?.heroImage} title={eventsPage?.title} />
      <EventsCard events={eventCards} />
      <WantToKnowMore entries={wantToKnowMoreList ?? null} />
      <Footer />
    </main>
  );
}
