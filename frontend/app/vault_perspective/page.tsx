import CeoAnnualLetters from '@/components/CeoAnnualLetters/CeoAnnualLetters';
import CommenHero from '@/components/CommenHero/CommenHero';
import FoodForThought from '@/components/FoodForThought/FoodForThought';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import LatestUpdates from '@/components/VaultPerspective/LatestUpdates';
import WantToKnowMore from '@/components/WantToKnowMore/WantToKnowMore';
import { getBlogs, getNews, getVaultPerspectives, getWantToKnowMoreList } from '@/lib/strapi';
import '../homePage.css';

export default async function VaultPerspectivePage() {
  const [vaultPerspectivesData, wantToKnowMoreList, news, blogs] = await Promise.all([
    getVaultPerspectives(),
    getWantToKnowMoreList(),
    getNews(),
    getBlogs(),
  ]);
  console.info(vaultPerspectivesData, 'vaultPerspectivesDatavaultPerspectivesData');

  return (
    <main className="home-page position-relative">
      <Header />
      <CommenHero
        heroImageUrl={vaultPerspectivesData?.bgImage}
        title={vaultPerspectivesData?.title ?? ''}
      />
      <LatestUpdates
        title={vaultPerspectivesData?.newsTitle ?? ''}
        news={news
          .sort((a, b) => new Date(b.date ?? '').getTime() - new Date(a.date ?? '').getTime())
          .slice(0, 3)}
      />
      <FoodForThought
        blogs={[...blogs].sort(
          (a, b) => new Date(b.date ?? '').getTime() - new Date(a.date ?? '').getTime()
        )}
      />
      <CeoAnnualLetters
        isDownload
        details={{
          ceoAnnualLettersSectionTitle: vaultPerspectivesData?.ceoAnnualLettersSectionTitle ?? null,
          ceoAnnualLettersSectionImage: vaultPerspectivesData?.ceoAnnualLettersSectionImage ?? null,
          downloadfile: vaultPerspectivesData?.downloadfile ?? null,
          downloadButtonLabel: vaultPerspectivesData?.downloadButtonLabel ?? null,
        }}
      />
      <WantToKnowMore entries={wantToKnowMoreList ?? null} />
      <Footer />
    </main>
  );
}
