import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "加入我们 | 最右风格复刻",
  description: "校园招聘、社会招聘与内推入口（占位）。",
};

export default function JoinUsPage() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">加入我们</h1>
      <p className="text-gray-700 mb-8">我们在寻找对社区、内容、技术与增长有热情的伙伴（占位）。欢迎投递校园/社会招聘，或通过内推加入。</p>
      <div className="flex flex-wrap gap-3">
        <Link href="/join-us/campus" className="px-4 py-2 rounded-md border">校园招聘</Link>
        <Link href="/join-us/social" className="px-4 py-2 rounded-md border">社会招聘</Link>
        <Link href="/join-us/referral" className="px-4 py-2 rounded-md border">我要内推</Link>
      </div>
    </section>
  );
}


