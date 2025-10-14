import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "用户协议 | 最右风格复刻",
  description: "用户协议占位内容，展示页面结构与导航。",
};

export default function TermsPage() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">用户协议（占位）</h1>
      <p className="text-gray-700 leading-7">本页面为用户协议占位内容，用于展示页面结构与导航。</p>
    </section>
  );
}


