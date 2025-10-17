"use client";

import { useState } from "react";

type Tab = "alert" | "dm";

export default function MessagesPage() {
  const [tab, setTab] = useState<Tab>("alert");
  return (
    <section className="max-w-screen-sm mx-auto px-4 pt-4 pb-20">
      {/* 顶部切换 */}
      <div className="flex items-center justify-center gap-10 text-xl font-semibold">
        <button
          className={tab === "alert" ? "text-sky-600" : "text-gray-800"}
          onClick={() => setTab("alert")}
        >
          提醒
        </button>
        <button
          className={tab === "dm" ? "text-sky-600" : "text-gray-800"}
          onClick={() => setTab("dm")}
        >
          私信
        </button>
      </div>

      {/* 分类入口 */}
      <div className="mt-5 grid grid-cols-4 gap-4 text-center">
        {[
          { label: "小右通知", bg: "bg-pink-200", icon: "🔔" },
          { label: "收到的@", bg: "bg-sky-200", icon: "@" },
          { label: "插眼", bg: "bg-orange-200", icon: "👁️" },
          { label: "粉丝/好友", bg: "bg-yellow-200", icon: "👤" },
        ].map((it) => (
          <div key={it.label} className="flex flex-col items-center">
            <div className={`h-14 w-14 ${it.bg} rounded-full flex items-center justify-center text-xl border`}>{it.icon}</div>
            <div className="text-xs text-gray-700 mt-2">{it.label}</div>
          </div>
        ))}
      </div>

      {/* 筛选行 */}
      <div className="mt-5 flex items-center gap-2 text-gray-800">
        <div className="text-sky-600">🔵</div>
        <div className="font-medium">全部消息</div>
        <div className="text-gray-500">▾</div>
      </div>

      {/* 列表区域（占位） */}
      {tab === "alert" ? (
        <EmptyState />
      ) : (
        <DmList />
      )}
    </section>
  );
}

function EmptyState() {
  return (
    <div className="mt-20 text-center text-gray-500">
      <div className="text-6xl">😴</div>
      <div className="mt-2">网络一线牵，主动才有缘~</div>
    </div>
  );
}

function DmList() {
  const items = [
    { name: "折叠的官号消息", preview: "Yo教授：我是#最右主学...", date: "2024/11/5" },
    { name: "艾登(Aiden)", preview: "建议你直接起诉，您可以在原...", date: "2024/7/28" },
    { name: "十月初~（有票版）", preview: "我是#电视剧#的大话事...", date: "2024/7/23" },
    { name: "兔子那些事", preview: "谢谢你这么好看，还关注我。", date: "2024/6/30" },
  ];
  return (
    <div className="mt-4 divide-y border rounded-xl bg-white overflow-hidden">
      {items.map((it, idx) => (
        <div key={idx} className="p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">💬</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div className="font-medium truncate max-w-[70%]">{it.name}</div>
              <div className="text-xs text-gray-500">{it.date}</div>
            </div>
            <div className="text-xs text-gray-600 truncate">{it.preview}</div>
          </div>
          <div className="text-gray-400">⋯</div>
        </div>
      ))}
    </div>
  );
}


