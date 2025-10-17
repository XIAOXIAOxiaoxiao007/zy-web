"use client";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b bg-white/70 backdrop-blur">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="logo" width={32} height={32} className="h-8 w-8" />
          <span className="font-semibold text-lg">最右</span>
        </div>
		<nav className="hidden sm:flex items-center gap-6 text-sm text-gray-700">
			<Link href="/" className="hover:text-black">首页</Link>
			<Link href="/highlights" className="hover:text-black">亮点合集</Link>
			<Link href="/about" className="hover:text-black">公司介绍</Link>
			<Link href="/join-us" className="hover:text-black">加入我们</Link>
			<Link href="/feedback" className="hover:text-black">意见反馈</Link>
			<a href="/feed" className="px-3 py-1.5 rounded-md border hover:bg-gray-50">进入应用</a>
			<a href="https://www.ixiaochuan.cn/" target="_blank" rel="noopener noreferrer" className="hover:text-black">最右网页版</a>
		</nav>
      </div>
    </header>
  );
}
