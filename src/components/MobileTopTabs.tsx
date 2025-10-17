"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { key: "feed", href: "/feed", label: "推荐" },
  { key: "channels", href: "/channels", label: "频道" },
  { key: "video", href: "/video", label: "视频" },
  { key: "images", href: "/images", label: "图文" },
] as const;

type TabKey = typeof tabs[number]["key"];

export default function MobileTopTabs(props?: { active?: TabKey; onChange?: (key: TabKey) => void }) {
  const pathname = usePathname();
  const controlled = !!props?.onChange;
  const activeKey: TabKey | null = controlled ? (props!.active ?? "feed") : null;
  return (
    <div
      className="sm:hidden fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur border-b safe-top"
    >
      <div className="max-w-screen-sm mx-auto px-4 h-12 relative flex items-center justify-center">
        <div className="flex-1 flex items-center justify-center">
          <div className="inline-flex items-center gap-1 bg-gray-100/80 rounded-full p-1 border shadow-inner">
            {tabs.map((t) => {
              const active = controlled ? activeKey === t.key : pathname === t.href;
              const base = "px-3 h-8 rounded-full text-sm transition-colors";
              if (controlled) {
                return (
                  <button
                    key={t.key}
                    onClick={() => props!.onChange!(t.key)}
                    className={
                      base + " " + (active ? "bg-white text-gray-900 shadow border" : "text-gray-600 hover:text-gray-900")
                    }
                  >
                    {t.label}
                  </button>
                );
              }
              return (
                <Link
                  key={t.href}
                  href={t.href}
                  className={
                    base + " " + (active ? "bg-white text-gray-900 shadow border" : "text-gray-600 hover:text-gray-900")
                  }
                >
                  {t.label}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="absolute right-4 flex items-center gap-3 text-xl">
          <Link aria-label="搜索" href="/search" className="hover:opacity-80">🔍</Link>
        </div>
      </div>
    </div>
  );
}


