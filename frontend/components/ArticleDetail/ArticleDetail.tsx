import RichTextBlock from '@/components/RichTextBlock/RichTextBlock';
import type { StrapiRichTextBlock } from '@/lib/strapi';
import './ArticleDetail.css';

interface ArticleDetailProps {
  sectionLabel: string;
  title: string;
  content: string | StrapiRichTextBlock[] | null | undefined;
}

export default function ArticleDetail({ sectionLabel, title, content }: ArticleDetailProps) {
  return (
    <>
      <section className="article-detail-header px-4">
        <div className="primary-text text-uppercase letter-spacing fw-semibold fs-15">
          {sectionLabel}
        </div>
        <h1 className="font-libre fs-42 text-dark py-2 mt-2">{title}</h1>
      </section>
      <div className="article-detail-body px-4" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="article-detail-body-inner">
          <RichTextBlock blocks={content} className="text-dark" />
        </div>
      </div>
    </>
  );
}
