import React, { useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { Lock, Mail, Key, X, AlertCircle } from "lucide-react";

export default function AdminLoginModal() {
  const {
    showLoginModal,
    closeLoginModal,
    loginWithGoogle,
    loginWithEmail,
    registerWithEmail,
  } = useAdmin();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!showLoginModal) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "login") {
        await loginWithEmail(email, password);
      } else {
        await registerWithEmail(email, password);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("인증에 실패했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    setLoading(true);
    try {
      await loginWithGoogle();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("구글 로그인에 실패했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={closeLoginModal}
    >
      <div
        className="w-full max-w-md bg-[#0f1418] border border-white/15 rounded-2xl p-6 sm:p-8 text-white shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeLoginModal}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">관리자 인증</h3>
            <p className="text-xs text-white/50">사이트 실시간 텍스트 편집 권한</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Google One-Click Login */}
        <button
          type="button"
          onClick={handleGoogle}
          disabled={loading}
          className="w-full mb-5 flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Google 계정으로 로그인</span>
        </button>

        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-white/10 w-full" />
          <span className="bg-[#0f1418] px-3 text-[11px] text-white/40 uppercase tracking-wider">
            또는 이메일 로그인
          </span>
          <div className="border-t border-white/10 w-full" />
        </div>

        {/* Email form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs text-white/60 mb-1.5">이메일</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aquascaperljm@gmail.com"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400/60"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-white/60 mb-1.5">비밀번호</label>
            <div className="relative">
              <Key className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호 입력"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400/60"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-semibold text-sm transition-colors cursor-pointer"
          >
            {loading
              ? "처리 중..."
              : mode === "login"
              ? "관리자 로그인"
              : "새 관리자 계정 생성"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="text-xs text-white/50 hover:text-white/80 underline cursor-pointer"
          >
            {mode === "login"
              ? "계정이 없으신가요? 관리자 계정 등록"
              : "이미 계정이 있으신가요? 로그인하기"}
          </button>
        </div>

        <div className="mt-5 pt-4 border-t border-white/10 text-center">
          <p className="text-[11px] text-white/40">
            단축키 안내: <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white/70">Ctrl</kbd> + <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white/70">Shift</kbd> + <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white/70">A</kbd> 로 언제든지 열 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
