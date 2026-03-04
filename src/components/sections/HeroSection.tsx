import Image from "next/image";

const circleIcon = "/images/elipse.svg";

/**
 * 홈 히어로 섹션
 * - Spline 3D 배경 + "마케팅의 기준을 다시 설계합니다" 타이틀, 서브 문구, 스크롤 화살표
 */
export default function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden z-20" data-node-id="24:6">
      <div className="absolute top-0 left-0 right-0 h-full w-full pointer-events-none z-10 overflow-hidden">
        <video
          src="/images/spline-3D.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          aria-hidden
        />
      </div>

      <div className="relative h-full flex flex-col items-center justify-center z-20 px-4">
        <div className="text-center text-inverse mt-4 sm:mt-6 lg:mt-[100px] relative z-10 max-w-[90vw]">
          <div className="absolute top-[-20px] sm:top-[-10px] left-[-6%] sm:left-[calc(50%-105px)] lg:left-[calc(50%-210px)] sm:translate-x-0 w-14 h-14 sm:w-20 sm:h-20 z-[-1] animate-pulse-slow">
            <Image
              src={circleIcon}
              alt=""
              width={86}
              height={86}
              className="w-full h-full object-contain"
              priority
              sizes="56px"
              data-node-id="42:247"
            />
          </div>

          <h1 className="text-[34px] sm:text-[44px] lg:text-[64px] font-extrabold mb-0 relative z-10 animate-fade-in-up leading-tight" data-node-id="24:14" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            마케팅의 기준을
          </h1>
          <h1 className="text-[34px] sm:text-[44px] lg:text-[64px] font-extrabold mb-3 sm:mb-4 relative z-10 animate-fade-in-up leading-tight" data-node-id="24:17" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            다시 설계합니다
          </h1>

          <div className="text-base sm:text-lg lg:text-[24px] text-inverse/80 mt-3 sm:mt-5 lg:mt-[24px] animate-fade-in-up leading-relaxed" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
            <p className="mb-1 sm:mb-2" data-node-id="24:19">마침내 탄생한 업계 최고효율의 마케팅</p>
            <p data-node-id="24:20">&ldquo;마케팅 인텔리전스 AI&rdquo;</p>
          </div>
        </div>

        <div className="absolute bottom-12 sm:bottom-16 lg:bottom-[80px] left-1/2 -translate-x-1/2 w-6 h-4 sm:w-8 sm:h-[18px] lg:w-[32px] lg:h-[18px] animate-bounce-down">
          <Image
            src="/images/arrow-down.svg"
            alt="Scroll down"
            width={32}
            height={18}
            className="w-full h-full opacity-80 object-contain"
            priority
            sizes="32px"
          />
        </div>
      </div>
    </section>
  );
}

