import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "社会招聘 | 最右风格复刻",
  description: "社会招聘职位与投递渠道（占位）。",
};

export default function SocialJobsPage() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-4">社会招聘</h1>
      <p className="text-gray-700">职位与投递渠道（占位）。</p>
    </section>
  );
}


