import { Link } from 'react-router-dom';

import { Seo } from '../components/Seo';
import { useSiteI18n } from '../i18n/useSiteI18n';
import { withLang } from '../lib/language';
import { getPrivacyPolicyDocument } from '../legal/privacy-policy';
import { LegalPage } from './LegalPage';

export function PrivacyPage() {
  const { t, lang } = useSiteI18n();
  const document = getPrivacyPolicyDocument(lang);

  return (
    <>
      <Seo
        title={t('seo.privacyTitle')}
        description={t('seo.privacyDescription')}
        path="/privacy"
      />
      <LegalPage
        document={document}
        beforeIntro={
          <p className="jumps">
            <a href="#data-deletion">{t('privacy.jump')}</a>
            <Link to={withLang('/delete-account', lang)}>{t('privacy.deleteLink')}</Link>
          </p>
        }
      />
    </>
  );
}
