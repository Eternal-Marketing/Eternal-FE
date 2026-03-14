'use client';

import Image from 'next/image';
import { useIsMobile } from '@/hooks/useIsMobile';
import ServiceIntroSection from './ServiceIntroSection';
import ServiceCTABanner from './ServiceCTABanner';
import ServiceCategoryCardsSection from './ServiceCategoryCardsSection';
import ServicePerformanceSection from './ServicePerformanceSection';
import ServicePrinciplesSection from './ServicePrinciplesSection';
import ServiceIntelligenceSection from './ServiceIntelligenceSection';
import ServiceCaseStudySection from './ServiceCaseStudySection';
import DiagnosisSection from '@/components/sections/DiagnosisSection';

export default function ServicePageClient() {
  const isMobile = useIsMobile();
  return (
    <main className="min-h-screen bg-bg text-main break-keep whitespace-normal">
      <section className="relative w-full min-h-[726px] sm:min-h-[320px] lg:h-[420px] overflow-hidden">
        <div className="absolute inset-0">
          {isMobile ? (
            <Image
              src="/images/pngs/service-mobile-png.png"
              alt=""
              fill
              className="object-contain object-top"
              sizes="100vw"
              priority
            />
          ) : (
            <>
              <Image
                src="/images/service-background.png"
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
                loading="eager"
              />
              <div className="absolute inset-0 bg-black/40" />
            </>
          )}
        </div>
        <div className="relative z-10 h-full min-h-[726px] sm:min-h-[320px] flex flex-col items-center text-center px-4 pt-16 sm:pt-16 pb-[200px] sm:pb-16 lg:pt-14 lg:pb-20 gap-6 sm:gap-0 justify-center sm:justify-start">
          <h1 className="m-0 mt-0 sm:mt-12 lg:mt-12 font-sans text-[32px] sm:text-[32px] lg:text-[40px] font-bold leading-normal text-center">
            <span className="text-[#6d94ff] block sm:inline">ETERNAL MARKETING</span>
            <span className="text-white/80 block sm:inline sm:ml-2">SERVICE</span>
          </h1>
          <Image
            src="/images/logo.svg"
            alt="Eternal Marketing Logo"
            width={80}
            height={46}
            className="w-[70px] sm:w-[80px] h-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] sm:mt-6"
          />
          <div className="font-sans text-[19px] sm:text-[17px] lg:text-[18px] leading-relaxed text-white text-center sm:mt-8 sm:px-4">
            <p className="m-0 font-sans font-extralight">각종 마케팅 너무 복잡하고 막막하신가요?</p>
            <p className="m-0 font-sans font-extralight">이터널이 제일 잘 하고 자신있는 것</p>
            <p className="m-0 font-sans font-extrabold text-[22px] sm:text-[18px] lg:text-[21px]">대표님의 기준에 맞춰 핵심만 보여드리겠습니다</p>
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-8 sm:gap-0">
        <ServiceIntroSection />
        <ServiceCTABanner />

        {/* 네이버 마케팅: 플레이스/카페/블로그/홈페이지형 블로그 4종 카드 */}
        <div className="-mt-8 sm:mt-0">
        <ServiceCategoryCardsSection
        title="NAVER MARKETING"
        titleColorClassName="text-[#02c75c]"
        categories={['Naver Place', 'Naver Cafe', 'Naver Blog', 'Homepage Brand Blog']}
        cards={[
          {
            title: 'Naver Place',
            subtitle: '네이버 플레이스',
            imageSrc: '/images/service-page/naver-1.png',
            description: '플레이스 관련\n종합 최적화 세팅,\n플레이스 순위 상승',
          },
          {
            title: 'Naver Cafe',
            subtitle: '네이버 맘카페 커뮤니티',
            imageSrc: '/images/service-page/naver-2.png',
            description: '전국/지역 중심\n신뢰 기반 후기 확산으로\n지역 내 신뢰도와 입지를\n안정적으로 구축',
          },
          {
            title: 'Naver Blog',
            subtitle: '네이버 블로그',
            imageSrc: '/images/service-page/naver-3.png',
            description: '블로그 고품질 리뷰 수 증가로\n브랜드 신뢰감 형성 및\n실제 매출 전환 유도,\n대표 키워드 세팅으로\n상위노출 보장',
          },
          {
            title: 'Homepage Brand Blog',
            subtitle: '홈페이지형 브랜드 블로그 기획',
            imageSrc: '/images/service-page/service-homepage.png',
            description: '브랜드스토리 기반\n톤앤매너로\n브랜드 계정 획일화',
          },
        ]}
      />
        </div>

      <ServicePerformanceSection />

      {/* SNS 마케팅: 인앱/숏폼/인스타/핫딜 4종 카드 */}
      <ServiceCategoryCardsSection
        title="SNS MARKETING"
        titleColorClassName="text-primary"
        categories={['In App Ads', 'Short Form Ads', 'Instagram Management', 'Hot Deal Community']}
        cards={[
          {
            title: 'In App Ads',
            subtitle: '플랫폼별 인앱 광고',
            imageSrc: '/images/service-page/sns-1.png',
            description: '각 플랫폼 별\n상위 노출 구조 설계,\n인기 콘텐츠 도달 가속화,\n계정 반응 수치 증폭 운영',
          },
          {
            title: 'Short Form Ads',
            subtitle: '숏폼 광고',
            imageSrc: '/images/service-page/sns2.png',
            description: '알고리즘에 최적화된\n숏폼 기획 및 시스템 기반\n운영으로 단기간\n최대 도달과 성과 구현',
          },
          {
            title: 'Instagram Management',
            subtitle: '인스타그램 매니지먼트',
            imageSrc: '/images/service-page/sns3.png',
            description: '인스타그램 계정 구조 종합 최적화 및\n브랜드 이미지 체계적 구축',
          },
          {
            title: 'Hot Deal Community',
            subtitle: '핫딜 커뮤니티',
            imageSrc: '/images/service-page/service-hotdeal.png',
            description: '단기간 매출을 집중적으로 끌어올리는\n실시간 이벤트형 전환 전략',
          },
        ]}
      />

      <ServicePrinciplesSection />

      <ServiceIntelligenceSection />

      <ServiceCaseStudySection />

        <DiagnosisSection />
      </div>
    </main>
  );
}

