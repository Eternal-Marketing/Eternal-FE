import type { Metadata } from "next";
import DiagnosisFormStep1 from "./DiagnosisFormStep1";

export const metadata: Metadata = {
  title: "AI 진단받기 | Eternal Marketing",
};

export default function DiagnosisPage() {
  return (
    <main className="min-h-screen bg-bg text-main break-keep whitespace-normal">
      {/* Hero (Figma 804:641) */}
      <section className="relative w-full h-[386px] overflow-hidden">
        <img src="/images/ai-diagnosis-page/background.svg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        {/* Hero text (Figma 804:652, 804:653) */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="m-0 font-sans text-[28px] font-bold leading-normal text-white">AI 진단받기</h1>
          <p className="m-0 mt-3 font-sans text-[13px] font-normal leading-normal text-white">
            무한한 가능성을 결과로 바꾸는 과정을 보여드리겠습니다.
            <br />
            이터널과 함께 가보시죠
          </p>
        </div>
      </section>

      {/* Form (Figma 804:674) */}
      <section className="w-full max-w-[1163px] mx-auto px-4 pt-[80px] pb-[110px]">
        <h2 className="m-0 font-sans text-[20px] font-semibold leading-normal text-main">1. 고객님에 대해 알려주세요!</h2>
        <div className="border-t mt-[18px]" style={{ borderColor: '#000' }} />
        <DiagnosisFormStep1 />
      </section>
    </main>
  );
}
