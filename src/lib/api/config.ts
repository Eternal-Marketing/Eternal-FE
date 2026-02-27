/**
 * API 설정
 */
export const apiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? '',
  timeout: 30_000,
  headers: {
    'Content-Type': 'application/json',
  },
} as const;
