import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type { TFunction } from 'i18next';

import i18n from './index';
import { langFromPath, type SiteLang } from '../lib/language';

export function useSiteI18n(): { t: TFunction; lang: SiteLang; pathname: string } {
  const { pathname } = useLocation();
  const lang = langFromPath(pathname);
  const t = i18n.getFixedT(lang);

  useLayoutEffect(() => {
    if (i18n.language !== lang) {
      void i18n.changeLanguage(lang);
    }
    document.documentElement.lang = lang;
  }, [lang]);

  return { t, lang, pathname };
}
