import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "未成年人保护 | 最右风格复刻",
  description: "未成年人保护政策占位内容，展示页面结构与导航。",
};

export default function YouthProtectionPage() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">未成年人保护（占位）</h1>
      <p className="text-gray-700 leading-7">本页面为未成年人保护政策占位内容，用于展示页面结构与导航。</p>
    </section>
  );
}


