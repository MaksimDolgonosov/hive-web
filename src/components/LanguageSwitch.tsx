import { Link } from 'react-router-dom';

import { useSiteI18n } from '../i18n/useSiteI18n';
import { storeLang, withLang, type SiteLang } from '../lib/language';

export function LanguageSwitch() {
  const { t, lang, pathname } = useSiteI18n();

  function href(next: SiteLang): string {
    const bare =
      pathname === '/ru' ? '/' : pathname.startsWith('/ru/') ? pathname.slice(3) : pathname;
    return withLang(bare, next);
  }

  return (
    <nav className="lang" aria-label={t('lang.label')}>
      <Link
        to={href('en')}
        hrefLang="en"
        lang="en"
        aria-current={lang === 'en' ? 'true' : undefined}
        onClick={() => storeLang('en')}
      >
        {t('lang.en')}
      </Link>
      <Link
        to={href('ru')}
        hrefLang="ru"
        lang="ru"
        aria-current={lang === 'ru' ? 'true' : undefined}
        onClick={() => storeLang('ru')}
      >
        {t('lang.ru')}
      </Link>
    </nav>
  );
}
