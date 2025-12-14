import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import english from './locales/english/english.json';
import farsi from './locales/farsi/farsi.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { common: english },
    fa: { common: farsi },
  },
  lng: 'en',
  fallbackLng: 'en',
  ns: ['common'],
  defaultNS: 'common',
  interpolation: { escapeValue: false },
});

i18n.on('languageChanged', lng => {
  document.documentElement.dir = lng === 'fa' ? 'rtl' : 'ltr';
});

export default i18n;
