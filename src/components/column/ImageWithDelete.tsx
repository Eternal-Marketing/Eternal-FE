'use client';

import { NodeViewWrapper } from '@tiptap/react';
import type { NodeViewProps } from '@tiptap/react';

export default function ImageWithDelete({ node, getPos, editor }: NodeViewProps) {
  const { src, alt } = node.attrs;

  const handleDelete = () => {
    const pos = getPos();
    if (typeof pos === 'number') {
      editor.commands.deleteRange({ from: pos, to: pos + node.nodeSize });
    }
  };

  return (
    <NodeViewWrapper className="inline-block w-full my-2">
      <div className="relative inline-flex items-start gap-1 w-full max-w-full">
        <img
          src={src}
          alt={alt || ''}
          className="max-w-full h-auto rounded-lg object-contain"
          draggable={false}
          data-drag-handle
        />
        <button
          type="button"
          onClick={handleDelete}
          title="이미지 삭제"
          aria-label="이미지 삭제"
          className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-black/60 text-white text-sm hover:bg-black/80 transition-colors mt-1"
        >
          ×
        </button>
      </div>
    </NodeViewWrapper>
  );
}
