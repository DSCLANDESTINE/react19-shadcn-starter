import { RotateCcw } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
// import { useNavigate } from "react-router";
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import usePostLogin from './hooks/usePostLogin';

import { ModeToggle } from '@/components/providers/theme/mode-toggle';
import TranslationDropdown from '@/components/providers/translation/TranslationDropdown';

type FormValues = {
  username: string;
  password: string;
  captcha: string;
};

import useLanguageStore from '@/stores/useLanguageStore';

export default function LoginPage() {
  const { t } = useTranslation();
  // const navigate = useNavigate();
  const { mutateAsync } = usePostLogin();

  const { register, handleSubmit, reset, watch } = useForm<FormValues>({
    defaultValues: { username: '', password: '', captcha: '' },
  });

  const [captchaCode, setCaptchaCode] = useState<string>('');

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptchaCode(code);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const renderCaptchaSVG = (code: string) => {
    const widthPerChar = 20;
    const paddingLeft = 30;
    const height = 40;

    return (
      <svg
        width={code.length * widthPerChar + paddingLeft}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
      >
        {code.split('').map((char, index) => {
          const x = index * widthPerChar + paddingLeft;
          const y = 30 + Math.random() * 5;
          const rotate = (Math.random() - 0.5) * 30;

          return (
            <text
              key={index}
              x={x}
              y={y}
              fontSize="24"
              fontFamily="monospace"
              fill="#5f6368"
              transform={`rotate(${rotate}, ${x}, ${y})`}
            >
              {char}
            </text>
          );
        })}
        {Array.from({ length: 3 }).map((_, i) => (
          <line
            key={i}
            x1={Math.random() * (code.length * widthPerChar + paddingLeft)}
            y1={Math.random() * height}
            x2={Math.random() * (code.length * widthPerChar + paddingLeft)}
            y2={Math.random() * height}
            stroke="#dadce0"
            strokeWidth={1}
          />
        ))}
      </svg>
    );
  };

  const onSubmit = async (data: FormValues) => {
    if (data.captcha.trim().toUpperCase() !== captchaCode.toUpperCase()) {
      toast.error(t('login.errors.invalid_captcha.title'), {
        description: t('login.errors.invalid_captcha.desc'),
      });
      reset({ ...watch(), captcha: '' });
      generateCaptcha();
      return;
    }

    try {
      await mutateAsync({
        username: data.username,
        password: data.password,
      });
    } catch (err) {
      reset({ ...watch(), captcha: '' });
      generateCaptcha();
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen mx-auto bg-main">
      <div className="flex items-center justify-center bg-card text-oncard p-5 h-fit w-fit rounded-2xl">
        <div className="flex w-full flex-col max-w-xl gap-5">
          <span className="text-3xl font-bold text-bi-text-scd">
            {t('login.title')}
          </span>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 mt-8 max-w-md"
            noValidate
          >
            <Input
              {...register('username')}
              placeholder={t('global.username')}
              className="bg-input"
            />

            <Input
              {...register('password')}
              type="password"
              placeholder={t('global.password')}
              className="bg-input"
            />

            <div className="flex gap-5 items-center">
              <Input
                {...register('captcha')}
                placeholder={t('login.captcha_text')}
                className="bg-input"
              />

              <div className="  flex items-center justify-center border rounded">
                {renderCaptchaSVG(captchaCode)}
              </div>

              <RotateCcw
                className="cursor-pointer hover:scale-105"
                size={36}
                onClick={generateCaptcha}
                role="button"
              />
            </div>

            <Button size="lg" type="submit">
              {t('global.submit')}
            </Button>
            <div className="flex gap-2">
              <TranslationDropdown />
              <ModeToggle />
            </div>
          </form>
        </div>
      </div>
      {/* <Toaster
        position={language === "fa" ? "bottom-right" : "bottom-left"}
        closeButton
        richColors
        visibleToasts={10}
      /> */}
    </div>
  );
}
