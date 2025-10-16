"use client";

import { useEffect } from "react";

export default function HideStatusBar() {
  useEffect(() => {
    const isSmall = typeof window !== "undefined" && window.innerWidth < 768;
    if (!isSmall) return;
    let mod: typeof import("@capacitor/status-bar") | null = null;
    (async () => {
      try {
        mod = await import("@capacitor/status-bar");
        // 还原非沉浸式并隐藏状态栏（回退方案）
        await mod.StatusBar.setOverlaysWebView({ overlay: false });
        await mod.StatusBar.hide();
      } catch {
        // ignore if not running in Capacitor
      }
    })();
    return () => {
      mod?.StatusBar.show().catch(() => {});
    };
  }, []);
  return null;
}


