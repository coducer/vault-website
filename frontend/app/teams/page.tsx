import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import VaultPeople from '@/components/VaultPeople/VaultPeople';
import WantToKnowMore from '@/components/WantToKnowMore/WantToKnowMore';
import { getTeams } from '@/lib/strapi';
import '../homePage.css';

const TeamsPage = async () => {
  const teams = await getTeams();

  return (
    <main className="home-page position-relative">
      <Header />
      <VaultPeople teams={teams} />
      <WantToKnowMore />
      <Footer />
    </main>
  );
};

export default TeamsPage;
