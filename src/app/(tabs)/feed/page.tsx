"use client";

import { useEffect, useMemo, useState } from "react";
import MobileTopTabs from "@/components/MobileTopTabs";

const MOEMAIL_URL = "https://qqemail.eu.org/moe";
const US_ID_URL = "https://www.xgjs4.cc/project-1020/doc-2219/?entryScene=zhida_05_001&jump_from=1_13_18_00";
const EMAIL_REGEX = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;

type TabKey = "feed" | "channels" | "video" | "images";

export default function FeedPage() {
  const [detectedEmail, setDetectedEmail] = useState("");
  const [activeTab, setActiveTab] = useState<TabKey>("feed");
  const [messages, setMessages] = useState<Array<{ id: number; from: string; subject: string; date: string }>>([]);
  const [polling, setPolling] = useState(false);
  const [detail, setDetail] = useState<null | { id: number; subject: string; from: string; date: string; body: string; otp?: string }>(null);
  const [virtualPhone, setVirtualPhone] = useState<null | { e164: string; national: string }>(null);
  const [usIdOpening, setUsIdOpening] = useState(false);
  const commonAreas: Array<{ code: string; name: string }> = [
    { code: "212", name: "New York, NY" },
    { code: "213", name: "Los Angeles, CA" },
    { code: "305", name: "Miami, FL" },
    { code: "415", name: "San Francisco, CA" },
    { code: "617", name: "Boston, MA" },
  ];
  const subtitle = useMemo(
    () => (detectedEmail ? `已检测邮箱：${detectedEmail}` : "这里展示推荐内容流（占位）。"),
    [detectedEmail]
  );

  useEffect(() => {
    let handle: any = null;
    (async () => {
      try {
        const { App } = await import("@capacitor/app");
        const { Clipboard } = await import("@capacitor/clipboard");
        const ret: any = App.addListener("appStateChange", async ({ isActive }) => {
          if (!isActive) return;
          try {
            const { value } = await Clipboard.read();
            if (value) {
              const match = value.match(EMAIL_REGEX);
              if (match && match[0]) setDetectedEmail(match[0]);
            }
          } catch {}
        });
        if (ret && typeof ret.then === "function") {
          ret.then((h: any) => {
            handle = h;
          }).catch(() => {});
        } else {
          handle = ret;
        }
      } catch {}
    })();
    return () => {
      try { handle && handle.remove && handle.remove(); } catch {}
    };
  }, []);

  async function handleGenerateTempMail() {
    try {
      const res = await fetch("/api/temp-mail", { cache: "no-store" });
      const json = await res.json();
      if (json?.email) {
        setDetectedEmail(json.email);
        try {
          const { Clipboard } = await import("@capacitor/clipboard");
          await Clipboard.write({ string: json.email });
        } catch {}
        return;
      }
      // fallback：仍可打开 MoeMail 手动创建
      try {
        const { Browser } = await import("@capacitor/browser");
        await Browser.open({ url: MOEMAIL_URL, presentationStyle: "fullscreen" });
      } catch {
        try { window.open(MOEMAIL_URL, "_blank"); } catch {}
      }
    } catch {
      try {
        const { Browser } = await import("@capacitor/browser");
        await Browser.open({ url: MOEMAIL_URL, presentationStyle: "fullscreen" });
      } catch {
        try { window.open(MOEMAIL_URL, "_blank"); } catch {}
      }
    }
  }

  async function handleReadClipboard() {
    try {
      const { Clipboard } = await import("@capacitor/clipboard");
      const { value } = await Clipboard.read();
      if (value) {
        const match = value.match(EMAIL_REGEX);
        if (match && match[0]) setDetectedEmail(match[0]);
      }
    } catch {}
  }

  return (
    <>
    <MobileTopTabs active={activeTab} onChange={setActiveTab} />
    <section className="container mx-auto px-4 pt-14 pb-6 sm:py-10">
      {/* 顶部视觉横幅 */}
      <div className="relative mb-4">
        <div className="h-28 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 shadow-lg" />
        <div className="absolute inset-0 flex items-center justify-between px-5">
          <div className="text-white">
            <div className="text-lg font-semibold drop-shadow-sm">你好，欢迎回来</div>
            <div className="text-xs opacity-90">看看今天有什么新鲜事</div>
          </div>
          <a href="/post" className="px-3 py-1.5 rounded-full bg-white/90 text-gray-900 text-xs border shadow">
            + 发帖
          </a>
        </div>
      </div>
      {activeTab === "feed" && (
      <>
      <div className="mb-4 rounded-2xl border bg-white/90 backdrop-blur p-4 shadow-sm ring-1 ring-black/5">
        <div className="text-base font-semibold flex items-center gap-2">
          <span className="h-6 w-6 rounded bg-sky-100 text-sky-600 flex items-center justify-center">✉️</span>
          临时邮箱
        </div>
        <div className="mt-3 flex items-center gap-2">
          <button onClick={handleGenerateTempMail} className="px-2.5 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs transition active:scale-95">
            一键创建临时邮箱
          </button>
          <button onClick={handleReadClipboard} className="px-2.5 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-900 text-xs border transition active:scale-95">
            从剪贴板读取
          </button>
          <button
            onClick={async () => {
              if (!detectedEmail) return; // 没有邮箱时不启用
              setPolling((p) => !p);
            }}
            className={
              "px-2.5 py-1.5 rounded-md text-xs transition active:scale-95 " +
              (detectedEmail ? "bg-green-600 hover:bg-green-700 text-white" : "bg-gray-200 text-gray-500 cursor-not-allowed")
            }
            disabled={!detectedEmail}
          >
            {polling ? "停止轮询" : "开始轮询收件"}
          </button>
        </div>
        {detectedEmail && (
          <div className="mt-2 text-sm text-gray-700 truncate">{detectedEmail}</div>
        )}
        {detectedEmail && (
          <div className="mt-2 flex items-center gap-2">
            <button
              onClick={async () => {
                try {
                  const res = await fetch(`/api/temp-mail/messages?email=${encodeURIComponent(detectedEmail)}`, { cache: "no-store" });
                  const json = await res.json();
                  setMessages(Array.isArray(json?.messages) ? json.messages : []);
                } catch {}
              }}
              className="px-2.5 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-900 text-xs border transition active:scale-95"
            >
              立即刷新
            </button>
          </div>
        )}
        {polling && detectedEmail && (
          <>
            <Poller email={detectedEmail} onData={setMessages} />
            {messages.length === 0 && (
              <div className="mt-3 space-y-2">
                {[0,1,2].map((i) => (
                  <div key={i} className="h-12 rounded-md bg-gray-100 animate-pulse" />
                ))}
              </div>
            )}
          </>
        )}
        {messages.length > 0 && (
          <div className="mt-3 border-t pt-3">
            <div className="text-sm font-medium mb-2">收件箱</div>
            <ul className="space-y-2 text-sm">
              {messages.map((m) => (
                <li key={m.id} className="p-2 border rounded hover:bg-gray-50 cursor-pointer" onClick={async () => {
                  try {
                    const res = await fetch(`/api/temp-mail/message?email=${encodeURIComponent(detectedEmail)}&id=${m.id}`, { cache: "no-store" });
                    const json = await res.json();
                    const raw = json?.message?.textBody || json?.message?.htmlBody || "";
                    const text = typeof raw === "string" ? raw : JSON.stringify(raw);
                    const otp = extractOtp(text);
                    setDetail({ id: m.id, subject: m.subject, from: m.from, date: m.date, body: text, otp: otp || undefined });
                  } catch {}
                }}>
                  <div className="font-medium">{m.subject || "(无主题)"}</div>
                  <div className="text-gray-600 text-xs">{m.from} · {m.date}</div>
                </li>
              ))}
            </ul>
            {detail && (
              <MessageModal
                detail={detail}
                onClose={() => setDetail(null)}
              />
            )}
          </div>
        )}
      </div>

      {/* 网络工具导航 */}
      <div className="mb-4 rounded-2xl border bg-white/90 backdrop-blur p-4 shadow-sm ring-1 ring-black/5">
        <div className="text-base font-semibold flex items-center gap-2">
          <span className="h-6 w-6 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center">🛠️</span>
          网络工具
        </div>
        <div className="text-xs text-gray-600 mt-1">合规网络工具 · 代理配置生成器</div>
        <div className="mt-3">
          <a href="/tools/network" className="px-3 py-1.5 rounded-md bg-white hover:bg-gray-50 text-gray-900 text-xs border shadow-sm inline-flex items-center gap-1 transition active:scale-95">
            <span>前往使用</span>
            <span>↗</span>
          </a>
        </div>
      </div>

      {/* 美区ID 快捷入口 */}
      <div className="mb-4 rounded-2xl border bg-white/90 backdrop-blur p-4 shadow-sm ring-1 ring-black/5">
        <div className="text-base font-semibold flex items-center gap-2">
          <span className="h-6 w-6 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center">🆔</span>
          美区ID
        </div>
        <div className="text-xs text-gray-600 mt-1">点击打开网页查看教程与账号信息。</div>
        <div className="mt-3">
          <button
            onClick={async () => {
              if (usIdOpening) return;
              setUsIdOpening(true);
              try {
                const { Browser } = await import("@capacitor/browser");
                await Browser.open({ url: US_ID_URL, presentationStyle: "fullscreen" });
              } catch {
                try { window.open(US_ID_URL, "_blank"); } catch {}
              } finally {
                setTimeout(() => setUsIdOpening(false), 600);
              }
            }}
            disabled={usIdOpening}
            className={
              "px-3 py-1.5 rounded-md text-xs transition-all active:scale-95 " +
              (usIdOpening ? "bg-indigo-300 text-white" : "bg-indigo-600 text-white hover:bg-indigo-700")
            }
          >
            {usIdOpening ? "打开中…" : "打开美区ID网页"}
          </button>
        </div>
      </div>

      {/* 美国虚拟手机号 */}
      <div className="mb-4 rounded-2xl border bg-white/90 backdrop-blur p-4 shadow-sm ring-1 ring-black/5">
        <div className="text-base font-semibold flex items-center gap-2">
          <span className="h-6 w-6 rounded bg-emerald-100 text-emerald-600 flex items-center justify-center">📱</span>
          美国虚拟手机号（演示）
        </div>
        <div className="text-xs text-gray-600 mt-1">生成符合 NANP 的号码格式，仅供测试占位。</div>
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-700">常见区号：</span>
            <div className="flex gap-1">
              {commonAreas.map((a) => (
                <button key={a.code} className="px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-900 border transition active:scale-95" onClick={async () => {
                  try {
                    const res = await fetch(`/api/virtual-phone?area=${a.code}`, { cache: "no-store" });
                    const json = await res.json();
                    if (json?.e164 && json?.national) {
                      setVirtualPhone({ e164: json.e164, national: json.national });
                      try { const { Clipboard } = await import("@capacitor/clipboard"); await Clipboard.write({ string: json.e164 }); } catch {}
                    }
                  } catch {}
                }}>{a.code}</button>
              ))}
            </div>
          </div>
          <button
            onClick={async () => {
              try {
                const res = await fetch("/api/virtual-phone", { cache: "no-store" });
                const json = await res.json();
                if (json?.e164 && json?.national) {
                  setVirtualPhone({ e164: json.e164, national: json.national });
                  try { const { Clipboard } = await import("@capacitor/clipboard"); await Clipboard.write({ string: json.e164 }); } catch {}
                }
              } catch {}
            }}
            className="px-2.5 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-xs transition active:scale-95"
          >
            生成美国号码
          </button>
          {virtualPhone && (
            <button
              onClick={async () => { try { const { Clipboard } = await import("@capacitor/clipboard"); await Clipboard.write({ string: virtualPhone.e164 }); } catch {} }}
              className="px-2.5 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-900 text-xs border transition active:scale-95"
            >
              复制 E.164
            </button>
          )}
        </div>
        {virtualPhone && (
          <div className="mt-2 text-sm text-gray-700">
            <div>E.164：{virtualPhone.e164}</div>
            <div>本地：{virtualPhone.national}</div>
          </div>
        )}
      </div>
      </>
      )}

      {activeTab === "feed" && (
        <>
          <h1 className="text-xl font-semibold mb-3">推荐（占位）</h1>
          <p className="text-gray-600 text-sm">{subtitle}</p>
        </>
      )}
      {activeTab === "channels" && (
        <div className="text-gray-700">频道内容（占位）</div>
      )}
      {activeTab === "video" && (
        <div className="text-gray-700">视频内容（占位）</div>
      )}
      {activeTab === "images" && (
        <div className="text-gray-700">图文内容（占位）</div>
      )}
    </section>
    </>
  );
}

