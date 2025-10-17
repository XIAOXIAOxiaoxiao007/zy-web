import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null as any;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");
    if (!uid) return NextResponse.json({ error: "missing_uid" }, { status: 400 });

    if (!supabase) {
      // Demo fallback: no remote
      return NextResponse.json({ demo: true, profile: null });
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("uid,name,avatarDataUrl")
      .eq("uid", uid)
      .maybeSingle();
    if (error) return NextResponse.json({ error: "db_error" }, { status: 500 });
    return NextResponse.json({ profile: data || null });
  } catch {
    return NextResponse.json({ error: "server" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { uid, name = "", avatarDataUrl = null } = body ?? {};
    if (!uid || typeof name !== "string") {
      return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
    }

    if (!supabase) {
      // Demo fallback: accept but not persist
      return NextResponse.json({ ok: true, demo: true });
    }

    const payload: any = { uid, name: name.slice(0, 60) };
    if (avatarDataUrl && typeof avatarDataUrl === "string") {
      payload.avatarDataUrl = avatarDataUrl.slice(0, 2_000_000);
    }

    const { error } = await supabase.from("profiles").upsert(payload, { onConflict: "uid" });
    if (error) return NextResponse.json({ error: "db_error" }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "server" }, { status: 500 });
  }
}


