"use client";

import MobileTopTabs from "@/components/MobileTopTabs";
import MobileBottomBar from "@/components/MobileBottomBar";
import { usePathname } from "next/navigation";

export default function MobileChrome() {
  const pathname = usePathname();
  const showTopTabs = pathname === "/feed"; // 仅底部“首页”路由显示
  return (
    <>
      {showTopTabs && <MobileTopTabs />}
      <MobileBottomBar />
    </>
  );
}


