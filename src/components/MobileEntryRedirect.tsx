"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = { delayMs?: number; fadeDurationMs?: number };

export default function MobileEntryRedirect({ delayMs = 2000 }: Props) {
  const router = useRouter();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    // 暂时仅在桌面环境执行跳转，避免移动端白屏问题；待确认后再恢复
    const isSmallScreen = typeof window !== "undefined" && window.innerWidth < 768;
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const isMobileUA = /Android|iPhone|iPad|iPod|Mobile|wv/i.test(ua);
    if (isSmallScreen || isMobileUA) return;

    setStarted(true);
    const t2 = setTimeout(() => {
      try {
        router.replace("/feed");
      } catch {}
      // Fallback: ensure navigation even if router fails (e.g., WebView quirks)
      setTimeout(() => {
        try {
          if (typeof window !== "undefined" && window.location.pathname !== "/feed") {
            window.location.href = "/feed";
          }
        } catch {}
      }, 1200);
    }, delayMs);
    return () => {
      clearTimeout(t2);
    };
  }, [delayMs, router]);

  // No visual overlay to avoid white-screen blocking in some WebViews
  return started ? null : null;
}


