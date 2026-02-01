import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI 진단받기 | Eternal Marketing",
};

export default function AiDiagnosisStep2Page() {
  return (
    <main className="min-h-screen bg-bg text-main break-keep whitespace-normal">
      {/* Hero (Figma 804:563) */}
      <section className="relative w-full h-[386px] overflow-hidden">
        <img src="/images/ai-diagnosis-page/background.svg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />

        {/* Hero text (Figma 804:638, 804:639) */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="m-0 font-sans text-[36px] font-bold leading-normal text-white">AI 진단받기</h1>
          <p className="m-0 mt-3 font-sans text-[16px] font-normal leading-normal text-white">
            무한한 가능성을 결과로 바꾸는 과정을 보여드리겠습니다.
            <br />
            이터널과 함께 가보시죠
          </p>
        </div>
      </section>

      {/* Step 2 form (Figma 804:574~) */}
      <section className="w-full max-w-[1163px] mx-auto px-4 pt-[86px] pb-[120px]">
        <h2 className="m-0 font-sans text-[24px] font-semibold leading-normal text-main">2. 기본 정보</h2>
        <div className="border-t border-sub3 mt-[18px]" />

        <form className="mt-[22px]">
          {/* 지역* */}
          <div className="py-5 border-b border-sub3">
            <label className="block font-sans text-[20px] font-medium text-main">
              지역<span className="text-[#ff3434]">*</span>
            </label>
            <input
              type="text"
              placeholder="예시 : 강남구 역삼동"
              className="mt-4 w-[261px] h-[42px] px-[18px] border border-sub2/60 outline-none text-[16px] text-main placeholder:text-sub3"
            />
          </div>

          {/* 연락처* */}
          <div className="py-5 border-b border-sub3">
            <label className="block font-sans text-[20px] font-medium text-main">
              연락처<span className="text-[#ff3434]">*</span>
            </label>
            <input
              type="tel"
              placeholder="01012341234('-'는 제외하고 작성해 주세요)"
              className="mt-4 w-[362px] max-w-full h-[42px] px-[18px] border border-sub2/60 outline-none text-[16px] text-main placeholder:text-sub3"
            />
          </div>

          {/* 이메일 */}
          <div className="py-5 border-b border-sub3">
            <label className="block font-sans text-[20px] font-medium text-main">이메일</label>
            <input
              type="email"
              placeholder="info@eternalmarketing.co.kr"
              className="mt-4 w-[362px] max-w-full h-[42px] px-[18px] border border-sub2/60 outline-none text-[16px] text-main placeholder:text-sub3"
            />
          </div>

          {/* 연락 가능 시간대 */}
          <div className="py-5 border-b border-sub3">
            <p className="m-0 font-sans text-[20px] font-medium text-main">연락 가능 시간대 (복수 선택 가능)</p>
            <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
              {["09:00~12:00", "12:00~15:00", "15:00~18:00", "18:00~00:00", "무관", "특정시간대(직접 입력)"].map(
                (label, idx) => (
                  <label key={idx} className="flex items-center gap-2 text-[14px] text-main">
                    <input type="checkbox" className="w-5 h-5 accent-primary" defaultChecked={idx === 0} />
                    <span className="font-light">{label}</span>
                  </label>
                ),
              )}
            </div>
          </div>

          <div className="pt-[54px] flex flex-col items-center">
            <p className="m-0 font-sans text-[14px] font-normal leading-normal text-sub1 text-center">
              AI 마케팅 인텔리전스가 1차 분석을 진행하며,
              <br />
              세부 전략과 실행 범위는 전문마케터와의 상담을 통해 함께 설계됩니다.
            </p>

            <button
              type="button"
              className="mt-[34px] h-[44px] w-[139px] bg-[#2b2b2b] text-white text-[16px] font-medium"
            >
              진단 신청하기
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
