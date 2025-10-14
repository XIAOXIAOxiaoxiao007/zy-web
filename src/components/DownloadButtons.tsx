export default function DownloadButtons() {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3">
      <a className="px-4 py-2 rounded-md bg-black text-white text-sm" href="#">App Store</a>
      <a className="px-4 py-2 rounded-md bg-green-600 text-white text-sm" href="#">Android 下载</a>
      <a className="px-4 py-2 rounded-md border text-sm" href="#">最右网页版</a>
      <div className="flex items-center gap-2">
        <img src="/qr.svg" alt="下载二维码" className="h-14 w-14 border rounded" />
        <span className="text-xs text-gray-600">扫码下载</span>
      </div>
    </div>
  );
}


