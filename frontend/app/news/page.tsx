import CommenListCard from '@/components/CommenListCard/CommenListCard';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import WantToKnowMore from '@/components/WantToKnowMore/WantToKnowMore';
import { CardList, getNews, getWantToKnowMoreList } from '@/lib/strapi';
import '../homePage.css';

export default async function NewsPage() {
  const [news, wantToKnowMoreList] = await Promise.all([getNews(), getWantToKnowMoreList()]);

  return (
    <main className="home-page position-relative">
      <Header />
      <section className="px-4 mt-5 pt-5 pb-2">
        <div className="font-libre fs-42 text-dark pt-2">News</div>
      </section>
      <CommenListCard
        details={[...(news as unknown as CardList[])].sort(
          (a, b) => new Date(b.date ?? '').getTime() - new Date(a.date ?? '').getTime()
        )}
        pathname="news"
      />
      <WantToKnowMore entries={wantToKnowMoreList ?? null} />
      <Footer />
    </main>
  );
}
