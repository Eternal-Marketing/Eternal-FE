'use client';

/**
 * FooterSection - 푸터 섹션 컴포넌트
 * 회사 정보, AI·데이터 활용 고지, 네비게이션 링크, 저작권 정보를 포함
 * 구분선을 기준으로 상단(로고 및 회사 정보)과 하단(네비게이션 및 저작권)으로 구분
 */
export default function FooterSection() {
  return (
    <footer 
      id="footer" 
      className="relative w-full z-30" 
      style={{ 
        backgroundColor: '#F5F5F5',
        width: '100%'
      }}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-[32px] lg:px-[40px] desktop:px-[60px] py-[60px] md:py-[80px]">
        {/* 상단 섹션: 로고와 회사 정보 */}
        <div 
          className="flex flex-col md:flex-row gap-8 md:gap-12"
          style={{
            width: '1164px',
            maxWidth: '100%',
            margin: '0 auto',
            position: 'relative'
          }}
        >
          {/* 로고 영역 */}
          <div 
            className="flex items-start gap-[9px] flex-shrink-0"
            style={{
              marginBottom: '181px'
            }}
          >
            <img 
              src="/images/logo.svg" 
              alt="ETERNAL MARKETING" 
              style={{ width: '97px', height: '56px' }}
            />
            <div>
              <p 
                style={{
                  color: '#3F6CE6',
                  fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  lineHeight: 'normal',
                  margin: 0
                }}
              >
                ETERNAL
              </p>
              <p 
                style={{
                  color: '#3F6CE6',
                  fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  lineHeight: 'normal',
                  margin: 0
                }}
              >
                MARKETING
              </p>
            </div>
          </div>

          {/* 회사 정보 영역 (오른쪽 정렬) */}
          <div 
            style={{ 
              textAlign: 'left',
              marginBottom: '41px',
              marginLeft: 'auto'
            }}
          >
            {/* 회사명, 대표자명, 사업자등록번호, 이메일, 주소, 도메인 */}
            <div 
              style={{
                color: '#505050',
                fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
                marginBottom: '24px'
              }}
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
                style={{
                  color: '#999',
                  fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                  fontSize: '12px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
                  margin: '0 0 8px 0'
                }}
              >
                AI · 데이터 활용 고지
              </h3>
              <p 
                style={{
                  color: '#999',
                  fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                  fontSize: '12px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
                  margin: 0
                }}
              >
                이터널마케팅의 AI 분석 결과는 마케팅 전략 수립을 위한 참고 자료로 활용되며,<br />
                최종 판단과 실행은 전문 마케터의 검토를 통해 이루어집니다. 분석 과정에 활용되는<br />
                데이터는 내부 기준에 따라 관리되며, 외부에 무단 제공되지 않습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 상단과 하단을 구분하는 선 */}
        <div 
          style={{
            width: '1164px',
            maxWidth: '100%',
            height: '1px',
            backgroundColor: '#D0D0D0',
            margin: '0 auto 34px auto'
          }}
        />

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
            <a 
              href="#about" 
              style={{
                color: '#000',
                fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                fontSize: '12px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#3F6CE6'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#000'}
            >
              ABOUT
            </a>
            <a 
              href="#portfolio" 
              style={{
                color: '#000',
                fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                fontSize: '12px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#3F6CE6'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#000'}
            >
              PORTFOLIO
            </a>
            <a 
              href="#service" 
              style={{
                color: '#000',
                fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                fontSize: '12px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#3F6CE6'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#000'}
            >
              SERVICE
            </a>
            <a 
              href="#contact" 
              style={{
                color: '#000',
                fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                fontSize: '12px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#3F6CE6'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#000'}
            >
              CONTACT
            </a>
            <a 
              href="#privacy" 
              style={{
                color: '#000',
                fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                fontSize: '12px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#3F6CE6'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#000'}
            >
              PRIVACY
            </a>
          </div>

          {/* 저작권 표시 */}
          <p 
            style={{
              color: '#505050',
              textAlign: 'center',
              fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
              fontSize: '12px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: 'normal',
              margin: 0
            }}
          >
            © 2025 Eternal Marketing. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
