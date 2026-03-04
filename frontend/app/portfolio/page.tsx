import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Portfolio from '@/components/Portfolio/Portfolio';
import WantToKnowMore from '@/components/WantToKnowMore/WantToKnowMore';
import { getAllPortfolio } from '@/lib/strapi';
import React from 'react';

const PortfolioPage = async () => {
  const portfolioItems = await getAllPortfolio();

  return (
    <main className="home-page position-relative">
      <Header />
      <Portfolio items={portfolioItems} />
      <WantToKnowMore />
      <Footer />
    </main>
  );
};

export default PortfolioPage;
