"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { ensureDefaultProfile } from "@/lib/userProfile";

const STORAGE_KEY = "auth_token";

function generateToken(seed: string): string {
  try {
    if (typeof crypto !== "undefined" && crypto.getRandomValues) {
      const arr = new Uint8Array(16);
      crypto.getRandomValues(arr);
      return (
        Array.from(arr)
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("") + ":" + btoa(unescape(encodeURIComponent(seed))).slice(0, 16)
      );
    }
  } catch {}
  return (
    Math.random().toString(16).slice(2) + Date.now().toString(16) + ":" + btoa(seed).slice(0, 8)
  );
}

export default function AuthGate() {
  const pathname = usePathname();
  const [loaded, setLoaded] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    try {
      const t = localStorage.getItem(STORAGE_KEY);
      setHasToken(!!t);
    } catch {}
    setLoaded(true);
  }, []);

  const disabled = useMemo(() => {
    return submitting || account.trim().length === 0 || password.trim().length < 8;
  }, [submitting, account, password]);

  if (!loaded) return null;
  // 不在首页('/')显示登录弹窗，仅在跳转到应用主页面后显示
  if (pathname === "/") return null;
  if (hasToken) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur" />
      <div className="relative z-10 w-[92%] max-w-sm rounded-2xl border bg-white p-5 shadow-xl">
        <div className="text-lg font-semibold">登录</div>
        <div className="text-xs text-gray-600 mt-1">请登录后使用应用功能。</div>
        <form
          className="mt-4 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (disabled) return;
            setSubmitting(true);
            try {
              const token = generateToken(account + "|" + password);
              localStorage.setItem(STORAGE_KEY, token);
              ensureDefaultProfile(account);
              setHasToken(true);
            } catch {
            } finally {
              setSubmitting(false);
            }
          }}
        >
          <div>
            <label className="block text-xs text-gray-600 mb-1">账号（邮箱/手机号均可）</label>
            <input
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm"
              placeholder="you@example.com / 138****0000"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">密码（至少 8 位）</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm"
              placeholder="请输入密码"
            />
          </div>
          <button
            type="submit"
            disabled={disabled}
            className={
              "w-full rounded-md px-3 py-2 text-sm transition active:scale-95 " +
              (disabled ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-black text-white")
            }
          >
            {submitting ? "登录中…" : "登录 / 注册"}
          </button>
        </form>
      </div>
    </div>
  );
}


