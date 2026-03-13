/**
 * 설정 API (당일 진단 표시 최대값 등)
 * - GET /api/settings/daily-diagnostic-max: 당일 진단 표시 최대값 조회 (어드민)
 * - PATCH /api/settings/daily-diagnostic-max: 당일 진단 표시 최대값 변경 (어드민)
 */
import { get, patch } from './client';
import type { ApiSuccessResponse } from './types';
import { ApiClientError } from './types';
import { refreshAccessToken } from './auth.api';
import { getAccessToken, getRefreshToken, setTokens } from '@/lib/auth/token';

const SETTINGS_BASE = '/api/settings';

export interface DailyDiagnosticMaxData {
  max: number;
}

async function doWithAuthRetry<T>(fn: (token: string) => Promise<T>): Promise<T> {
  const token = typeof window !== 'undefined' ? getAccessToken() : null;
  if (!token) throw new ApiClientError('로그인이 필요합니다.', 401);
  try {
    return await fn(token);
  } catch (e) {
    if (e instanceof ApiClientError && e.status === 401) {
      const refresh = typeof window !== 'undefined' ? getRefreshToken() : null;
      if (refresh) {
        try {
          const data = await refreshAccessToken(refresh);
          setTokens(data.accessToken, refresh);
          return fn(data.accessToken);
        } catch {
          /* 갱신 실패 시 원래 에러 전파 */
        }
      }
    }
    throw e;
  }
}

/** 당일 진단 표시 최대값 조회 (0~999) */
export async function getDailyDiagnosticMax(): Promise<number> {
  const cacheBuster = `t=${Date.now()}`;
  const res = await doWithAuthRetry((token) =>
    get<ApiSuccessResponse<DailyDiagnosticMaxData>>(`${SETTINGS_BASE}/daily-diagnostic-max?${cacheBuster}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    })
  );
  return res.data.max;
}

/** 당일 진단 표시 최대값 변경 (0~999, 어드민) */
export async function patchDailyDiagnosticMax(max: number): Promise<number> {
  const res = await doWithAuthRetry((token) =>
    patch<ApiSuccessResponse<DailyDiagnosticMaxData>>(
      `${SETTINGS_BASE}/daily-diagnostic-max`,
      { max },
      { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }
    )
  );
  return res.data.max;
}
