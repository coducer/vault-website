import ArticleDetail from '@/components/ArticleDetail/ArticleDetail';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import WantToKnowMore from '@/components/WantToKnowMore/WantToKnowMore';
import { getBlogById, getWantToKnowMoreList } from '@/lib/strapi';
import { notFound } from 'next/navigation';
import '../../homePage.css';

function formatBlogDate(date?: string) {
  if (!date || isNaN(new Date(date).getTime())) return '';
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [blog, wantToKnowMoreList] = await Promise.all([getBlogById(id), getWantToKnowMoreList()]);
  if (!blog) notFound();

  const dateStr = formatBlogDate(blog.date ?? blog.publishedAt ?? undefined);

  return (
    <main className="home-page position-relative">
      <Header />
      <div className=' mt-5 pt-5'>
        <ArticleDetail
          sectionLabel="blogs"
          date={dateStr}
          title={blog.title ?? ''}
          content={blog.description}
        />
      </div>

      <WantToKnowMore entries={wantToKnowMoreList ?? null} />
      <Footer />
    </main>
  );
}
