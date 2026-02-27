/**
 * 칼럼 API (GET /api/columns, POST /api/columns, PUT /api/columns/:id, DELETE /api/columns/:id)
 */
import { get, post, put, del } from './client';
import type { ApiSuccessResponse } from './types';
import { ApiClientError } from './types';
import { refreshAccessToken } from './auth.api';
import { getAccessToken, getRefreshToken, setTokens } from '@/lib/auth/token';

const COLUMNS_BASE = '/api/columns';

/** API 칼럼 상태 */
export type ColumnStatus = 'DRAFT' | 'PUBLISHED' | 'PRIVATE';

/** API 카테고리 코드 (고정 5개) */
export type ColumnCategoryCode =
  | 'VIRAL_MARKETING'
  | 'PERFORMANCE_MARKETING'
  | 'SNS_MARKETING'
  | 'VIDEO_CONTENT_MARKETING'
  | 'ETERNAL_MARKETING';

/** 정렬 기준 */
export type ColumnOrderBy = 'createdAt' | 'publishedAt' | 'viewCount' | 'title';

/** 정렬 방향 */
export type ColumnOrderDirection = 'asc' | 'desc';

/** 칼럼에 포함된 카테고리 요약 정보 */
export interface ColumnCategory {
  id: string;
  name: string;
  slug: string;
}

/** 단일 칼럼 (API 응답) */
export interface Column {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  thumbnailUrl: string;
  status: ColumnStatus;
  authorId: string;
  categoryId: string;
  category?: ColumnCategory;
  viewCount: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

/** 페이지네이션 (API 응답 - 필드는 백엔드 스펙에 맞게 확장 가능) */
export interface ColumnsPagination {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
}

/** 칼럼 목록 응답 */
export interface ColumnsData {
  columns: Column[];
  pagination: ColumnsPagination;
}

/** 칼럼 목록 조회 파라미터 */
export interface GetColumnsParams {
  page?: number;
  limit?: number;
  status?: ColumnStatus;
  categoryId?: string;
  categoryCode?: ColumnCategoryCode;
  tagId?: string;
  search?: string;
  orderBy?: ColumnOrderBy;
  orderDirection?: ColumnOrderDirection;
}

/** 칼럼 생성 요청 (어드민 전용) */
export interface CreateColumnPayload {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  thumbnailUrl: string;
  status: ColumnStatus;
  categoryId?: string;
  categoryCode?: ColumnCategoryCode;
}

/** 칼럼 수정 요청 (어드민 전용) */
export interface UpdateColumnPayload {
  title?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  thumbnailUrl?: string;
  status?: ColumnStatus;
  categoryId?: string;
  categoryCode?: ColumnCategoryCode;
}

function buildQuery(params: GetColumnsParams): string {
  const search = new URLSearchParams();
  if (params.page != null) search.set('page', String(params.page));
  if (params.limit != null) search.set('limit', String(params.limit));
  if (params.status) search.set('status', params.status);
  if (params.categoryId) search.set('categoryId', params.categoryId);
  if (params.categoryCode) search.set('categoryCode', params.categoryCode);
  if (params.tagId) search.set('tagId', params.tagId);
  if (params.search) search.set('search', params.search);
  if (params.orderBy) search.set('orderBy', params.orderBy);
  if (params.orderDirection) search.set('orderDirection', params.orderDirection);
  const qs = search.toString();
  return qs ? `?${qs}` : '';
}

/** 칼럼 목록 조회 */
export async function getColumns(params: GetColumnsParams = {}): Promise<ColumnsData> {
  const path = `${COLUMNS_BASE}${buildQuery(params)}`;
  const res = await get<ApiSuccessResponse<ColumnsData> | ColumnsData>(path);
  const data = 'data' in res && res.data ? res.data : (res as ColumnsData);
  return { columns: data.columns ?? [], pagination: data.pagination ?? {} };
}

/** 칼럼 상세 조회 (slug 기반) - GET /api/columns/slug/:slug */
export async function getColumnBySlug(
  slug: string,
  incrementView = false,
): Promise<Column | null> {
  const qs = incrementView ? '?incrementView=true' : '';
  const path = `${COLUMNS_BASE}/slug/${encodeURIComponent(slug)}${qs}`;
  try {
    const res = await get<ApiSuccessResponse<Column | { column: Column }> | Column>(path);
    if ('data' in res && res.data) {
      const d = res.data;
      return 'column' in d ? d.column : (d as Column);
    }
    return res as Column;
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

/** 칼럼 생성 (어드민 로그인 시에만 사용) - 401 시 토큰 갱신 후 재시도 */
export async function createColumn(payload: CreateColumnPayload): Promise<Column> {
  const res = await doWithAuthRetry((token) =>
    post<ApiSuccessResponse<Column> | Column>(COLUMNS_BASE, payload, {
      headers: { Authorization: `Bearer ${token}` },
    })
  );
  if ('data' in res && res.data) return res.data as Column;
  return res as Column;
}

/** 칼럼 ID로 조회 (GET /api/columns/:id), incrementView로 조회수 증가 여부, auth: 인증 헤더 포함 (어드민용) */
export async function getColumnById(
  id: string,
  incrementView = false,
  withAuth = false,
): Promise<Column | null> {
  try {
    const qs = incrementView ? '?incrementView=true' : '';
    const path = `${COLUMNS_BASE}/${encodeURIComponent(id)}${qs}`;
    const options = withAuth
      ? { headers: { Authorization: `Bearer ${typeof window !== 'undefined' ? getAccessToken() : ''}` } }
      : undefined;
    const res = await get<ApiSuccessResponse<Column | { column: Column }> | Column>(path, options);
    if ('data' in res && res.data) {
      const d = res.data;
      return 'column' in d ? d.column : (d as Column);
    }
    return res as Column;
  } catch {
    return null;
  }
}

/** 칼럼 수정 (어드민 전용) - 401 시 토큰 갱신 후 재시도 */
export async function updateColumn(id: string, payload: UpdateColumnPayload): Promise<Column> {
  const path = `${COLUMNS_BASE}/${encodeURIComponent(id)}`;
  const res = await doWithAuthRetry((token) =>
    put<ApiSuccessResponse<Column> | Column>(path, payload, {
      headers: { Authorization: `Bearer ${token}` },
    })
  );
  if ('data' in res && res.data) return res.data as Column;
  return res as Column;
}

/** 칼럼 삭제 (어드민 전용) - 401 시 토큰 갱신 후 재시도 */
export async function deleteColumn(id: string): Promise<void> {
  const path = `${COLUMNS_BASE}/${encodeURIComponent(id)}`;
  await doWithAuthRetry((token) =>
    del(path, { headers: { Authorization: `Bearer ${token}` } })
  );
}
