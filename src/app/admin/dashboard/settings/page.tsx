'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { getDailyDiagnosticMax, patchDailyDiagnosticMax, ApiClientError } from '@/lib/api';
import { apiConfig } from '@/lib/api/config';

const AdminDashboardLayout = dynamic(() => import('@/components/admin/AdminDashboardLayout'), {
  loading: () => <div className="min-h-screen bg-[#0b1020] flex items-center justify-center text-white/60">로딩 중...</div>,
});

export default function AdminSettingsPage() {
  const [max, setMax] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState<{ show: boolean; message: string }>({ show: false, message: '' });

  const debugUrl =
    typeof window === 'undefined'
      ? `${apiConfig.baseURL || ''}/api/settings/daily-diagnostic-max`
      : `${(apiConfig.baseURL || window.location.origin).replace(/\/$/, '')}/api/settings/daily-diagnostic-max`;

  const fetchMax = async () => {
    setLoading(true);
    setError('');
    try {
      console.groupCollapsed('[settings] getDailyDiagnosticMax');
      console.log('url', debugUrl);
      console.log('baseURL', apiConfig.baseURL || '(empty → same-origin)');
      const value = await getDailyDiagnosticMax();
      console.log('result', value);
      setMax(value);
    } catch (err) {
      console.error('error', err);
      setError(err instanceof ApiClientError ? err.message : '설정을 불러오지 못했습니다.');
    } finally {
      console.groupEnd();
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMax();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (max < 0 || max > 999) {
      setError('0~999 사이의 값을 입력해 주세요.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const desired = max;
      console.groupCollapsed('[settings] patchDailyDiagnosticMax');
      console.log('url', debugUrl);
      console.log('baseURL', apiConfig.baseURL || '(empty → same-origin)');
      console.log('desired', desired);

      const saved = await patchDailyDiagnosticMax(desired);
      console.log('patchResult', saved);
      // 저장 직후 서버 값 재조회 (캐시/동기화/반영 지연 판별)
      let latest = await getDailyDiagnosticMax();
      console.log('getLatest#0', latest);
      for (let i = 0; i < 3 && latest !== desired; i += 1) {
        await new Promise((r) => setTimeout(r, 250 * (i + 1)));
        latest = await getDailyDiagnosticMax();
        console.log(`getLatest#${i + 1}`, latest);
      }

      setMax(latest);

      if (latest !== desired) {
        setError(`저장이 반영되지 않았습니다. (요청: ${desired}, 현재: ${latest})`);
        return;
      }

      if (saved !== desired) {
        setToast({ show: true, message: `저장되었습니다. (저장값: ${saved})` });
      } else {
        setToast({ show: true, message: '저장되었습니다.' });
      }
      setTimeout(() => setToast({ show: false, message: '' }), 2500);
    } catch (err) {
      console.error('error', err);
      setError(err instanceof ApiClientError ? err.message : '저장에 실패했습니다.');
    } finally {
      console.groupEnd();
      setSaving(false);
    }
  };

  return (
    <AdminDashboardLayout title="당일 진단 설정">
      <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 sm:p-8 max-w-md">
        <p className="text-white/60 text-sm mb-6">
          홈 AI 진단 섹션에 표시되는 당일 누적 진단 최대 건수입니다. (0~999)
        </p>

        {loading ? (
          <div className="flex items-center gap-2 text-white/70">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            불러오는 중...
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label htmlFor="daily-max" className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">
                당일 진단 표시 최대값
              </label>
              <input
                id="daily-max"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={max}
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, '');
                  if (v === '') setMax(0);
                  else setMax(Math.min(999, parseInt(v, 10)));
                }}
                placeholder="0"
                className="w-full max-w-[140px] h-12 px-4 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
                disabled={saving}
              />
            </div>

            {error && (
              <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 px-4 py-3">
                <p className="text-sm text-rose-400" role="alert">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-primary text-white font-semibold px-6 py-2.5 text-sm hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            >
              {saving ? '저장 중...' : '저장'}
            </button>
          </form>
        )}
      </div>

      {toast.show && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-3 text-sm font-medium text-white shadow-xl">
          {toast.message}
        </div>
      )}
    </AdminDashboardLayout>
  );
}
