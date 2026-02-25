/**
 * AI 진단 폼 Step1 → Step2 전달용 sessionStorage
 */

const KEY = 'ai-diagnosis-step1';

export interface Step1FormData {
  companyName: string;
  industry: string;
  industryOther: string;
  concerns: string[];
  marketingStatus: string;
  interestedChannels: string[];
  channelsOther: string;
  message: string;
}

export function saveStep1Data(data: Step1FormData): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(KEY, JSON.stringify(data));
}

export function loadStep1Data(): Step1FormData | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Step1FormData;
  } catch {
    return null;
  }
}

export function clearStep1Data(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(KEY);
}
