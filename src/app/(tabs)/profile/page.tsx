import Image from "next/image";

export default function ProfilePage() {
  return (
    <section className="max-w-screen-sm mx-auto px-4 pb-20">
      {/* 顶部横幅（占满到统计模块），统计作为上层覆盖在横幅内 */}
      <div className="relative mt-3">
        <div className="h-44 bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl" />
        {/* 头像与昵称 */}
        <div className="absolute top-4 left-4 right-4 flex items-center">
          <Image src="/hero.svg" alt="avatar" width={64} height={64} className="h-16 w-16 rounded-full border-4 border-white bg-white mr-3" />
          <div className="text-white drop-shadow-sm">
            <div className="text-xl font-bold">爱吃章鱼烧炸至金黄</div>
            <div className="text-xs opacity-90 mt-1">最右ID：751221 ♂</div>
          </div>
        </div>
        {/* 统计卡片（位于横幅之上） */}
        <div className="absolute -bottom-4 left-0 right-0 px-4 z-10">
          <div className="grid grid-cols-3 text-center bg-white rounded-xl shadow-lg border">
            <div className="py-3">
              <div className="text-lg font-semibold">527</div>
              <div className="text-xs text-gray-500">获赞</div>
            </div>
            <div className="py-3 border-l">
              <div className="text-lg font-semibold">52</div>
              <div className="text-xs text-gray-500">关注</div>
            </div>
            <div className="py-3 border-l">
              <div className="text-lg font-semibold">4</div>
              <div className="text-xs text-gray-500">粉丝</div>
            </div>
          </div>
        </div>
      </div>
      {/* 占位让下面内容不被覆盖 */}
      <div className="h-8" />

      {/* Quick row actions */}
      <div className="mt-6 grid grid-cols-5 text-center bg-white rounded-xl p-4 border shadow">
        {[
          { label: "帖子", icon: "🧾" },
          { label: "评论", icon: "💬" },
          { label: "收藏", icon: "📁" },
          { label: "插眼", icon: "👁️" },
          { label: "赞过", icon: "👍" },
        ].map((it) => (
          <div key={it.label} className="flex flex-col items-center gap-1">
            <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg">{it.icon}</div>
            <div className="text-xs text-gray-700">{it.label}</div>
          </div>
        ))}
      </div>

      {/* Blocks */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl border p-4 bg-amber-50 shadow">
          <div className="text-gray-900 font-medium">小说中心</div>
          <div className="text-xs text-gray-500 mt-1">精选好文</div>
        </div>
        <div className="rounded-xl border p-4 bg-green-50 shadow">
          <div className="text-gray-900 font-medium">成为作者</div>
          <div className="text-xs text-gray-500 mt-1">丰厚收益</div>
        </div>
        <div className="rounded-xl border p-4 bg-sky-50 shadow">
          <div className="text-gray-900 font-medium">小游戏</div>
          <div className="text-xs text-gray-500 mt-1">10秒上头</div>
        </div>
        <div className="rounded-xl border p-4 bg-orange-50 shadow">
          <div className="text-gray-900 font-medium">最右小店</div>
          <div className="text-xs text-gray-500 mt-1">周边好物</div>
        </div>
      </div>

      {/* More services */}
      <div className="mt-4 rounded-xl border p-4 bg-white shadow">
        <div className="text-sm font-semibold mb-3">更多服务</div>
        <div className="grid grid-cols-4 gap-4 text-center">
          {[
            "夜间模式",
            "浏览历史",
            "我的背包",
            "折学进修班",
            "1分钟免广",
            "yo玩小游戏",
            "AI笔友",
            "emo急诊",
            "章鱼信箱",
            "最右文化街",
            "每日一言",
            "活动中心",
          ].map((label) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center">🔹</div>
              <div className="text-xs text-gray-700">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 末尾横幅已并入顶部，此处删除 */}
    </section>
  );
}


