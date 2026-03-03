import ArticleDetails from '@/components/Events/EventComponents/ArticleDetails/ArticleDetails';
import Hero from '@/components/Events/EventComponents/Hero';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import WantToKnowMore from '@/components/WantToKnowMore/WantToKnowMore';
import { getEventById, getWantToKnowMoreList } from '@/lib/strapi';
import { notFound } from 'next/navigation';
import '../../homePage.css';

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [event, wantToKnowMoreList] = await Promise.all([getEventById(id), getWantToKnowMoreList()]);
  if (!event) notFound();

  return (
    <main className="home-page position-relative">
      <Header />
      <Hero event={event} />
      <ArticleDetails event={event} />
      <WantToKnowMore entries={wantToKnowMoreList ?? null} />
      <Footer />
    </main>
  );
}
