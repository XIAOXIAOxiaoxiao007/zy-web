import type { CapacitorConfig } from "@capacitor/cli";

// Prefer explicit CAP_SERVER_URL (e.g. http://10.0.2.2:3000 for local),
// otherwise fall back to NEXT_PUBLIC_SITE_URL.
const siteUrl =
  process.env.CAP_SERVER_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://zy-web-phi.vercel.app";

const config: CapacitorConfig = {
  appId: "com.zy.web",
  appName: "誰的喵",
  webDir: "out", // not used when server.url is set
  server: {
    url: siteUrl,
    cleartext: siteUrl.startsWith("http://"),
  },
  android: {
    // 开发调试阶段放开混合内容，避免 http 子资源导致白屏；上线请改回 false
    allowMixedContent: true,
  },
};

export default config;


