import DownloadButtons from "@/components/DownloadButtons";
import Reveal from "@/components/Reveal";
import Image from "next/image";

export default function HomePage() {
  return (
    <section className="container mx-auto px-4">
      <div className="py-16 sm:py-24 grid md:grid-cols-2 gap-10 items-center">
        <Reveal>
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 text-xs text-gray-500">
            <span>最右</span>
            <span>皮皮</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">最右APP - 我的快乐源泉</h1>
          <p className="text-gray-600 text-base sm:text-lg">年轻人都在用、超有趣的兴趣社区。搞笑视频、脑洞神评，让你笑不停（占位文案）。</p>
          <DownloadButtons />
        </div>
        </Reveal>
        <div className="flex md:justify-end">
          <Reveal delayMs={120}>
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
          </Reveal>
        </div>
      </div>

      {/* Features */}
      <div className="py-12 sm:py-16">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">功能亮点（占位）</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Reveal>
            <div className="p-6 rounded-xl border bg-white">
              <div className="flex items-center gap-3 mb-3">
                <Image src="/globe.svg" alt="话题社区" width={28} height={28} />
                <span className="font-semibold">话题社区</span>
              </div>
              <p className="text-gray-600 text-sm">围绕兴趣加入圈子，分享与发现同好内容。</p>
            </div>
          </Reveal>
          <Reveal delayMs={80}>
            <div className="p-6 rounded-xl border bg-white">
              <div className="flex items-center gap-3 mb-3">
                <Image src="/window.svg" alt="沉浸浏览" width={28} height={28} />
                <span className="font-semibold">沉浸浏览</span>
              </div>
              <p className="text-gray-600 text-sm">上下滑动即可连看内容，随时随地轻松娱乐。</p>
            </div>
          </Reveal>
          <Reveal delayMs={120}>
            <div className="p-6 rounded-xl border bg-white">
              <div className="flex items-center gap-3 mb-3">
                <Image src="/file.svg" alt="轻松创作" width={28} height={28} />
                <span className="font-semibold">轻松创作</span>
              </div>
              <p className="text-gray-600 text-sm">图片、视频一键发布，记录生活灵感与快乐。</p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-12 sm:py-16">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">用户反馈（占位）</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          <Reveal>
            <blockquote className="p-6 rounded-xl border bg-white text-sm text-gray-700">“碎片时间刷一会儿，笑点满满，压力也小了。”</blockquote>
          </Reveal>
          <Reveal delayMs={80}>
            <blockquote className="p-6 rounded-xl border bg-white text-sm text-gray-700">“评论区太有梗了，经常比正文还好看（doge）。”</blockquote>
          </Reveal>
          <Reveal delayMs={120}>
            <blockquote className="p-6 rounded-xl border bg-white text-sm text-gray-700">“功能简单好上手，爸妈也会用。”</blockquote>
          </Reveal>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-12 sm:py-16">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">常见问题（占位）</h2>
        </Reveal>
        <div className="space-y-3">
          <details className="group rounded-xl border bg-white p-4">
            <summary className="cursor-pointer list-none font-medium">是否支持 iOS 与 Android？</summary>
            <p className="mt-2 text-sm text-gray-600">支持，两端版本功能会有差异，具体以下载页为准（占位）。</p>
          </details>
          <details className="group rounded-xl border bg-white p-4">
            <summary className="cursor-pointer list-none font-medium">内容是否审核？</summary>
            <p className="mt-2 text-sm text-gray-600">采用机器与人工结合的方式进行内容审查（占位）。</p>
          </details>
          <details className="group rounded-xl border bg-white p-4">
            <summary className="cursor-pointer list-none font-medium">如何反馈问题？</summary>
            <p className="mt-2 text-sm text-gray-600">可通过 App 内“设置-反馈”或官网邮箱联系（占位）。</p>
          </details>
        </div>
      </div>
    </section>
  );
}
