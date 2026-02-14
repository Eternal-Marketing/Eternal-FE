'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/api';
import { hasTokens, getRefreshToken, clearTokens, getAdminInfo } from '@/lib/auth/token';

/**
 * 관리자 대시보드
 * - 사이드바 + 카드 레이아웃
 */
export default function AdminDashboardPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [adminName, setAdminName] = useState<string>('관리자');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (!hasTokens()) {
        window.location.href = '/admin';
        return;
      }
      const admin = getAdminInfo();
      setAdminName(admin?.name ?? admin?.email ?? '관리자');
    }
  }, [mounted]);

  const handleLogout = async () => {
    try {
      const refreshToken = getRefreshToken();
      if (refreshToken) await logout(refreshToken);
    } catch {
      /* 무시 */
    } finally {
      clearTokens();
      router.push('/');
      router.refresh();
    }
  };

  if (!mounted) return null;
  if (!hasTokens()) return null;

  const navItems = [
    { href: '/', label: '홈', icon: '🏠' },
    { href: '/admin/dashboard', label: '대시보드', icon: '📊' },
  ];

  const processes = [
    { name: '마케팅 진행', percent: 62, status: '정상' },
    { name: '콘텐츠 제작', percent: 50, status: '지연' },
    { name: 'AI 분석', percent: 75, status: '정상' },
    { name: '리포트', percent: 25, status: '미완료' },
  ];

  const deadlines = [
    { task: '월간 리포트', date: '02/15', progress: 80 },
    { task: '콘텐츠 검수', date: '02/12', progress: 60 },
    { task: '캠페인 분석', date: '02/10', progress: 100 },
  ];

  return (
    <div className="min-h-screen flex bg-[#f5f5f7]">
      {/* 좌측 사이드바 */}
      <aside className="w-[240px] shrink-0 bg-primary flex flex-col">
        <div className="p-6 border-b border-white/20">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white text-xl font-bold mb-3">
            {adminName.charAt(0)}
          </div>
          <p className="text-white/80 text-xs font-medium">환영합니다</p>
          <p className="text-white text-base font-semibold">{adminName}</p>
        </div>
        <nav className="flex-1 py-4">
          {navItems.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-6 py-3 text-white/90 hover:bg-white/10 transition-colors"
            >
              <span className="text-lg">{icon}</span>
              <span className="text-sm font-medium">{label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/20">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/90 hover:bg-white/10 transition-colors text-sm font-medium"
          >
            <span>🚪</span>
            로그아웃
          </button>
        </div>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 overflow-auto p-6 lg:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-main">대시보드</h1>
          <Link
            href="/"
            className="rounded-[15px] bg-primary text-white font-medium px-5 py-2 text-[13px] shadow-[0_8px_20px_-5px_rgba(24,75,186,0.4)] hover:opacity-90 transition-opacity"
          >
            홈으로
          </Link>
        </div>

        {/* 카드 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 통계/진행률 카드 */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-black/5 p-6">
            <h2 className="text-sm font-semibold text-sub1 uppercase tracking-wider mb-4">
              진행 현황
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {processes.map(({ name, percent, status }) => (
                <div key={name} className="flex flex-col items-center">
                  <div className="relative w-20 h-20">
                    <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="2.5"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#184BBA"
                        strokeWidth="2.5"
                        strokeDasharray={`${percent}, 100`}
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-main">
                      {percent}%
                    </span>
                  </div>
                  <p className="mt-2 text-xs font-medium text-main text-center">{name}</p>
                  <p className="text-[10px] text-sub2">{status}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 마감일 카드 */}
          <div className="bg-white rounded-2xl shadow-sm border border-black/5 p-6">
            <h2 className="text-sm font-semibold text-sub1 uppercase tracking-wider mb-4">
              마감일
            </h2>
            <div className="space-y-4">
              {deadlines.map(({ task, date, progress }) => (
                <div key={task}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-main">{task}</span>
                    <span className="text-sub2">{date}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 월간 목표 카드 */}
          <div className="bg-primary rounded-2xl shadow-sm p-6 text-white">
            <h2 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-2">
              이번 달 목표
            </h2>
            <p className="text-2xl font-bold">2월 2026</p>
            <p className="text-3xl font-bold mt-4">데이터 준비 중</p>
            <p className="text-sm text-white/70 mt-2">목표 수치를 설정해 주세요</p>
          </div>

          {/* 예상치 카드 */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-black/5 p-6">
            <h2 className="text-sm font-semibold text-sub1 uppercase tracking-wider mb-4">
              예상 진행
            </h2>
            <div className="h-32 flex items-end gap-2">
              {[40, 55, 45, 70, 65, 80, 75].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-primary/20 rounded-t transition-all hover:bg-primary/30"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <p className="text-xs text-sub2 mt-3">최근 7일</p>
          </div>

          {/* 캘린더 카드 */}
          <div className="bg-white rounded-2xl shadow-sm border border-black/5 p-6">
            <h2 className="text-sm font-semibold text-sub1 uppercase tracking-wider mb-4">
              2026년 2월
            </h2>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
                <div key={d} className="text-sub2 font-medium py-1">
                  {d}
                </div>
              ))}
              {Array.from({ length: 35 }, (_, i) => {
                const day = i - 5;
                const isCurrent = day === 8;
                const isSelected = day >= 15 && day <= 18;
                return (
                  <div
                    key={i}
                    className={`py-2 rounded-lg ${
                      day < 1 || day > 28
                        ? 'text-transparent'
                        : isCurrent
                        ? 'bg-primary text-white font-semibold'
                        : isSelected
                        ? 'bg-primary/10 text-primary'
                        : 'text-main hover:bg-gray-100'
                    }`}
                  >
                    {day > 0 && day <= 28 ? day : ''}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
