import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import VaultPeople from '@/components/VaultPeople/VaultPeople';
import WantToKnowMore from '@/components/WantToKnowMore/WantToKnowMore';
import { getOperatingPartners } from '@/lib/strapi';
import '../homePage.css';

const OperatingPartnersPage = async () => {
  const operatingPartners = await getOperatingPartners();

  return (
    <main className="home-page position-relative">
      <Header />
      <VaultPeople operatingPartners={operatingPartners} />
      <WantToKnowMore />
      <Footer />
    </main>
  );
};

export default OperatingPartnersPage;
