import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI 진단받기 | Eternal Marketing",
};

export default function DiagnosisPage() {
  return (
    <main className="min-h-screen bg-bg text-main break-keep whitespace-normal">
      {/* Hero (Figma 804:641) */}
      <section className="relative w-full h-[386px] overflow-hidden">
        <img src="/images/ai-diagnosis-page/background.svg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />

        {/* Hero text (Figma 804:652, 804:653) */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="m-0 font-sans text-[36px] font-bold leading-normal text-white">AI 진단받기</h1>
          <p className="m-0 mt-3 font-sans text-[16px] font-normal leading-normal text-white">
            무한한 가능성을 결과로 바꾸는 과정을 보여드리겠습니다.
            <br />
            이터널과 함께 가보시죠
          </p>
        </div>
      </section>

      {/* Form (Figma 804:674) */}
      <section className="w-full max-w-[1163px] mx-auto px-4 pt-[80px] pb-[110px]">
        <h2 className="m-0 font-sans text-[24px] font-semibold leading-normal text-main">1. 고객님에 대해 알려주세요!</h2>
        <div className="border-t border-sub3 mt-[18px]" />

        <form className="mt-[18px] space-y-5">
          {/* 업체명 */}
          <div className="py-5 border-b border-sub3">
            <label className="block font-sans text-[20px] font-medium text-main">업체명</label>
            <input
              type="text"
              placeholder="내용 작성해 주세요."
              className="mt-4 w-[261px] h-[42px] px-[18px] border border-sub2/60 outline-none text-[16px] text-main placeholder:text-sub3"
            />
          </div>

          {/* 업종 */}
          <div className="py-5 border-b border-sub3">
            <p className="m-0 font-sans text-[20px] font-medium text-main">업종</p>
            <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
              {["음식점", "병원·의원", "학원·교육", "뷰티·헬스", "쇼핑몰", "서비스업", "기타 (직접 입력)"].map((label, idx) => (
                <label key={idx} className="flex items-center gap-2 text-[14px] text-main">
                  <input type="radio" name="industry" className="w-5 h-5 accent-primary" defaultChecked={idx === 0} />
                  <span className={idx === 0 ? "font-medium" : "font-light"}>{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 현재 가장 고민되는 영역 */}
          <div className="py-5 border-b border-sub3">
            <p className="m-0 font-sans text-[20px] font-medium text-main">현재 가장 고민되는 영역 (최대 2개 선택)</p>
            <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
              {["매출 증가", "고객 유입", "브랜드 인지도", "효율 분석 / 마케팅 방향성 점검"].map((label, idx) => (
                <label key={idx} className="flex items-center gap-2 text-[14px] text-main">
                  <input type="checkbox" className="w-5 h-5 accent-primary" defaultChecked={idx === 0} />
                  <span className={idx === 0 ? "font-medium" : "font-light"}>{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 현재 마케팅 진행 상태 */}
          <div className="py-5 border-b border-sub3">
            <p className="m-0 font-sans text-[20px] font-medium text-main">현재 마케팅 진행 상태</p>
            <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
              {[
                "현재 별도의 마케팅을 진행하고 있지 않음",
                "내부에서 간단히 진행 중",
                "외주 또는 대행사를 이용 중",
                "과거에 진행했으나 중단한 상태",
              ].map((label, idx) => (
                <label key={idx} className="flex items-center gap-2 text-[14px] text-main">
                  <input type="radio" name="status" className="w-5 h-5 accent-primary" defaultChecked={idx === 0} />
                  <span className={idx === 0 ? "font-medium" : "font-light"}>{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 관심 채널 */}
          <div className="py-5 border-b border-sub3">
            <p className="m-0 font-sans text-[20px] font-medium text-main">관심 있는 마케팅 채널 (복수 선택 가능)</p>
            <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
              {[
                "네이버 블로그(기자단 체험단)",
                "네이버 카페 / 커뮤니티",
                "네이버 스마트플레이스",
                "인스타그램",
                "유튜브",
                "플랫폼별 숏폼 광고",
                "기타 (자유 기재)",
              ].map((label, idx) => (
                <label key={idx} className="flex items-center gap-2 text-[14px] text-main">
                  <input type="checkbox" className="w-5 h-5 accent-primary" defaultChecked={idx === 0} />
                  <span className={idx === 0 ? "font-medium" : "font-light"}>{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 추가 사항 */}
          <div className="py-5 border-b border-sub3">
            <p className="m-0 font-sans text-[20px] font-medium text-main">
              추가로 공유하고 싶은 사항이 있다면 자유롭게 작성해주세요.
            </p>
            <textarea
              placeholder="(현재 상황, 궁금한 점, 기대하는 방향 등)"
              className="mt-4 w-full h-[153px] px-[18px] py-[9px] border border-sub2/60 outline-none text-[16px] text-main placeholder:text-sub3 resize-none"
            />
          </div>

          <div className="pt-[30px] flex justify-center">
            <Link
              href="/ai-diagnosis/step-2"
              className="h-[44px] px-[37px] bg-primary text-white text-[16px] font-medium flex items-center justify-center no-underline"
            >
              다음 단계로
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
