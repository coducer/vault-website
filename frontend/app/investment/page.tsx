import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Details from '@/components/VaultInvestment/Details';
import Hero from '@/components/VaultInvestment/Hero';
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
      <Hero image={investment?.bgImage} title={investment?.title} />
      <Details heading={investment?.introTitle} body={investment?.introDescription} />
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
