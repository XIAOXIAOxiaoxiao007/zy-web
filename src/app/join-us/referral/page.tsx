import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "我要内推 | 最右风格复刻",
  description: "同事/朋友内推渠道（占位）。",
};

export default function ReferralPage() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-4">我要内推</h1>
      <p className="text-gray-700">同事/朋友内推渠道（占位）。</p>
    </section>
  );
}


