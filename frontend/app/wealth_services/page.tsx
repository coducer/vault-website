import CommenDetails from '@/components/CommenDetails/CommenDetails';
import CommenHero from '@/components/CommenHero/CommenHero';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import WhatWeDo from '@/components/VaultInvestment/WhatWeDo';
import WantToKnowMore from '@/components/WantToKnowMore/WantToKnowMore';
import WealthAndPeadvisorySection from '@/components/WealthAndPeadvisorySection/WealthAndPeadvisorySection';
import { getWealthService } from '@/lib/strapi';
import '../homePage.css';

export default async function WealthServicePage() {
  const wealthService = await getWealthService();
  return (
    <main className="home-page position-relative">
      <Header />
      <CommenHero heroImageUrl={wealthService?.bgImage} title={wealthService?.title ?? ''} />
      <CommenDetails
        heading={wealthService?.introTitle}
        body={wealthService?.introDescription}
        headerText="Introduction"
      />
      <WealthAndPeadvisorySection
        parentTitle={'Wealth Service'}
        title={wealthService?.wealthServicesTitle ?? ''}
        buttonName={wealthService?.wealthServicesButtonName ?? ''}
        buttonLink={wealthService?.wealthServicesButtonLink ?? ''}
        sections={wealthService?.sections ?? []}
        sectionsLastImage={wealthService?.sectionsImage ?? null}
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
