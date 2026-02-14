import type { Metadata } from "next";
import Image from "next/image";
import DiagnosisFormStep2 from "./DiagnosisFormStep2";

/**
 * AI 진단 2단계 페이지 (/ai-diagnosis/step-2)
 * - 히어로 + "기본 정보" 폼(지역, 연락처, 이메일, 상담 희망 시간대)
 */
export const metadata: Metadata = {
  title: "AI 진단받기 | Eternal Marketing",
};

export default function AiDiagnosisStep2Page() {
  return (
    <main className="min-h-screen bg-bg text-main break-keep whitespace-normal">
      <section className="relative w-full min-h-[240px] sm:min-h-[280px] md:h-[340px] lg:h-[386px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/ai-diagnosis-page/background.svg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        <div className="relative z-10 h-full min-h-[240px] sm:min-h-[280px] md:min-h-0 flex flex-col items-center justify-center text-center px-4 py-10 sm:py-14">
          <h1 className="m-0 font-sans text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-normal text-white">AI 진단받기</h1>
          <p className="m-0 mt-2 sm:mt-3 font-sans text-[12px] sm:text-[14px] font-normal leading-normal text-white">
            무한한 가능성을 결과로 바꾸는 과정을 보여드리겠습니다.
            <br />
            이터널과 함께 가보시죠
          </p>
        </div>
      </section>

      <section className="w-full max-w-[1163px] mx-auto px-4 sm:px-6 md:px-8 pt-8 sm:pt-12 md:pt-16 lg:pt-[86px] pb-12 sm:pb-16 md:pb-20 lg:pb-[120px]">
        <h2 className="m-0 font-sans text-[16px] sm:text-[18px] md:text-[20px] font-semibold leading-normal text-main">2. 기본 정보</h2>
        <div className="border-t mt-[18px]" style={{ borderColor: '#000' }} />
        <DiagnosisFormStep2 />
      </section>
    </main>
  );
}
