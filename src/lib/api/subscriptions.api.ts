/**
 * 상담신청(구독) API
 * - POST /api/subscriptions: 상담신청 생성 (공개)
 * - GET /api/subscriptions: 목록 조회 (어드민)
 * - GET /api/subscriptions/count: 총 가입자 수 (공개)
 * - GET /api/subscriptions/:id: 상세 조회 (어드민)
 * - DELETE /api/subscriptions/:id: 삭제 (어드민)
 */
import { get, post, del } from './client';
import type { ApiSuccessResponse } from './types';
import { ApiClientError } from './types';
import { refreshAccessToken } from './auth.api';
import { getAccessToken, getRefreshToken, setTokens } from '@/lib/auth/token';

const SUBSCRIPTIONS_BASE = '/api/subscriptions';

export type IndustryCode =
  | 'RESTAURANT'
  | 'HOSPITAL'
  | 'ACADEMY'
  | 'BEAUTY_HEALTH'
  | 'SHOPPING_MALL'
  | 'SERVICE'
  | 'OTHER';

export type ConcernCode =
  | 'SALES_INCREASE'
  | 'CUSTOMER_ACQUISITION'
  | 'BRAND_AWARENESS'
  | 'EFFICIENCY_ANALYSIS';

export type MarketingStatusCode = 'NONE' | 'INTERNAL' | 'OUTSOURCING' | 'PAUSED';

export type InterestedChannelCode =
  | 'NAVER_BLOG'
  | 'NAVER_CAFE'
  | 'NAVER_PLACE'
  | 'INSTAGRAM'
  | 'YOUTUBE'
  | 'SHORTFORM_ADS'
  | 'OTHER';

export type ContactTimeCode = '09_12' | '12_15' | '15_18' | '18_00' | 'ANY' | 'OTHER';

/** 상담신청 폼 페이로드 (camelCase) */
export interface SubscriptionFormPayload {
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  industry: IndustryCode;
  industryOther?: string;
  concerns: ConcernCode[];
  marketingStatus: MarketingStatusCode;
  interestedChannels: InterestedChannelCode[];
  channelsOther?: string;
  message?: string;
  region?: string;
  contactTimeSlots: ContactTimeCode[];
  contactTimeOther?: string;
}

/** 상담신청 응답 */
export interface Subscription {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  industry: string;
  industryOther?: string;
  concerns: string[];
  marketingStatus: string;
  interestedChannels: string[];
  channelsOther?: string;
  message?: string;
  region?: string;
  contactTimeSlots: string[];
  contactTimeOther?: string;
  status?: string;
  createdAt?: string;
}

/** API 응답( snake_case 포함) → Subscription 정규화 */
function normalizeSubscription(raw: Record<string, unknown>): Subscription {
  const nestedSubscription =
    raw['subscription'] && typeof raw['subscription'] === 'object'
      ? (raw['subscription'] as Record<string, unknown>)
      : undefined;

  return {
    id: String(raw['id'] ?? nestedSubscription?.['id'] ?? ''),
    name: String(raw['name'] ?? ''),
    email: String(raw['email'] ?? ''),
    phone: String(raw['phone'] ?? ''),
    companyName:
      raw['companyName'] != null
        ? String(raw['companyName'])
        : raw['company_name'] != null
          ? String(raw['company_name'])
          : undefined,
    industry: String(raw['industry'] ?? ''),
    industryOther:
      raw['industryOther'] != null
        ? String(raw['industryOther'])
        : raw['industry_other'] != null
          ? String(raw['industry_other'])
          : undefined,
    concerns: Array.isArray(raw['concerns'])
      ? raw['concerns'].map(String)
      : Array.isArray(raw['concern_codes'])
        ? raw['concern_codes'].map(String)
        : [],
    marketingStatus: String(raw['marketingStatus'] ?? raw['marketing_status'] ?? ''),
    interestedChannels: Array.isArray(raw['interestedChannels'])
      ? raw['interestedChannels'].map(String)
      : Array.isArray(raw['interested_channels'])
        ? raw['interested_channels'].map(String)
        : [],
    channelsOther:
      raw['channelsOther'] != null
        ? String(raw['channelsOther'])
        : raw['channels_other'] != null
          ? String(raw['channels_other'])
          : undefined,
    message: raw['message'] != null ? String(raw['message']) : undefined,
    region: raw['region'] != null ? String(raw['region']) : undefined,
    contactTimeSlots: Array.isArray(raw['contactTimeSlots'])
      ? raw['contactTimeSlots'].map(String)
      : Array.isArray(raw['contact_time_slots'])
        ? raw['contact_time_slots'].map(String)
        : [],
    contactTimeOther:
      raw['contactTimeOther'] != null
        ? String(raw['contactTimeOther'])
        : raw['contact_time_other'] != null
          ? String(raw['contact_time_other'])
          : undefined,
    status: raw['status'] != null ? String(raw['status']) : undefined,
    createdAt:
      raw['createdAt'] != null ? String(raw['createdAt']) : raw['created_at'] != null ? String(raw['created_at']) : undefined,
  };
}

