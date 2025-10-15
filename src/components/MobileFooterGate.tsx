"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

export default function MobileFooterGate() {
  const pathname = usePathname();
  // 在移动端隐藏“底部导航”对应的所有 Tab 页（/feed、/discover、/post、/messages、/profile）
  const hiddenTabs = ["/feed", "/discover", "/post", "/messages", "/profile"];
  if (hiddenTabs.includes(pathname)) return null;
  return (
    <div className="sm:hidden">
      <Footer />
    </div>
  );
}


