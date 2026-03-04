/**
 * AI 진단 폼 → SubscriptionFormPayload 매핑
 */
import type {
  IndustryCode,
  ConcernCode,
  MarketingStatusCode,
  InterestedChannelCode,
  ContactTimeCode,
} from '@/lib/api/subscriptions.api';

export const INDUSTRY_LABELS = [
  '음식점',
  '병원·의원',
  '학원·교육',
  '뷰티·헬스',
  '쇼핑몰',
  '서비스업',
  '기타 (직접 입력)',
] as const;

export const INDUSTRY_CODES: IndustryCode[] = [
  'RESTAURANT',
  'HOSPITAL',
  'ACADEMY',
  'BEAUTY_HEALTH',
  'SHOPPING_MALL',
  'SERVICE',
  'OTHER',
];

export const CONCERN_LABELS = [
  '매출 증가',
  '고객 유입',
  '브랜드 인지도',
  '효율 분석 / 마케팅 방향성 점검',
] as const;

export const CONCERN_CODES: ConcernCode[] = [
  'SALES_INCREASE',
  'CUSTOMER_ACQUISITION',
  'BRAND_AWARENESS',
  'EFFICIENCY_ANALYSIS',
];

export const MARKETING_STATUS_LABELS = [
  '현재 별도의 마케팅을 진행하고 있지 않음',
  '내부에서 간단히 진행 중',
  '외주 또는 대행사를 이용 중',
  '과거에 진행했으나 중단한 상태',
] as const;

export const MARKETING_STATUS_CODES: MarketingStatusCode[] = [
  'NONE',
  'INTERNAL',
  'OUTSOURCING',
  'PAUSED',
];

export const CHANNEL_LABELS = [
  '네이버 블로그(기자단 체험단)',
  '네이버 카페 / 커뮤니티',
  '네이버 스마트플레이스',
  '인스타그램',
  '유튜브',
  '플랫폼별 숏폼 광고',
  '기타 (자유 기재)',
] as const;

export const CHANNEL_CODES: InterestedChannelCode[] = [
  'NAVER_BLOG',
  'NAVER_CAFE',
  'NAVER_PLACE',
  'INSTAGRAM',
  'YOUTUBE',
  'SHORTFORM_ADS',
  'OTHER',
];

export const TIME_LABELS = [
  '09:00~12:00',
  '12:00~15:00',
  '15:00~18:00',
  '18:00~00:00',
  '무관',
  '특정시간대(직접 입력)',
] as const;

export const TIME_CODES: ContactTimeCode[] = [
  '09_12',
  '12_15',
  '15_18',
  '18_00',
  'ANY',
  'OTHER',
];

/** API 코드 → 한글 라벨 변환 (진단상세·콘솔 표시용) */
export function industryCodeToLabel(code: string): string {
  const idx = INDUSTRY_CODES.indexOf(code as (typeof INDUSTRY_CODES)[number]);
  return idx >= 0 ? INDUSTRY_LABELS[idx] : code;
}
export function concernCodeToLabel(code: string): string {
  const idx = CONCERN_CODES.indexOf(code as (typeof CONCERN_CODES)[number]);
  return idx >= 0 ? CONCERN_LABELS[idx] : code;
}
export function marketingStatusCodeToLabel(code: string): string {
  const idx = MARKETING_STATUS_CODES.indexOf(code as (typeof MARKETING_STATUS_CODES)[number]);
  return idx >= 0 ? MARKETING_STATUS_LABELS[idx] : code;
}
export function channelCodeToLabel(code: string): string {
  const idx = CHANNEL_CODES.indexOf(code as (typeof CHANNEL_CODES)[number]);
  return idx >= 0 ? CHANNEL_LABELS[idx] : code;
}
export function timeCodeToLabel(code: string): string {
  const idx = TIME_CODES.indexOf(code as (typeof TIME_CODES)[number]);
  return idx >= 0 ? TIME_LABELS[idx] : code;
}
