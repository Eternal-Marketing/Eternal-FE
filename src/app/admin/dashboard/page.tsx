'use client';

import { useEffect, useState } from 'react';
import { hasTokens } from '@/lib/auth/token';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';

/**
 * 관리자 대시보드
 * - 사이드바 + 카드 레이아웃
 */
export default function AdminDashboardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (!hasTokens()) return null;

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
    <AdminDashboardLayout title="대시보드">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 진행 현황 */}
            <div className="lg:col-span-2 rounded-3xl bg-white/[0.05] backdrop-blur-xl border border-white/10 p-6 shadow-[0_30px_120px_-85px_rgba(0,0,0,0.95)]">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[13px] font-semibold text-white/70 tracking-wide">진행 현황</h2>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white/35">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                    </span>
                    live
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {processes.map(({ name, percent, status }) => (
                    <div key={name} className="flex flex-col items-center">
                      <div className="relative w-20 h-20">
                        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="rgba(255,255,255,0.10)"
                            strokeWidth="2.8"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#184BBA"
                            strokeWidth="2.8"
                            strokeLinecap="round"
                            strokeDasharray={`${percent}, 100`}
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white tabular-nums">
                          {percent}%
                        </span>
                      </div>
                      <p className="mt-2 text-xs font-semibold text-white/90 text-center tracking-tight">{name}</p>
                      <p className="text-[10px] text-white/45">{status}</p>
                    </div>
                  ))}
                </div>
            </div>

            {/* 마감일 */}
            <div className="rounded-3xl bg-white/[0.05] backdrop-blur-xl border border-white/10 p-6 shadow-[0_30px_120px_-85px_rgba(0,0,0,0.95)]">
                <h2 className="text-[13px] font-semibold text-white/70 tracking-wide mb-4">마감일</h2>
                <div className="space-y-4">
                  {deadlines.map(({ task, date, progress }) => (
                    <div key={task}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-white/90 tracking-tight">{task}</span>
                        <span className="text-white/45 tabular-nums">{date}</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all bg-primary"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
            </div>

            {/* 월간 목표 */}
            <div className="rounded-3xl border border-white/10 p-6 bg-primary/90 shadow-[0_40px_140px_-95px_rgba(24,75,186,0.85)]">
                <h2 className="text-[13px] font-semibold text-white/85 tracking-wide mb-2">이번 달 목표</h2>
                <p className="text-2xl font-bold tracking-tight">2월 2026</p>
                <p className="text-3xl font-bold mt-4 tracking-tight">데이터 준비 중</p>
                <p className="text-sm text-white/75 mt-2">목표 수치를 설정해 주세요</p>
            </div>

            {/* 예상 진행 */}
            <div className="lg:col-span-2 rounded-3xl bg-white/[0.05] backdrop-blur-xl border border-white/10 p-6 shadow-[0_30px_120px_-85px_rgba(0,0,0,0.95)]">
                <h2 className="text-[13px] font-semibold text-white/70 tracking-wide mb-4">예상 진행</h2>
                <div className="h-32 flex items-end gap-2">
                  {[40, 55, 45, 70, 65, 80, 75].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-2xl bg-primary/55 hover:bg-primary/65 transition-colors"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <p className="text-xs text-white/45 mt-3">최근 7일</p>
            </div>

            {/* 캘린더 */}
            <div className="rounded-3xl bg-white/[0.05] backdrop-blur-xl border border-white/10 p-6 shadow-[0_30px_120px_-85px_rgba(0,0,0,0.95)]">
                <h2 className="text-[13px] font-semibold text-white/70 tracking-wide mb-4">2026년 2월</h2>
                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
                    <div key={d} className="text-white/45 font-semibold py-1">
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
                        className={`py-2 rounded-xl transition-colors ${
                          day < 1 || day > 28
                            ? 'text-transparent'
                            : isCurrent
                            ? 'bg-primary text-white font-semibold shadow-[0_18px_55px_-38px_rgba(24,75,186,0.95)]'
                            : isSelected
                            ? 'bg-white/[0.06] text-white border border-white/10'
                            : 'text-white/85 hover:bg-white/[0.06]'
                        }`}
                      >
                        {day > 0 && day <= 28 ? day : ''}
                      </div>
                    );
                  })}
                </div>
            </div>
          </div>
    </AdminDashboardLayout>
  );
}
