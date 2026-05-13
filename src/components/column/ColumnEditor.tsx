'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { ImageWithDeleteExtension } from './ImageWithDeleteExtension';
import Placeholder from '@tiptap/extension-placeholder';
import { useCallback, useEffect, useRef, useState } from 'react';
import { DOMParser, type Slice } from '@tiptap/pm/model';
import type { EditorView } from '@tiptap/pm/view';
import { uploadMedia } from '@/lib/api';

function escapeHtmlForPaste(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** text/plain의 줄 단위를 그대로 문단으로 변환(빈 줄 포함) */
function plainTextToColumnPasteHtml(text: string): string {
  const normalized = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  return normalized
    .split('\n')
    .map((line) => {
      const escaped = escapeHtmlForPaste(line);
      return escaped === '' ? '<p><br></p>' : `<p>${escaped}</p>`;
    })
    .join('');
}

/**
 * HTML 붙여넣기는 출처마다 달라서, 줄 수 대비 `<p>/<br>/<div>`가 많아 보여도
 * 실제 빈 줄(단락 구분)이 사라지는 경우가 많습니다. 그래서 Word·표·이미지
 * 붙여넣기만 예외로 두고, 줄바꿈이 있는 일반 텍스트는 text/plain 기준으로
 * 다시 조립합니다.
 */
function shouldRebuildPasteFromPlainText(plain: string, html: string): boolean {
  if (!/[\r\n]/.test(plain)) return false;

  const h = html.trim();
  if (!h) return true;

  if (/<\w[^>]*mso-|urn:schemas-microsoft-com:office/i.test(h)) return false;
  if (/<table[\s>]/i.test(h)) return false;
  if (/<img[\s>]/i.test(h)) return false;

  return true;
}

function insertParsedPasteSlice(view: EditorView, slice: Slice) {
  const singleNode =
    slice.openStart === 0 && slice.openEnd === 0 && slice.content.childCount === 1
      ? slice.content.firstChild
      : null;
  const tr = singleNode
    ? view.state.tr.replaceSelectionWith(singleNode, false)
    : view.state.tr.replaceSelection(slice);
  view.dispatch(tr.scrollIntoView().setMeta('paste', true).setMeta('uiEvent', 'paste'));
}

interface ColumnEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export default function ColumnEditor({ value, onChange, placeholder = '칼럼 본문 내용...', minHeight = '360px' }: ColumnEditorProps) {
  const editor = useEditor({
    extensions: [
      // StarterKit v3에 link가 포함되어 있어 중복 방지를 위해 비활성화 후 별도 Link 사용
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        link: false,
      }),
      Link.configure({ openOnClick: false, HTMLAttributes: { target: '_blank', rel: 'noopener noreferrer' } }),
      ImageWithDeleteExtension,
      Placeholder.configure({ placeholder }),
    ],
    content: value || '',
    immediatelyRender: false,
    editorProps: {
      attributes: { class: 'column-editor-prose' },
      handleDOMEvents: {
        paste(view, event) {
          const cd = event.clipboardData;
          if (!cd) return false;
          const plain = cd.getData('text/plain');
          if (!plain || !/[\r\n]/.test(plain)) return false;
          const html = cd.getData('text/html') ?? '';
          if (!shouldRebuildPasteFromPlainText(plain, html)) return false;

          const wrap = document.createElement('div');
          wrap.innerHTML = plainTextToColumnPasteHtml(plain);
          const parsedSlice = DOMParser.fromSchema(view.state.schema).parseSlice(wrap, {
            preserveWhitespace: true,
          });
          insertParsedPasteSlice(view, parsedSlice);
          event.preventDefault();
          return true;
        },
      },
    },
  });

  const handleUpdate = useCallback(() => {
    if (editor) onChange(editor.getHTML());
  }, [editor, onChange]);

  useEffect(() => {
    if (!editor) return;
    editor.on('update', handleUpdate);
    return () => { editor.off('update', handleUpdate); };
  }, [editor, handleUpdate]);

  useEffect(() => {
    if (!editor || value === undefined) return;
    const current = editor.getHTML();
    if (value !== current) editor.commands.setContent(value || '', { emitUpdate: false });
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="rounded-lg border border-[#ddd] bg-white overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
      <Toolbar editor={editor} />
      <div
        className="column-editor-body px-4 py-3 max-w-none min-w-0"
        style={{ minHeight }}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

function Toolbar({ editor }: { editor: ReturnType<typeof useEditor> }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    if (!file.type.startsWith('image/')) return;

    setUploading(true);
    try {
      const media = await uploadMedia(file);
      editor.chain().focus().setImage({ src: media.url, alt: file.name }).run();
    } catch {
      alert('이미지 업로드에 실패했습니다.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-[#eee] bg-[#fafafa] px-2 py-1.5">
      <ToolBtn
        onRun={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
        title="굵게"
      >
        <strong className="text-[13px] font-bold">B</strong>
      </ToolBtn>
      <ToolBtn
        onRun={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
        title="기울임"
      >
        <em className="text-[13px] italic">I</em>
      </ToolBtn>
      <span className="w-px h-5 bg-[#ddd] mx-1" />
      <ToolBtn
        onRun={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive('heading', { level: 1 })}
        title="제목 1"
      >
        H1
      </ToolBtn>
      <ToolBtn
        onRun={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive('heading', { level: 2 })}
        title="제목 2"
      >
        H2
      </ToolBtn>
      <ToolBtn
        onRun={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive('heading', { level: 3 })}
        title="제목 3"
      >
        H3
      </ToolBtn>
      <span className="w-px h-5 bg-[#ddd] mx-1" />
      <ToolBtn
        onRun={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
        title="글머리"
      >
        •
      </ToolBtn>
      <ToolBtn
        onRun={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive('orderedList')}
        title="번호"
      >
        1.
      </ToolBtn>
      <ToolBtn
        onRun={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive('blockquote')}
        title="인용"
      >
        &ldquo;
      </ToolBtn>
      <span className="w-px h-5 bg-[#ddd] mx-1" />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleImageUpload}
        className="hidden"
      />
      <ToolBtn
        onRun={() => fileInputRef.current?.click()}
        isActive={false}
        title="이미지 삽입"
        disabled={uploading}
      >
        {uploading ? (
          <span className="text-[11px]">...</span>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        )}
      </ToolBtn>
    </div>
  );
}

function ToolBtn({
  onRun,
  isActive,
  title,
  children,
  disabled,
}: {
  onRun: () => void;
  isActive: boolean;
  title: string;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onMouseDown={(e) => {
        e.preventDefault();
        if (!disabled) onRun();
      }}
      title={title}
      className={`px-2 py-1 rounded text-[12px] font-sans transition-colors ${
        disabled ? 'opacity-50 cursor-not-allowed text-sub3' :
        isActive ? 'bg-primary/20 text-primary' : 'text-main hover:bg-[#eee]'
      }`}
    >
      {children}
    </button>
  );
}
