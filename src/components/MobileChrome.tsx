"use client";

import MobileTopTabs from "@/components/MobileTopTabs";
import MobileBottomBar from "@/components/MobileBottomBar";
import { usePathname } from "next/navigation";

export default function MobileChrome() {
  const pathname = usePathname();
  const showTopTabs = false; // 顶部频道切换由首页内部控制
  const tabRoutes = new Set(["/feed", "/channels", "/post", "/messages", "/profile"]);
  const showBottomBar = tabRoutes.has(pathname);
  return (
    <>
      {showTopTabs && <MobileTopTabs />}
      {showBottomBar && <MobileBottomBar />}
    </>
  );
}


