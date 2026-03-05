import CommenHero from '@/components/CommenHero/CommenHero';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import WhatWeDo from '@/components/VaultInvestment/WhatWeDo';
import WantToKnowMore from '@/components/WantToKnowMore/WantToKnowMore';
import { getCareer, getCareerList } from '@/lib/strapi';
import '../homePage.css';

const Page = async () => {
  const [careerData, careerList] = await Promise.all([getCareer(), getCareerList()]);

  return (
    <main className="home-page position-relative">
      <Header />
      <CommenHero heroImageUrl={careerData?.bgImage} title={careerData?.title ?? ''} />
      <WhatWeDo
        whatWeDoTitle={careerData?.findOpportunitiesText ?? undefined}
        whatWeDoItems={careerList ?? []}
      />
      <WantToKnowMore />
      <Footer />
    </main>
  );
};

export default Page;
