import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { features, testimonials, faq } from "@/content/home";

export const metadata: Metadata = {
  title: "亮点合集 | 最右风格复刻",
  description: "功能亮点、用户反馈与常见问题（占位）",
};

export default function HighlightsPage() {
  return (
    <section className="container mx-auto px-4 py-16">
      {/* Features */}
      <div className="py-6 sm:py-8">
        <Reveal>
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">功能亮点（占位）</h1>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, idx) => (
            <Reveal key={f.title} delayMs={idx === 0 ? 0 : idx === 1 ? 80 : 120}>
              <div className="p-6 rounded-xl border bg-white">
                <div className="flex items-center gap-3 mb-3">
                  <Image src={f.icon.src} alt={f.icon.alt} width={28} height={28} />
                  <span className="font-semibold">{f.title}</span>
                </div>
                <p className="text-gray-600 text-sm">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-6 sm:py-8">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">用户反馈（占位）</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <Reveal key={idx} delayMs={idx === 0 ? 0 : idx === 1 ? 80 : 120}>
              <blockquote className="p-6 rounded-xl border bg-white text-sm text-gray-700">{t}</blockquote>
            </Reveal>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="py-6 sm:py-8">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">常见问题（占位）</h2>
        </Reveal>
        <div className="space-y-3">
          {faq.map((item, idx) => (
            <details key={idx} className="group rounded-xl border bg-white p-4">
              <summary className="cursor-pointer list-none font-medium">{item.q}</summary>
              <p className="mt-2 text-sm text-gray-600">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}