/** 상담신청 생성 (공개 API) */
export async function createSubscription(payload: SubscriptionFormPayload): Promise<Subscription> {
  const res = await post<ApiSuccessResponse<Subscription> | Subscription>(SUBSCRIPTIONS_BASE, payload);
  if ('data' in res && res.data) return res.data as Subscription;
  return res as Subscription;
}

/** 총 가입자 수 조회 (공개 API) */
export async function getSubscriptionCount(): Promise<number> {
  const res = await get<ApiSuccessResponse<{ count: number }> | { count: number }>(
    `${SUBSCRIPTIONS_BASE}/count`
  );
  const data = 'data' in res ? res.data : (res as { count: number });
  return data?.count ?? 0;
}

async function doWithAuthRetry<T>(
  fn: (token: string) => Promise<T>
): Promise<T> {
  let token = typeof window !== 'undefined' ? getAccessToken() : null;
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

/** 상담신청 목록 조회 (어드민) */
export interface GetSubscriptionsParams {
  limit?: number;
  offset?: number;
}

export async function getSubscriptions(params: GetSubscriptionsParams = {}): Promise<Subscription[]> {
  const qs = new URLSearchParams();
  if (params.limit != null) qs.set('limit', String(params.limit));
  if (params.offset != null) qs.set('offset', String(params.offset));
  const query = qs.toString();
  const path = `${SUBSCRIPTIONS_BASE}${query ? `?${query}` : ''}`;
  const res = await doWithAuthRetry<unknown>((token) =>
    get(path, { headers: { Authorization: `Bearer ${token}` } })
  );

  const rawList: Record<string, unknown>[] = (() => {
    if (Array.isArray(res)) return res as Record<string, unknown>[];
    if (!res || typeof res !== 'object') return [];
    const obj = res as Record<string, unknown>;
    const data = obj['data'];

    if (Array.isArray(data)) return data as Record<string, unknown>[];
    if (data && typeof data === 'object') {
      const subs = (data as Record<string, unknown>)['subscriptions'];
      if (Array.isArray(subs)) return subs as Record<string, unknown>[];
    }

    const subs = obj['subscriptions'];
    if (Array.isArray(subs)) return subs as Record<string, unknown>[];
    return [];
  })();
  return rawList.map((r) => normalizeSubscription(r as Record<string, unknown>));
}

/** 상담신청 상세 조회 (어드민) */
export async function getSubscriptionById(id: string): Promise<Subscription | null> {
  try {
    const path = `${SUBSCRIPTIONS_BASE}/${encodeURIComponent(id)}`;
    const res = await doWithAuthRetry((token) =>
      get(path, { headers: { Authorization: `Bearer ${token}` } })
    );
    const data = (res as { data?: Record<string, unknown> })?.data ?? (res as Record<string, unknown>);
    const raw = (data as { subscription?: Record<string, unknown> })?.subscription ?? data;
    return normalizeSubscription(raw as Record<string, unknown>);
  } catch {
    return null;
  }
}

/** 상담신청 삭제 (어드민) */
export async function deleteSubscription(id: string): Promise<void> {
  const path = `${SUBSCRIPTIONS_BASE}/${encodeURIComponent(id)}`;
  await doWithAuthRetry((token) =>
    del(path, { headers: { Authorization: `Bearer ${token}` } })
  );
}
