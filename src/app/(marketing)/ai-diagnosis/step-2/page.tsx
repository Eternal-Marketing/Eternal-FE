import type { Metadata } from "next";
import DiagnosisFormStep2 from "./DiagnosisFormStep2";

export const metadata: Metadata = {
  title: "AI 진단받기 | Eternal Marketing",
};

export default function AiDiagnosisStep2Page() {
  return (
    <main className="min-h-screen bg-bg text-main break-keep whitespace-normal">
      {/* Hero (Figma 804:563) */}
      <section className="relative w-full h-[386px] overflow-hidden">
        <img src="/images/ai-diagnosis-page/background.svg" alt="" className="absolute inset-0 w-full h-full object-cover" />

        {/* Hero text (Figma 804:638, 804:639) */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="m-0 font-sans text-[32px] font-bold leading-normal text-white">AI 진단받기</h1>
          <p className="m-0 mt-3 font-sans text-[14px] font-normal leading-normal text-white">
            무한한 가능성을 결과로 바꾸는 과정을 보여드리겠습니다.
            <br />
            이터널과 함께 가보시죠
          </p>
        </div>
      </section>

      {/* Step 2 form (Figma 804:574~) */}
      <section className="w-full max-w-[1163px] mx-auto px-4 pt-[86px] pb-[120px]">
        <h2 className="m-0 font-sans text-[20px] font-semibold leading-normal text-main">2. 기본 정보</h2>
        <div className="border-t mt-[18px]" style={{ borderColor: '#000' }} />
        <DiagnosisFormStep2 />
      </section>
    </main>
  );
}
