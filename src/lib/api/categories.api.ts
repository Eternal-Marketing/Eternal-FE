/**
 * 카테고리 API (GET /api/categories, POST, GET/:id, PUT/:id, DELETE/:id)
 */
import { get, post, put, del } from './client';
import type { ApiSuccessResponse } from './types';
import { ApiClientError } from './types';
import { refreshAccessToken } from './auth.api';
import { getAccessToken, getRefreshToken, setTokens } from '@/lib/auth/token';

const CATEGORIES_BASE = '/api/categories';

/** 카테고리 */
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  parentId: string | null;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/** 카테고리 목록 조회 파라미터 */
export interface GetCategoriesParams {
  includeInactive?: boolean;
}

/** 카테고리 생성 요청 (어드민 전용) */
export interface CreateCategoryPayload {
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  order?: number;
}

/** 카테고리 수정 요청 */
export interface UpdateCategoryPayload {
  name?: string;
  slug?: string;
  description?: string;
  isActive?: boolean;
}

/** 카테고리 목록 조회 */
export async function getCategories(params: GetCategoriesParams = {}): Promise<Category[]> {
  const qs = params.includeInactive ? '?includeInactive=true' : '';
  const path = `${CATEGORIES_BASE}${qs}`;
  const res = await get<ApiSuccessResponse<{ categories: Category[] }> | { categories: Category[] }>(path);
  const data = 'data' in res ? res.data : (res as { categories: Category[] });
  return data?.categories ?? [];
}

/** 카테고리 상세 조회 */
export async function getCategoryById(id: string): Promise<Category | null> {
  try {
    const path = `${CATEGORIES_BASE}/${encodeURIComponent(id)}`;
    const res = await get<ApiSuccessResponse<Category> | Category>(path);
    if ('data' in res && res.data) return res.data as Category;
    return res as Category;
  } catch {
    return null;
  }
}

async function doWithAuthRetry<T>(
  fn: (token: string) => Promise<T>
): Promise<T> {
  let token = typeof window !== 'undefined' ? getAccessToken() : null;
  if (!token) throw new Error('로그인이 필요합니다.');
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

/** 카테고리 생성 (어드민 전용) - 401 시 토큰 갱신 후 재시도 */
export async function createCategory(payload: CreateCategoryPayload): Promise<Category> {
  const res = await doWithAuthRetry((token) =>
    post<ApiSuccessResponse<Category> | Category>(CATEGORIES_BASE, payload, {
      headers: { Authorization: `Bearer ${token}` },
    })
  );
  if ('data' in res && res.data) return res.data as Category;
  return res as Category;
}

/** 카테고리 수정 - 401 시 토큰 갱신 후 재시도 */
export async function updateCategory(id: string, payload: UpdateCategoryPayload): Promise<Category> {
  const path = `${CATEGORIES_BASE}/${encodeURIComponent(id)}`;
  const res = await doWithAuthRetry((token) =>
    put<ApiSuccessResponse<Category> | Category>(path, payload, {
      headers: { Authorization: `Bearer ${token}` },
    })
  );
  if ('data' in res && res.data) return res.data as Category;
  return res as Category;
}

/** 카테고리 삭제 - 401 시 토큰 갱신 후 재시도 */
export async function deleteCategory(id: string): Promise<void> {
  const path = `${CATEGORIES_BASE}/${encodeURIComponent(id)}`;
  await doWithAuthRetry((token) =>
    del(path, { headers: { Authorization: `Bearer ${token}` } })
  );
}
