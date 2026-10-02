import { Seo } from '../components/Seo';
import { useSiteI18n } from '../i18n/useSiteI18n';
import { getCommunityGuidelinesDocument } from '../legal/community-guidelines';
import { LegalPage } from './LegalPage';

export function GuidelinesPage() {
  const { t, lang } = useSiteI18n();

  return (
    <>
      <Seo
        title={t('seo.guidelinesTitle')}
        description={t('seo.guidelinesDescription')}
        path="/community-guidelines"
      />
      <LegalPage document={getCommunityGuidelinesDocument(lang)} />
    </>
  );
}
