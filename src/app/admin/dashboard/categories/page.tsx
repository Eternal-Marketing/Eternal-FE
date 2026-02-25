'use client';

import { useEffect, useState } from 'react';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  ApiClientError,
} from '@/lib/api';
import type { Category, CreateCategoryPayload, UpdateCategoryPayload } from '@/lib/api';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';
import { PencilSquareIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

function slugFromName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    || `category-${Date.now()}`;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modal, setModal] = useState<'add' | 'edit' | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [form, setForm] = useState({ name: '', description: '' });
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<{ show: boolean; message: string }>({ show: false, message: '' });

  const fetchCategories = async () => {
    setLoading(true);
    setError('');
    try {
      const list = await getCategories({ includeInactive: true });
      setCategories(list);
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : '카테고리를 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openAdd = () => {
    setEditingCategory(null);
    setForm({ name: '', description: '' });
    setModal('add');
  };

  const openEdit = (c: Category) => {
    setEditingCategory(c);
    setForm({ name: c.name, description: c.description ?? '' });
    setModal('edit');
  };

  const closeModal = () => {
    setModal(null);
    setEditingCategory(null);
    setForm({ name: '', description: '' });
  };

  const handleNameChange = (name: string) => {
    setForm((p) => ({ ...p, name }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      if (modal === 'add') {
        const payload: CreateCategoryPayload = {
          name: form.name.trim(),
          slug: slugFromName(form.name),
          description: form.description.trim() || undefined,
        };
        await createCategory(payload);
        closeModal();
        await fetchCategories();
        setToast({ show: true, message: '추가되었습니다.' });
        setTimeout(() => setToast({ show: false, message: '' }), 2500);
      } else if (editingCategory) {
        const payload: UpdateCategoryPayload = {
          name: form.name.trim(),
          slug: slugFromName(form.name),
          description: form.description.trim() || undefined,
        };
        await updateCategory(editingCategory.id, payload);
        closeModal();
        await fetchCategories();
        setToast({ show: true, message: '수정되었습니다.' });
        setTimeout(() => setToast({ show: false, message: '' }), 2500);
      }
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : '저장에 실패했습니다.');
      setToast({ show: true, message: err instanceof ApiClientError ? err.message : '저장에 실패했습니다.' });
      setTimeout(() => setToast({ show: false, message: '' }), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  const openDeleteConfirm = (id: string) => setDeleteConfirm(id);
  const closeDeleteConfirm = () => setDeleteConfirm(null);

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm) return;
    const id = deleteConfirm;
    closeDeleteConfirm();
    setSubmitting(true);
    setError('');
    try {
      await deleteCategory(id);
      await fetchCategories();
      setToast({ show: true, message: '삭제되었습니다.' });
      setTimeout(() => setToast({ show: false, message: '' }), 2500);
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : '삭제에 실패했습니다.');
      setToast({ show: true, message: err instanceof ApiClientError ? err.message : '삭제에 실패했습니다.' });
      setTimeout(() => setToast({ show: false, message: '' }), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminDashboardLayout
      title="카테고리 관리"
      actions={
        <button
          type="button"
          onClick={openAdd}
          className="inline-flex items-center gap-2 rounded-2xl bg-primary px-4 py-2 text-[13px] font-semibold text-white hover:bg-primary/90 transition-all"
        >
          <PlusIcon className="w-4 h-4" />
          카테고리 추가
        </button>
      }
    >
      {error && (
        <div className="mb-6 rounded-xl bg-rose-500/10 border border-rose-500/20 px-4 py-3 text-rose-400 text-[14px]">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-white/60 text-[14px]">카테고리를 불러오는 중...</p>
      ) : (
        <div className="rounded-3xl bg-white/[0.05] backdrop-blur-xl border border-white/10 overflow-hidden">
          <table className="w-full table-fixed">
            <thead>
              <tr className="border-b border-white/10">
                <th className="w-[28%] px-6 py-4 text-left text-[13px] font-semibold text-white/70 align-middle">이름</th>
                <th className="w-auto px-6 py-4 text-center text-[13px] font-semibold text-white/70 align-middle">설명</th>
                <th className="w-[120px] px-6 py-4 text-right text-[13px] font-semibold text-white/70 align-middle">관리</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-white/45 text-[14px]">
                    등록된 카테고리가 없습니다. 추가해 주세요.
                  </td>
                </tr>
              ) : (
                categories.map((c) => (
                  <tr key={c.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="w-[28%] px-6 py-4 text-left text-[14px] text-white/90 align-middle">{c.name}</td>
                    <td className="px-6 py-4 text-center text-[14px] text-white/50 line-clamp-1 align-middle">{c.description || '-'}</td>
                    <td className="w-[120px] px-6 py-4 text-right align-middle">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(c)}
                          className="p-2 rounded-lg text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                          title="수정"
                        >
                          <PencilSquareIcon className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => openDeleteConfirm(c.id)}
                          disabled={submitting}
                          className="p-2 rounded-lg text-white/60 hover:bg-rose-500/10 hover:text-rose-400 transition-colors disabled:opacity-50"
                          title="삭제"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-[420px] rounded-2xl bg-[#1a1f2e] border border-white/10 p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-white mb-6">
              {modal === 'add' ? '카테고리 추가' : '카테고리 수정'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[13px] font-medium text-white/70 mb-1.5">이름 *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-[14px] focus:outline-none focus:border-primary"
                  placeholder="예: 바이럴 마케팅"
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-white/70 mb-1.5">설명</label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-[14px] focus:outline-none focus:border-primary"
                  placeholder="선택 사항"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3 rounded-xl bg-primary text-white font-semibold text-[14px] hover:bg-primary/90 disabled:opacity-60"
                >
                  {submitting ? '저장 중...' : '저장'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={submitting}
                  className="flex-1 py-3 rounded-xl bg-white/10 text-white/80 font-semibold text-[14px] hover:bg-white/15 disabled:opacity-60"
                >
                  취소
                </button>
              </div>
            </form>
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
              onClick={closeDeleteConfirm}
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
