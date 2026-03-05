import CommenDetails from '@/components/CommenDetails/CommenDetails';
import CommenHero from '@/components/CommenHero/CommenHero';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import WhatWeDo from '@/components/VaultInvestment/WhatWeDo';
import WhereWeInvest from '@/components/VaultInvestment/WhereWeInvest';
import WantToKnowMore from '@/components/WantToKnowMore/WantToKnowMore';
import { getInvestment } from '@/lib/strapi';
import '../homePage.css';

export default async function VaultInvestmentPage() {
  const investment = await getInvestment();
  return (
    <main className="home-page position-relative">
      <Header />
      <CommenHero heroImageUrl={investment?.bgImage} title={investment?.title ?? ''} />
      <CommenDetails
        heading={investment?.introTitle}
        body={investment?.introDescription}
        headerText="Introduction"
      />
      <WhereWeInvest
        investItems={investment?.investItems}
        investTitle={investment?.investTitle}
        buttonName={investment?.buttonName}
        buttonLink={investment?.buttonLink}
      />
      <WhatWeDo
        whatWeDoTitle={investment?.whatWeDoTitle}
        whatWeDoItems={investment?.whatWeDoItems}
      />
      <WantToKnowMore />
      <Footer />
    </main>
  );
}
