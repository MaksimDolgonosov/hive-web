import type { ReactNode } from 'react';

import type { LegalBlock, LegalDocument } from '../legal/document';
import { useSiteI18n } from '../i18n/useSiteI18n';

const TOKEN = /https?:\/\/[^\s<]+|[\w.+-]+@[\w.-]+\.\w+/gi;

function sectionDomId(heading: string): string {
  if (/^11\./.test(heading)) return 'data-deletion';
  const slug = heading
    .toLowerCase()
    .replace(/^\d+\.\s*/, '')
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-|-$/g, '');
  return slug || 'section';
}

function RichText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let last = 0;

  for (const match of text.matchAll(TOKEN)) {
    const raw = match[0];
    const index = match.index ?? 0;
    const trimmed = raw.replace(/[.,;:)]+$/g, '');
    const trailing = raw.slice(trimmed.length);
    if (index > last) parts.push(text.slice(last, index));
    if (trimmed.includes('@')) {
      parts.push(
        <a key={`${index}-mail`} href={`mailto:${trimmed}`}>
          {trimmed}
        </a>,
      );
    } else {
      parts.push(
        <a key={`${index}-url`} href={trimmed} rel="noopener noreferrer">
          {trimmed}
        </a>,
      );
    }
    if (trailing) parts.push(trailing);
    last = index + raw.length;
  }

  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

function BlockView({ block }: { block: LegalBlock }) {
  if (block.type === 'list') {
    return (
      <ul>
        {block.items.map((item) => (
          <li key={item}>
            <RichText text={item} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p>
      <RichText text={block.text} />
    </p>
  );
}

type LegalDocumentViewProps = {
  document: LegalDocument;
  beforeIntro?: ReactNode;
};

export function LegalDocumentView({ document, beforeIntro }: LegalDocumentViewProps) {
  const { t } = useSiteI18n();

  return (
    <>
      <h1>{document.title}</h1>
      {beforeIntro}
      <details className="toc">
        <summary>{t('legal.contents')}</summary>
        <ol>
          {document.sections.map((section) => (
            <li key={section.heading}>
              <a href={`#${sectionDomId(section.heading)}`}>{section.heading}</a>
            </li>
          ))}
        </ol>
      </details>
      <p className="lede">{document.intro}</p>
      {document.sections.map((section) => (
        <section key={section.heading} id={sectionDomId(section.heading)}>
          <h2>{section.heading}</h2>
          {section.blocks.map((block, index) => (
            <BlockView key={`${section.heading}-${index}`} block={block} />
          ))}
        </section>
      ))}
    </>
  );
}
