'use client';
/**
 * AI 진단 2단계 폼
 * - 지역, 연락처(10~11자리 검사), 이메일(형식 검사), 상담 희망 시간대
 * - 제출 시 유효성 통과 후 TODO: 실제 제출 로직
 */
import { useState, useMemo } from 'react';

const TIME_OPTIONS = ["09:00~12:00", "12:00~15:00", "15:00~18:00", "18:00~00:00", "무관", "특정시간대(직접 입력)"];

function isValidContact(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 11;
}

function isValidEmail(value: string): boolean {
  if (!value.trim()) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function DiagnosisFormStep2() {
  const [region, setRegion] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [timeSelected, setTimeSelected] = useState<boolean[]>(() => TIME_OPTIONS.map((_, i) => i === 0));
  const [touchedContact, setTouchedContact] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);

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
    const hasRegion = region.trim().length > 0;
    const hasTime = timeSelected.some(Boolean);
    return hasRegion && isValidContact(contact) && isValidEmail(email) && hasTime;
  }, [region, contact, email, timeSelected]);

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

  const handleSubmit = () => {
    if (!isFormValid) return;
    // TODO: 실제 제출 로직
  };

  return (
    <form className="mt-[22px]" onSubmit={(e) => e.preventDefault()}>
      {/* 지역* */}
      <div className="py-5 border-b border-divider">
        <label className="block font-sans text-[18px] font-medium text-main">
          지역<span className="text-[#ff3434]">*</span>
        </label>
        <input
          type="text"
          placeholder="예시 : 강남구 역삼동"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="mt-4 w-[261px] h-[42px] px-[18px] border outline-none text-[14px] text-main placeholder:text-sub3 bg-white"
          style={{ borderColor: 'rgba(153, 153, 153, 0.3)' }}
        />
      </div>

      {/* 연락처* */}
      <div className="py-5 border-b border-divider">
        <label className="block font-sans text-[18px] font-medium text-main">
          연락처<span className="text-[#ff3434]">*</span>
        </label>
        <input
          type="tel"
          inputMode="numeric"
          placeholder="01012341234('-'는 제외하고 작성해 주세요)"
          value={contact}
          onChange={handleContactChange}
          onBlur={() => setTouchedContact(true)}
          className="mt-4 w-[362px] max-w-full h-[42px] px-[18px] border outline-none text-[14px] text-main placeholder:text-sub3 bg-white"
          style={{ borderColor: contactError ? '#ef4444' : 'rgba(153, 153, 153, 0.3)' }}
          aria-invalid={!!contactError}
          aria-describedby={contactError ? 'contact-error' : undefined}
        />
        {contactError && (
          <p id="contact-error" className="mt-2 text-[13px] text-[#ef4444]" role="alert">
            {contactError}
          </p>
        )}
      </div>

      {/* 이메일 */}
      <div className="py-5 border-b border-divider">
        <label className="block font-sans text-[18px] font-medium text-main">이메일</label>
        <input
          type="email"
          placeholder="info@eternalmarketing.co.kr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouchedEmail(true)}
          className="mt-4 w-[362px] max-w-full h-[42px] px-[18px] border outline-none text-[14px] text-main placeholder:text-sub3 bg-white"
          style={{ borderColor: emailError ? '#ef4444' : 'rgba(153, 153, 153, 0.3)' }}
          aria-invalid={!!emailError}
          aria-describedby={emailError ? 'email-error' : undefined}
        />
        {emailError && (
          <p id="email-error" className="mt-2 text-[13px] text-[#ef4444]" role="alert">
            {emailError}
          </p>
        )}
      </div>

      {/* 연락 가능 시간대 */}
      <div className="py-5 border-b border-divider">
        <p className="m-0 font-sans text-[18px] font-medium text-main">연락 가능 시간대 (복수 선택 가능)</p>
        <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
          {TIME_OPTIONS.map((label, idx) => (
            <label key={idx} className="flex items-center gap-2 text-[13px] text-main">
              <input
                type="checkbox"
                className="w-5 h-5 accent-primary"
                checked={timeSelected[idx]}
                onChange={() => handleTimeChange(idx)}
              />
              <span className="font-light">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="pt-[54px] flex flex-col items-center">
        <p className="m-0 font-sans text-[13px] font-normal leading-normal text-sub1 text-center">
          AI 마케팅 인텔리전스가 1차 분석을 진행하며,
          <br />
          세부 전략과 실행 범위는 전문마케터와의 상담을 통해 함께 설계됩니다.
        </p>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isFormValid}
          className="mt-[34px] h-[44px] w-[139px] text-white text-[14px] font-medium border-0 bg-[#2b2b2b] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
        >
          진단 신청하기
        </button>
      </div>
    </form>
  );
}
