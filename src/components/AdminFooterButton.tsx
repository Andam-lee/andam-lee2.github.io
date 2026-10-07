import React from "react";
import { useAdmin } from "../context/AdminContext";
import { Lock } from "lucide-react";

export default function AdminFooterButton() {
  const { isAdmin, openLoginModal } = useAdmin();

  // If already logged in, the AdminBar is shown, so hide this button
  if (isAdmin) return null;

  return (
    <div className="fixed bottom-4 left-4 z-40 opacity-30 hover:opacity-100 transition-opacity">
      <button
        type="button"
        onClick={openLoginModal}
        title="관리자 인증 (Ctrl+Shift+A)"
        className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white/80 border border-white/5 transition-all cursor-pointer"
      >
        <Lock className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
