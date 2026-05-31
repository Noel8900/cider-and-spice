import { NextResponse } from "next/server";
import { appendSyncEvent, getHallState, recalculatePayouts, saveHallState } from "@/lib/hall-os/state";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const state = await getHallState();
    recalculatePayouts(state);
    appendSyncEvent(state, "accounting", "Vendor payouts recalculated", "Rent, marketplace fees, and remittance totals refreshed");
    await saveHallState(state);
    return NextResponse.json({ state });
  } catch (error) {
    return NextResponse.json({ error: "PAYOUT_FAILED", message: error instanceof Error ? error.message : "Unable to recalculate payouts" }, { status: 500 });
  }
}
