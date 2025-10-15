import type { CapacitorConfig } from "@capacitor/cli";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zy-web-phi.vercel.app";

const config: CapacitorConfig = {
  appId: "com.zy.web",
  appName: "最右轻量版",
  webDir: "out", // not used when server.url is set
  server: {
    url: siteUrl,
    cleartext: false,
  },
  android: {
    allowMixedContent: false,
  },
};

export default config;


