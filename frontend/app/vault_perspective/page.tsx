import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import Hero from '@/components/VaultInvestment/Hero'
import WantToKnowMore from '@/components/WantToKnowMore/WantToKnowMore'
import '../homePage.css';
import LatestUpdates from '@/components/VaultPerspective/LatestUpdates';

const page = () => {
  return (
    <main className="home-page position-relative">
      <Header />
      <Hero />
      <LatestUpdates />
      take Food for Thought​ and CEO Annual Letters form home
      <WantToKnowMore />
      <Footer />
    </main>
  )
}

export default page