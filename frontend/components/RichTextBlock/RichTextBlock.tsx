'use client';

import type { StrapiRichTextBlock, StrapiRichTextChild } from '@/lib/strapi';
import { Fragment } from 'react';

function isTextChild(
  node: StrapiRichTextChild | StrapiRichTextBlock
): node is StrapiRichTextChild {
  return 'text' in node || node.type === 'text';
}

function renderChild(
  child: StrapiRichTextChild | StrapiRichTextBlock,
  key: number
): React.ReactNode {
  if (!isTextChild(child)) {
    return renderBlock(child, key);
  }

  const text = typeof child.text === 'string' ? child.text : '';
  if (!text) return null;

  let node: React.ReactNode = text;
  if (child.bold) node = <strong>{node}</strong>;
  if (child.italic) node = <em>{node}</em>;
  if (child.underline) node = <u>{node}</u>;
  if (child.strikethrough) node = <s>{node}</s>;
  if (child.code) node = <code>{node}</code>;

  return <Fragment key={key}>{node}</Fragment>;
}

function renderBlock(block: StrapiRichTextBlock, index: number): React.ReactNode {
  const children = block.children ?? [];
  const content = children.map((child, i) => renderChild(child, i));

  switch (block.type) {
    case 'heading':
      return (
        <h2 key={index} className="fs-24 fw-semibold text-dark mb-3">
          {content}
        </h2>
      );
    case 'list':
      return (
        <ul key={index} className="mb-3 ps-3">
          {content}
        </ul>
      );
    case 'list-item':
      return (
        <li key={index} className="mb-2">
          {content}
        </li>
      );
    case 'quote':
      return (
        <blockquote key={index} className="border-start border-3 ps-3 mb-3 text-secondary">
          {content}
        </blockquote>
      );
    case 'code':
      return (
        <pre key={index} className="bg-light p-3 rounded mb-3 overflow-auto">
          <code>{content}</code>
        </pre>
      );
    case 'paragraph':
    default:
      return (
        <p key={index} className="mb-3">
          {content}
        </p>
      );
  }
}

interface RichTextBlockProps {
  blocks: string | StrapiRichTextBlock[] | null | undefined;
  className?: string;
}

function renderPlainText(text: string) {
  const paragraphs = text.split(/\n\n+/).filter(Boolean);
  return paragraphs.map((p, i) => (
    <p key={i} className="mb-3">
      {p}
    </p>
  ));
}

export default function RichTextBlock({ blocks, className }: RichTextBlockProps) {
  if (blocks == null) return null;

  if (typeof blocks === 'string') {
    return <div className={className}>{renderPlainText(blocks)}</div>;
  }

  if (!Array.isArray(blocks) || blocks.length === 0) return null;

  return (
    <div className={className}>
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
}
