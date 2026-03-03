import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import WantToKnowMore from '@/components/WantToKnowMore/WantToKnowMore';
import '../homePage.css';
import WhatWeDo from '@/components/VaultInvestment/WhatWeDo';
import Hero from '@/components/WealthServices/Hero';
import Details from '@/components/WealthServices/Details';
import WealthService from '@/components/WealthServices/WealthService';

export default function WealthServicePage() {
  return (
    <main className="home-page position-relative">
      <Header />
      <Hero />
      <Details />
      <WealthService />
      <WhatWeDo />
      <WantToKnowMore />
      <Footer />
    </main>
  );
}
