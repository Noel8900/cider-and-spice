import { NextResponse } from "next/server";
import { getHallState } from "@/lib/hall-os/state";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json(await getHallState());
  } catch (error) {
    return NextResponse.json({ error: "STATE_UNAVAILABLE", message: error instanceof Error ? error.message : "Unable to load state" }, { status: 500 });
  }
}
