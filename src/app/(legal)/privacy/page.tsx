import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "隐私政策 | 最右风格复刻",
  description: "隐私政策占位内容，展示页面结构与导航。",
};

export default function PrivacyPage() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">隐私政策（占位）</h1>
      <p className="text-gray-700 leading-7">本页面为隐私政策占位内容，用于展示页面结构与导航。</p>
    </section>
  );
}


