import Image from "next/image";

export default function DownloadButtons() {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3">
      <a className="px-4 py-2 rounded-md bg-black text-white text-sm focus:outline-none focus:ring-2 focus:ring-black/30" href="#download-ios" aria-label="iOS 版本下载（占位）">App Store</a>
      <a className="px-4 py-2 rounded-md bg-green-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30" href="#download-android" aria-label="Android 版本下载（占位）">Android 下载</a>
      <a className="px-4 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-gray-400/30" href="https://www.ixiaochuan.cn/" target="_blank" rel="noopener noreferrer" aria-label="打开最右网页版（新窗口）">最右网页版</a>
      <div className="flex items-center gap-2">
        <Image src="/qr.svg" alt="下载二维码" width={56} height={56} className="h-14 w-14 border rounded" />
        <span className="text-xs text-gray-600">扫码下载</span>
      </div>
    </div>
  );
}


