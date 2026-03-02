import BlogCard, { type BlogCardItem } from '@/components/Blogs/BlogsCard';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import WantToKnowMore from '@/components/WantToKnowMore/WantToKnowMore';
import { type BlogItem, getBlogs, getStrapiMediaUrl, getWantToKnowMoreList } from '@/lib/strapi';
import '../homePage.css';

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80';

function formatBlogItem(item: BlogItem): BlogCardItem {
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

export default async function BlogsPage() {
  const [blogs, wantToKnowMoreList] = await Promise.all([getBlogs(), getWantToKnowMoreList()]);
  const blogCards = blogs.map(formatBlogItem);

  return (
    <main className="home-page position-relative">
      <Header />
      <section className="px-4 pt-5 pb-2">
        <div className="primary-text text-uppercase letter-spacing fw-semibold fs-15">blogs</div>
        <div className="font-libre fs-42 text-dark pt-2">Blogs</div>
      </section>
      <BlogCard blogs={blogCards} />
      <WantToKnowMore entries={wantToKnowMoreList ?? null} />
      <Footer />
    </main>
  );
}
