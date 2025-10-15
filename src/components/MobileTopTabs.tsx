"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/feed", label: "推荐" },
  { href: "/channels", label: "频道" },
  { href: "/video", label: "视频" },
  { href: "/images", label: "图文" },
];

export default function MobileTopTabs() {
  const pathname = usePathname();
  return (
    <div className="sm:hidden fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur border-b">
      <div className="max-w-screen-sm mx-auto px-4 h-11 flex items-center justify-between">
        <div className="flex items-center gap-3 text-base font-medium">
          {tabs.map((t) => {
            const active = pathname === t.href;
            return (
              <Link
                key={t.href}
                href={t.href}
                className={
                  "px-1 pb-0.5 " + (active ? "text-black border-b-2 border-black" : "text-gray-600")
                }
              >
                {t.label}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-3 text-xl">
          <Link aria-label="搜索" href="/search">🔍</Link>
        </div>
      </div>
    </div>
  );
}


