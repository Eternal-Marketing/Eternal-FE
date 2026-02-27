'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { HomeIcon, FolderIcon, ClipboardDocumentListIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { logout } from '@/lib/api';
import { hasTokens, getRefreshToken, clearTokens, getAdminInfo } from '@/lib/auth/token';

const NAV_ITEMS = [
  { href: '/', label: '홈', Icon: HomeIcon },
  { href: '/admin/dashboard/categories', label: '카테고리 관리', Icon: FolderIcon },
  { href: '/admin/dashboard/subscriptions', label: '상담신청', Icon: ClipboardDocumentListIcon },
] as const;

export default function AdminDashboardLayout({
  children,
  title,
  actions,
}: {
  children: React.ReactNode;
  title: string;
  actions?: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
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

  return (
    <div className="min-h-screen flex bg-[#0b1020] text-white relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-45"
          style={{
            background: `
              radial-gradient(900px 520px at 25% 0%, rgba(24,75,186,0.22), transparent 60%),
              radial-gradient(900px 520px at 80% 10%, rgba(99,102,241,0.12), transparent 62%)
            `,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <aside className="relative w-[252px] shrink-0 flex flex-col border-r border-white/10">
        <div className="absolute inset-0 bg-[#0d1530]/85 backdrop-blur-xl" />
        <div className="relative p-6 border-b border-white/10">
          <div className="w-12 h-12 rounded-2xl bg-white/10 ring-1 ring-white/15 flex items-center justify-center text-white text-xl font-bold mb-3 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.9)]">
            {adminName.charAt(0)}
          </div>
          <p className="text-white/65 text-xs font-semibold tracking-wide">환영합니다</p>
          <p className="text-white text-[15px] font-semibold tracking-tight">{adminName}</p>
        </div>
        <nav className="relative flex-1 py-4">
          {NAV_ITEMS.map(({ href, label, Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`group relative mx-3 flex items-center gap-3 rounded-2xl px-4 py-3 transition-all ${
                  isActive
                    ? 'bg-white/[0.10] text-white shadow-[0_26px_80px_-55px_rgba(0,0,0,0.95)]'
                    : 'text-white/75 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full bg-white/55" />
                )}
                <Icon className="w-5 h-5 shrink-0 opacity-90 group-hover:opacity-100 transition-opacity" />
                <span className="text-sm font-semibold tracking-tight">{label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="relative p-4 border-t border-white/10">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-white/75 hover:text-white hover:bg-white/[0.06] transition-all text-sm font-semibold"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5 shrink-0" />
            로그아웃
          </button>
        </div>
      </aside>

      <main className="relative flex-1 overflow-auto p-6 lg:p-10">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex justify-between items-center mb-7">
            <div>
              <p className="text-white/40 text-[11px] font-semibold tracking-[0.22em] uppercase mb-1">Console</p>
              <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            </div>
            <div className="flex items-center gap-3">
              {actions}
              <Link
                href="/"
                className="rounded-2xl bg-white/[0.05] border border-white/10 px-4 py-2 text-[13px] font-semibold text-white/80 hover:text-white hover:bg-white/[0.08] transition-all shadow-[0_22px_80px_-55px_rgba(0,0,0,0.95)]"
              >
                홈으로
              </Link>
            </div>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
