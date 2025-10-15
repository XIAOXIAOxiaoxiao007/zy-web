# 轻量版 App 打包与发布（新手向）

前置：已将网站部署到线上（例如 Vercel），并在 `capacitor.config.ts` 的 `server.url` 指向线上地址。

## 一次性准备
1. 安装依赖
   ```bash
   npm i -D @capacitor/cli @capacitor/android @capacitor/ios
   npm i @capacitor/core
   ```
2. 添加平台
   ```bash
   npm run cap:add:android
   # 可选：npx cap add ios
   ```

## 每次更新流程
1. 确保线上已更新（Vercel 部署成功）
2. 同步 Capacitor 项目
   ```bash
   npm run cap:sync
   ```
3. 打开 Android Studio
   ```bash
   npm run cap:open:android
   ```
4. 调试与打包
   - 连接真机或模拟器 Run
   - 发布：Build → Generate Signed Bundle/APK（建议 AAB 提交 Play Console）

## 常见问题
- 页面空白/跨域：请确认 `capacitor.config.ts` 的 `server.url` 为 `https://你的域名`，且网络可达
- PWA 安装图标：放置 `public/icons/icon-192.png`、`icon-512.png` 并已在 `manifest` 中声明
- 深色状态栏等原生 UI：可在 Android 端 `MainActivity`/`styles.xml` 调整，或用 Capacitor 社区插件

更多能力（推送、存储、权限）后续可以按需接入 Capacitor 插件。
