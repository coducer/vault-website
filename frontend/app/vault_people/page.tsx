import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import VaultPeople from '@/components/VaultPeople/VaultPeople';
import WantToKnowMore from '@/components/WantToKnowMore/WantToKnowMore';
import '../homePage.css';

const page = () => {
  return (
    <main className="home-page position-relative">
      <Header />
      <VaultPeople />
      <WantToKnowMore />
      <Footer />
    </main>
  )
}

export default page