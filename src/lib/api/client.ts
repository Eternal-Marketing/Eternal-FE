/**
 * API HTTP 클라이언트
 */
import { apiConfig } from './config';
import { ApiClientError } from './types';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
};

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {} } = options;

  const url = apiConfig.baseURL
    ? `${apiConfig.baseURL.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`
    : path;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), apiConfig.timeout);

  try {
    const res = await fetch(url, {
      method,
      headers: { ...apiConfig.headers, ...headers },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
      credentials: 'include',
    });

    clearTimeout(timeoutId);
    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      const message = (json as { message?: string })?.message ?? `요청 실패 (${res.status})`;
      throw new ApiClientError(message, res.status);
    }

    // status: "error" 형식 (200이 아닌 다른 성공 코드일 수 있음)
    if ((json as { status?: string }).status === 'error') {
      throw new ApiClientError((json as { message?: string }).message ?? '알 수 없는 오류');
    }

    return json as T;
  } catch (err) {
    clearTimeout(timeoutId);
    if (err instanceof ApiClientError) throw err;
    if (err instanceof Error) {
      if (err.name === 'AbortError') throw new ApiClientError('요청 시간이 초과되었습니다.');
      throw new ApiClientError(err.message);
    }
    throw new ApiClientError('알 수 없는 오류가 발생했습니다.');
  }
}

export const get = <T>(path: string, options?: Omit<RequestOptions, 'method' | 'body'>) =>
  request<T>(path, { ...options, method: 'GET' });

export const post = <T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) =>
  request<T>(path, { ...options, method: 'POST', body });

export const put = <T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) =>
  request<T>(path, { ...options, method: 'PUT', body });

export const del = <T>(path: string, options?: Omit<RequestOptions, 'method' | 'body'>) =>
  request<T>(path, { ...options, method: 'DELETE' });
