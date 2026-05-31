import { NextResponse } from "next/server";
import { appendSyncEvent, getHallState, saveHallState } from "@/lib/hall-os/state";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const qty = Math.max(1, Number(body.qty || 0));
    const state = await getHallState();
    const key = String(body.itemId || body.sku || "");
    let updated = null;
    state.inventory = state.inventory.map(row => {
      if (row.itemId !== key && row.sku !== key) return row;
      updated = { ...row, onHand: row.onHand + qty, incoming: Math.max(0, row.incoming - qty), discrepancy: null, lastChannel: "restock" };
      return updated;
    });
    if (!updated) return NextResponse.json({ error: "ITEM_NOT_FOUND" }, { status: 404 });
    appendSyncEvent(state, "restock", "Restock validated", `${qty} units added to ${key} and published to every channel`);
    await saveHallState(state);
    return NextResponse.json({ row: updated, state });
  } catch (error) {
    return NextResponse.json({ error: "RESTOCK_FAILED", message: error instanceof Error ? error.message : "Unable to restock" }, { status: 500 });
  }
}
