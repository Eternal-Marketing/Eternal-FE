'use client';

import { useEffect, useState } from 'react';
import { getSubscriptions, getSubscriptionById, deleteSubscription, ApiClientError } from '@/lib/api';
import type { Subscription } from '@/lib/api';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';
import { TrashIcon } from '@heroicons/react/24/outline';

function formatDate(iso?: string): string {
  if (!iso) return '-';
  try {
    return new Date(iso).toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

export default function AdminSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [detailModal, setDetailModal] = useState<Subscription | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<{ show: boolean; message: string }>({ show: false, message: '' });
  const [submitting, setSubmitting] = useState(false);

  const fetchSubscriptions = async () => {
    setLoading(true);
    setError('');
    try {
      const list = await getSubscriptions({ limit: 100 });
      setSubscriptions(list);
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : '상담신청 목록을 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const openDetail = async (id: string) => {
    try {
      const sub = await getSubscriptionById(id);
      if (sub) setDetailModal(sub);
    } catch {
      setToast({ show: true, message: '상세 정보를 불러오지 못했습니다.' });
      setTimeout(() => setToast({ show: false, message: '' }), 2500);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm) return;
    const id = deleteConfirm;
    setDeleteConfirm(null);
    setSubmitting(true);
    setError('');
    try {
      await deleteSubscription(id);
      await fetchSubscriptions();
      if (detailModal?.id === id) setDetailModal(null);
      setToast({ show: true, message: '삭제되었습니다.' });
      setTimeout(() => setToast({ show: false, message: '' }), 2500);
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : '삭제에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminDashboardLayout title="상담신청">
      {error && (
        <div className="mb-6 rounded-xl bg-rose-500/10 border border-rose-500/20 px-4 py-3 text-rose-400 text-[14px]">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-white/60 text-[14px]">상담신청 목록을 불러오는 중...</p>
      ) : (
        <div className="rounded-3xl bg-white/[0.05] backdrop-blur-xl border border-white/10 overflow-hidden">
          <table className="w-full table-fixed">
            <thead>
              <tr className="border-b border-white/10">
                <th className="w-[20%] px-6 py-4 text-left text-[13px] font-semibold text-white/70 align-middle">담당자</th>
                <th className="w-[24%] px-6 py-4 text-left text-[13px] font-semibold text-white/70 align-middle">업체명</th>
                <th className="w-[22%] px-6 py-4 text-left text-[13px] font-semibold text-white/70 align-middle">연락처</th>
                <th className="w-[22%] px-6 py-4 text-left text-[13px] font-semibold text-white/70 align-middle">신청일</th>
                <th className="w-[100px] px-6 py-4 text-right text-[13px] font-semibold text-white/70 align-middle">관리</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-white/45 text-[14px]">
                    상담신청 내역이 없습니다.
                  </td>
                </tr>
              ) : (
                subscriptions.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b border-white/5 hover:bg-white/[0.02] cursor-pointer"
                    onClick={() => openDetail(s.id)}
                  >
                    <td className="px-6 py-4 text-left text-[14px] text-white/90 align-middle">{s.name}</td>
                    <td className="px-6 py-4 text-left text-[14px] text-white/70 line-clamp-1 align-middle">{s.companyName || '-'}</td>
                    <td className="px-6 py-4 text-left text-[14px] text-white/70 align-middle">{s.phone}</td>
                    <td className="px-6 py-4 text-left text-[14px] text-white/50 align-middle">{formatDate(s.createdAt)}</td>
                    <td className="px-6 py-4 text-right align-middle" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => setDeleteConfirm(s.id)}
                        disabled={submitting}
                        className="p-2 rounded-lg text-white/60 hover:bg-rose-500/10 hover:text-rose-400 transition-colors disabled:opacity-50"
                        title="삭제"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* 상세 모달 */}
      {detailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setDetailModal(null)}>
          <div
            className="w-full max-w-[520px] max-h-[90vh] overflow-auto rounded-2xl bg-[#1a1f2e] border border-white/10 p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-white mb-6">상담신청 상세</h3>
            <dl className="space-y-3 text-[14px]">
              <div>
                <dt className="text-white/50 mb-0.5">담당자</dt>
                <dd className="text-white">{detailModal.name}</dd>
              </div>
              <div>
                <dt className="text-white/50 mb-0.5">이메일</dt>
                <dd className="text-white">{detailModal.email}</dd>
              </div>
              <div>
                <dt className="text-white/50 mb-0.5">연락처</dt>
                <dd className="text-white">{detailModal.phone}</dd>
              </div>
              <div>
                <dt className="text-white/50 mb-0.5">업체명</dt>
                <dd className="text-white">{detailModal.companyName || '-'}</dd>
              </div>
              <div>
                <dt className="text-white/50 mb-0.5">업종</dt>
                <dd className="text-white">{detailModal.industry} {detailModal.industryOther ? `(${detailModal.industryOther})` : ''}</dd>
              </div>
              <div>
                <dt className="text-white/50 mb-0.5">고민 영역</dt>
                <dd className="text-white">{detailModal.concerns?.join(', ') || '-'}</dd>
              </div>
              <div>
                <dt className="text-white/50 mb-0.5">마케팅 진행 상태</dt>
                <dd className="text-white">{detailModal.marketingStatus}</dd>
              </div>
              <div>
                <dt className="text-white/50 mb-0.5">관심 채널</dt>
                <dd className="text-white">{detailModal.interestedChannels?.join(', ') || '-'} {detailModal.channelsOther ? `(${detailModal.channelsOther})` : ''}</dd>
              </div>
              <div>
                <dt className="text-white/50 mb-0.5">지역</dt>
                <dd className="text-white">{detailModal.region || '-'}</dd>
              </div>
              <div>
                <dt className="text-white/50 mb-0.5">연락 가능 시간</dt>
                <dd className="text-white">{detailModal.contactTimeSlots?.join(', ') || '-'} {detailModal.contactTimeOther ? `(${detailModal.contactTimeOther})` : ''}</dd>
              </div>
              {detailModal.message && (
                <div>
                  <dt className="text-white/50 mb-0.5">추가 메시지</dt>
                  <dd className="text-white whitespace-pre-wrap">{detailModal.message}</dd>
                </div>
              )}
              <div>
                <dt className="text-white/50 mb-0.5">신청일</dt>
                <dd className="text-white">{formatDate(detailModal.createdAt)}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}

      {/* 삭제 확인 토스트 */}
      {deleteConfirm && (
        <div
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-4 px-5 py-4 rounded-2xl bg-[#1a1f2e] border border-white/10 shadow-xl"
          role="dialog"
          aria-label="삭제 확인"
        >
          <span className="text-[14px] text-white/90">정말 삭제할까요?</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDeleteConfirm}
              disabled={submitting}
              className="px-4 py-2 rounded-xl bg-rose-500/20 text-rose-400 text-[13px] font-semibold hover:bg-rose-500/30 disabled:opacity-50"
            >
              삭제
            </button>
            <button
              type="button"
              onClick={() => setDeleteConfirm(null)}
              disabled={submitting}
              className="px-4 py-2 rounded-xl bg-white/10 text-white/80 text-[13px] font-semibold hover:bg-white/15 disabled:opacity-50"
            >
              취소
            </button>
          </div>
        </div>
      )}

      {/* 결과 토스트 */}
      {toast.show && (
        <div
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-[14px] font-medium"
          role="status"
        >
          {toast.message}
        </div>
      )}
    </AdminDashboardLayout>
  );
}
