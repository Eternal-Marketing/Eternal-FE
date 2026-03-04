'use client';
/**
 * AI 진단 1단계 폼
 * - 업체명(필수), 업종, 고민 영역(최대 2개), 마케팅 진행 상황, 관심 채널, 추가 공유
 * - 다음 클릭 시 sessionStorage 저장 후 /ai-diagnosis/step-2 이동
 */
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { saveStep1Data } from './diagnosisFormStorage';
import { CONCERN_LABELS } from './subscriptionMappings';

const MAX_CONCERN_SELECT = 2;

const INDUSTRY_LABELS = ['음식점', '병원·의원', '학원·교육', '뷰티·헬스', '쇼핑몰', '서비스업', '기타 (직접 입력)'];
const STATUS_LABELS = [
  '현재 별도의 마케팅을 진행하고 있지 않음',
  '내부에서 간단히 진행 중',
  '외주 또는 대행사를 이용 중',
  '과거에 진행했으나 중단한 상태',
];
const CHANNEL_LABELS = [
  '네이버 블로그(기자단 체험단)',
  '네이버 카페 / 커뮤니티',
  '네이버 스마트플레이스',
  '인스타그램',
  '유튜브',
  '플랫폼별 숏폼 광고',
  '기타 (자유 기재)',
];

