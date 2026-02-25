'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PencilSquareIcon, TrashIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { deleteColumn, ApiClientError } from '@/lib/api';
import { hasTokens } from '@/lib/auth/token';

interface AdminColumnActionsProps {
  columnId: string;
  columnSlug: string;
}

export default function AdminColumnActions({ columnId }: AdminColumnActionsProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [confirming, setConfirming] = useState(false);

  if (typeof window === 'undefined') return null;
  if (!hasTokens()) return null;

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteColumn(columnId);
      router.push('/column');
      router.refresh();
    } catch (err) {
      alert(err instanceof ApiClientError ? err.message : '삭제에 실패했습니다.');
    } finally {
      setDeleting(false);
      setConfirming(false);
    }
  };

  return (
    <div className="flex items-center gap-2 ml-auto shrink-0">
      {confirming ? (
        <>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="p-1.5 rounded-lg text-sub2 hover:bg-black/5 transition-colors disabled:opacity-50"
            title="삭제 확인"
            aria-label="삭제 확인"
          >
            <CheckIcon className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setConfirming(false)}
            disabled={deleting}
            className="p-1.5 rounded-lg text-sub2 hover:bg-black/5 transition-colors disabled:opacity-50"
            title="취소"
            aria-label="취소"
          >
            <XMarkIcon className="w-3.5 h-3.5" />
          </button>
        </>
      ) : (
        <>
          <Link
            href={`/column/edit/${columnId}`}
            className="p-1.5 rounded-lg text-sub2 hover:bg-black/5 transition-colors no-underline"
            title="수정"
            aria-label="수정"
          >
            <PencilSquareIcon className="w-3.5 h-3.5" />
          </Link>
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="p-1.5 rounded-lg text-sub2 hover:bg-black/5 transition-colors"
            title="삭제"
            aria-label="삭제"
          >
            <TrashIcon className="w-3.5 h-3.5" />
          </button>
        </>
      )}
    </div>
  );
}
