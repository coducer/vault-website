import CommenListCard from '@/components/CommenListCard/CommenListCard';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import WantToKnowMore from '@/components/WantToKnowMore/WantToKnowMore';
import { CardList, getBlogs, getWantToKnowMoreList } from '@/lib/strapi';
import '../homePage.css';

export default async function BlogsPage() {
  const [blogs, wantToKnowMoreList] = await Promise.all([getBlogs(), getWantToKnowMoreList()]);

  return (
    <main className="home-page position-relative">
      <Header />
      <div className="font-libre fs-42 text-dark px-4 pt-5 pb-2 mt-5">Blogs</div>
      <CommenListCard
        details={[...(blogs as unknown as CardList[])].sort(
          (a, b) => new Date(b.date ?? '').getTime() - new Date(a.date ?? '').getTime()
        )}
        pathname="blogs"
      />
      <WantToKnowMore entries={wantToKnowMoreList ?? null} />
      <Footer />
    </main>
  );
}
