import { create } from 'zustand';
import i18n from 'i18next';

interface LanguageState {
  language: string;
  changeLanguage: (lang: string) => void;
}

const initialLanguage = localStorage.getItem('language') || 'fa';
if (!localStorage.getItem('language')) {
  localStorage.setItem('language', initialLanguage);
}
document.documentElement.dir = initialLanguage === 'fa' ? 'rtl' : 'ltr';

const useLanguageStore = create<LanguageState>(set => ({
  language: initialLanguage,
  changeLanguage: lang => {
    set({ language: lang });

    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  },
}));

export default useLanguageStore;
