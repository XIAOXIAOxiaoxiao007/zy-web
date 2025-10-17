"use client";

import { useState } from "react";

export default function PostPage() {
  const [text, setText] = useState("");
  const disabled = text.trim().length === 0;
  return (
    <section className="max-w-screen-sm mx-auto px-4 pt-4 pb-20">
      <h1 className="text-xl font-semibold">发布（占位）</h1>
      <div className="mt-3 rounded-xl border bg-white shadow p-4">
        <textarea
          className="w-full h-36 p-3 border rounded-md bg-gray-50 focus:outline-none"
          placeholder="这一刻的想法...（演示占位，不会真正发布）"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="mt-3 flex justify-end">
          <button
            className={`px-3 py-1.5 rounded-md text-sm ${disabled ? "bg-gray-200 text-gray-500" : "bg-sky-600 text-white"}`}
            disabled={disabled}
            onClick={() => alert("这是占位按钮，不会真正发布。")}
          >
            发布
          </button>
        </div>
      </div>
    </section>
  );
}


