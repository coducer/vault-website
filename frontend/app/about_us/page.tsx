import CommenDetailsArray from '@/components/CommenDetails/CommenDetailsArray';
import CommenHero from '@/components/CommenHero/CommenHero';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import WantToKnowMore from '@/components/WantToKnowMore/WantToKnowMore';
import { AboutDetailItem, getAboutPage, getWantToKnowMoreList } from '@/lib/strapi';
import '../homePage.css';

const AboutUsPage = async () => {
  const [aboutData, wantToKnowMoreList] = await Promise.all([
    getAboutPage(),
    getWantToKnowMoreList(),
  ]);
  const detailsData: AboutDetailItem[] = (aboutData?.details ?? []) as AboutDetailItem[];

  return (
    <main className="home-page position-relative">
      <Header />
      <CommenHero heroImageUrl={aboutData?.heroImage} title={aboutData?.title ?? ''} />
      <CommenDetailsArray detailsData={detailsData} />
      <WantToKnowMore entries={wantToKnowMoreList ?? null} />
      <Footer />
    </main>
  );
};

export default AboutUsPage;
