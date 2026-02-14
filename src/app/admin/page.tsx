'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { loginAdmin, ApiClientError } from '@/lib/api';
import { setTokens, setAdminInfo } from '@/lib/auth/token';

/**
 * 관리자 로그인 페이지
 * - 이메일/비밀번호로 로그인, JWT 토큰 발급
 */
export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!email.trim() || !password.trim()) {
        setError('이메일과 비밀번호를 입력해 주세요.');
        return;
      }

      const data = await loginAdmin({ email: email.trim(), password });
      setTokens(data.accessToken, data.refreshToken);
      if (data.admin) setAdminInfo({ name: data.admin.name, email: data.admin.email });
      router.push('/admin/dashboard');
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : '로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden bg-[#1c1c21]">
      {/* 메시 그라디언트 배경 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% -20%, rgba(24, 75, 186, 0.25), transparent),
              radial-gradient(ellipse 60% 40% at 100% 50%, rgba(99, 102, 241, 0.15), transparent),
              radial-gradient(ellipse 50% 30% at 0% 80%, rgba(59, 130, 246, 0.1), transparent)
            `,
          }}
        />
        {/* 그리드 패턴 */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
        {/* 플로팅 오브 */}
        <div className="absolute top-[15%] right-[10%] w-64 h-64 rounded-full bg-primary/20 blur-[100px] animate-pulse" />
        <div className="absolute bottom-[20%] left-[5%] w-48 h-48 rounded-full bg-indigo-500/15 blur-[80px]" />
      </div>

      <div className="relative z-10 w-full max-w-[440px] animate-fade-in-up">
        {/* 로고 */}
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 no-underline group mb-12"
        >
          <Image
            src="/images/logo.svg"
            alt="ETERNAL"
            width={40}
            height={24}
            className="w-10 h-6 opacity-95 group-hover:opacity-100 transition-opacity object-contain"
          />
          <span className="text-[13px] font-semibold tracking-wide text-white/90 group-hover:text-white transition-colors">
            ETERNAL MARKETING
          </span>
        </Link>

        {/* 타이틀 - 그라디언트 텍스트 */}
        <div className="mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)',
              }}
            >
              관리자 로그인
            </span>
          </h1>
          <p className="text-sm text-white/45">
            관리자 전용 페이지입니다.
          </p>
        </div>

        {/* 로그인 카드 - 글래스모피즘 + 네온 보더 */}
        <div className="relative group">
          <div
            className="absolute -inset-px rounded-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(135deg, rgba(24,75,186,0.4), rgba(99,102,241,0.2), transparent, rgba(59,130,246,0.2))',
              filter: 'blur(8px)',
            }}
          />
          <div className="relative rounded-2xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] p-8 sm:p-10 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 이메일 */}
              <div className="group/input">
                <label htmlFor="admin-email" className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2.5">
                  이메일
                </label>
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  autoComplete="email"
                  className="w-full h-12 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/25 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 focus:bg-white/[0.06] transition-all duration-300"
                  disabled={isLoading}
                />
              </div>

              {/* 비밀번호 */}
              <div className="group/input">
                <label htmlFor="admin-password" className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2.5">
                  비밀번호
                </label>
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full h-12 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/25 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 focus:bg-white/[0.06] transition-all duration-300"
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 px-4 py-3">
                  <p className="text-sm text-rose-400" role="alert">{error}</p>
                </div>
              )}

              {/* 로그인 버튼 - 셰이닝 효과 */}
              <button
                type="submit"
                disabled={isLoading}
                className="relative w-full h-12 rounded-xl overflow-hidden bg-primary text-white font-semibold text-[15px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:active:scale-100 group/btn"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      로그인 중...
                    </>
                  ) : (
                    '로그인'
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>

        {/* 홈 링크 */}
        <p className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 no-underline transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            홈으로
          </Link>
        </p>
      </div>
    </main>
  );
}
