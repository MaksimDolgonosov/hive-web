import { Link } from 'react-router-dom';

import { CONTACT_EMAIL } from '../config/site';
import { useSiteI18n } from '../i18n/useSiteI18n';
import { withLang } from '../lib/language';

export function Footer() {
  const { t, lang } = useSiteI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <nav className="footer-nav" aria-label={t('footer.nav')}>
          <Link to={withLang('/privacy', lang)}>{t('nav.privacy')}</Link>
          <Link to={withLang('/community-guidelines', lang)}>{t('nav.guidelines')}</Link>
          <Link to={withLang('/delete-account', lang)}>{t('nav.deleteAccount')}</Link>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </nav>
        <p className="footer-meta">
          <span>{t('footer.tagline')}</span>
          <span>© {year} Hive</span>
        </p>
      </div>
    </footer>
  );
}
