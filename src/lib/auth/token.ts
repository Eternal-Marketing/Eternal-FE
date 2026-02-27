/**
 * 토큰·관리자 정보 저장/조회 (localStorage)
 */

const KEY_ACCESS = 'admin_access_token';
const KEY_REFRESH = 'admin_refresh_token';
const KEY_ADMIN = 'admin_info';

export function setTokens(accessToken: string, refreshToken: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY_ACCESS, accessToken);
  localStorage.setItem(KEY_REFRESH, refreshToken);
}

export function setAdminInfo(admin: { name?: string; email?: string }): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY_ADMIN, JSON.stringify(admin));
}

export function getAdminInfo(): { name?: string; email?: string } | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(KEY_ADMIN);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(KEY_ACCESS);
}

export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(KEY_REFRESH);
}

export function clearTokens(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(KEY_ACCESS);
  localStorage.removeItem(KEY_REFRESH);
  localStorage.removeItem(KEY_ADMIN);
}

export function hasTokens(): boolean {
  return !!(getAccessToken() && getRefreshToken());
}
