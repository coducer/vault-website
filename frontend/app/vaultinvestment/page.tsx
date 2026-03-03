import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import WantToKnowMore from '@/components/WantToKnowMore/WantToKnowMore';
import '../homePage.css';
import Hero from '@/components/VaultInvestment/Hero';

export default function VaultInvestmentPage() {
  return (
    <main className="home-page position-relative">
      <Header />
      <Hero />
      <WantToKnowMore />
      <Footer />
    </main>
  );
}
