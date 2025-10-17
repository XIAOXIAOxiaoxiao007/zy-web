import { NextRequest, NextResponse } from "next/server";

// Demo-only generator for US-style virtual phone numbers.
// Pattern: +1 NXX-NXX-XXXX, where N=2-9 and X=0-9 (North American Numbering Plan basic constraint)
function randomUsNumber(preferredArea?: string | null) {
  function r(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const n = () => r(2, 9);
  const x = () => r(0, 9);
  let area = `${n()}${x()}${x()}`; // NXX
  if (preferredArea && /^[2-9][0-9]{2}$/.test(preferredArea)) {
    area = preferredArea;
  }
  const prefix = `${n()}${x()}${x()}`; // NXX
  const line = `${x()}${x()}${x()}${x()}`; // XXXX
  const e164 = `+1${area}${prefix}${line}`;
  const national = `(${area}) ${prefix}-${line}`;
  return { e164, national };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const area = searchParams.get("area");
  const { e164, national } = randomUsNumber(area);
  return NextResponse.json({ country: "US", e164, national });
}


