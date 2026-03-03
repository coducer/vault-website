import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import WantToKnowMore from '@/components/WantToKnowMore/WantToKnowMore';
import '../homePage.css';
import Hero from '@/components/VaultInvestment/Hero';
import Details from '@/components/VaultInvestment/Details';
import WhereWeInvest from '@/components/VaultInvestment/WhereWeInvest';
import WhatWeDo from '@/components/VaultInvestment/WhatWeDo';

export default function VaultInvestmentPage() {
  return (
    <main className="home-page position-relative">
      <Header />
      <Hero />
      <Details />
      <WhereWeInvest />
      <WhatWeDo />
      <WantToKnowMore />
      <Footer />
    </main>
  );
}
