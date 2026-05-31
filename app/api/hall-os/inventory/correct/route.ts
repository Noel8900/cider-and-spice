import { NextResponse } from "next/server";
import { appendSyncEvent, getHallState, saveHallState } from "@/lib/hall-os/state";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const state = await getHallState();
    const key = String(body.itemId || body.sku || "");
    let updated = null;
    state.inventory = state.inventory.map(row => {
      if (row.itemId !== key && row.sku !== key) return row;
      const corrected = Number.isFinite(Number(body.onHand)) ? Math.max(0, Number(body.onHand)) : Math.max(row.onHand, row.reserved + row.reorder);
      updated = { ...row, onHand: corrected, discrepancy: null, lastChannel: "correction" };
      return updated;
    });
    if (!updated) return NextResponse.json({ error: "ITEM_NOT_FOUND" }, { status: 404 });
    appendSyncEvent(state, "correction", "Inventory discrepancy resolved", `${key} reconciled and audit flag cleared`);
    await saveHallState(state);
    return NextResponse.json({ row: updated, state });
  } catch (error) {
    return NextResponse.json({ error: "CORRECTION_FAILED", message: error instanceof Error ? error.message : "Unable to correct inventory" }, { status: 500 });
  }
}
