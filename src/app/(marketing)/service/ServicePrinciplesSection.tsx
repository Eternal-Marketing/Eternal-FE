'use client';
/**
 * 운영 원칙 섹션
 * - 연한 보라 배경 스트립 안에 4열: 약정 없음 / 경쟁분석 / 키워드 AI / 브랜드 DNA
 * - 각 항목: 원형 아이콘 + 제목 + 설명
 */

function CircleIcon({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[190px] md:h-[190px] rounded-full border border-primary/30 bg-white flex items-center justify-center flex-shrink-0">
      <div className="w-[88px] h-[88px] sm:w-[110px] sm:h-[110px] md:w-[140px] md:h-[140px] rounded-full border border-primary/15 bg-white flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

function SimpleIcon({ name }: { name: 'headphones' | 'avatar' | 'key' | 'dna' }) {
  const common = 'w-7 h-7 sm:w-9 sm:h-9 md:w-[42px] md:h-[42px] text-primary';
  switch (name) {
    case 'headphones':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 12a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M4 12v6a2 2 0 0 0 2 2h1v-8H6a2 2 0 0 0-2 2Z" stroke="currentColor" strokeWidth="2" />
          <path d="M20 12v6a2 2 0 0 1-2 2h-1v-8h1a2 2 0 0 1 2 2Z" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case 'avatar':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" stroke="currentColor" strokeWidth="2" />
          <path d="M4 20a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'key':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M10 14a4 4 0 1 1 2.6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M14 10l8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M18 10v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M20 10v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'dna':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M8 3c0 6 8 6 8 12s-8 6-8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M16 3c0 6-8 6-8 12s8 6 8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M9 9h6M9 15h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
  }
}

export default function ServicePrinciplesSection() {
  return (
    <section className="bg-white w-full">
      <div className="w-full max-w-[1163px] mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-[90px]">
        <h2 className="m-0 font-sans text-[22px] sm:text-[26px] md:text-[32px] font-semibold leading-normal text-center text-main">
          마케팅의 새로운 기준, 기본부터 다릅니다.
        </h2>

        {/* 연한 보라 스트립 + 4열 원칙 카드 */}
        <div className="mt-6 sm:mt-8 md:mt-10 bg-[#e7ebff] py-8 sm:py-10">
          <div className="w-full max-w-[1163px] mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 items-start justify-items-center">
            <div className="text-center max-w-[280px] md:max-w-none mx-auto md:mx-0">
              <CircleIcon>
                <SimpleIcon name="headphones" />
              </CircleIcon>
              <p className="m-0 mt-4 sm:mt-6 font-sans text-[14px] sm:text-[16px] font-semibold text-sub1">
                모든 계약, 약정 없는 운영 원칙
              </p>
              <p className="m-0 mt-2 sm:mt-3 font-sans text-[12px] sm:text-[13px] font-light text-sub2 leading-relaxed">
                상품·기간 등 모든 진행 과정에서
                <br />
                고객을 계약 조건으로 제한하지 않습니다
              </p>
            </div>

            <div className="text-center max-w-[280px] md:max-w-none mx-auto md:mx-0">
              <CircleIcon>
                <SimpleIcon name="avatar" />
              </CircleIcon>
              <p className="m-0 mt-4 sm:mt-6 font-sans text-[14px] sm:text-[16px] font-semibold text-sub1">
                경쟁 분석부터 대응까지, 하나의 시스템으로
              </p>
              <p className="m-0 mt-2 sm:mt-3 font-sans text-[12px] sm:text-[13px] font-light text-sub2 leading-relaxed">
                시장과 경쟁사 흐름을 실시간으로
                <br />
                분석하고 상황별 대응 전략을 수립해
                <br />
                성과 변화를 리포트로 체계화합니다
              </p>
            </div>

            <div className="text-center max-w-[280px] md:max-w-none mx-auto md:mx-0">
              <CircleIcon>
                <SimpleIcon name="key" />
              </CircleIcon>
              <p className="m-0 mt-4 sm:mt-6 font-sans text-[14px] sm:text-[16px] font-semibold text-sub1">
                최고 효율을 설계하는 정답 키워드 AI 세팅
              </p>
              <p className="m-0 mt-3 font-sans text-[13px] font-light text-sub2 leading-relaxed">
                모든 플랫폼의 타겟별 알고리즘을
                <br />
                상시 분석·해석해 성과 가능성이
                <br />
                검증된 핵심 키워드를 선별하고
                <br />
                각 채널에 최적화된 구조로 적용합니다
              </p>
            </div>

            <div className="text-center">
              <CircleIcon>
                <SimpleIcon name="dna" />
              </CircleIcon>
              <p className="m-0 mt-6 font-sans text-[16px] font-semibold text-sub1">
                브랜드 DNA 정밀 파악
              </p>
              <p className="m-0 mt-2 sm:mt-3 font-sans text-[12px] sm:text-[13px] font-light text-sub2 leading-relaxed">
                브랜드의 정체성과 스토리, 시장의 위치,
                <br />
                대표님의 목표를 실행 이전에 먼저
                <br />
                완벽히 판단하고 설계합니다
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

