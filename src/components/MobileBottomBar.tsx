"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/feed", label: "主页", icon: "🏠" },
  { href: "/discover", label: "发现", icon: "🔎" },
  { href: "/post", label: "发布", icon: "➕" },
  { href: "/messages", label: "消息", icon: "💬" },
  { href: "/profile", label: "我的", icon: "🙂" },
];

export default function MobileBottomBar() {
  const pathname = usePathname();
  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 border-t bg-white/95 backdrop-blur">
      <div className="max-w-screen-sm mx-auto px-4 h-14 grid grid-cols-5">
        {items.map((it) => {
          const active = pathname === it.href;
          return (
            <Link
              key={it.href}
              href={it.href}
              className={
                "flex flex-col items-center justify-center text-xs " +
                (active ? "text-black" : "text-gray-600")
              }
            >
              <span className="text-xl leading-none">{it.icon}</span>
              <span>{it.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}


