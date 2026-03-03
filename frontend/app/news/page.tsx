import NewsCard, { type NewsCardItem } from '@/components/News/NewsCard';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import WantToKnowMore from '@/components/WantToKnowMore/WantToKnowMore';
import {
  type NewsItem,
  getNews,
  getStrapiMediaUrl,
  getWantToKnowMoreList,
} from '@/lib/strapi';
import '../homePage.css';

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80';

function formatNewsItem(item: NewsItem): NewsCardItem {
  const bgImageUrl = item?.bgImage?.url;
  const dateSource = item?.date ?? item?.publishedAt;
  const date =
    dateSource && !isNaN(new Date(dateSource).getTime())
      ? new Date(dateSource).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
      : '';

  return {
    id: item.documentId ?? '',
    title: item.title ?? '',
    date,
    image: bgImageUrl ? getStrapiMediaUrl(bgImageUrl) : DEFAULT_IMAGE,
  };
}

export default async function NewsPage() {
  const [news, wantToKnowMoreList] = await Promise.all([
    getNews(),
    getWantToKnowMoreList(),
  ]);
  const newsCards = news.map(formatNewsItem);

  return (
    <main className="home-page position-relative">
      <Header />
      <section className="px-4 mt-5 pt-5 pb-2">
        <div className="font-libre fs-42 text-dark pt-2">News</div>
      </section>
      <NewsCard news={newsCards} />
      <WantToKnowMore entries={wantToKnowMoreList ?? null} />
      <Footer />
    </main>
  );
}
