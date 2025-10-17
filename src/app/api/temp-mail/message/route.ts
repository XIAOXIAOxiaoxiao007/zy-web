import { NextRequest, NextResponse } from "next/server";

function splitEmail(email: string | null | undefined) {
  if (!email) return null;
  const idx = email.indexOf("@");
  if (idx <= 0) return null;
  return { login: email.slice(0, idx), domain: email.slice(idx + 1) };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const id = searchParams.get("id");
  const parts = splitEmail(email);
  if (!parts || !id) {
    return NextResponse.json({ error: "invalid_params" }, { status: 400 });
  }
  const { login, domain } = parts;
  try {
    const resp = await fetch(
      `https://www.1secmail.com/api/v1/?action=readMessage&login=${encodeURIComponent(
        login
      )}&domain=${encodeURIComponent(domain)}&id=${encodeURIComponent(id)}`,
      { cache: "no-store" }
    );
    if (!resp.ok) {
      return NextResponse.json({ error: "upstream_error" }, { status: 502 });
    }
    const data = await resp.json();
    return NextResponse.json({ message: data });
  } catch {
    return NextResponse.json({ error: "network" }, { status: 500 });
  }
}


