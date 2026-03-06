'use client';

import Link from "next/link";
import Image from "next/image";

/**
 * 공통 푸터
 * - 로고, 회사 정보(대표/사업자/이메일/주소), AI·데이터 활용 고지, 서비스/법적 링크, 저작권
 */
export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative w-full z-30 bg-[#f6f6f6]"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-[40px] desktop:px-[60px] py-[40px] lg:py-[70px]">
        {/* 상단 섹션: 로고와 회사 정보 */}
        <div
          className="flex flex-col lg:flex-row lg:justify-between gap-6"
          style={{
            width: '1164px',
            maxWidth: '100%',
            margin: '0 auto',
            position: 'relative'
          }}
        >
          {/* 로고 영역 */}
          <div className="flex items-center gap-[10px] flex-shrink-0 self-start">
            <img
              src="/images/logo.svg"
              alt="ETERNAL MARKETING"
              className="w-16 h-9 sm:w-20 sm:h-12"
            />
            <div>
              <p className="m-0 font-sans text-[16px] sm:text-[18px] font-semibold leading-tight text-primary">
                ETERNAL
              </p>
              <p className="m-0 font-sans text-[16px] sm:text-[18px] font-semibold leading-tight text-primary">
                MARKETING
              </p>
            </div>
          </div>

          {/* 회사 정보 영역 (데스크탑: 오른쪽, 모바일: 아래) */}
          <div className="text-left lg:text-left mb-5 lg:ml-[200px]">
            {/* 회사명, 대표자명, 사업자등록번호, 이메일, 주소, 도메인 */}
            <div className="mb-4 font-sans text-[12px] sm:text-[13px] font-medium leading-normal text-sub1 space-y-1">
              <p className="m-0">회사명 : 이터널 마케팅 | 대표자명 : 정세훈, 이훈</p>
              <p className="m-0">사업자 등록번호 : 604-28-20699 | 이메일 : info@eternalmarketing.co.kr</p>
              <p className="m-0">주소 : 경기도 부천시 원미구 소향로13번길 14-22, 8층 802-라54호(상동, 금호프라자)</p>
              <p className="m-0">도메인: eternalmarketing.co.kr</p>
            </div>

            {/* AI 데이터 활용에 대한 안내 문구 */}
            <div>
              <h3 className="m-0 font-sans text-[11px] sm:text-[12px] font-medium leading-normal text-sub3">
                AI · 데이터 활용 고지
              </h3>
              <p className="m-0 font-sans text-[11px] sm:text-[12px] font-medium leading-normal text-sub3 leading-relaxed whitespace-pre-line">
                {`이터널마케팅의 AI 분석 결과는 마케팅 전략 수립을 위한 참고 자료로 활용되며,\n최종 판단과 실행은 전문 마케터의 검토를 통해 이루어집니다. 분석 과정에 활용되는 \n데이터는 내부 기준에 따라 관리되며,외부에 무단 제공되지 않습니다.`}
              </p>

              {/* 소셜 아이콘 (카카오톡 오픈채팅 → 인스타그램) */}
              <div className="mt-3 sm:mt-4 flex items-center gap-2">
                <a
                  href="https://open.kakao.com/me/eternalmarketing"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="카카오톡 오픈채팅"
                  className="inline-flex items-center justify-center"
                >
                  <Image src="/images/footer/kakao.svg" alt="" width={18} height={18} className="w-4 h-4 sm:w-[18px] sm:h-[18px] object-contain" />
                </a>
                <a
                  href="https://www.instagram.com/eternal__marketing?igsh=MWVhNHF2dXBiYmU0dw%3D%3D"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="inline-flex items-center justify-center"
                >
                  <Image src="/images/footer/Instagram.svg" alt="" width={24} height={24} className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
                </a>
                <a
                  href="https://blog.naver.com/eternal_marketing"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="네이버 블로그"
                  className="inline-flex items-center justify-center"
                >
                  <Image src="/images/footer/naver-blog.svg" alt="" width={24} height={24} className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 상단과 하단을 구분하는 선 */}
        <div className="w-full max-w-[1164px] mx-auto border-t border-sub1 mt-0 mb-5" />

        {/* 하단 섹션: 네비게이션 링크와 저작권 */}
        <div
          className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4"
          style={{
            width: '1164px',
            maxWidth: '100%',
            margin: '0 auto'
          }}
        >
          {/* 페이지 네비게이션 메뉴 */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6">
            <Link
              href="/about"
              className="font-sans text-[11px] sm:text-[12px] font-medium leading-normal text-main no-underline transition-colors hover:text-primary"
            >
              ABOUT
            </Link>
            <Link
              href="/column"
              className="font-sans text-[11px] sm:text-[12px] font-medium leading-normal text-main no-underline transition-colors hover:text-primary"
            >
              COLUMN
            </Link>
            <Link
              href="/service"
              className="font-sans text-[11px] sm:text-[12px] font-medium leading-normal text-main no-underline transition-colors hover:text-primary"
            >
              SERVICE
            </Link>
            <Link
              href="/admin"
              className="font-sans text-[11px] sm:text-[12px] font-medium leading-normal text-main no-underline transition-colors hover:text-primary"
            >
              ADMIN
            </Link>
            <Link
              href="/privacy"
              className="font-sans text-[11px] sm:text-[12px] font-medium leading-normal text-main no-underline transition-colors hover:text-primary"
            >
              PRIVACY
            </Link>
          </div>

          {/* 저작권 표시 */}
          <p className="m-0 font-sans text-[11px] sm:text-[12px] font-medium leading-normal text-sub1 text-center lg:text-right">
            © 2025 Eternal Marketing. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
