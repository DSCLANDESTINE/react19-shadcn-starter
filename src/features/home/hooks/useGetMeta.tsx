import { api } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

export interface ResponseType<T = unknown> {
  message: string;
  status: number;
  result: T;
}

export interface UserItem {
  id: number;
  username: string;
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  email: string | null;
  avatar: string | null;
  role: string;
  is_active: boolean;
  is_staff: boolean;
  is_admin: boolean;
  national_id: string;
  is_superuser: boolean;
  last_password_change: string;
  last_password_status: boolean;
  created_at: string;
  updated_at: string;
  locked: boolean;
}

function useGetMetaData() {
  const { t } = useTranslation();

  const queryFn = async () => {
    try {
      const { data } = await api.get<ResponseType<UserItem[]>>('/meta');
      toast.success('Loaded successfully!');
      return data;
    } catch (error) {
      toast.error(t('global.error'), {
        description: t('header.get_spaces_error'),
      });

      throw error;
    }
  };

  return useQuery({
    queryKey: ['spaces', 'list'],
    queryFn,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

export default useGetMetaData;
