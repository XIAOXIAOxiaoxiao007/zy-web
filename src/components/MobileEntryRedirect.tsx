"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = { delayMs?: number; fadeDurationMs?: number };

export default function MobileEntryRedirect({ delayMs = 2000, fadeDurationMs = 600 }: Props) {
  const router = useRouter();
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Only redirect on small screens or mobile user agents
    const isSmallScreen = typeof window !== "undefined" && window.innerWidth < 768;
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const isMobileUA = /Android|iPhone|iPad|iPod|Mobile|wv/i.test(ua);
    if (!(isSmallScreen || isMobileUA)) return;

    const fadeStart = Math.max(0, delayMs - fadeDurationMs);
    const t1 = setTimeout(() => setFade(true), fadeStart);
    const t2 = setTimeout(() => router.replace("/feed"), delayMs);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [delayMs, fadeDurationMs, router]);

  return (
    <div
      className={
        "fixed inset-0 z-50 bg-white transition-opacity duration-500 pointer-events-none " +
        (fade ? "opacity-100" : "opacity-0")
      }
      aria-hidden
    />
  );
}


