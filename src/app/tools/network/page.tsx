export const metadata = {
  title: "合规网络工具 · 代理配置生成器",
};

import NetworkConfigGenerator from "@/components/NetworkConfigGenerator";

export default function Page(): JSX.Element {
  return (
    <main className="container mx-auto px-4 py-10">
      <NetworkConfigGenerator />
    </main>
  );
}


