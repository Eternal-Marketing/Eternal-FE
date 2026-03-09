'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { ComponentType, SVGProps } from 'react';
import {
  ChatBubbleOvalLeftEllipsisIcon,
  DocumentArrowDownIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';

type CTAItem = {
  href: string;
  label: string;
  ariaLabel: string;
  bgClassName: string;
  external: boolean;
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
  imageSrc?: string;
};

const CTA_ITEMS: CTAItem[] = [
  {
    href: 'https://open.kakao.com/me/eternalmarketing',
    label: '실시간 상담',
    ariaLabel: '카카오톡 실시간 상담',
    bgClassName:
      'border border-[#D6C85A]/45 bg-gradient-to-br from-[#F7F0A6] via-[#F0E47B] to-[#E4D45E] text-[#2E2A27]',
    Icon: ChatBubbleOvalLeftEllipsisIcon,
    external: true,
  },
  {
    href: 'https://www.instagram.com/eternal__marketing?igsh=MWVhNHF2dXBiYmU0dw%3D%3D',
    label: '인스타그램',
    ariaLabel: '인스타그램',
    bgClassName:
      'border border-white/20 bg-gradient-to-br from-[#E2A2A6] via-[#C982B4] to-[#7B73C9] text-white',
    imageSrc: '/cta-instagram.svg',
    external: true,
  },
  {
    href: '/company-profile.pdf',
    label: '회사소개서',
    ariaLabel: '회사소개서',
    bgClassName:
      'border border-white/20 bg-gradient-to-br from-[#9EB4F7] via-[#6C89E8] to-[#3F63C9] text-white',
    Icon: DocumentArrowDownIcon,
    external: false,
  },
] as const;

/**
 * 플로팅 CTA
 * - 기본 원형 버튼 유지
 * - 클릭 시 서브 CTA가 위로 펼쳐짐
 */
export default function FloatingCTA() {
  const [isOpen, setIsOpen] = useState(false);
  const staggerDelay = 70;
  const closeContainerDelay = (CTA_ITEMS.length - 1) * staggerDelay;

  return (
    <div className="fixed bottom-10 right-3 z-[100000] sm:bottom-12 sm:right-8 lg:bottom-16 lg:right-10">
      <div className="flex flex-col items-center gap-3">
        <div
          className={`flex flex-col items-center gap-3 rounded-[32px] border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.24),rgba(255,255,255,0.12))] p-3 shadow-[0_22px_50px_rgba(7,16,40,0.32)] backdrop-blur-xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isOpen
              ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
              : 'pointer-events-none translate-y-2 scale-95 opacity-0'
          }`}
          style={{ transitionDelay: isOpen ? '0ms' : `${closeContainerDelay}ms` }}
        >
          {CTA_ITEMS.map(({ href, label, ariaLabel, bgClassName, Icon, imageSrc, external }, index) => (
            <a
              key={label}
              href={href}
              aria-label={ariaLabel}
              target={external ? '_blank' : undefined}
              rel={external ? 'noreferrer' : undefined}
              className={`group relative flex h-[82px] w-[82px] flex-col items-center justify-center rounded-[24px] shadow-[0_18px_34px_rgba(10,22,60,0.26)] ring-1 ring-white/20 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-x-1 hover:scale-[1.03] ${
                isOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-90 opacity-0'
              } ${bgClassName}`}
              style={{
                transitionDelay: isOpen
                  ? `${index * staggerDelay}ms`
                  : `${(CTA_ITEMS.length - 1 - index) * staggerDelay}ms`,
              }}
            >
              <span className="pointer-events-none absolute inset-x-3 top-2 h-px rounded-full bg-white/40 opacity-80" />
              {imageSrc ? (
                <Image src={imageSrc} alt="" width={24} height={24} className="h-6 w-6 object-contain" aria-hidden />
              ) : Icon ? (
                <Icon className="h-6 w-6" aria-hidden />
              ) : null}
              <span className="font-sans text-[11px] font-semibold leading-tight tracking-[-0.03em] text-center">
                {label}
              </span>
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`group relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-white/45 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.98),rgba(229,237,255,0.95)_55%,rgba(196,213,255,0.96))] p-0 shadow-[0_18px_40px_rgba(24,75,186,0.34)] ring-1 ring-[#184BBA]/10 transition-all duration-300 hover:-translate-y-1 active:scale-[0.96] sm:h-16 sm:w-16 lg:h-[68px] lg:w-[68px] ${
            isOpen ? '' : 'animate-[cta-breathe_2.6s_ease-in-out_infinite]'
          }`}
          aria-label={isOpen ? 'CTA 닫기' : 'CTA 열기'}
        >
          <span
            className={`pointer-events-none absolute inset-[-10px] rounded-full border border-[#6F94FF]/25 ${
              isOpen ? 'opacity-0' : 'animate-[cta-glow_2.6s_ease-in-out_infinite]'
            }`}
          />
          <span className="absolute inset-0 rounded-full bg-[linear-gradient(135deg,rgba(255,255,255,0.55),rgba(255,255,255,0))]" />
          <span className="pointer-events-none absolute inset-y-0 left-[-55%] w-[42%] -skew-x-12 bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.72),rgba(255,255,255,0))] opacity-80 animate-[cta-shine_2.8s_ease-in-out_infinite]" />
          {isOpen ? (
            <XMarkIcon
              className="h-7 w-7 text-[#184BBA] transition-transform duration-300 sm:h-8 sm:w-8 lg:h-10 lg:w-10"
              aria-hidden
            />
          ) : (
            <Image
              src="/images/logo.svg"
              alt="바로가기 메뉴"
              width={36}
              height={36}
              className={`h-7 w-7 object-contain transition-transform duration-300 sm:h-8 sm:w-8 lg:h-10 lg:w-10 ${
                isOpen ? '' : 'animate-[cta-icon-float_2.6s_ease-in-out_infinite]'
              }`}
            />
          )}
        </button>
      </div>
      <style jsx>{`
        @keyframes cta-breathe {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.06);
          }
        }

        @keyframes cta-glow {
          0%,
          100% {
            transform: scale(0.96);
            opacity: 0.18;
          }
          50% {
            transform: scale(1.12);
            opacity: 0.42;
          }
        }

        @keyframes cta-icon-float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }

        @keyframes cta-shine {
          0% {
            transform: translateX(0) skewX(-12deg);
            opacity: 0;
          }
          12% {
            opacity: 0.9;
          }
          45% {
            opacity: 0.55;
          }
          100% {
            transform: translateX(320%) skewX(-12deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
