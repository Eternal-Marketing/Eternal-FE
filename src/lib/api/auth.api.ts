/**
 * Auth 인증 API (스펙: POST/GET /api/auth/*)
 */
import { post, get } from './client';
import type { ApiSuccessResponse } from './types';

const AUTH_BASE = '/api/auth';

/** Admin 정보 */
export interface Admin {
  id: string;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
  lastLoginAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

/** 로그인 응답 데이터 */
export interface LoginData {
  accessToken: string;
  refreshToken: string;
  admin: Admin;
}

/** 로그인 요청 */
export interface LoginRequest {
  email: string;
  password: string;
}

/** 로그인 */
export async function loginAdmin(payload: LoginRequest): Promise<LoginData> {
  const res = await post<ApiSuccessResponse<LoginData>>(`${AUTH_BASE}/login`, payload);
  return res.data;
}

/** /api/auth/me 응답 */
export interface MeData {
  admin: Admin;
}

/** 현재 로그인된 어드민 조회 */
export async function getMe(accessToken: string): Promise<MeData> {
  const res = await get<ApiSuccessResponse<MeData>>(`${AUTH_BASE}/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
}

/** 리프레시 응답 */
export interface RefreshData {
  accessToken: string;
}

/** 액세스 토큰 갱신 */
export async function refreshAccessToken(refreshToken: string): Promise<RefreshData> {
  const res = await post<ApiSuccessResponse<RefreshData>>(`${AUTH_BASE}/refresh`, {
    refreshToken,
  });
  return res.data;
}

/** 로그아웃 */
export async function logout(refreshToken: string): Promise<void> {
  await post(`${AUTH_BASE}/logout`, { refreshToken });
}
