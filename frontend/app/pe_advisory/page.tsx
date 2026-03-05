import CommenDetails from '@/components/CommenDetails/CommenDetails';
import CommenHero from '@/components/CommenHero/CommenHero';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import WhatWeDo from '@/components/VaultInvestment/WhatWeDo';
import WantToKnowMore from '@/components/WantToKnowMore/WantToKnowMore';
import WealthAndPeadvisorySection from '@/components/WealthAndPeadvisorySection/WealthAndPeadvisorySection';
import { getPeAdvisory } from '@/lib/strapi';
import '../homePage.css';

export default async function PeAdvisoryPage() {
  const peAdvisory = await getPeAdvisory();
  return (
    <main className="home-page position-relative">
      <Header />
      <CommenHero heroImageUrl={peAdvisory?.bgImage} title={peAdvisory?.title ?? ''} />
      <CommenDetails
        heading={peAdvisory?.introTitle}
        body={peAdvisory?.introDescription}
        headerText="Introduction"
      />
      <WealthAndPeadvisorySection
        parentTitle={'Wealth Service'}
        title={peAdvisory?.peAdvisoryTitle ?? ''}
        buttonName={peAdvisory?.peAdvisoryButtonName ?? ''}
        buttonLink={peAdvisory?.peAdvisoryButtonLink ?? ''}
        sections={peAdvisory?.sections ?? []}
        sectionsLastImage={peAdvisory?.sectionsLastImage ?? null}
        sectionsFirstImage={peAdvisory?.sectionsFirstImage ?? null}
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
