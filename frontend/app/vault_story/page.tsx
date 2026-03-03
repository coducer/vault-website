import Hero from '@/components/AboutUs/AboutUsComponents/Hero';
import Details from '@/components/AboutUs/AboutUsComponents/Details';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import WantToKnowMore from '@/components/WantToKnowMore/WantToKnowMore';
import type { AboutDetailItem } from '@/lib/strapi';
import { getStrapiMediaUrl, getVaultStoryPage, getWantToKnowMoreList } from '@/lib/strapi';
import '../homePage.css';

export default async function VaultStoryPage() {
  const [vaultStoryData, wantToKnowMoreList] = await Promise.all([
    getVaultStoryPage(),
    getWantToKnowMoreList(),
  ]);
  const heroImageUrl = vaultStoryData?.heroImage?.url
    ? getStrapiMediaUrl(vaultStoryData.heroImage.url)
    : '';
  const detailsData: AboutDetailItem[] = (vaultStoryData?.details ?? []) as AboutDetailItem[];

  return (
    <main className="home-page position-relative">
      <Header />
      <Hero heroImageUrl={heroImageUrl} title={vaultStoryData?.title ?? ''} />
      <Details detailsData={detailsData} />
      <WantToKnowMore entries={wantToKnowMoreList ?? null} />
      <Footer />
    </main>
  );
}
