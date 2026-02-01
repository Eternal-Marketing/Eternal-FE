'use client';

import Link from "next/link";

/**
 * Footer - 공통 푸터 컴포넌트
 * 회사 정보, AI·데이터 활용 고지, 네비게이션 링크, 저작권 정보를 포함
 */
export default function Footer() {
  return (
    <footer 
      id="footer" 
      className="relative w-full z-30 bg-[#f6f6f6]"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-[32px] lg:px-[40px] desktop:px-[60px] py-[40px] md:py-[50px]">
        {/* 상단 섹션: 로고와 회사 정보 */}
        <div 
          className="flex flex-col md:flex-row gap-6 md:gap-10"
          style={{
            width: '1164px',
            maxWidth: '100%',
            margin: '0 auto',
            position: 'relative'
          }}
        >
          {/* 로고 영역 */}
          <div 
            className="flex items-center gap-[10px] flex-shrink-0 self-start ml-8 mt-2"
          >
            <img 
              src="/images/logo.svg" 
              alt="ETERNAL MARKETING" 
              style={{ width: '90px', height: '52px' }}
            />
            <div>
              <p 
                className="m-0 font-sans text-[18px] font-semibold leading-tight text-primary"
              >
                ETERNAL
              </p>
              <p 
                className="m-0 font-sans text-[18px] font-semibold leading-tight text-primary"
              >
                MARKETING
              </p>
            </div>
          </div>

          {/* 회사 정보 영역 (오른쪽 정렬) */}
          <div 
            style={{ 
              textAlign: 'left',
              marginBottom: '20px',
              marginLeft: 'auto'
            }}
          >
            {/* 회사명, 대표자명, 사업자등록번호, 이메일, 주소, 도메인 */}
            <div 
              className="mb-4 font-sans text-[14px] font-medium leading-normal text-sub1"
            >
              <p style={{ margin: '0 0 8px 0' }}>
                회사명 : 이터널 마케팅 | 대표자명 : 정세훈, 이훈
              </p>
              <p style={{ margin: '0 0 8px 0' }}>
                사업자 등록번호 : 604-28-20699 | 이메일 : info@eternalmarketing.co.kr
              </p>
              <p style={{ margin: '0 0 8px 0' }}>
                주소 : 경기도 부천시 원미구 소향로13번길 14-22, 8층 802-라54호(상동, 금호프라자)
              </p>
              <p style={{ margin: 0 }}>
                도메인: eternalmarketing.co.kr
              </p>
            </div>

            {/* AI 데이터 활용에 대한 안내 문구 */}
            <div>
              <h3 
                className="m-0 mb-2 font-sans text-[12px] font-medium leading-normal text-sub3"
              >
                AI · 데이터 활용 고지
              </h3>
              <p 
                className="m-0 font-sans text-[12px] font-medium leading-normal text-sub3"
              >
                이터널마케팅의 AI 분석 결과는 마케팅 전략 수립을 위한 참고 자료로 활용되며,<br />
                최종 판단과 실행은 전문 마케터의 검토를 통해 이루어집니다. 분석 과정에 활용되는<br />
                데이터는 내부 기준에 따라 관리되며, 외부에 무단 제공되지 않습니다.
              </p>

              {/* 소셜 아이콘 */}
              <div className="mt-4 flex items-center gap-2">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="inline-flex items-center justify-center"
                >
                  <img src="/images/footer/Instagram.svg" alt="" className="w-[24px] h-[24px]" />
                </a>
                <a
                  href="https://www.kakaocorp.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Kakao"
                  className="inline-flex items-center justify-center"
                >
                  <img src="/images/footer/kakao.svg" alt="" className="w-[18px] h-[18px]" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 상단과 하단을 구분하는 선 */}
        <div className="w-full max-w-[1164px] mx-auto border-t border-sub1 mt-0 mb-[20px]" />

        {/* 하단 섹션: 네비게이션 링크와 저작권 */}
        <div 
          className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0"
          style={{
            width: '1164px',
            maxWidth: '100%',
            margin: '0 auto'
          }}
        >
          {/* 페이지 네비게이션 메뉴 */}
          <div className="flex flex-wrap gap-6 md:gap-8">
            <Link
              href="/about"
              className="font-sans text-[12px] font-medium leading-normal text-main no-underline transition-colors hover:text-primary"
            >
              ABOUT
            </Link>
            <Link
              href="/#portfolio"
              className="font-sans text-[12px] font-medium leading-normal text-main no-underline transition-colors hover:text-primary"
            >
              PORTFOLIO
            </Link>
            <Link
              href="/#service"
              className="font-sans text-[12px] font-medium leading-normal text-main no-underline transition-colors hover:text-primary"
            >
              SERVICE
            </Link>
            <Link
              href="/#contact"
              className="font-sans text-[12px] font-medium leading-normal text-main no-underline transition-colors hover:text-primary"
            >
              CONTACT
            </Link>
            <Link
              href="/privacy"
              className="font-sans text-[12px] font-medium leading-normal text-main no-underline transition-colors hover:text-primary"
            >
              PRIVACY
            </Link>
          </div>

          {/* 저작권 표시 */}
          <p 
            className="m-0 font-sans text-[12px] font-medium leading-normal text-sub1 text-center"
          >
            © 2025 Eternal Marketing. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
