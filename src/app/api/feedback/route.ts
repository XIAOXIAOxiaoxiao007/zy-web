import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ error: "服务未配置" }, { status: 500 });
    }
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const body = await request.json().catch(() => ({}));
    const { email = "", content = "" } = body ?? {};
    if (!content || typeof content !== "string") {
      return NextResponse.json({ error: "内容必填" }, { status: 400 });
    }

    const { error } = await supabase
      .from("feedback")
      .insert({ email: String(email).slice(0, 120), content: String(content).slice(0, 2000) });

    if (error) {
      return NextResponse.json({ error: "保存失败" }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "服务异常" }, { status: 500 });
  }
}


