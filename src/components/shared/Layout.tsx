import { ModeToggle } from '../providers/theme/mode-toggle';
import TranslationDropdown from '../providers/translation/TranslationDropdown';
import { authStorage } from '@/lib/authCookieManager';
import { Button } from '../ui/button';
// import { Toaster } from "sonner";
// import useLanguageStore from "@/stores/useLanguageStore";
// import useThemeStore from "./stores/useThemeStore";
import { useNavigate } from 'react-router';

import { useTranslation } from 'react-i18next';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Settings, Power, User } from 'lucide-react';

import { Outlet } from 'react-router';
export default function Layout() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleLogout = () => {
    authStorage.removeTokens();
    navigate('/login');
  };

  const handleSettings = () => {
    navigate('/settings');
  };
  return (
    <main>
      <header className="w-full border-b py-4 bg-header">
        <div className="max-w-11/12 mx-auto flex flex-row-reverse">
          <div className="flex gap-2">
            <TranslationDropdown />
            <ModeToggle />
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <User className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="flex w-full justify-between gap-5"
                  onClick={handleSettings}
                >
                  <Settings className="h-[1.2rem] w-[1.2rem]" />
                  {t('header.setting')}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex w-full justify-between gap-5"
                  onClick={handleLogout}
                >
                  <Power className="h-[1.2rem] w-[1.2rem]" />
                  {t('header.log_out')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <Outlet />
    </main>
  );
}
