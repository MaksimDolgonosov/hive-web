import { useEffect } from 'react';

import { SITE_ORIGIN } from '../config/site';
import { useSiteI18n } from '../i18n/useSiteI18n';
import { withLang, type SiteLang } from '../lib/language';

type SeoProps = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
};

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${attr}="${key}"]`;
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

function upsertLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let element = document.head.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    if (hreflang) element.hreflang = hreflang;
    document.head.appendChild(element);
  }
  element.href = href;
}

function absolute(path: string, lang: SiteLang): string {
  return `${SITE_ORIGIN}${withLang(path, lang)}`;
}

export function Seo({ title, description, path, noindex = false }: SeoProps) {
  const { lang } = useSiteI18n();

  useEffect(() => {
    document.title = title;
    document.documentElement.lang = lang;

    const canonical = absolute(path, lang);
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', noindex ? 'noindex' : 'index,follow');
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:image', `${SITE_ORIGIN}/og-image.png`);
    upsertMeta('property', 'og:image:width', '1200');
    upsertMeta('property', 'og:image:height', '630');
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', 'Hive');
    upsertLink('canonical', canonical);
    upsertLink('alternate', absolute(path, 'en'), 'en');
    upsertLink('alternate', absolute(path, 'ru'), 'ru');
    upsertLink('alternate', absolute(path, 'en'), 'x-default');
  }, [title, description, path, lang, noindex]);

  return null;
}
