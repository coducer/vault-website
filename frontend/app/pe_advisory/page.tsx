import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import PeAdvisory from '@/components/PeAdvisory/PeAdvisory';
import Details from '@/components/VaultInvestment/Details';
import Hero from '@/components/VaultInvestment/Hero';
import WhatWeDo from '@/components/VaultInvestment/WhatWeDo';
import WantToKnowMore from '@/components/WantToKnowMore/WantToKnowMore';
import { getPeAdvisory } from '@/lib/strapi';
import '../homePage.css';

export default async function PeAdvisoryPage() {
  const peAdvisory = await getPeAdvisory();
  return (
    <main className="home-page position-relative">
      <Header />
      <Hero image={peAdvisory?.bgImage} title={peAdvisory?.title} />
      <Details heading={peAdvisory?.introTitle} body={peAdvisory?.introDescription} />
      <PeAdvisory
        wealthServicesTitle={peAdvisory?.wealthServicesTitle}
        wealthServicesButtonName={peAdvisory?.wealthServicesButtonName}
        wealthServicesButtonLink={peAdvisory?.wealthServicesButtonLink}
        sections={peAdvisory?.sections}
        sectionsFirstImage={peAdvisory?.sectionsFirstImage}
        sectionsLastImage={peAdvisory?.sectionsLastImage}
      />
      <WhatWeDo
        whatWeDoTitle={peAdvisory?.whatWeDoTitle}
        whatWeDoItems={peAdvisory?.whatWeDoItems}
      />
      <WantToKnowMore />
      <Footer />
    </main>
  );
}
