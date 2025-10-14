import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">页面走丢了</h1>
      <p className="text-gray-600">返回首页继续逛逛吧。</p>
      <Link href="/" className="inline-block mt-6 px-4 py-2 rounded-md border">回到首页</Link>
    </section>
  );
}


