const circleIcon = "/images/elipse.svg";
const splineUrl = "https://my.spline.design/motiontrails-7nu0l9wGTzn5nWxGtrBcWZHT/";

/**
 * 홈 히어로 섹션
 * - Spline 3D 배경 + "마케팅의 기준을 다시 설계합니다" 타이틀, 서브 문구, 스크롤 화살표
 */
export default function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden z-20" data-node-id="24:6">
      <div className="absolute top-0 left-0 right-0 h-full w-full pointer-events-none z-10">
        <iframe
          src={splineUrl}
          className="w-full h-full border-0"
          allow="fullscreen"
          allowFullScreen
          title="Spline 3D Animation"
        />
      </div>

      <div className="relative h-full flex flex-col items-center justify-center z-20">
        <div className="text-center text-inverse mt-[20px] md:mt-[60px] lg:mt-[100px] relative z-10">
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

