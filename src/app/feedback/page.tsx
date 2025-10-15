"use client";

import { useState } from "react";

export default function FeedbackPage() {
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, content }),
    });
    const data = await res.json();
    if (res.ok) {
      setEmail("");
      setContent("");
      setStatus("提交成功，感谢反馈！");
    } else {
      setStatus(data?.error || "提交失败");
    }
  }

  return (
    <section className="container mx-auto px-4 py-16 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">意见反馈</h1>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">邮箱（可选）</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full rounded-md border px-3 py-2" placeholder="you@example.com" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">反馈内容</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required className="w-full rounded-md border px-3 py-2 min-h-32" placeholder="请填写你的建议或问题（必填）"></textarea>
        </div>
        <button type="submit" className="px-4 py-2 rounded-md bg-black text-white text-sm">提交</button>
        {status && <p className="text-sm text-gray-600">{status}</p>}
      </form>
    </section>
  );
}


