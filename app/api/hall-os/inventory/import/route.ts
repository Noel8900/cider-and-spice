import { NextResponse } from "next/server";
import { appendSyncEvent, getHallState, normalizeInventoryRow, saveHallState } from "@/lib/hall-os/state";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const rows = Array.isArray(body.rows) ? body.rows as Array<Record<string, unknown>> : [];
    const state = await getHallState();
    const byKey = new Map(state.inventory.map(row => [row.sku || row.itemId, row]));
    let imported = 0;
    let rejected = 0;
    for (const raw of rows) {
      const existing = state.inventory.find(row => (raw.sku && row.sku === raw.sku) || (raw.itemId && row.itemId === raw.itemId));
      const row = normalizeInventoryRow(raw, existing);
      if (!row) {
        rejected += 1;
        continue;
      }
      byKey.set(row.sku || row.itemId, { ...byKey.get(row.sku || row.itemId), ...row });
      imported += 1;
    }
    state.inventory = Array.from(byKey.values());
    appendSyncEvent(state, "excel", "Inventory file imported", `${imported} rows updated central stock${body.source ? ` from ${body.source}` : ""}`);
    await saveHallState(state);
    return NextResponse.json({ imported, rejected, state });
  } catch (error) {
    return NextResponse.json({ error: "IMPORT_FAILED", message: error instanceof Error ? error.message : "Unable to import inventory" }, { status: 500 });
  }
}