export default function DiagnosisFormStep1() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState('');
  const [industryIndex, setIndustryIndex] = useState(0);
  const [industryOther, setIndustryOther] = useState('');
  const [concernSelected, setConcernSelected] = useState<boolean[]>(() =>
    [...CONCERN_LABELS].map((_, i) => i === 0)
  );
  const [statusIndex, setStatusIndex] = useState(0);
  const [channelSelected, setChannelSelected] = useState<boolean[]>(() => CHANNEL_LABELS.map((_, i) => i === 0));
  const [channelsOther, setChannelsOther] = useState('');
  const [message, setMessage] = useState('');
  const [toast, setToast] = useState<{ show: boolean; message: string }>({ show: false, message: '' });

  const handleConcernChange = useCallback((idx: number) => {
    setConcernSelected((prev) => {
      const next = [...prev];
      const willBeChecked = !next[idx];
      const selectedCount = next.filter(Boolean).length;
      if (willBeChecked && selectedCount >= MAX_CONCERN_SELECT) return prev;
      next[idx] = willBeChecked;
      return next;
    });
  }, []);

  const showToast = useCallback((message: string) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  }, []);

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    const trimmedCompanyName = companyName.trim();
    if (!trimmedCompanyName) {
      showToast('필수 항목을 모두 입력해 주세요.');
      return;
    }
    const concerns = CONCERN_LABELS.filter((_, i) => concernSelected[i]);
    const interestedChannels = CHANNEL_LABELS.filter((_, i) => channelSelected[i]);
    saveStep1Data({
      companyName: trimmedCompanyName,
      industry: INDUSTRY_LABELS[industryIndex] ?? '',
      industryOther: industryIndex === 6 ? industryOther : '',
      concerns,
      marketingStatus: STATUS_LABELS[statusIndex] ?? '',
      interestedChannels,
      channelsOther: channelSelected[6] ? channelsOther : '',
      message,
    });
    router.push('/ai-diagnosis/step-2');
  };

  return (
    <>
      <form className="mt-4 sm:mt-[18px] space-y-4 sm:space-y-5" onSubmit={(e) => e.preventDefault()}>
        {/* 업체명 */}
        <div className="py-4 sm:py-5 border-b border-divider">
          <label className="block font-sans text-[16px] sm:text-[18px] font-medium text-main">
            업체명 <span className="font-normal text-[12px] sm:text-[13px] text-sub3">(기업의 경우 담당자 직책과 성함을 함께 기입해 주세요)</span>
          </label>
          <input
            type="text"
            placeholder="내용 작성해 주세요."
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="mt-3 sm:mt-4 w-full max-w-[261px] h-10 sm:h-[42px] px-3 sm:px-[18px] border outline-none text-[13px] sm:text-[14px] text-main placeholder:text-sub3 bg-white"
            style={{ borderColor: 'rgba(153, 153, 153, 0.3)' }}
          />
        </div>

        {/* 업종 */}
        <div className="py-4 sm:py-5 border-b border-divider">
          <p className="m-0 font-sans text-[16px] sm:text-[18px] font-medium text-main">업종</p>
          <div className="mt-3 sm:mt-4 flex flex-wrap gap-x-4 sm:gap-x-8 gap-y-3">
            {INDUSTRY_LABELS.map((label, idx) => (
              <label key={idx} className="flex items-center gap-2 text-[12px] sm:text-[13px] text-main">
                <input
                  type="radio"
                  name="industry"
                  className="w-4 h-4 sm:w-5 sm:h-5 accent-primary flex-shrink-0"
                  checked={industryIndex === idx}
                  onChange={() => setIndustryIndex(idx)}
                />
                <span className={industryIndex === idx ? 'font-medium' : 'font-light'}>{label}</span>
              </label>
            ))}
          </div>
          {industryIndex === 6 && (
            <input
              type="text"
              placeholder="업종을 입력해 주세요"
              value={industryOther}
              onChange={(e) => setIndustryOther(e.target.value)}
              className="mt-3 w-full max-w-[261px] h-10 px-3 border outline-none text-[13px] text-main placeholder:text-sub3 bg-white"
              style={{ borderColor: 'rgba(153, 153, 153, 0.3)' }}
            />
          )}
        </div>

        {/* 현재 가장 고민되는 영역 (최대 2개) */}
        <div className="py-4 sm:py-5 border-b border-divider">
          <p className="m-0 font-sans text-[16px] sm:text-[18px] font-medium text-main">현재 가장 고민되는 영역 (최대 2개 선택)</p>
          <div className="mt-3 sm:mt-4 flex flex-wrap gap-x-4 sm:gap-x-8 gap-y-3">
            {CONCERN_LABELS.map((label, idx) => (
              <label key={idx} className="flex items-center gap-2 text-[12px] sm:text-[13px] text-main">
                <input
                  type="checkbox"
                  className="w-4 h-4 sm:w-5 sm:h-5 accent-primary flex-shrink-0"
                  checked={concernSelected[idx]}
                  onChange={() => handleConcernChange(idx)}
                />
                <span className={concernSelected[idx] ? "font-medium" : "font-light"}>{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 현재 마케팅 진행 상태 */}
        <div className="py-4 sm:py-5 border-b border-divider">
          <p className="m-0 font-sans text-[16px] sm:text-[18px] font-medium text-main">현재 마케팅 진행 상태</p>
          <div className="mt-3 sm:mt-4 flex flex-wrap gap-x-4 sm:gap-x-8 gap-y-3">
            {STATUS_LABELS.map((label, idx) => (
              <label key={idx} className="flex items-center gap-2 text-[12px] sm:text-[13px] text-main">
                <input
                  type="radio"
                  name="status"
                  className="w-4 h-4 sm:w-5 sm:h-5 accent-primary flex-shrink-0"
                  checked={statusIndex === idx}
                  onChange={() => setStatusIndex(idx)}
                />
                <span className={statusIndex === idx ? 'font-medium' : 'font-light'}>{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 관심 채널 */}
        <div className="py-4 sm:py-5 border-b border-divider">
          <p className="m-0 font-sans text-[16px] sm:text-[18px] font-medium text-main">관심 있는 마케팅 채널 (복수 선택 가능)</p>
          <div className="mt-3 sm:mt-4 flex flex-wrap gap-x-4 sm:gap-x-8 gap-y-3">
            {CHANNEL_LABELS.map((label, idx) => (
              <label key={idx} className="flex items-center gap-2 text-[12px] sm:text-[13px] text-main">
                <input
                  type="checkbox"
                  className="w-4 h-4 sm:w-5 sm:h-5 accent-primary flex-shrink-0"
                  checked={channelSelected[idx]}
                  onChange={() => setChannelSelected((p) => { const n = [...p]; n[idx] = !n[idx]; return n; })}
                />
                <span className={channelSelected[idx] ? 'font-medium' : 'font-light'}>{label}</span>
              </label>
            ))}
          </div>
          {channelSelected[6] && (
            <input
              type="text"
              placeholder="관심 채널을 입력해 주세요"
              value={channelsOther}
              onChange={(e) => setChannelsOther(e.target.value)}
              className="mt-3 w-full max-w-[261px] h-10 px-3 border outline-none text-[13px] text-main placeholder:text-sub3 bg-white"
              style={{ borderColor: 'rgba(153, 153, 153, 0.3)' }}
            />
          )}
        </div>

        {/* 추가 사항 */}
        <div className="py-4 sm:py-5 border-b border-divider">
          <p className="m-0 font-sans text-[16px] sm:text-[18px] font-medium text-main">
            추가로 공유하고 싶은 사항이 있다면 자유롭게 작성해주세요.
          </p>
          <textarea
            placeholder="(현재 상황, 궁금한 점, 기대하는 방향 등)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-3 sm:mt-4 w-full min-h-[120px] sm:min-h-[153px] h-[120px] sm:h-[153px] px-3 sm:px-[18px] py-2 sm:py-[9px] border outline-none text-[13px] sm:text-[14px] text-main placeholder:text-sub3 resize-none bg-white"
            style={{ borderColor: 'rgba(153, 153, 153, 0.3)' }}
          />
        </div>

        <div className="pt-6 sm:pt-[30px] flex justify-center">
          <button
            type="button"
            onClick={handleNext}
            className="h-10 sm:h-[44px] px-6 sm:px-[37px] bg-primary text-white text-[13px] sm:text-[14px] font-medium flex items-center justify-center no-underline cursor-pointer border-0 rounded-sm"
          >
            다음 단계로
          </button>
        </div>
      </form>

      {/* 토스트 */}
      {toast.show && (
        <div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-lg bg-main text-inverse text-[14px] font-medium shadow-lg transition-opacity duration-200"
          role="alert"
        >
          {toast.message}
        </div>
      )}
    </>
  );
}
