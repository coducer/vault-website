import CommenDetailsArray from '@/components/CommenDetails/CommenDetailsArray';
import CommenHero from '@/components/CommenHero/CommenHero';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import WantToKnowMore from '@/components/WantToKnowMore/WantToKnowMore';
import type { AboutDetailItem } from '@/lib/strapi';
import { getVaultStoryPage, getWantToKnowMoreList } from '@/lib/strapi';
import '../homePage.css';

export default async function VaultStoryPage() {
  const [vaultStoryData, wantToKnowMoreList] = await Promise.all([
    getVaultStoryPage(),
    getWantToKnowMoreList(),
  ]);
  const detailsData: AboutDetailItem[] = (vaultStoryData?.details ?? []) as AboutDetailItem[];

  return (
    <main className="home-page position-relative">
      <Header />
      <CommenHero heroImageUrl={vaultStoryData?.heroImage} title={vaultStoryData?.title ?? ''} />
      <CommenDetailsArray detailsData={detailsData} />
      <WantToKnowMore entries={wantToKnowMoreList ?? null} />
      <Footer />
    </main>
  );
}
