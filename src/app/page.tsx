import DownloadButtons from "@/components/DownloadButtons";
import Image from "next/image";

export default function HomePage() {
  return (
    <section className="container mx-auto px-4">
      <div className="py-16 sm:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 text-xs text-gray-500">
            <span>最右</span>
            <span>皮皮</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">最右APP - 我的快乐源泉</h1>
          <p className="text-gray-600 text-base sm:text-lg">年轻人都在用、超有趣的兴趣社区。搞笑视频、脑洞神评，让你笑不停（占位文案）。</p>
          <DownloadButtons />
        </div>
        <div className="flex md:justify-end">
          <div className="w-full md:w-auto">
            <Image
              src="/hero.svg"
              alt="App 截图占位"
              width={360}
              height={320}
              className="w-full md:w-[360px] h-auto rounded-2xl border"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
