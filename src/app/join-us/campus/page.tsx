import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "校园招聘 | 最右风格复刻",
  description: "校园招聘职位与投递渠道（占位）。",
};

export default function CampusJobsPage() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-4">校园招聘</h1>
      <p className="text-gray-700">职位与投递渠道（占位）。</p>
    </section>
  );
}


