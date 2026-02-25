/**
 * 통계 API (일일 진단 건수 등)
 */
import { get } from './client';
import type { ApiSuccessResponse } from './types';

export interface DailyDiagnosticCountData {
  count: number;
}

export async function getDailyDiagnosticCount(): Promise<number> {
  const res = await get<ApiSuccessResponse<DailyDiagnosticCountData>>(
    '/api/stats/daily-diagnostic-count'
  );
  return res.data.count;
}
