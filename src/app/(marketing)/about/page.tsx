import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Eternal Marketing",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-bg text-main break-keep whitespace-normal">
      {/* Hero (Figma 401:247, 401:259) */}
      <section className="relative w-full h-[483px] overflow-hidden">
        <img
          src="/images/about-page/firstimage.svg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />

        {/* Hero text */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="m-0 font-sans text-[48px] font-bold leading-normal">
            <span className="text-white/80">ABOUT</span> <span className="text-[#6d94ff]">ETERNAL MARKETING</span>
          </h1>
          <div className="mt-[28px] font-sans text-[20px] leading-normal text-white">
            <p className="m-0 font-sans font-light">마케팅을 얼마나 진지하게 다루는지,</p>
            <p className="m-0 font-sans font-light">그리고 왜 결과가 다른지</p>
            <p className="m-0 font-sans font-bold">기준에서 드러납니다</p>
          </div>
        </div>
      </section>

      {/* Our Story & Philosophy (Figma 401:252) */}
      <section className="w-full bg-[#f6f6f6]">
        <div className="w-full max-w-[1163px] mx-auto px-4 py-[120px]">
          <h2 className="m-0 font-sans text-[48px] font-bold leading-normal text-primary">Our Story &amp; Philosophy</h2>
          <div className="mt-[54px] flex flex-col lg:flex-row gap-10 items-start">
            <div className="w-full lg:w-[787px]">
              <img src="/images/about-page/ourstory.svg" alt="" className="w-full h-auto" />
            </div>
            <div className="flex-1">
              <h3 className="m-0 font-sans text-[36px] font-bold leading-normal text-main">왜 결과는 항상 같을까요?</h3>
              <div className="mt-[10px] font-sans text-[24px] leading-[50px] text-main">
                <p className="m-0">마케팅은 늘 진행되고 있었지만</p>
                <p className="m-0">정작 '왜 이걸 하는지'는 설명되지 않았습니다</p>
                <p className="m-0">실행은 많았지만</p>
                <p className="m-0">판단은 없었고,</p>
                <p className="m-0">성과는 남지 않았습니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blue statement (Figma 401:257) */}
      <section className="w-full bg-primary">
        <div className="w-full max-w-[1163px] mx-auto px-4 py-[80px] text-center">
          <p className="m-0 font-sans font-semibold leading-[60px]">
            <span className="text-white text-[48px]">이터널마케팅</span>
            <span className="text-white/80 text-[36px]">은 </span>
          </p>
          <p className="m-0 font-sans font-semibold leading-[60px]">
            <span className="text-white/80 text-[36px]">이 비효율적인 구조에 </span>
            <span className="text-white text-[48px]">질문</span>
            <span className="text-white/80 text-[36px]">을 던지는 것에서 시작했습니다</span>
          </p>
        </div>
      </section>

      {/* Why Eternal (Figma 401:269) */}
      <section className="w-full bg-bg">
        <div className="w-full max-w-[1163px] mx-auto px-4 py-[120px] relative">
          <h2 className="m-0 font-sans text-[48px] font-bold leading-normal text-main">
            <span className="text-primary">이터널</span>이 기준이 되는 이유
          </h2>
          <div className="mt-[22px] font-sans text-[24px] font-light leading-normal text-main">
            <p className="m-0">이터널은 '일단 해보는 마케팅'이 아니라 될 가능성이 있는 선택만 남기는 마케팅을 설계합니다.</p>
            <p className="m-0">성과로 검증된 데이터와 실제 운영 결과를 토대로 불필요한 시도는 배제하고, 매출로 이어질 수 있는 흐름만 구조화합니다.</p>
            <p className="m-0">그리고 그 구조는 마케팅 전용으로 설계된 인텔리전스와 현장을 완벽하게 이해하고 있는 전문 마케터의 판단을 통해 결정됩니다.</p>
          </div>

          <div className="mt-[60px] flex flex-col lg:flex-row gap-10 items-start">
            <div className="flex-1" />
            <div className="w-full lg:w-[457px] relative">
              <img src="/images/about-page/infinity.svg" alt="" className="w-full h-auto" />
              <span className="absolute top-[0px] left-[86px] text-body text-main">구조 재설계</span>
              <span className="absolute top-[0px] left-[293px] text-body text-main">세밀 분석</span>
              <span className="absolute top-[50%] left-[-44px] -translate-y-1/2 text-body text-main">최적화</span>
              <span className="absolute top-[50%] right-[-44px] -translate-y-1/2 text-body text-main">최적화</span>
              <span className="absolute bottom-[0px] left-[293px] text-body text-main">정밀 판단</span>
              <span className="absolute bottom-[0px] left-[86px] text-body text-main">고효율 실행</span>
            </div>
          </div>
        </div>
      </section>

      {/* Intelligence (Figma 401:411) */}
      <section className="relative w-full h-[824px] overflow-hidden">
        <img src="/images/about-page/puzzle-background.svg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 w-full max-w-[1163px] mx-auto px-4 h-full">
          <h2 className="m-0 pt-[245px] font-sans text-[48px] font-bold leading-normal text-white">
            마케팅의 정답을 가려내는{" "}
            <span className="bg-primary px-3 py-1">인텔리전스</span>
          </h2>

          <div className="absolute right-4 top-[339px] text-right font-sans text-[24px] leading-[40px] text-white drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
            <p className="m-0">마케팅 인텔리전스는</p>
            <p className="m-0">AI 기술 전문가와 업계 최상위 마케터가 함께 설계한</p>
            <p className="m-0">
              <span className="font-bold">결과 중심 판단 시스템</span>입니다.
            </p>
            <p className="m-0">수년간 축적된 마케팅 성과와 실패 사례,</p>
            <p className="m-0">채널별 운영 결과 데이터를 기반으로</p>
            <p className="m-0">
              대표님에게 <span className="font-bold">가장 가능성 높은 선택</span>만 도출하도록 만들어졌습니다
            </p>
          </div>
        </div>
      </section>

      {/* Our Team (Figma 401:416) - 간단 구현 */}
      <section className="w-full bg-[#f6f6f6]">
        <div className="w-full max-w-[1163px] mx-auto px-4 py-[120px]">
          <h2 className="m-0 font-sans text-[48px] font-bold leading-normal text-primary">Our Team</h2>
          <div className="mt-[14px] font-sans text-[24px] font-medium leading-[30px] text-main">
            <p className="m-0">이터널마케팅은</p>
            <p className="m-0">판단–설계–실행–관리까지</p>
            <p className="m-0">역할이 분리된 전문 조직 체계로 운영됩니다.</p>
          </div>

          <div className="mt-[60px] flex flex-col items-center">
            <div className="relative w-[250px] h-[250px] rounded-full border-[6px] border-primary flex items-center justify-center bg-white">
              <div className="w-[200px] h-[200px] rounded-full border-[6px] border-primary/30 flex items-center justify-center">
                <p className="m-0 font-sans text-[24px] font-medium text-main drop-shadow">TEAM</p>
              </div>
            </div>

            {/* 조직도(단순) */}
            <div className="mt-[40px] w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
                <div>
                  <div className="rounded-[50px] bg-white border border-black/10 px-6 py-6 text-center">
                    <p className="m-0 text-body text-main">마케팅 인텔리전스 전략 본부</p>
                  </div>
                  <div className="mt-6 space-y-3">
                    <div className="rounded-[50px] bg-primary text-white px-6 py-3 text-center text-body">
                      데이터 · AI 분석팀
                    </div>
                    <div className="rounded-[50px] bg-primary text-white px-6 py-3 text-center text-body">
                      채널 전략 설계팀
                    </div>
                  </div>
                </div>

                <div>
                  <div className="rounded-[50px] bg-white border border-black/10 px-6 py-6 text-center">
                    <p className="m-0 text-body text-main">실행 전문 조직</p>
                  </div>
                  <div className="mt-6 space-y-3">
                    <div className="rounded-[50px] bg-primary text-white px-6 py-3 text-center text-body">
                      검색 · 콘텐츠 최적화팀
                    </div>
                    <div className="rounded-[50px] bg-primary text-white px-6 py-3 text-center text-body">
                      스마트 플레이스 · 로컬 마케팅팀
                    </div>
                    <div className="rounded-[50px] bg-primary text-white px-6 py-3 text-center text-body">
                      커뮤니티 · 바이럴 전략팀
                    </div>
                    <div className="rounded-[50px] bg-primary text-white px-6 py-3 text-center text-body">
                      퍼포먼스 · 전환 최적화팀
                    </div>
                  </div>
                </div>

                <div>
                  <div className="rounded-[50px] bg-white border border-black/10 px-6 py-6 text-center">
                    <p className="m-0 text-body text-main">운영 · 관리 조직</p>
                  </div>
                  <div className="mt-6 space-y-3">
                    <div className="rounded-[50px] bg-primary text-white px-6 py-3 text-center text-body">
                      클라이언트 운영 · 성과 관리팀
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA strip (Figma 401:495) */}
      <section className="relative w-full h-[199px] overflow-hidden">
        <img
          src="/images/about-page/puzzle-background.svg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 w-full max-w-[1163px] mx-auto px-4 h-full flex items-center justify-between">
          <div className="font-sans text-white">
            <p className="m-0 text-[24px] font-semibold">정답은 이미 여기 있습니다</p>
            <p className="m-0 text-[24px] font-semibold">이제 확인만 남았습니다</p>
          </div>
          <div className="flex items-center gap-4">
            <p className="m-0 text-[20px] text-white">실시간 진단 진행 중 124 건</p>
          </div>
        </div>
      </section>
    </main>
  );
}
