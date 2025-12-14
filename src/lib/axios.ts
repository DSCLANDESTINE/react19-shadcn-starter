/* eslint-disable @typescript-eslint/no-explicit-any */

import { authStorage } from './authCookieManager';

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
// console.log(BASE_URL);
import axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  type CancelTokenSource,
  type InternalAxiosRequestConfig,
  AxiosHeaders,
} from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

export interface ApiError {
  success: boolean;
  message: any;
  status_code: number;
}

// تعریف نوع اختصاصی برای درخواست‌ها که requestId را پشتیبانی کند
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  requestId?: string;
  _retry?: boolean;
}

const activeCancelTokens = new Map<string, (message?: string) => void>();

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${authStorage.getAccessToken()}`,
  },
});

// جلوگیری از اسپم Toast در خطاهای شبکه
let lastNetworkToastAt = 0;
const NETWORK_TOAST_COOLDOWN_MS = 3000;

// Monkey-patch: سرکوب Toastهای خطا برای مدت کوتاه پس از خطای شبکه
const originalToastError =
  (toast as unknown as any).error?.bind?.(toast) ?? toast.error;
(toast as unknown as any).error = (message: any, options?: any) => {
  const suppressUntil = (window as any).__suppressGenericErrorToastUntil as
    | number
    | undefined;
  if (typeof suppressUntil === 'number' && Date.now() < suppressUntil) {
    return;
  }
  return originalToastError(message, options);
};

// متد کنسل کردن تمام درخواست‌های فعال
export const cancelAllRequests = (
  message = 'Operation canceled by user'
): void => {
  activeCancelTokens.forEach((cancel, requestId) => {
    cancel(message);
    activeCancelTokens.delete(requestId);
  });
};

// ساخت requestId اختصاصی برای هر درخواست
const generateRequestId = (config: AxiosRequestConfig): string => {
  return `${config.method}-${config.url}-${JSON.stringify(config.params)}`;
};

// اینترسپتور درخواست
api.interceptors.request.use(
  async (
    config: CustomAxiosRequestConfig
  ): Promise<CustomAxiosRequestConfig> => {
    const requestId = generateRequestId(config);
    config.requestId = requestId;

    const source: CancelTokenSource = axios.CancelToken.source();
    config.cancelToken = source.token;
    activeCancelTokens.set(requestId, source.cancel);

    const token = Cookies.get('ACCESS_TOKEN');
    if (token) {
      if (!config.headers) {
        config.headers = new AxiosHeaders();
      }

      Object.assign(config.headers, {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      });
    }

    if (config.headers['withoutAuth']) {
      delete (config.headers as any)['Authorization'];
      delete (config.headers as any)['withoutAuth'];
    }

    return config;
  },
  error => Promise.reject(error)
);

// اینترسپتور پاسخ
api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    const requestId = (response.config as CustomAxiosRequestConfig).requestId;
    if (requestId) {
      activeCancelTokens.delete(requestId);
    }
    return response;
  },
  async (error: any) => {
    // مدیریت اختصاصی خطای شبکه بدون تداخل با onError های محلی
    if (error?.code === 'ERR_NETWORK') {
      const now = Date.now();
      if (now - lastNetworkToastAt > NETWORK_TOAST_COOLDOWN_MS) {
        toast.error('Network error!', {
          id: 'network-error',
          description: 'Please check your connection!',
        });
        lastNetworkToastAt = now;
      }
      // سرکوب توست‌های عمومی برای مدت کوتاه
      (window as any).__suppressGenericErrorToastUntil = now + 2500;
      // ریجکت به‌صورت cancel تا onError های محلی (در صورت رعایت best practice) بی‌اثر باشند
      return Promise.reject(new axios.Cancel('ERR_NETWORK'));
    }

    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (originalRequest?.requestId) {
      activeCancelTokens.delete(originalRequest.requestId);
    }

    if (axios.isCancel(error)) {
      const finalError: ApiError = {
        success: false,
        message: 'request cancelled!',
        status_code: 499,
      };
      return Promise.reject(finalError);
    }

    if (error?.response?.status === 403) {
      Cookies.set('ACCESS_TOKEN', error?.response?.data?.result?.token);
      Cookies.set('REFRESH_TOKEN', error?.response?.data?.result?.refresh);
      window.location.href = '/change-password';
    }

    if (error?.response?.status === 401 && !originalRequest._retry) {
      Cookies.remove('ACCESS_TOKEN');
      Cookies.remove('REFRESH_TOKEN');
      window.location.href = '/login';
    }

    const finalError: ApiError = {
      success: false,
      message: error?.response?.data?.result || 'An unknown error occurred.',
      status_code: error?.response?.status || 500,
    };
    return Promise.reject(finalError);
  }
);

// متد ریفرش توکن
// async function refreshToken(): Promise<string> {
//     const refreshToken = localStorage.getItem("REFRESH_TOKEN");
//     const response = await api.post<{ access: string }>("api/token/refresh/", {
//         refresh: refreshToken,
//     });
//     localStorage.setItem("ACCESS_TOKEN", response.data.access);
//     return response.data.access;
// }
