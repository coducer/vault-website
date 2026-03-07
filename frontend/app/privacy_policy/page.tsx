import ArticleDetail from '@/components/ArticleDetail/ArticleDetail';
import CommenDetailsArray from '@/components/CommenDetails/CommenDetailsArray';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { getPrivacyPolicy } from '@/lib/strapi';

export default async function Page() {
  const privacyPolicy = await getPrivacyPolicy();
  return (
    <main className="home-page position-relative">
      <Header />
      <div className=" mt-5 pt-5">
        <ArticleDetail
          sectionLabel={''}
          title={privacyPolicy?.headerText ?? ''}
          content={privacyPolicy?.description ?? ''}
        />
      </div>
      <CommenDetailsArray detailsData={privacyPolicy?.items ?? []} />
      <Footer />
    </main>
  );
}
