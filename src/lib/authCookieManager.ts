import Cookies from 'js-cookie';

const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';
const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN';
const ROLE = 'ROLE';

export const authStorage = {
  // Getters
  getAccessToken(): string | undefined {
    return Cookies.get(ACCESS_TOKEN_KEY);
  },

  getRefreshToken(): string | undefined {
    return Cookies.get(REFRESH_TOKEN_KEY);
  },

  getRole(): string | undefined {
    return Cookies.get(ROLE);
  },

  // Setters
  setAccessToken(token: string, options?: Cookies.CookieAttributes): void {
    Cookies.set(ACCESS_TOKEN_KEY, token, {
      expires: 1, // معمولاً کوتاه‌مدت (مثلاً 1 روز)
      ...options,
    });
  },

  setRefreshToken(token: string, options?: Cookies.CookieAttributes): void {
    Cookies.set(REFRESH_TOKEN_KEY, token, {
      expires: 7, // معمولاً بلندمدت (مثلاً 7 روز یا بیشتر)
      ...options,
    });
  },

  setRole(token: string, options?: Cookies.CookieAttributes): void {
    Cookies.set(ROLE, token, {
      expires: 7, // معمولاً بلندمدت (مثلاً 7 روز یا بیشتر)
      ...options,
    });
  },

  // Removers
  removeTokens(): void {
    Cookies.remove(ACCESS_TOKEN_KEY);
    Cookies.remove(REFRESH_TOKEN_KEY);
    Cookies.remove(ROLE);
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!Cookies.get(ACCESS_TOKEN_KEY);
  },
};
