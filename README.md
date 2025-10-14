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
