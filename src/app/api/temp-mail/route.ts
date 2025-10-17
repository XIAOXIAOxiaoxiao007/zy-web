import { NextResponse } from "next/server";

// Generate a disposable email locally using 1secmail supported domains.
// No upstream request needed; inbox endpoints will work with any login@domain on first use.
export async function GET() {
  const domains = [
    "1secmail.com",
    "1secmail.org",
    "1secmail.net",
  ];
  const login = `u${Math.random().toString(36).slice(2, 10)}${Date.now()
    .toString(36)
    .slice(-4)}`;
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const email = `${login}@${domain}`;
  return NextResponse.json({ email });
}


