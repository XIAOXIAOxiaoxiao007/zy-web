import type { CapacitorConfig } from "@capacitor/cli";

// Prefer explicit CAP_SERVER_URL (e.g. http://10.0.2.2:3000 for local),
// otherwise fall back to NEXT_PUBLIC_SITE_URL.
const siteUrl =
  process.env.CAP_SERVER_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://zy-web-phi.vercel.app";

const config: CapacitorConfig = {
  appId: "com.zy.web",
  appName: "最右轻量版",
  webDir: "out", // not used when server.url is set
  server: {
    url: siteUrl,
    cleartext: siteUrl.startsWith("http://"),
  },
  android: {
    allowMixedContent: false,
  },
};

export default config;


