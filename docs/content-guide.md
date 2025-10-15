# 内容与素材替换指南

本项目将首页文案与素材集中在 `src/content/home.ts`：

- `hero`：头部区块（徽标文字、主标题、副标题与右侧图片）
- `features[]`：功能亮点列表（图标、标题、说明）
- `testimonials[]`：用户反馈文案数组
- `faq[]`：常见问题（问答）

替换步骤：
1. 修改 `src/content/home.ts` 中对应字段（文字或图片路径）。
2. 如需替换图片，将新文件放在 `public/` 目录，并在 `home.ts` 中引用相对路径（例如 `/your-image.svg`）。
3. 本地预览：`npm run dev`。
4. 无误后提交并推送到 Git：
   - `git add -A`
   - `git commit -m "chore: update homepage content and assets"`
   - `git push`

PWA 与分享图：
- Open Graph/Twitter 分享图在 `public/og.svg`，全局引用在 `src/app/layout.tsx` 的 `openGraph.images` 与 `twitter.images`。
- PWA `manifest` 在 `src/app/manifest.ts`，Service Worker 为 `public/sw.js`，如需离线缓存与缓存策略，可在 SW 中扩展。

部署后检查：
- 站点地图/机器人文件：`/sitemap.xml`、`/robots.txt`
- 分享卡片：将链接粘贴到社交平台预览；如需更换域名，更新 Vercel 的 `NEXT_PUBLIC_SITE_URL` 后重新部署。
