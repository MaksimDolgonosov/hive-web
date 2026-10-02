import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { resolveInitialLanguage } from '../lib/language';
import en from './en';
import ru from './ru';

export const initialLanguage = resolveInitialLanguage();

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
  },
  lng: initialLanguage,
  fallbackLng: 'en',
  initImmediate: false,
  interpolation: { escapeValue: false },
});

if (typeof document !== 'undefined') {
  document.documentElement.lang = initialLanguage;
}

export default i18n;
