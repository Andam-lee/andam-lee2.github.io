import React, { useState, useEffect, useRef } from "react";
import { useAdmin } from "../context/AdminContext";
import { Check, Edit3, X } from "lucide-react";

interface EditableTextProps {
  id: string;
  defaultText: string;
  section?: string;
  className?: string;
  multiline?: boolean;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "div";
}

export default function EditableText({
  id,
  defaultText,
  section = "general",
  className = "",
  multiline = false,
  as: Component = "span",
}: EditableTextProps) {
  const { isEditMode, getText, updateText, isSaving } = useAdmin();
  const currentText = getText(id, defaultText);

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(currentText);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setDraft(currentText);
  }, [currentText]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = async () => {
    if (draft.trim() !== currentText.trim()) {
      await updateText(id, draft, section);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft(currentText);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleCancel();
    } else if (e.key === "Enter" && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Enter" && (e.ctrlKey || e.metaKey) && multiline) {
      e.preventDefault();
      handleSave();
    }
  };

  // If not in admin edit mode, render plain text
  if (!isEditMode) {
    return <Component className={className}>{currentText}</Component>;
  }

  // Active inline editing input/textarea
  if (isEditing) {
    return (
      <span className="relative inline-block w-full max-w-full my-1 z-30">
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={4}
            className={`w-full bg-[#182026] text-white border-2 border-amber-400/80 rounded-lg p-2.5 outline-none font-normal text-sm shadow-xl resize-y ${className}`}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`w-full bg-[#182026] text-white border-2 border-amber-400/80 rounded-lg px-2.5 py-1 outline-none font-normal shadow-xl ${className}`}
          />
        )}
        <span className="flex items-center gap-1.5 mt-1 text-xs">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-400 text-black font-semibold hover:bg-amber-300 transition-colors cursor-pointer"
          >
            <Check className="w-3 h-3" />
            <span>저장</span>
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-3 h-3" />
            <span>취소</span>
          </button>
          <span className="text-[11px] text-white/40 ml-1">
            {multiline ? "Ctrl+Enter로 저장" : "Enter로 저장"}
          </span>
        </span>
      </span>
    );
  }

  // In edit mode, but waiting for user to click
  return (
    <Component
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        setIsEditing(true);
      }}
      title="클릭하여 텍스트 수정"
      className={`${className} relative group cursor-pointer border-b border-dashed border-amber-400/40 hover:border-amber-400 hover:bg-amber-400/10 rounded px-1 -mx-1 transition-all inline-block`}
    >
      {currentText}
      <span className="opacity-0 group-hover:opacity-100 absolute -top-5 right-0 bg-amber-400 text-black text-[10px] font-bold px-1.5 py-0.5 rounded shadow pointer-events-none transition-opacity flex items-center gap-0.5">
        <Edit3 className="w-2.5 h-2.5" />
        수정
      </span>
    </Component>
  );
}
