import React, { useState } from "react";
import { useAdmin } from "../context/AdminContext";
import {
  CheckCircle2,
  Compass,
  Edit,
  Eye,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import NavigationEditorModal from "./NavigationEditorModal";

export default function AdminBar() {
  const { user, isAdmin, isEditMode, toggleEditMode, logout, isSaving } =
    useAdmin();
  const [showNavEditor, setShowNavEditor] = useState(false);

  if (!isAdmin) return null;

  return (
    <>
      <aside
        aria-label="관리자 제어 패널"
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end transition-all select-none"
      >
        <div className="bg-[#12181c]/95 border border-amber-400/30 backdrop-blur-md rounded-2xl shadow-2xl p-2.5 sm:p-3 text-white flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2 pl-1 pr-2 border-r border-white/10">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold text-white/90">관리자</span>
            <span className="text-[11px] text-white/40 max-w-[120px] truncate hidden md:inline">
              {user?.email || "인증됨"}
            </span>
          </div>

          {/* Edit mode toggle button */}
          <button
            type="button"
            onClick={toggleEditMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              isEditMode
                ? "bg-amber-400 text-black font-semibold shadow-md"
                : "bg-white/10 text-white/80 hover:bg-white/20"
            }`}
          >
            {isEditMode ? (
              <>
                <Edit className="w-3.5 h-3.5" />
                <span>편집 모드 ON</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>미리보기 모드</span>
              </>
            )}
          </button>

          {/* Navigation & Category Edit button */}
          <button
            type="button"
            onClick={() => setShowNavEditor(true)}
            title="상단 메뉴 및 드롭다운 카테고리 타이틀 수정"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-amber-400/15 border border-amber-400/40 text-amber-300 hover:bg-amber-400/25 transition-all cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>메뉴/카테고리 수정</span>
          </button>

          {/* Saving Status */}
          {isSaving ? (
            <span className="text-[11px] text-amber-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              저장 중...
            </span>
          ) : (
            <span className="text-[11px] text-white/40 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400/80" />
              동기화됨
            </span>
          )}

          {/* Logout button */}
          <button
            type="button"
            onClick={logout}
            title="로그아웃"
            className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors ml-1 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        {isEditMode && (
          <div className="mt-2 text-[11px] text-amber-300/80 bg-black/60 px-3 py-1 rounded-full border border-amber-400/20 backdrop-blur-sm pointer-events-none">
            ✨ 페이지 텍스트를 클릭하거나 [메뉴/카테고리 수정]으로 상단 메뉴명을 바꿀 수 있습니다
          </div>
        )}
      </aside>

      <NavigationEditorModal
        isOpen={showNavEditor}
        onClose={() => setShowNavEditor(false)}
      />
    </>
  );
}
