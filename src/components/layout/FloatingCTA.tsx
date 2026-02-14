'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import * as ReactDOM from 'react-dom';

const CONCERN_OPTIONS = [
  '매출 증가',
  '고객 유입',
  '브랜드 인지도',
  '효율 분석 / 마케팅 방향성 분석',
];

const MODAL_CLOSE_DURATION = 360;
const PANEL_ANIM_DURATION = 360;

type Step = 1 | 2;

/**
 * 플로팅 CTA (오른쪽 하단 고정)
 * - 클릭 시 간편 문의 모달(2단계 폼), X로 닫기, 진단 신청 시 /ai-diagnosis 이동
 */
export default function FloatingCTA() {
  const [showModal, setShowModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>(1);

  useEffect(() => {
    if (showModal && !isClosing) {
      const t = requestAnimationFrame(() => setIsOpen(true));
      return () => cancelAnimationFrame(t);
    }
    if (!showModal) setIsOpen(false);
  }, [showModal, isClosing]);

  const goStep2 = (e: React.MouseEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const goStep1 = (e: React.MouseEvent) => {
    e.preventDefault();
    setStep(1);
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setIsClosing(false);
      setStep(1);
      window.location.href = '/ai-diagnosis';
    }, MODAL_CLOSE_DURATION);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setIsClosing(false);
      setStep(1);
    }, MODAL_CLOSE_DURATION);
  };

  const openModal = () => {
    setStep(1);
    setShowModal(true);
  };

  const showOverlay = showModal || isClosing;

  const modalContent = showOverlay && (
    <div className="fixed right-3 top-4 bottom-20 sm:right-4 sm:top-5 sm:bottom-24 lg:right-6 lg:top-6 lg:bottom-24 z-[99998] w-[calc(100vw-24px)] sm:w-[calc(100vw-32px)] sm:max-w-[420px] md:max-w-[460px] lg:w-[480px] lg:max-w-[480px] overflow-hidden">
      <div
        className={`h-full rounded-[28px] bg-gradient-to-b from-white/98 to-white/95 backdrop-blur-2xl overflow-hidden flex flex-col will-change-transform transition-transform duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isClosing
            ? 'translate-y-full'
            : isOpen
              ? 'translate-y-0'
              : 'translate-y-full'
        }`}
      >
        <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 pt-4 sm:pt-6 pb-4 sm:pb-5">
          <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-[56px] lg:h-[56px] rounded-xl sm:rounded-2xl bg-white shadow-[0_10px_24px_rgba(0,0,0,0.08)] flex items-center justify-center overflow-hidden shrink-0">
            <Image src="/images/logo.svg" alt="" width={36} height={36} className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 object-contain" aria-hidden />
          </div>
          <div className="flex-1 min-w-0">
            <p className="m-0 font-sans text-[18px] sm:text-[20px] lg:text-[22px] font-bold text-main truncate">간편 문의하기</p>
            {/* 운영시간 보기 문구 제거 */}
          </div>
          {step === 2 && (
            <button
              type="button"
              onClick={goStep1}
              className="h-[40px] px-3 rounded-full bg-black/5 hover:bg-black/10 transition-colors text-[13px] text-main"
              aria-label="이전"
            >
              이전
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4 sm:pb-6">

          {/* Step 1 */}
          {step === 1 && (
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-5">
                {/* 업체명 */}
                <div>
                  <label className="block font-sans text-[14px] font-semibold text-main">업체명</label>
                  <input
                    type="text"
                    placeholder="내용 작성해 주세요."
                    className="mt-2 w-full h-[46px] px-4 rounded-xl border border-black/10 bg-white outline-none text-[15px] text-main placeholder:text-sub3 focus:border-primary"
                  />
                </div>

              {/* 업종 */}
              <div>
                <label className="block font-sans text-[14px] font-semibold text-main">업종</label>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
                  {['음식점', '병원·의원', '뷰티·헬스', '쇼핑몰', '서비스업', '기타 (직접 입력)'].map(
                    (label, idx) => (
                      <label
                        key={idx}
                        className="flex items-center gap-2 text-[14px] text-main cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="industry"
                          className="w-4 h-4 accent-primary"
                          defaultChecked={idx === 0}
                        />
                        <span>{label}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* 현재 가장 고민되는 영역 (최대 2대 선택) */}
              <div>
                <label className="block font-sans text-[14px] font-semibold text-main">
                  현재 가장 고민되는 영역 (최대 2대 선택)
                </label>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
                  {CONCERN_OPTIONS.map((label, idx) => (
                    <label
                      key={idx}
                      className="flex items-center gap-2 text-[14px] text-main cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="concern"
                        className="w-4 h-4 accent-primary"
                        defaultChecked={idx === 0}
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 현재 마케팅 진행 상황 */}
              <div>
                <label className="block font-sans text-[14px] font-semibold text-main">현재 마케팅 진행 상황</label>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
                  {[
                    '현재 별도의 마케팅을 진행하고 있지 않음',
                    '내부에서 간단히 진행 중',
                    '외주 또는 대행사를 이용 중',
                    '과거에 진행했으나 중단한 상태',
                  ].map((label, idx) => (
                    <label
                      key={idx}
                      className="flex items-center gap-2 text-[14px] text-main cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="status"
                        className="w-4 h-4 accent-primary"
                        defaultChecked={idx === 0}
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 관심있는 마케팅 채널 */}
              <div>
                <label className="block font-sans text-[14px] font-semibold text-main">
                  관심있는 마케팅 채널 (복수 선택 가능)
                </label>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
                  {[
                    '네이버 블로그 (기자단 체험단)',
                    '네이버 카페 / 커뮤니티',
                    '네이버 스마트 플레이스',
                    '인스타그램',
                    '유튜브',
                    '플랫폼별 숏폼 광고',
                    '기타(자유 기재)',
                  ].map((label, idx) => (
                    <label
                      key={idx}
                      className="flex items-center gap-2 text-[14px] text-main cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-primary"
                        defaultChecked={idx === 0}
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 추가 공유 */}
              <div>
                <label className="block font-sans text-[14px] font-semibold text-main">
                  추가로 공유하고 싶은 사항이 있다면 자유롭게 작성해주세요.
                </label>
                <textarea
                  placeholder="(현재 상황, 궁금한 점, 기대하는 방향 등)"
                  className="mt-2 w-full h-[96px] px-4 py-3 rounded-xl border border-black/10 bg-white outline-none text-[15px] text-main placeholder:text-sub3 resize-none focus:border-primary"
                />
              </div>
              </div>
            </form>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-5">
                <div>
                  <label className="block font-sans text-[14px] font-semibold text-main">
                    지역<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="예시 : 강남구 역삼동"
                    className="mt-2 w-full h-[46px] px-4 rounded-xl border border-black/10 bg-white outline-none text-[15px] text-main placeholder:text-sub3 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[14px] font-semibold text-main">
                    연락처<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="01012341234(‘-’는 제외하고 작성해 주세요)"
                    className="mt-2 w-full h-[46px] px-4 rounded-xl border border-black/10 bg-white outline-none text-[15px] text-main placeholder:text-sub3 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[14px] font-semibold text-main">이메일</label>
                  <input
                    type="email"
                    placeholder="info@eternalmarketing.co.kr"
                    className="mt-2 w-full h-[46px] px-4 rounded-xl border border-black/10 bg-white outline-none text-[15px] text-main placeholder:text-sub3 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block font-sans text-[14px] font-semibold text-main">현재 마케팅 진행 상황</label>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-3">
                    {['09:00~12:00', '12:00~15:00', '15:00~18:00', '18:00~00:00', '무관', '특정시간대(직접 입력)'].map(
                      (label, idx) => (
                        <label key={idx} className="flex items-center gap-2 text-[14px] text-main cursor-pointer">
                          <input type="radio" name="time" className="w-4 h-4 accent-primary" defaultChecked={idx === 0} />
                          <span>{label}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>

        <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-3 sm:pt-4 bg-white/95 backdrop-blur-xl">
          {step === 1 ? (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={goStep2}
                className="h-11 sm:h-[48px] px-6 sm:px-10 rounded-xl sm:rounded-2xl bg-primary text-white text-[14px] sm:text-[16px] font-semibold shadow-[0_12px_28px_rgba(24,75,186,0.32)] hover:opacity-95 active:scale-[0.98] transition-[opacity,transform]"
              >
                다음
              </button>
            </div>
          ) : (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSubmit}
                className="h-11 sm:h-[48px] px-6 sm:px-10 rounded-xl sm:rounded-2xl bg-[#222] text-white text-[14px] sm:text-[16px] font-semibold shadow-[0_10px_24px_rgba(0,0,0,0.18)] hover:bg-[#111] active:scale-[0.98] transition-[background-color,transform]"
              >
                진단 신청하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* 모달: body로 포탈해 레이아웃/transform 영향 없이 항상 최상단 표시 */}
      {showModal &&
        typeof window !== 'undefined' &&
        document.body &&
        ReactDOM.createPortal(modalContent, document.body)}
      {!showModal && (
        <button
          type="button"
          onClick={openModal}
          className="group fixed bottom-4 right-4 sm:bottom-5 sm:right-5 lg:bottom-6 lg:right-6 z-[100000] w-12 h-12 sm:w-14 sm:h-14 lg:w-[56px] lg:h-[56px] rounded-full flex items-center justify-center border-0 p-0 bg-white shadow-[0_12px_28px_rgba(0,0,0,0.24)] hover:-translate-y-1 transition-transform duration-200 active:scale-[0.96]"
          style={{ position: 'fixed' }}
          aria-label="간편 문의하기"
        >
          <Image src="/images/logo.svg" alt="AI 진단 받기" width={36} height={36} className="w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9 object-contain" />
        </button>
      )}
      {showModal && (
        <button
          type="button"
          onClick={closeModal}
          className={`fixed bottom-4 right-4 sm:bottom-5 sm:right-5 lg:bottom-6 lg:right-6 z-[100000] w-12 h-12 sm:w-14 sm:h-14 lg:w-[56px] lg:h-[56px] rounded-full flex items-center justify-center bg-[#3d3d3d] shadow-[0_8px_18px_rgba(0,0,0,0.28)] hover:bg-[#4a4a4a] border-0 transition-[background-color,transform,opacity] duration-200 active:scale-[0.96] ${
            isClosing ? 'opacity-80' : 'opacity-100'
          }`}
          style={{ position: 'fixed' }}
          aria-label="닫기"
        >
          <Image src="/images/x%20.svg" alt="" width={20} height={20} className="w-4 h-4 sm:w-5 sm:h-5 brightness-0 invert object-contain" />
        </button>
      )}
    </>
  );
}
