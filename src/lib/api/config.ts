/**
 * API 설정
 */
const isBrowser = typeof window !== 'undefined';

export const apiConfig = {
  // 클라이언트: NEXT_PUBLIC_* (빌드 타임 주입)
  // 서버: API_URL (런타임 주입) → Coolify처럼 빌드/런타임 env 분리된 환경에서도 동작
  baseURL: isBrowser
    ? (process.env.NEXT_PUBLIC_API_URL ?? '')
    : (process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? ''),
  timeout: 30_000,
  headers: {
    'Content-Type': 'application/json',
  },
} as const;
