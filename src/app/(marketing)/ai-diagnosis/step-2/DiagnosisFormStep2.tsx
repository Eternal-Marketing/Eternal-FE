'use client';
/**
 * AI 진단 2단계 폼
 * - 담당자명, 지역, 연락처(10~11자리 검사), 이메일(형식 검사), 상담 희망 시간대
 * - 제출 시 POST /api/subscriptions (상담신청 생성)
 */
import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { createSubscription, ApiClientError } from '@/lib/api';
import { loadStep1Data, clearStep1Data } from '../diagnosisFormStorage';
import {
  INDUSTRY_LABELS,
  INDUSTRY_CODES,
  CONCERN_LABELS,
  CONCERN_CODES,
  MARKETING_STATUS_LABELS,
  MARKETING_STATUS_CODES,
  CHANNEL_LABELS,
  CHANNEL_CODES,
  TIME_LABELS,
  TIME_CODES,
} from '../subscriptionMappings';

const TIME_OPTIONS = TIME_LABELS;

function isValidContact(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 11;
}

function isValidEmail(value: string): boolean {
  if (!value.trim()) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function DiagnosisFormStep2() {
  const router = useRouter();
  const [step1Data, setStep1Data] = useState<ReturnType<typeof loadStep1Data>>(null);
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [timeSelected, setTimeSelected] = useState<boolean[]>(() => TIME_OPTIONS.map((_, i) => i === 0));
  const [contactTimeOther, setContactTimeOther] = useState('');
  const [touchedContact, setTouchedContact] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const data = loadStep1Data();
    setStep1Data(data);
    if (!data) router.replace('/ai-diagnosis');
  }, [router]);

  const contactError = useMemo(() => {
    if (!touchedContact) return null;
    if (!contact.trim()) return '연락처를 입력해 주세요.';
    if (!isValidContact(contact)) return '연락처를 숫자 10~11자리로 입력해 주세요.';
    return null;
  }, [touchedContact, contact]);

  const emailError = useMemo(() => {
    if (!touchedEmail) return null;
    if (!email.trim()) return '이메일을 입력해 주세요.';
    if (!isValidEmail(email)) return '올바른 이메일 형식을 입력해 주세요.';
    return null;
  }, [touchedEmail, email]);

  const isFormValid = useMemo(() => {
    const hasName = name.trim().length > 0;
    const hasRegion = region.trim().length > 0;
    const hasTime = timeSelected.some(Boolean);
    const hasOtherTime = timeSelected[5] ? contactTimeOther.trim().length > 0 : true;
    return hasName && hasRegion && isValidContact(contact) && isValidEmail(email) && hasTime && hasOtherTime;
  }, [name, region, contact, email, timeSelected, contactTimeOther]);

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/\D/g, '').slice(0, 11);
    setContact(v);
  };

  const handleTimeChange = (idx: number) => {
    setTimeSelected((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  const handleSubmit = async () => {
    if (!isFormValid || !step1Data) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      const industryIdx = INDUSTRY_LABELS.indexOf(step1Data.industry as (typeof INDUSTRY_LABELS)[number]);
      const industryCode = industryIdx >= 0 ? INDUSTRY_CODES[industryIdx] : 'OTHER';
      const concerns = step1Data.concerns
        .map((c) => CONCERN_LABELS.indexOf(c as (typeof CONCERN_LABELS)[number]))
        .filter((i) => i >= 0)
        .map((i) => CONCERN_CODES[i]);
      const statusIdx = MARKETING_STATUS_LABELS.indexOf(step1Data.marketingStatus as (typeof MARKETING_STATUS_LABELS)[number]);
      const marketingStatus = statusIdx >= 0 ? MARKETING_STATUS_CODES[statusIdx] : 'NONE';
      const channels = step1Data.interestedChannels
        .map((c) => CHANNEL_LABELS.indexOf(c as (typeof CHANNEL_LABELS)[number]))
        .filter((i) => i >= 0)
        .map((i) => CHANNEL_CODES[i]);
      const contactTimeSlots = timeSelected
        .map((sel, i) => (sel ? TIME_CODES[i] : null))
        .filter((c): c is (typeof TIME_CODES)[number] => c !== null);
      const payload = {
        name: name.trim(),
        email: email.trim(),
        phone: contact.replace(/\D/g, ''),
        companyName: step1Data.companyName || undefined,
        industry: industryCode,
        industryOther: industryIdx === 6 ? step1Data.industryOther : undefined,
        concerns,
        marketingStatus,
        interestedChannels: channels,
        channelsOther: step1Data.channelsOther || undefined,
        message: step1Data.message || undefined,
        region: region.trim() || undefined,
        contactTimeSlots,
        contactTimeOther: timeSelected[5] ? contactTimeOther.trim() : undefined,
      };
      await createSubscription(payload);
      clearStep1Data();
      setSubmitSuccess(true);
    } catch (err) {
      setSubmitError(err instanceof ApiClientError ? err.message : '상담 신청에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!step1Data) return null;

  return (
    <form className="mt-4 sm:mt-[22px]" onSubmit={(e) => e.preventDefault()}>
      {submitError && (
        <div className="mb-6 p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-600 font-sans text-[14px]" role="alert">
          {submitError}
        </div>
      )}

      {/* 담당자명* */}
      <div className="py-4 sm:py-5 border-b border-divider">
        <label className="block font-sans text-[16px] sm:text-[18px] font-medium text-main">
          담당자명<span className="text-[#ff3434]">*</span>{' '}
          <span className="font-normal text-[12px] sm:text-[13px] text-sub3">(기업의 경우 직책을 함께 기입해 주세요)</span>
        </label>
        <input
          type="text"
          placeholder="홍길동"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-3 sm:mt-4 w-full max-w-[261px] h-10 sm:h-[42px] px-3 sm:px-[18px] border outline-none text-[13px] sm:text-[14px] text-main placeholder:text-sub3 bg-white"
          style={{ borderColor: 'rgba(153, 153, 153, 0.3)' }}
        />
      </div>

      {/* 지역* */}
      <div className="py-4 sm:py-5 border-b border-divider">
        <label className="block font-sans text-[16px] sm:text-[18px] font-medium text-main">
          지역<span className="text-[#ff3434]">*</span>
        </label>
        <input
          type="text"
          placeholder="예시 : 강남구 역삼동"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="mt-3 sm:mt-4 w-full max-w-[261px] h-10 sm:h-[42px] px-3 sm:px-[18px] border outline-none text-[13px] sm:text-[14px] text-main placeholder:text-sub3 bg-white"
          style={{ borderColor: 'rgba(153, 153, 153, 0.3)' }}
        />
      </div>

      {/* 연락처* */}
      <div className="py-4 sm:py-5 border-b border-divider">
        <label className="block font-sans text-[16px] sm:text-[18px] font-medium text-main">
          연락처<span className="text-[#ff3434]">*</span>
        </label>
        <input
          type="tel"
          inputMode="numeric"
          placeholder="01012341234('-'는 제외하고 작성해 주세요)"
          value={contact}
          onChange={handleContactChange}
          onBlur={() => setTouchedContact(true)}
          className="mt-3 sm:mt-4 w-full max-w-[362px] h-10 sm:h-[42px] px-3 sm:px-[18px] border outline-none text-[13px] sm:text-[14px] text-main placeholder:text-sub3 bg-white"
          style={{ borderColor: contactError ? '#ef4444' : 'rgba(153, 153, 153, 0.3)' }}
          aria-invalid={!!contactError}
          aria-describedby={contactError ? 'contact-error' : undefined}
        />
        {contactError && (
          <p id="contact-error" className="mt-2 text-[12px] sm:text-[13px] text-[#ef4444]" role="alert">
            {contactError}
          </p>
        )}
      </div>

      {/* 이메일 */}
      <div className="py-4 sm:py-5 border-b border-divider">
        <label className="block font-sans text-[16px] sm:text-[18px] font-medium text-main">이메일</label>
        <input
          type="email"
          placeholder="info@eternalmarketing.co.kr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouchedEmail(true)}
          className="mt-3 sm:mt-4 w-full max-w-[362px] h-10 sm:h-[42px] px-3 sm:px-[18px] border outline-none text-[13px] sm:text-[14px] text-main placeholder:text-sub3 bg-white"
          style={{ borderColor: emailError ? '#ef4444' : 'rgba(153, 153, 153, 0.3)' }}
          aria-invalid={!!emailError}
          aria-describedby={emailError ? 'email-error' : undefined}
        />
        {emailError && (
          <p id="email-error" className="mt-2 text-[12px] sm:text-[13px] text-[#ef4444]" role="alert">
            {emailError}
          </p>
        )}
      </div>

      {/* 연락 가능 시간대 */}
      <div className="py-4 sm:py-5 border-b border-divider">
        <p className="m-0 font-sans text-[16px] sm:text-[18px] font-medium text-main">연락 가능 시간대 (복수 선택 가능)</p>
        <div className="mt-3 sm:mt-4 flex flex-wrap gap-x-4 sm:gap-x-8 gap-y-3">
          {TIME_OPTIONS.map((label, idx) => (
            <label key={idx} className="flex items-center gap-2 text-[12px] sm:text-[13px] text-main">
              <input
                type="checkbox"
                className="w-4 h-4 sm:w-5 sm:h-5 accent-primary flex-shrink-0"
                checked={timeSelected[idx]}
                onChange={() => handleTimeChange(idx)}
              />
              <span className="font-light">{label}</span>
            </label>
          ))}
        </div>
        {timeSelected[5] && (
          <input
            type="text"
            placeholder="희망 시간대를 입력해 주세요"
            value={contactTimeOther}
            onChange={(e) => setContactTimeOther(e.target.value)}
            className="mt-3 w-full max-w-[261px] h-10 px-3 border outline-none text-[13px] text-main placeholder:text-sub3 bg-white"
            style={{ borderColor: 'rgba(153, 153, 153, 0.3)' }}
          />
        )}
      </div>

      <div className="pt-8 sm:pt-12 flex flex-col items-center">
        <p className="m-0 font-sans text-[12px] sm:text-[13px] font-normal leading-normal text-sub1 text-center px-2">
          AI 마케팅 인텔리전스가 1차 분석을 진행하며,
          <br />
          세부 전략과 실행 범위는 전문마케터와의 상담을 통해 함께 설계됩니다.
        </p>

        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => router.push('/ai-diagnosis')}
            className="h-10 sm:h-[44px] min-w-[120px] px-6 text-sub1 text-[13px] sm:text-[14px] font-medium border border-sub3 bg-transparent cursor-pointer hover:border-primary hover:text-primary transition-colors rounded-sm"
          >
            이전
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isFormValid || submitting}
          className="h-10 sm:h-[44px] min-w-[120px] w-[139px] max-w-full text-white text-[13px] sm:text-[14px] font-medium border-0 bg-[#2b2b2b] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-opacity rounded-sm"
        >
            {submitting ? '신청 중...' : '진단 신청하기'}
          </button>
        </div>
        {submitSuccess && (
          <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/30 text-primary font-sans text-[14px] text-center">
            상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.
          </div>
        )}
      </div>
    </form>
  );
}
