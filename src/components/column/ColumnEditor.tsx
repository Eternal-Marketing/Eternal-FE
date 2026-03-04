'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { useCallback, useEffect } from 'react';

interface ColumnEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export default function ColumnEditor({ value, onChange, placeholder = '칼럼 본문 내용...', minHeight = '360px' }: ColumnEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Link.configure({ openOnClick: false, HTMLAttributes: { target: '_blank', rel: 'noopener noreferrer' } }),
      Placeholder.configure({ placeholder }),
    ],
    content: value || '',
    immediatelyRender: false,
    editorProps: {
      attributes: { class: 'column-editor-prose' },
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
    </div>
  );
}

function ToolBtn({
  onRun,
  isActive,
  title,
  children,
}: {
  onRun: () => void;
  isActive: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault();
        onRun();
      }}
      title={title}
      className={`px-2 py-1 rounded text-[12px] font-sans transition-colors ${
        isActive ? 'bg-primary/20 text-primary' : 'text-main hover:bg-[#eee]'
      }`}
    >
      {children}
    </button>
  );
}
