# 最右风格相似复刻（占位内容）

- 技术栈：Next.js 15 + Tailwind CSS + TypeScript
- 部署：Vercel（推送仓库后一键部署）

## 本地开发
```bash
npm run dev
```

## 说明
- 本项目仅复刻页面结构与交互，所有文案与图片为占位，避免版权风险。
- 参考站点：[最右官网](https://www.ixiaochuan.cn/)

## 环境变量
在部署或本地需要生成站点地图/OG 链接时使用：

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 一键部署（Vercel）
1. 将代码推送到 GitHub/GitLab/Bitbucket 仓库。
2. 打开 Vercel，导入该仓库。
3. 在 Project Settings → Environment Variables 配置：
   - `NEXT_PUBLIC_SITE_URL` = 你的域名（例如 `https://your-domain.com`）
4. 触发部署。
5. 验证以下路由：
   - `/robots.txt`（由 `app/robots.ts` 生成）
   - `/sitemap.xml`（由 `app/sitemap.ts` 生成）

若需命令行部署：
```bash
npx vercel --prod
```

## 后端与数据（可选：Supabase）
1. 在 Supabase 创建项目，开启匿名 Key（anon）。
2. 在 Table Editor 新建表 `feedback`：
   - `id` bigint (PK, default identity)
   - `email` text
   - `content` text
   - `created_at` timestamptz default now()
3. 复制 Project URL 与 anon Key，填入环境变量：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. 访问 `/feedback` 提交数据，API 位于 `app/api/feedback/route.ts`。

## 轻量 APP 打包（思路）
- 使用 Capacitor 将 Next.js 站点打包成安卓/苹果应用外壳：
  - `npx cap init`，`npx cap add android`/`ios`，`npx cap sync`
  - Next 产物 `next build && next export` 或使用 `next start` + WebView 加载线上地址
  - Android Studio/Xcode 打包上架（需开发者账号）
 具体指令会在后续文档补充。
