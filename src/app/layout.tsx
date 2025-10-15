import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileFooterGate from "@/components/MobileFooterGate";
import HideStatusBar from "@/components/HideStatusBar";
import Script from "next/script";
import MobileChrome from "@/components/MobileChrome";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"),
  title: {
    default: "最右 - 风格相似复刻",
    template: "%s | 最右风格复刻",
  },
  description: "兴趣社区落地页复刻（占位内容）",
  openGraph: {
    title: "最右 - 风格相似复刻",
    description: "兴趣社区落地页复刻（占位内容）",
    url: "/",
    siteName: "最右风格复刻",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "最右风格复刻 OG",
      },
    ],
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "最右 - 风格相似复刻",
    description: "兴趣社区落地页复刻（占位内容）",
    images: ["/og.svg"],
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-192.png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-white text-gray-900`}> 
        <Script id="sw-register" strategy="afterInteractive">
          {`
            if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').catch(() => {});
              });
            }
          `}
        </Script>
        <HideStatusBar />
        <div className="hidden sm:block">
          <Header />
        </div>
        <MobileChrome />
        <main className="flex-1 pb-16 sm:pb-0">{children}</main>
        {/* 桌面端展示完整 Footer；移动端主页隐藏备案区域 */}
        <div className="hidden sm:block">
          <Footer />
        </div>
        <MobileFooterGate />
      </body>
    </html>
  );
}
