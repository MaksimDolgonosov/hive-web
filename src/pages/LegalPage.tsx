import type { ReactNode } from 'react';

import { LegalDocumentView } from '../components/LegalDocumentView';
import type { LegalDocument } from '../legal/document';

type LegalPageProps = {
  document: LegalDocument;
  beforeIntro?: ReactNode;
};

export function LegalPage({ document, beforeIntro }: LegalPageProps) {
  return (
    <article className="narrow legal">
      <LegalDocumentView document={document} beforeIntro={beforeIntro} />
    </article>
  );
}
