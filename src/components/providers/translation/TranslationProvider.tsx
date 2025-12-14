import type { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './next-i18next.config';

type Props = { children: ReactNode };

export default function TranslationProvider({ children }: Props) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
