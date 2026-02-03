'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const logoImage = "/images/logo.svg";

const navLinks = [
  { href: "/about", label: "ABOUT" },
  { href: "/column", label: "COLUMN" },
  { href: "/service", label: "SERVICE" },
];

/**
 * 공통 헤더
 * - 데스크톱: 스크롤 시 상단 전체 → 중앙 플로팅(둥근 막대) 형태
 * - 모바일/태블릿: 햄버거 메뉴 + 드로어, 로고·CTA 반응형
 */
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isLightBgPage = pathname === '/privacy' || pathname === '/terms' || pathname.startsWith('/column/');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navLinkClass = (scrolled: boolean) =>
    `nav-item nav-link-hover px-3 py-1 rounded cursor-pointer no-underline transition-all duration-300 ${
      scrolled ? 'text-main hover:!text-primary text-[13px]' : isLightBgPage ? 'text-main hover:!text-primary text-body-sm' : 'text-inverse hover:!text-primary text-body-sm'
    }`;

  const ctaClass = (scrolled: boolean) =>
    `group relative nav-item bg-primary text-inverse rounded-[15px] flex items-center justify-center no-underline overflow-hidden transition-all duration-300 shadow-[0_8px_20px_-5px_rgba(99,102,241,0.5)] hover:-translate-y-[3px] hover:shadow-[0_12px_25px_-5px_rgba(99,102,241,0.6)] hover:scale-[1.02] ${
      scrolled ? 'h-[32px] w-[95px] text-[12px]' : 'h-[36px] w-[105px] text-body-sm'
    }`;

  return (
    <>
      <header
        className={`fixed z-50 ${
          isScrolled
            ? 'top-2 left-1/2 -translate-x-1/2 w-[92%] sm:w-[88%] md:w-[82%] lg:w-[75%] max-w-[900px]'
            : 'top-0 left-0 right-0 w-full translate-x-0'
        }`}
        style={{ transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)' }}
      >
        <div
          className={`${
            isScrolled
              ? 'bg-white/70 backdrop-blur-lg rounded-full shadow-xl border border-white/30 px-3 sm:px-4'
              : 'bg-transparent px-4 sm:px-6 md:px-8 lg:px-4'
          }`}
          style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        >
          <div
            className={`mx-auto flex justify-between items-center transition-all duration-500 ${
              isScrolled ? 'max-w-full px-1 h-[44px] sm:h-[46px]' : 'max-w-[1440px] h-[52px] sm:h-[54px] lg:h-[56px]'
            }`}
          >
            <Link
              href="/"
              className={`flex items-center no-underline transition-all duration-500 ${
                isScrolled ? 'ml-4 sm:ml-6 lg:ml-10 scale-90' : 'ml-4 sm:ml-6 md:ml-10 lg:ml-16 mt-0.5 lg:mt-1'
              }`}
            >
              <img
                src={logoImage}
                alt="ETERNAL MARKETING"
                className={`transition-all duration-500 ${
                  isScrolled ? 'w-[48px] h-[28px] sm:w-[55px] sm:h-[32px]' : 'w-[56px] h-[32px] sm:w-[62px] sm:h-[36px] lg:w-[69px] lg:h-[40px]'
                }`}
              />
              <div className="ml-1.5 sm:ml-2 lg:ml-[9px]">
                <p className={`mb-0 text-primary leading-tight transition-all duration-500 ${
                  isScrolled ? 'text-[9px] sm:text-[10px]' : 'text-[11px] sm:text-[12px] lg:text-logo'
                }`}>ETERNAL </p>
                <p className={`text-primary leading-tight transition-all duration-500 ${
                  isScrolled ? 'text-[9px] sm:text-[10px]' : 'text-[11px] sm:text-[12px] lg:text-logo'
                }`}>MARKETING</p>
              </div>
            </Link>

            {/* 데스크톱: 가로 네비 */}
            <nav className={`hidden lg:flex items-center transition-all duration-500 ${
              isScrolled ? 'mr-10 scale-95' : 'mr-16 mt-1'
            }`}>
              {navLinks.map(({ href, label }) => (
                <Link key={href} href={href} className={`ml-8 first:ml-0 ${navLinkClass(isScrolled)}`}>
                  {label}
                </Link>
              ))}
              <Link href="/ai-diagnosis" className={`ml-10 ${ctaClass(isScrolled)}`}>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine" />
                <span className="relative z-10">AI 진단 받기</span>
              </Link>
            </nav>

            {/* 모바일/태블릿: 햄버거 + CTA 또는 햄버거만 */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                href="/ai-diagnosis"
                className={`group relative shrink-0 rounded-[12px] sm:rounded-[15px] flex items-center justify-center no-underline overflow-hidden transition-all duration-300 shadow-[0_8px_20px_-5px_rgba(99,102,241,0.5)] hover:-translate-y-[2px] hover:shadow-[0_12px_25px_-5px_rgba(99,102,241,0.6)] bg-primary text-inverse font-medium ${
                  isScrolled ? 'h-7 px-2.5 text-[10px] sm:h-8 sm:px-3 sm:text-[11px]' : 'h-8 px-3 text-[11px] sm:h-9 sm:px-3.5 sm:text-[12px]'
                }`}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine" />
                <span className="relative z-10">AI 진단 받기</span>
              </Link>
              <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                className="p-2 rounded-lg touch-manipulation"
                aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
                aria-expanded={menuOpen}
              >
                <span className={`block w-6 h-0.5 rounded-full bg-current transition-all duration-300 ${
                  isScrolled ? 'text-main' : isLightBgPage ? 'text-main' : 'text-inverse'
                } ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`block w-6 h-0.5 rounded-full mt-1.5 bg-current transition-all duration-300 ${
                  isScrolled ? 'text-main' : isLightBgPage ? 'text-main' : 'text-inverse'
                } ${menuOpen ? 'opacity-0 scale-0' : ''}`} />
                <span className={`block w-6 h-0.5 rounded-full mt-1.5 bg-current transition-all duration-300 ${
                  isScrolled ? 'text-main' : isLightBgPage ? 'text-main' : 'text-inverse'
                } ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 모바일/태블릿 드로어 - 네비바 위에 덮이도록 z-[60] */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 w-full max-w-[320px] sm:max-w-[360px] h-full bg-white shadow-2xl transition-transform duration-300 ease-out ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="pt-[72px] px-6 pb-8 flex flex-col gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="nav-link-hover py-4 text-main hover:!text-primary text-[16px] font-medium no-underline border-b border-black/5 last:border-0"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/ai-diagnosis"
              className="group relative mt-4 flex items-center justify-center no-underline overflow-hidden rounded-[15px] bg-primary text-inverse font-medium h-10 px-5 text-[13px] shadow-[0_8px_20px_-5px_rgba(99,102,241,0.5)] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_12px_25px_-5px_rgba(99,102,241,0.6)] hover:scale-[1.02]"
              onClick={() => setMenuOpen(false)}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine" />
              <span className="relative z-10">AI 진단 받기</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
