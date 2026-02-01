'use client';

import Link from "next/link";
import { useState, useEffect } from "react";

const logoImage = "/images/logo.svg";

/**
 * Header - 공통 헤더 컴포넌트
 * 스크롤 시 가운데로 모이면서 플로팅되는 효과
 */
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed z-50 ${
        isScrolled 
          ? 'top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-[1200px]' 
          : 'top-0 left-0 right-0 w-full translate-x-0'
      }`}
      style={{
        transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <div 
        className={`${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-xl rounded-full shadow-2xl border border-black/5 px-6' 
            : 'bg-transparent border-b border-black px-4'
        }`}
        style={{
          transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <div className={`mx-auto h-[56px] flex justify-between items-center ${
          isScrolled ? 'max-w-full px-4' : 'max-w-[1440px]'
        }`}>
          {/* 로고 */}
          <Link href="/" className="flex items-center no-underline ml-8 mt-1">
            <img
              src={logoImage}
              alt="ETERNAL MARKETING"
              className="w-[69px] h-[40px]"
            />
            <div className="ml-[9px]">
              <p className="text-logo mb-0 text-primary leading-tight">ETERNAL </p>
              <p className="text-logo text-primary leading-tight">MARKETING</p>
            </div>
          </Link>

          {/* 네비게이션 */}
          <nav className="flex items-center mr-8 mt-1">
            <Link
              href="/about"
              className={`nav-item nav-link-hover text-body-sm px-3 py-1 rounded cursor-pointer no-underline transition-colors duration-300 ${
                isScrolled ? 'text-main hover:!text-primary' : 'text-inverse hover:!text-primary'
              }`}
            >
              ABOUT
            </Link>
            <a
              href="/#portfolio"
              className={`nav-item nav-link-hover text-body-sm ml-[32px] px-3 py-1 rounded cursor-pointer no-underline transition-colors duration-300 ${
                isScrolled ? 'text-main hover:!text-primary' : 'text-inverse hover:!text-primary'
              }`}
            >
              PORTFOLIO
            </a>
            <a
              href="/#service"
              className={`nav-item nav-link-hover text-body-sm ml-[32px] px-3 py-1 rounded cursor-pointer no-underline transition-colors duration-300 ${
                isScrolled ? 'text-main hover:!text-primary' : 'text-inverse hover:!text-primary'
              }`}
            >
              SERVICE
            </a>
            <Link
              href="/ai-diagnosis"
              className="group relative nav-item bg-primary text-inverse text-body-sm h-[36px] w-[105px] rounded-[15px] flex items-center justify-center ml-[40px] no-underline overflow-hidden transition-all duration-300 shadow-[0_8px_20px_-5px_rgba(99,102,241,0.5)] hover:-translate-y-[3px] hover:shadow-[0_12px_25px_-5px_rgba(99,102,241,0.6)] hover:scale-[1.02]"
            >
              {/* 상시 빛 지나가는 효과 */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine" />
              <span className="relative z-10">AI 진단 받기</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
