import CommenHero from '@/components/CommenHero/CommenHero';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import LatestUpdates from '@/components/VaultPerspective/LatestUpdates';
import WantToKnowMore from '@/components/WantToKnowMore/WantToKnowMore';
import '../homePage.css';

const page = () => {
  return (
    <main className="home-page position-relative">
      <Header />
      <CommenHero heroImageUrl={undefined} title={''} />
      <LatestUpdates />
      take Food for Thought​ and CEO Annual Letters form home
      <WantToKnowMore />
      <Footer />
    </main>
  );
};

export default page;
