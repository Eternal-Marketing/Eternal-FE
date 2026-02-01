const circleIcon = "/images/elipse.svg";
const splineUrl = "https://my.spline.design/motiontrails-7nu0l9wGTzn5nWxGtrBcWZHT/";

/**
 * HeroSection - 메인 히어로 섹션 컴포넌트
 * 배경 3D 애니메이션과 메인 타이틀을 포함 (헤더는 layout에서 처리)
 */
export default function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden z-20" data-node-id="24:6">
      {/* 배경 3D 애니메이션 */}
      <div className="absolute top-0 left-0 right-0 h-full w-full pointer-events-none z-10">
        <iframe
          src={splineUrl}
          className="w-full h-full border-0"
          allow="fullscreen"
          allowFullScreen
          title="Spline 3D Animation"
        />
      </div>

      {/* 메인 콘텐츠: 타이틀과 서브 타이틀 */}
      <div className="relative h-full flex flex-col items-center justify-center z-20">
        {/* 메인 타이틀 영역 */}
        <div className="text-center text-inverse mt-[20px] md:mt-[60px] lg:mt-[100px] relative z-10">
          {/* 타이틀 위 장식용 원형 아이콘 */}
          <div className="absolute top-[-10px] left-[calc(50%-210px)] w-[86px] h-[86px] z-[-1] animate-pulse-slow">
            <img 
              src={circleIcon} 
              alt="" 
              className="w-full h-full"
              data-node-id="42:247"
            />
          </div>
          
          <h1 className="text-[52px] font-extrabold mb-0 relative z-10 animate-fade-in-up" data-node-id="24:14" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            마케팅의 기준을
          </h1>
          <h1 className="text-[52px] font-extrabold mb-4 relative z-10 animate-fade-in-up" data-node-id="24:17" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            다시 설계합니다
          </h1>
          
          {/* 서브 타이틀: 마케팅 인텔리전스 AI 설명 */}
          <div className="text-h4 text-inverse/80 mt-[20px] animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
            <p className="mb-2" data-node-id="24:19">마침내 탄생한 최적 효율의 마케팅</p>
            <p data-node-id="24:20">&ldquo;마케팅 인텔리전스 AI&rdquo;</p>
          </div>
        </div>
        
        {/* 하단 스크롤 안내 화살표 */}
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

