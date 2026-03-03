import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Details from '@/components/PeAdvisory/Details';
import Hero from '@/components/PeAdvisory/Hero';
import PeAdvisory from '@/components/PeAdvisory/PeAdvisory';
import WhatWeDo from '@/components/VaultInvestment/WhatWeDo';
import WantToKnowMore from '@/components/WantToKnowMore/WantToKnowMore';
import '../homePage.css';

export default function PeAdvisoryPage() {
  return (
    <main className="home-page position-relative">
      <Header />
      <Hero />
      <Details />
      <PeAdvisory />
      <WhatWeDo />
      <WantToKnowMore />
      <Footer />
    </main>
  );
}
