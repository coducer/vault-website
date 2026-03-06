import CareerDetails from '@/components/Career/CareerDetails';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import WantToKnowMore from '@/components/WantToKnowMore/WantToKnowMore';
import { getCareerById, getWantToKnowMoreList } from '@/lib/strapi';
import { notFound } from 'next/navigation';
import '../../homePage.css';

export default async function CareerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [career, wantToKnowMoreList] = await Promise.all([
    getCareerById(id),
    getWantToKnowMoreList(),
  ]);

  if (!career) {
    notFound();
  }

  return (
    <main className="home-page position-relative">
      <Header />
      <CareerDetails career={career} jobRouteId={id} />
      <WantToKnowMore entries={wantToKnowMoreList ?? null} />
      <Footer />
    </main>
  );
}
