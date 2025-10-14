export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 mt-16">
      <div className="container mx-auto px-4 py-8 text-xs text-gray-600 space-y-2">
        <div>北京某某科技有限公司 © 2025</div>
        <div>备案号：京ICP备XXXXXX号 | 公安备案：京公网安备 XXXXXXXXXXXXXX</div>
        <div>网络文化经营许可证：京网文〔2025〕XXXX-XXX号</div>
        <div>举报与联系方式：400-000-0000 | service@example.com</div>
        <div className="flex flex-wrap gap-4">
          <a className="underline" href="#">最右搜图</a>
          <a className="underline" href="/privacy">隐私政策</a>
          <a className="underline" href="/terms">用户协议</a>
          <a className="underline" href="/youth">未成年人保护</a>
        </div>
      </div>
    </footer>
  );
}
