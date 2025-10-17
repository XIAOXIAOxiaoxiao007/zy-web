"use client";

import React from "react";

type ProxyScheme = "http" | "socks5";

function buildAuthString(username: string, password: string): string {
  if (!username && !password) return "";
  if (username && !password) return `${encodeURIComponent(username)}@`;
  if (!username && password) return `:${encodeURIComponent(password)}@`;
  return `${encodeURIComponent(username)}:${encodeURIComponent(password)}@`;
}

function buildEndpoint(
  scheme: ProxyScheme,
  host: string,
  port: string,
  username: string,
  password: string
): string {
  const auth = buildAuthString(username, password);
  const cleanedHost = host.trim().replace(/^\s*\/+|\s+$/g, "");
  const cleanedPort = port.trim();
  if (!cleanedHost || !cleanedPort) return "";
  return `${scheme}://${auth}${cleanedHost}:${cleanedPort}`;
}

export default function NetworkConfigGenerator(): JSX.Element {
  const [scheme, setScheme] = React.useState<ProxyScheme>("http");
  const [host, setHost] = React.useState<string>("");
  const [port, setPort] = React.useState<string>("");
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const [bashEnv, setBashEnv] = React.useState<string>("");
  const [pwshEnv, setPwshEnv] = React.useState<string>("");
  const [pacFile, setPacFile] = React.useState<string>("");
  const [npmrc, setNpmrc] = React.useState<string>("");
  const [curlCmd, setCurlCmd] = React.useState<string>("");

  const [error, setError] = React.useState<string>("");

  function copyToClipboard(text: string): void {
    if (!text) return;
    navigator.clipboard?.writeText(text).catch(() => {});
  }

  function generate(): void {
    setError("");

    if (!host.trim() || !port.trim()) {
      setError("请填写 Host 与 Port。");
      return;
    }

    const endpoint = buildEndpoint(scheme, host, port, username, password);
    if (!endpoint) {
      setError("请确认 Host 与 Port 正确。");
      return;
    }

    const isSocks = scheme === "socks5";
    const pacDirective = isSocks
      ? `SOCKS5 ${host.trim()}:${port.trim()}`
      : `PROXY ${host.trim()}:${port.trim()}`;

    const bash = [
      `export HTTP_PROXY="${endpoint}"`,
      `export HTTPS_PROXY="${endpoint}"`,
      `export NO_PROXY="localhost,127.0.0.1,::1"`
    ].join("\n");

    const pwsh = [
      `$env:HTTP_PROXY="${endpoint}"`,
      `$env:HTTPS_PROXY="${endpoint}"`,
      `$env:NO_PROXY="localhost,127.0.0.1,::1"`
    ].join("\n");

    const pac = [
      "function FindProxyForURL(url, host) {",
      `  return "${pacDirective}; DIRECT";`,
      "}"
    ].join("\n");

    const npm = [
      `proxy=${endpoint}`,
      `https-proxy=${endpoint}`,
      `strict-ssl=false`
    ].join("\n");

    const curl = `curl -x ${endpoint} https://example.com -I`;

    setBashEnv(bash);
    setPwshEnv(pwsh);
    setPacFile(pac);
    setNpmrc(npm);
    setCurlCmd(curl);
  }

  const fieldClass =
    "block w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500";
  const labelClass = "text-sm font-medium text-gray-700";
  const sectionClass = "rounded-xl border border-gray-200 p-4 bg-white";

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">合规网络工具 · 代理配置生成器</h2>
        <p className="text-sm text-gray-600">
          根据你自有且合法的代理地址，一键生成环境变量、PAC、npmrc 与 curl 示例。
        </p>
      </div>

      <div className={sectionClass}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="proxy-scheme" className={labelClass}>协议</label>
            <select
              id="proxy-scheme"
              className={fieldClass}
              value={scheme}
              onChange={(e) => setScheme(e.target.value as ProxyScheme)}
            >
              <option value="http">http</option>
              <option value="socks5">socks5</option>
            </select>
          </div>

          <div>
            <label htmlFor="proxy-host" className={labelClass}>Host</label>
            <input
              id="proxy-host"
              className={fieldClass}
              placeholder="例如：proxy.example.com 或 10.0.0.2"
              value={host}
              onChange={(e) => setHost(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="proxy-port" className={labelClass}>Port</label>
            <input
              id="proxy-port"
              className={fieldClass}
              placeholder="例如：8080"
              value={port}
              onChange={(e) => setPort(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="proxy-username" className={labelClass}>用户名（可选）</label>
            <input
              id="proxy-username"
              className={fieldClass}
              placeholder="如需认证可填写"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="proxy-password" className={labelClass}>密码（可选）</label>
            <input
              id="proxy-password"
              className={fieldClass}
              type="password"
              placeholder="如需认证可填写"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="pt-4 flex items-center gap-3">
          <button
            onClick={generate}
            className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white text-sm font-medium hover:bg-indigo-700 transition active:scale-95"
          >
            一键生成
          </button>
          {error ? <span className="text-sm text-red-600">{error}</span> : null}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={sectionClass}>
          <div className="mb-2 flex items-center justify-between">
            <h3 id="bash-env-label" className="font-medium">Bash 环境变量</h3>
            <button onClick={() => copyToClipboard(bashEnv)} className="text-indigo-600 text-sm transition active:scale-95">复制</button>
          </div>
          <textarea aria-labelledby="bash-env-label" readOnly className="w-full h-40 text-sm whitespace-pre rounded-md border border-gray-200 p-2" value={bashEnv} />
        </div>

        <div className={sectionClass}>
          <div className="mb-2 flex items-center justify-between">
            <h3 id="pwsh-env-label" className="font-medium">PowerShell 环境变量</h3>
            <button onClick={() => copyToClipboard(pwshEnv)} className="text-indigo-600 text-sm transition active:scale-95">复制</button>
          </div>
          <textarea aria-labelledby="pwsh-env-label" readOnly className="w-full h-40 text-sm whitespace-pre rounded-md border border-gray-200 p-2" value={pwshEnv} />
        </div>

        <div className={sectionClass}>
          <div className="mb-2 flex items-center justify-between">
            <h3 id="pac-label" className="font-medium">PAC 文件</h3>
            <button onClick={() => copyToClipboard(pacFile)} className="text-indigo-600 text-sm transition active:scale-95">复制</button>
          </div>
          <textarea aria-labelledby="pac-label" readOnly className="w-full h-40 text-sm whitespace-pre rounded-md border border-gray-200 p-2" value={pacFile} />
        </div>

        <div className={sectionClass}>
          <div className="mb-2 flex items-center justify-between">
            <h3 id="npmrc-label" className="font-medium">.npmrc 片段</h3>
            <button onClick={() => copyToClipboard(npmrc)} className="text-indigo-600 text-sm transition active:scale-95">复制</button>
          </div>
          <textarea aria-labelledby="npmrc-label" readOnly className="w-full h-40 text-sm whitespace-pre rounded-md border border-gray-200 p-2" value={npmrc} />
        </div>

        <div className={sectionClass}>
          <div className="mb-2 flex items-center justify-between">
            <h3 id="curl-label" className="font-medium">curl 测试命令</h3>
            <button onClick={() => copyToClipboard(curlCmd)} className="text-indigo-600 text-sm transition active:scale-95">复制</button>
          </div>
          <textarea aria-labelledby="curl-label" readOnly className="w-full h-28 text-sm whitespace-pre rounded-md border border-gray-200 p-2" value={curlCmd} />
        </div>
      </div>

      <p className="text-xs text-gray-500">
        请仅在遵守当地法律与组织政策前提下使用；本工具不会生成任何第三方代理节点信息。
      </p>
    </div>
  );
}


