// Providers
import { ThemeProvider } from './theme/theme-provider';
import TranslationProvider from './translation/TranslationProvider';
import { RouterProvider } from 'react-router';
import router from './router/routes';
// Providers

import { Toaster } from 'sonner';
import useLanguageStore from '@/stores/useLanguageStore';

export default function Providers() {
  const { language } = useLanguageStore();

  return (
    <TranslationProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
        <Toaster
          position={language === 'fa' ? 'bottom-right' : 'bottom-left'}
          closeButton
          richColors
          visibleToasts={10}
        />
      </ThemeProvider>
    </TranslationProvider>
  );
}
