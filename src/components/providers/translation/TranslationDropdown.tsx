import { Globe } from 'lucide-react'; // optional icon
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import i18n from './next-i18next.config';
import useLanguageStore from '@/stores/useLanguageStore';

export default function TranslationDropdown() {
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'fa', label: 'Farsi' },
  ];

  const { changeLanguage } = useLanguageStore();

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    changeLanguage(lang);
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map(lang => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleChangeLanguage(lang.code)}
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
