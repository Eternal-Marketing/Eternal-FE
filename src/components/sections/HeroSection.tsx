// 이미지 및 리소스 경로
const logoImage = "/images/logo.svg";
const circleIcon = "/images/elipse.svg";
const splineUrl = "https://my.spline.design/motiontrails-7nu0l9wGTzn5nWxGtrBcWZHT/";

/**
 * HeroSection - 메인 히어로 섹션 컴포넌트
 * 배경 3D 애니메이션, 헤더 네비게이션, 메인 타이틀을 포함
 */
export default function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden z-20" data-node-id="24:6">
      {/* 배경 3D 애니메이션 (Spline) */}
      <div className="absolute top-0 left-0 right-0 h-full w-full pointer-events-none z-10">
        <iframe
          src={splineUrl}
          className="w-full h-full border-0"
          allow="fullscreen"
          allowFullScreen
          title="Spline 3D Animation"
        />
      </div>

      {/* 헤더 - 로고 및 네비게이션 */}
      <header className="absolute top-0 left-0 right-0 z-50 border-b border-black">
        <div className="w-full max-w-[1440px] mx-auto px-4 h-[56px] flex justify-between">
          {/* 로고 영역 */}
          <div className="flex items-start animate-slide-in-left">
            <img 
              src={logoImage} 
              alt="ETERNAL MARKETING" 
              className="w-[69px] h-[40px] mt-[17px]"
            />
            <div className="ml-[9px] mt-[22px]">
              <p className="text-logo mb-0 text-[#3F6CE6]">
                ETERNAL{" "}
              </p>
              <p className="text-logo text-[#3F6CE6]">
                MARKETING
              </p>
            </div>
          </div>
          
          {/* 네비게이션 메뉴 */}
          <nav className="flex items-start">
            <a href="#about" className="nav-item nav-link-hover text-body-sm text-white hover:!text-primary mt-[29px] px-3 py-1 rounded cursor-pointer">ABOUT</a>
            <a href="#portfolio" className="nav-item nav-link-hover text-body-sm text-white hover:!text-primary ml-[41px] mt-[29px] px-3 py-1 rounded cursor-pointer">PORTFOLIO</a>
            <a href="#service" className="nav-item nav-link-hover text-body-sm text-white hover:!text-primary ml-[41px] mt-[29px] px-3 py-1 rounded cursor-pointer">SERVICE</a>
            <button className="nav-item btn-primary bg-primary text-inverse text-body-sm h-[36px] w-[105px] rounded-[15px] flex items-center justify-center ml-[54px] mt-[19px]">
              AI 진단 받기
            </button>
          </nav>
        </div>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <div className="relative h-full flex flex-col items-center justify-center z-20">
        {/* 메인 타이틀 */}
        <div className="text-center text-white mt-[200px] md:mt-[300px] lg:mt-[370px] relative z-10">
          {/* 장식용 원형 아이콘 */}
          <div className="absolute top-[-10px] left-[calc(50%-210px)] w-[86px] h-[86px] z-[-1] animate-pulse-slow">
            <img 
              src={circleIcon} 
              alt="" 
              className="w-full h-full"
              data-node-id="42:247"
            />
          </div>
          
          <h1 className="text-headline mb-0 relative z-10 animate-fade-in-up" data-node-id="24:14" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            마케팅의 기준을
          </h1>
          <h1 className="text-headline mb-4 relative z-10 animate-fade-in-up" data-node-id="24:17" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            다시 설계합니다
          </h1>
          
          {/* 서브 타이틀 */}
          <div className="text-h4 text-[#d0d7eb] mt-[20px] animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
            <p className="mb-2" data-node-id="24:19">마침내 탄생한 최적 효율의 마케팅</p>
            <p data-node-id="24:20">"마케팅 인텔리전스 AI"</p>
          </div>
        </div>
        
        {/* 스크롤 유도 화살표 */}
        <div className="absolute bottom-[80px] left-1/2 -translate-x-1/2 w-[32px] h-[18px] animate-bounce-down">
          <img 
            src="/images/arrow-down.svg" 
            alt="Scroll down" 
            className="w-full h-full opacity-80"
          />
        </div>
      </div>
    </section>
  );
}

