"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const items = [
  {
    href: "/feed",
    label: "主页",
    iconActiveSrc: "/icons/home-active.png",
    iconInactiveSrc: "/icons/home-inactive.png",
  } as const,
  {
    href: "/channels",
    label: "圈子",
    iconActiveSrc: "/icons/circles-active.png",
    iconInactiveSrc: "/icons/circles-inactive.png",
  } as const,
  {
    href: "/post",
    label: "发布",
    iconActiveSrc: "/icons/post-active.png",
    iconInactiveSrc: "/icons/post-inactive.png",
  } as const,
  {
    href: "/messages",
    label: "消息",
    iconActiveSrc: "/icons/messages-active.png",
    iconInactiveSrc: "/icons/messages-inactive.png",
  } as const,
  // 使用图片作为“我的”图标，区分选中与未选中两种状态
  {
    href: "/profile",
    label: "我的",
    iconActiveSrc: "/icons/my-active.png",
    iconInactiveSrc: "/icons/my-inactive.png",
  } as const,
] as const;

export default function MobileBottomBar() {
  const pathname = usePathname();
  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-white/95 backdrop-blur pb-[env(safe-area-inset-bottom)]">
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
              {"iconActiveSrc" in it ? (
                <Image
                  src={active ? it.iconActiveSrc : it.iconInactiveSrc}
                  alt={it.label}
                  width={22}
                  height={22}
                  className="leading-none"
                />
              ) : (
                <span className="text-xl leading-none">{(it as any).icon}</span>
              )}
              <span>{it.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}


