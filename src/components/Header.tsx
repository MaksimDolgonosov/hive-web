import { Link } from 'react-router-dom';

import { useSiteI18n } from '../i18n/useSiteI18n';
import { withLang } from '../lib/language';
import { HiveMark } from './HiveMark';
import { LanguageSwitch } from './LanguageSwitch';

export function Header() {
  const { t, lang } = useSiteI18n();

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link className="brand" to={withLang('/', lang)} aria-label={t('nav.home')}>
          <HiveMark />
          <span className="wordmark">HIVE</span>
        </Link>
        <LanguageSwitch />
      </div>
    </header>
  );
}
