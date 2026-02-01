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
          ? 'top-4 left-1/2 -translate-x-1/2 w-[75%] max-w-[900px]' 
          : 'top-0 left-0 right-0 w-full translate-x-0'
      }`}
      style={{
        transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <div 
        className={`${
          isScrolled 
            ? 'bg-white/70 backdrop-blur-lg rounded-full shadow-xl border border-white/30 px-4' 
            : 'bg-transparent border-b border-black px-4'
        }`}
        style={{
          transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <div className={`mx-auto flex justify-between items-center transition-all duration-500 ${
          isScrolled ? 'max-w-full px-2 h-[46px]' : 'max-w-[1440px] h-[56px]'
        }`}>
          {/* 로고 */}
          <Link href="/" className={`flex items-center no-underline transition-all duration-500 ${
            isScrolled ? 'ml-10 scale-90' : 'ml-16 mt-1'
          }`}>
            <img
              src={logoImage}
              alt="ETERNAL MARKETING"
              className={`transition-all duration-500 ${
                isScrolled ? 'w-[55px] h-[32px]' : 'w-[69px] h-[40px]'
              }`}
            />
            <div className="ml-[9px]">
              <p className={`mb-0 text-primary leading-tight transition-all duration-500 ${
                isScrolled ? 'text-[10px]' : 'text-logo'
              }`}>ETERNAL </p>
              <p className={`text-primary leading-tight transition-all duration-500 ${
                isScrolled ? 'text-[10px]' : 'text-logo'
              }`}>MARKETING</p>
            </div>
          </Link>

          {/* 네비게이션 */}
          <nav className={`flex items-center transition-all duration-500 ${
            isScrolled ? 'mr-10 scale-95' : 'mr-16 mt-1'
          }`}>
            <Link
              href="/about"
              className={`nav-item nav-link-hover px-3 py-1 rounded cursor-pointer no-underline transition-all duration-300 ${
                isScrolled ? 'text-main hover:!text-primary text-[13px]' : 'text-inverse hover:!text-primary text-body-sm'
              }`}
            >
              ABOUT
            </Link>
            <a
              href="/#column"
              className={`nav-item nav-link-hover ml-[32px] px-3 py-1 rounded cursor-pointer no-underline transition-all duration-300 ${
                isScrolled ? 'text-main hover:!text-primary text-[13px]' : 'text-inverse hover:!text-primary text-body-sm'
              }`}
            >
              COLUMN
            </a>
            <a
              href="/#service"
              className={`nav-item nav-link-hover ml-[32px] px-3 py-1 rounded cursor-pointer no-underline transition-all duration-300 ${
                isScrolled ? 'text-main hover:!text-primary text-[13px]' : 'text-inverse hover:!text-primary text-body-sm'
              }`}
            >
              SERVICE
            </a>
            <Link
              href="/ai-diagnosis"
              className={`group relative nav-item bg-primary text-inverse rounded-[15px] flex items-center justify-center ml-[40px] no-underline overflow-hidden transition-all duration-300 shadow-[0_8px_20px_-5px_rgba(99,102,241,0.5)] hover:-translate-y-[3px] hover:shadow-[0_12px_25px_-5px_rgba(99,102,241,0.6)] hover:scale-[1.02] ${
                isScrolled ? 'h-[32px] w-[95px] text-[12px]' : 'h-[36px] w-[105px] text-body-sm'
              }`}
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
