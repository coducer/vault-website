import ArticleDetail from '@/components/ArticleDetail/ArticleDetail';
import CommenDetailsArray from '@/components/CommenDetails/CommenDetailsArray';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { getTermsOfBusiness } from '@/lib/strapi';

export default async function Page() {
  const termsOfBusiness = await getTermsOfBusiness();
  return (
    <main className="home-page position-relative">
      <Header />
      <div className="mt-5 pt-5">
        <ArticleDetail
          sectionLabel={''}
          title={termsOfBusiness?.headerText ?? ''}
          content={termsOfBusiness?.description ?? ''}
        />
      </div>
      <CommenDetailsArray detailsData={termsOfBusiness?.items ?? []} />
      <Footer />
    </main>
  );
}
