import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
        url: "/vercel.svg",
        width: 1200,
        height: 630,
        alt: "OG Image",
      },
    ],
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "最右 - 风格相似复刻",
    description: "兴趣社区落地页复刻（占位内容）",
    images: ["/vercel.svg"],
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
