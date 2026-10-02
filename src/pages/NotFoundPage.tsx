import { Link } from 'react-router-dom';

import { Seo } from '../components/Seo';
import { useSiteI18n } from '../i18n/useSiteI18n';
import { stripLang, withLang } from '../lib/language';

export function NotFoundPage() {
  const { t, lang, pathname } = useSiteI18n();

  return (
    <>
      <Seo
        title={t('seo.notFoundTitle')}
        description={t('seo.notFoundDescription')}
        path={stripLang(pathname)}
        noindex
      />
      <article className="narrow">
        <h1>{t('notFound.title')}</h1>
        <p className="lede">{t('notFound.body')}</p>
        <p>
          <Link to={withLang('/', lang)}>{t('notFound.home')}</Link>
        </p>
      </article>
    </>
  );
}
