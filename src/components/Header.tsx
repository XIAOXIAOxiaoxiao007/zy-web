"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="border-b bg-white/70 backdrop-blur">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="logo" width={32} height={32} className="h-8 w-8" />
          <span className="font-semibold text-lg">最右</span>
        </div>
		<button
			className="sm:hidden inline-flex items-center justify-center p-2 rounded-md border text-gray-700"
			aria-label="切换导航"
			aria-controls="mobile-menu"
			onClick={() => setMenuOpen((v) => !v)}
		>
          <span className="block h-0.5 w-5 bg-current mb-1"></span>
          <span className="block h-0.5 w-5 bg-current mb-1"></span>
          <span className="block h-0.5 w-5 bg-current"></span>
        </button>
		<nav className="hidden sm:flex items-center gap-6 text-sm text-gray-700">
			<Link href="/" className="hover:text-black">首页</Link>
			<Link href="/about" className="hover:text-black">公司介绍</Link>
			<Link href="/join-us" className="hover:text-black">加入我们</Link>
			<Link href="/feedback" className="hover:text-black">意见反馈</Link>
			<a href="https://www.ixiaochuan.cn/" target="_blank" rel="noopener noreferrer" className="hover:text-black">最右网页版</a>
		</nav>
      </div>
		{menuOpen && (
			<div id="mobile-menu" className="sm:hidden border-t">
				<nav className="container mx-auto px-4 py-3 flex flex-col gap-3 text-sm text-gray-700">
					<Link href="/" className="hover:text-black" onClick={() => setMenuOpen(false)}>首页</Link>
					<Link href="/about" className="hover:text-black" onClick={() => setMenuOpen(false)}>公司介绍</Link>
					<Link href="/join-us" className="hover:text-black" onClick={() => setMenuOpen(false)}>加入我们</Link>
					<Link href="/feedback" className="hover:text-black" onClick={() => setMenuOpen(false)}>意见反馈</Link>
					<a href="https://www.ixiaochuan.cn/" target="_blank" rel="noopener noreferrer" className="hover:text-black" onClick={() => setMenuOpen(false)}>最右网页版</a>
				</nav>
        </div>
      )}
    </header>
  );
}
