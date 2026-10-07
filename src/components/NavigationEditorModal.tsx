import React, { useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { Check, Compass, Save, X } from "lucide-react";

interface NavItemDef {
  keyTitle: string;
  defaultTitle: string;
  keyDesc?: string;
  defaultDesc?: string;
  category: string;
}

const NAV_ITEMS: NavItemDef[] = [
  // Categories
  {
    keyTitle: "nav_editorial",
    defaultTitle: "Editorial",
    category: "Main Categories",
  },
  {
    keyTitle: "nav_other_works",
    defaultTitle: "Other works",
    category: "Main Categories",
  },
  {
    keyTitle: "nav_about_me",
    defaultTitle: "About Me",
    category: "Main Categories",
  },

  // Editorial items
  {
    keyTitle: "dd_voices_title",
    defaultTitle: "Voices of the street",
    keyDesc: "dd_voices_desc",
    defaultDesc: "Documenting the Pulse of Public Outcry",
    category: "Editorial Items",
  },
  {
    keyTitle: "dd_sports_title",
    defaultTitle: "Sports Editorial: Track and Field",
    keyDesc: "dd_sports_desc",
    defaultDesc:
      "High-speed motion, decisive plays, and live competition coverage.",
    category: "Editorial Items",
  },
  {
    keyTitle: "dd_kma_title",
    defaultTitle: "Korea Military Academy: Institutional Documentation",
    keyDesc: "dd_kma_desc",
    defaultDesc:
      "Official coverage of cadet field training, ceremonial events, and daily academy life.",
    category: "Editorial Items",
  },
  {
    keyTitle: "dd_disaster_title",
    defaultTitle: "Aftermath & Impact: Disaster Coverage",
    keyDesc: "dd_disaster_desc",
    defaultDesc:
      "Documenting the immediate fallout of accidents and structural blazes.",
    category: "Editorial Items",
  },
  {
    keyTitle: "dd_events_title",
    defaultTitle: "Public Events & Festivals",
    keyDesc: "dd_events_desc",
    defaultDesc:
      "Editorial coverage of public gatherings, cultural festivals, and large-scale public events.",
    category: "Editorial Items",
  },

  // Other works items
  {
    keyTitle: "dd_avian_title",
    defaultTitle: "Avian Life: Wild Birds",
    keyDesc: "dd_avian_desc",
    defaultDesc: "Field documentation and behavioral observations of wild birds.",
    category: "Other Works Items",
  },
  {
    keyTitle: "dd_videos_title",
    defaultTitle: "Videos",
    keyDesc: "dd_videos_desc",
    defaultDesc:
      "Live performance recording, commercial product video production, and camera assistant work.",
    category: "Other Works Items",
  },
];

interface NavigationEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NavigationEditorModal({
  isOpen,
  onClose,
}: NavigationEditorModalProps) {
  const { getText, updateText, isSaving } = useAdmin();

  // Local draft state initialized with current values
  const [drafts, setDrafts] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    NAV_ITEMS.forEach((item) => {
      init[item.keyTitle] = getText(item.keyTitle, item.defaultTitle);
      if (item.keyDesc && item.defaultDesc) {
        init[item.keyDesc] = getText(item.keyDesc, item.defaultDesc);
      }
    });
    return init;
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (key: string, value: string) => {
    setDrafts((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveAll = async () => {
    for (const [key, val] of Object.entries(drafts)) {
      await updateText(key, val, "navigation");
    }
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[88vh] bg-[#0f1418] border border-amber-400/40 rounded-2xl flex flex-col text-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#141b20]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                네비게이션 & 카테고리 타이틀 수정
              </h2>
              <p className="text-[11px] text-white/50">
                상단 바 카테고리 및 드롭다운 메뉴명 실시간 변경
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body - Scrollable */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Section 1: Main Category triggers */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-amber-400/90 font-bold mb-3 flex items-center gap-2">
              <span>대분류 상단 메뉴 (Main Categories)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-white/50 mb-1">
                  1번 메뉴 (기본: Editorial)
                </label>
                <input
                  type="text"
                  value={drafts["nav_editorial"] || ""}
                  onChange={(e) => handleChange("nav_editorial", e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 focus:border-amber-400 rounded-lg px-3 py-2 text-white font-medium text-xs outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-white/50 mb-1">
                  2번 메뉴 (기본: Other works)
                </label>
                <input
                  type="text"
                  value={drafts["nav_other_works"] || ""}
                  onChange={(e) =>
                    handleChange("nav_other_works", e.target.value)
                  }
                  className="w-full bg-white/[0.04] border border-white/10 focus:border-amber-400 rounded-lg px-3 py-2 text-white font-medium text-xs outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-white/50 mb-1">
                  3번 메뉴 (기본: About Me)
                </label>
                <input
                  type="text"
                  value={drafts["nav_about_me"] || ""}
                  onChange={(e) => handleChange("nav_about_me", e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 focus:border-amber-400 rounded-lg px-3 py-2 text-white font-medium text-xs outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Editorial Dropdown Items */}
          <div className="border-t border-white/10 pt-5">
            <h3 className="text-xs uppercase tracking-wider text-amber-400/90 font-bold mb-3">
              Editorial 드롭다운 항목 타이틀 및 설명
            </h3>
            <div className="space-y-4">
              {[
                {
                  label: "1. Voices of the street",
                  tKey: "dd_voices_title",
                  dKey: "dd_voices_desc",
                },
                {
                  label: "2. Sports Editorial",
                  tKey: "dd_sports_title",
                  dKey: "dd_sports_desc",
                },
                {
                  label: "3. Korea Military Academy",
                  tKey: "dd_kma_title",
                  dKey: "dd_kma_desc",
                },
                {
                  label: "4. Disaster Coverage",
                  tKey: "dd_disaster_title",
                  dKey: "dd_disaster_desc",
                },
                {
                  label: "5. Public Events",
                  tKey: "dd_events_title",
                  dKey: "dd_events_desc",
                },
              ].map((it) => (
                <div
                  key={it.tKey}
                  className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-2"
                >
                  <div className="text-[11px] font-semibold text-white/70">
                    {it.label}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="타이틀"
                      value={drafts[it.tKey] || ""}
                      onChange={(e) => handleChange(it.tKey, e.target.value)}
                      className="w-full bg-white/[0.04] border border-white/10 focus:border-amber-400 rounded-lg px-3 py-1.5 text-white text-xs outline-none"
                    />
                    <input
                      type="text"
                      placeholder="서브 설명"
                      value={drafts[it.dKey] || ""}
                      onChange={(e) => handleChange(it.dKey, e.target.value)}
                      className="w-full bg-white/[0.04] border border-white/10 focus:border-amber-400 rounded-lg px-3 py-1.5 text-white/70 text-xs outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Other Works Dropdown Items */}
          <div className="border-t border-white/10 pt-5">
            <h3 className="text-xs uppercase tracking-wider text-amber-400/90 font-bold mb-3">
              Other works 드롭다운 항목 타이틀 및 설명
            </h3>
            <div className="space-y-4">
              {[
                {
                  label: "1. Avian Life: Wild Birds",
                  tKey: "dd_avian_title",
                  dKey: "dd_avian_desc",
                },
                {
                  label: "2. Videos",
                  tKey: "dd_videos_title",
                  dKey: "dd_videos_desc",
                },
              ].map((it) => (
                <div
                  key={it.tKey}
                  className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-2"
                >
                  <div className="text-[11px] font-semibold text-white/70">
                    {it.label}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="타이틀"
                      value={drafts[it.tKey] || ""}
                      onChange={(e) => handleChange(it.tKey, e.target.value)}
                      className="w-full bg-white/[0.04] border border-white/10 focus:border-amber-400 rounded-lg px-3 py-1.5 text-white text-xs outline-none"
                    />
                    <input
                      type="text"
                      placeholder="서브 설명"
                      value={drafts[it.dKey] || ""}
                      onChange={(e) => handleChange(it.dKey, e.target.value)}
                      className="w-full bg-white/[0.04] border border-white/10 focus:border-amber-400 rounded-lg px-3 py-1.5 text-white/70 text-xs outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-[#141b20]">
          <span className="text-xs text-white/40">
            {savedSuccess ? "✅ 저장되었습니다!" : "저장 시 실시간 동기화됩니다."}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs hover:bg-white/20 transition-colors cursor-pointer"
            >
              닫기
            </button>
            <button
              type="button"
              onClick={handleSaveAll}
              disabled={isSaving}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? "저장 중..." : "전체 저장하기"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