function Poller({ email, onData }: { email: string; onData: (list: any[]) => void }) {
  useEffect(() => {
    let timer: any;
    let cancelled = false;
    async function tick() {
      try {
        const res = await fetch(`/api/temp-mail/messages?email=${encodeURIComponent(email)}`, { cache: "no-store" });
        const json = await res.json();
        if (!cancelled) onData(Array.isArray(json?.messages) ? json.messages : []);
      } catch {}
      if (!cancelled) timer = setTimeout(tick, 5000);
    }
    tick();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [email, onData]);
  return null;
}

function extractOtp(text: string): string | null {
  // 常见 4-8 位数字验证码
  const m = text.match(/\b(\d{4,8})\b/);
  return m ? m[1] : null;
}

function MessageModal({ detail, onClose }: { detail: { id: number; subject: string; from: string; date: string; body: string; otp?: string }; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 max-w-screen-sm w-[92%] bg-white rounded-xl border shadow p-4">
        <div className="flex items-center justify-between">
          <div className="text-base font-semibold">{detail.subject || "(无主题)"}</div>
          <button onClick={onClose} className="text-gray-500 text-sm">关闭</button>
        </div>
        <div className="text-xs text-gray-600 mt-1">{detail.from} · {detail.date}</div>
        {detail.otp && (
          <div className="mt-3 flex items-center gap-2">
            <div className="text-sm font-medium">验证码：{detail.otp}</div>
            <button
              onClick={async () => {
                try { const { Clipboard } = await import("@capacitor/clipboard"); await Clipboard.write({ string: detail.otp! }); } catch {}
              }}
              className="px-2 py-1 rounded bg-blue-600 text-white text-xs"
            >复制验证码</button>
          </div>
        )}
        <pre className="mt-3 max-h-72 overflow-auto whitespace-pre-wrap text-xs text-gray-800 bg-gray-50 p-3 rounded">{detail.body}</pre>
      </div>
    </div>
  );
}


