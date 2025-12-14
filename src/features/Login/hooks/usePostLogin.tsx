import { api, type ApiError } from '@/lib/axios';
import { authStorage } from '@/lib/authCookieManager';

import { useMutation } from '@tanstack/react-query';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

interface LoginProps {
  username: string;
  password: string;
}

interface ResponseType {
  msg: string;
  status: number;
  result: {
    data: {
      access_token: string;
      refresh_token: string;
      user: {
        role: {
          id: string;
          description: string;
          name: string;
        };
        id: string;
        username: string;
        is_active: boolean;
      };
    };
    errors: string[];
  };
}

type MutateFnType = (data: LoginProps) => Promise<ResponseType>;

export default function usePostLogin() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const mutateFn: MutateFnType = async ({ username, password }) => {
    const { data } = await api.post('users/login', {
      username: username,
      password: password,
      grant_type: 'password',
    });

    return data;
  };

  return useMutation({
    mutationFn: mutateFn,
    onSuccess: res => {
      toast.success(t('login.login_successful.title'), {
        description: t('login.login_successful.desc'),
      });

      authStorage.setAccessToken(res.result.data.access_token);
      authStorage.setRefreshToken(res.result.data.refresh_token);
      authStorage.setRole(res.result.data.user.role.name);

      navigate('/');
    },
    onError: (error: ApiError) => {
      const errors = Array.isArray(error.message)
        ? error.message
        : [error.message];

      errors.forEach((err: string) => {
        switch (err) {
          case 'body.password: Field required':
            toast.error(t('login.errors.password_required.title'), {
              description: t('login.errors.password_required.desc'),
            });
            break;
          case 'body.username: Field required':
            toast.error(t('login.errors.username_required.title'), {
              description: t('login.errors.username_required.title'),
            });
            break;

          case 'Invalid credentials':
            toast.error(t('login.errors.invalid_credntials.title'), {
              description: t('login.errors.invalid_credntials.desc'),
            });
            break;

          default:
            toast.error(t('login.errors.login_failed.title'), {
              description: t('login.errors.login_failed.desc'),
            });
            break;
        }
      });
    },
  });
}
