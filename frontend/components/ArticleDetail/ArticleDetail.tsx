import type { StrapiRichTextBlock } from '@/lib/strapi';
import RichTextBlock from '@/components/RichTextBlock/RichTextBlock';
import './ArticleDetail.css';

interface ArticleDetailProps {
  sectionLabel: string;
  date?: string;
  title: string;
  content: string | StrapiRichTextBlock[] | null | undefined;
}

export default function ArticleDetail({ sectionLabel, date, title, content }: ArticleDetailProps) {
  return (
    <>
      <section className="article-detail-header px-4">
        <div className="primary-text text-uppercase letter-spacing fw-semibold fs-15">
          {sectionLabel}
        </div>
        {date && <div className="fs-13 fw-medium primary-text pt-2">{date}</div>}
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
