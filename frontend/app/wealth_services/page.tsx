import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Details from '@/components/VaultInvestment/Details';
import Hero from '@/components/VaultInvestment/Hero';
import WhatWeDo from '@/components/VaultInvestment/WhatWeDo';
import WantToKnowMore from '@/components/WantToKnowMore/WantToKnowMore';
import WealthService from '@/components/WealthServices/WealthService';
import { getWealthService } from '@/lib/strapi';
import '../homePage.css';

export default async function WealthServicePage() {
  const wealthService = await getWealthService();
  console.log(wealthService, 'wealthService');
  return (
    <main className="home-page position-relative">
      <Header />
      <Hero image={wealthService?.bgImage} title={wealthService?.title} />
      <Details heading={wealthService?.introTitle} body={wealthService?.introDescription} />
      <WealthService
        wealthServicesTitle={wealthService?.wealthServicesTitle}
        wealthServicesButtonName={wealthService?.wealthServicesButtonName}
        wealthServicesButtonLink={wealthService?.wealthServicesButtonLink}
        sections={wealthService?.sections}
        sectionsImage={wealthService?.sectionsImage}
      />
      <WhatWeDo
        whatWeDoTitle={wealthService?.whatWeDoTitle}
        whatWeDoItems={wealthService?.whatWeDoItems}
      />
      <WantToKnowMore />
      <Footer />
    </main>
  );
}
