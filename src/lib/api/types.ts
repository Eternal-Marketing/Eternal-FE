/**
 * Auth API 공통 타입 (스펙 기반)
 */

/** API 성공 응답 래퍼 */
export interface ApiSuccessResponse<T> {
  status: 'success';
  data: T;
}

/** API 에러 응답 */
export interface ApiErrorResponse {
  status: 'error';
  message: string;
}

export class ApiClientError extends Error {
  constructor(
    message: string,
    public status?: number
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}
