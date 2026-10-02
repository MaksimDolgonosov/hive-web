export const LANG_STORAGE_KEY = 'hive-lang';

export type SiteLang = 'en' | 'ru';

export function langFromPath(pathname: string): SiteLang {
  return pathname === '/ru' || pathname.startsWith('/ru/') ? 'ru' : 'en';
}

export function stripLang(pathname: string): string {
  if (pathname === '/ru') return '/';
  if (pathname.startsWith('/ru/')) return pathname.slice(3);
  return pathname;
}

export function withLang(path: string, lang: SiteLang): string {
  const bare = path.startsWith('/') ? path : `/${path}`;
  if (lang === 'en') return bare;
  return bare === '/' ? '/ru' : `/ru${bare}`;
}

export function readStoredLang(): SiteLang | null {
  try {
    const value = localStorage.getItem(LANG_STORAGE_KEY);
    return value === 'en' || value === 'ru' ? value : null;
  } catch {
    return null;
  }
}

export function storeLang(lang: SiteLang): void {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    /* Private mode or a full quota should not block the page. */
  }
}

/** Language lives in the URL. Autodetect runs only for a first visit to `/`. */
export function resolveInitialLanguage(): SiteLang {
  if (typeof window === 'undefined') return 'en';

  const path = window.location.pathname;
  if (path === '/') {
    const stored = readStoredLang();
    const lang: SiteLang =
      stored ?? (navigator.language.toLowerCase().startsWith('ru') ? 'ru' : 'en');
    if (!stored) storeLang(lang);
    if (lang === 'ru') {
      window.history.replaceState(null, '', '/ru');
    }
    return lang;
  }

  return langFromPath(path);
}
