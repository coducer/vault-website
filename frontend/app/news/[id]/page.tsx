import ArticleDetail from '@/components/ArticleDetail/ArticleDetail';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import WantToKnowMore from '@/components/WantToKnowMore/WantToKnowMore';
import { getNewsById, getWantToKnowMoreList } from '@/lib/strapi';
import { notFound } from 'next/navigation';
import '../../homePage.css';

function formatNewsDate(date?: string) {
  if (!date || isNaN(new Date(date).getTime())) return '';
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [news, wantToKnowMoreList] = await Promise.all([getNewsById(id), getWantToKnowMoreList()]);
  if (!news) notFound();

  const dateStr = formatNewsDate(news.date ?? news.publishedAt ?? undefined);

  console.log('news', news);

  return (
    <main className="home-page position-relative">
      <Header />
      <div className=' mt-5 pt-5'>
        <ArticleDetail
          sectionLabel="news"
          date={dateStr}
          title={news.title ?? ''}
          content={news.description}
        />
      </div>
      <WantToKnowMore entries={wantToKnowMoreList ?? null} />
      <Footer />
    </main>
  );
}
