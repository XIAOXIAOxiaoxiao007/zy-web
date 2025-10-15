import DownloadButtons from "@/components/DownloadButtons";
import Reveal from "@/components/Reveal";
import Image from "next/image";
import Link from "next/link";
import { hero } from "@/content/home";

export default function HomePage() {
  return (
    <section className="container mx-auto px-4">
      <div className="py-16 sm:py-24 grid md:grid-cols-2 gap-10 items-center">
        <Reveal>
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 text-xs text-gray-500">
              {hero.badges.map((b) => (
                <span key={b}>{b}</span>
              ))}
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">{hero.title}</h1>
            <p className="text-gray-600 text-base sm:text-lg">{hero.subtitle}</p>
            <DownloadButtons />
          </div>
        </Reveal>
        <div className="flex md:justify-end">
          <Reveal delayMs={120}>
            <div className="w-full md:w-auto">
              <Image
                src={hero.image.src}
                alt={hero.image.alt}
                width={hero.image.width}
                height={hero.image.height}
                className="w-full md:w-[360px] h-auto rounded-2xl border"
                priority
              />
            </div>
          </Reveal>
        </div>
      </div>

      {/* CTA to highlights */}
      <div className="py-12 sm:py-16">
        <div className="flex items-center justify-between rounded-xl border bg-white p-6">
          <div>
            <h2 className="text-xl font-semibold mb-1">更多内容在「亮点合集」</h2>
            <p className="text-sm text-gray-600">功能亮点、用户反馈与常见问题已移至新页面。</p>
          </div>
          <Link href="/highlights" className="px-4 py-2 rounded-md border text-sm hover:bg-gray-50">前往查看</Link>
        </div>
      </div>
    </section>
  );
}
