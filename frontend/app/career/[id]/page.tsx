import CareerDetails from '@/components/Career/CareerDetails';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import WantToKnowMore from '@/components/WantToKnowMore/WantToKnowMore';
import { getCareerById } from '@/lib/strapi';
import '../../homePage.css';

interface PageProps {
  params: {
    id: string;
  };
}

const page = async ({ params }: PageProps) => {
  const career = await getCareerById(params.id);

  return (
    <main className="home-page position-relative">
      <Header />
      <CareerDetails career={career} />
      <WantToKnowMore />
      <Footer />
    </main>
  );
};

export default page;
