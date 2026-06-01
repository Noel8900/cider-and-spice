import { NextResponse } from "next/server";
import {
  clearBusinessPlanAccessCookie,
  isPasscodeConfigured,
  setBusinessPlanAccessCookie,
  verifyPasscode,
} from "@/lib/business-plan/auth";

export async function POST(req: Request) {
  if (!isPasscodeConfigured()) {
    return NextResponse.json(
      { error: "Business plan passcode is not configured." },
      { status: 503 },
    );
  }

  const { passcode } = (await req.json()) as { passcode?: string };

  if (!passcode || !verifyPasscode(passcode)) {
    return NextResponse.json({ error: "Invalid passcode." }, { status: 401 });
  }

  await setBusinessPlanAccessCookie();
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  await clearBusinessPlanAccessCookie();
  return NextResponse.json({ ok: true });
}
