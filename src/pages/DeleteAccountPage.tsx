import { Link } from 'react-router-dom';

import { CONTACT_EMAIL, DELETION_REQUEST_DAYS, deleteMailto } from '../config/site';
import { Seo } from '../components/Seo';
import { useSiteI18n } from '../i18n/useSiteI18n';
import { withLang } from '../lib/language';

export function DeleteAccountPage() {
  const { t, lang } = useSiteI18n();

  return (
    <>
      <Seo
        title={t('seo.deleteTitle')}
        description={t('seo.deleteDescription')}
        path="/delete-account"
      />
      <article className="narrow delete">
        <h1>{t('delete.title')}</h1>
        <p className="lede">{t('delete.intro')}</p>

        <section>
          <h2>{t('delete.inAppTitle')}</h2>
          <p>{t('delete.inAppLead')}</p>
          <ol>
            <li>{t('delete.step1')}</li>
            <li>{t('delete.step2')}</li>
            <li>{t('delete.step3')}</li>
          </ol>
        </section>

        <section>
          <h2>{t('delete.emailTitle')}</h2>
          <p>
            {t('delete.emailBefore')} <a href={deleteMailto()}>{CONTACT_EMAIL}</a>{' '}
            {t('delete.emailAfter')}
          </p>
          <p>{t('delete.emailNote')}</p>
        </section>

        <section>
          <h2>{t('delete.removedTitle')}</h2>
          <ul>
            <li>{t('delete.removed1')}</li>
            <li>{t('delete.removed2')}</li>
            <li>{t('delete.removed3')}</li>
            <li>{t('delete.removed4')}</li>
          </ul>
        </section>

        <section>
          <h2>{t('delete.retainedTitle')}</h2>
          <p>{t('delete.retained')}</p>
        </section>

        <section>
          <h2>{t('delete.timingTitle')}</h2>
          <p>{t('delete.timing', { days: DELETION_REQUEST_DAYS })}</p>
        </section>

        <p>
          <Link to={withLang('/privacy', lang)}>{t('delete.privacyLink')}</Link>
        </p>
      </article>
    </>
  );
}
