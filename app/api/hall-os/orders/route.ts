import { NextResponse } from "next/server";
import { appendSyncEvent, getHallState, recalculatePayouts, saveHallState, stockAvailable, type OrderLine } from "@/lib/hall-os/state";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function lineTotal(lines: OrderLine[]) {
  return lines.reduce((sum, line) => sum + Number(line.price || 0) * Number(line.qty || 0), 0);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const lines = Array.isArray(body.lines) ? body.lines as OrderLine[] : [];
    const validLines = lines
      .map(line => ({ ...line, qty: Number(line.qty || 0), price: Number(line.price || 0) }))
      .filter(line => line.itemId && line.vendorId && line.qty > 0);

    if (!validLines.length) {
      return NextResponse.json({ error: "EMPTY_ORDER" }, { status: 400 });
    }

    const state = await getHallState();
    for (const line of validLines) {
      const row = state.inventory.find(item => item.itemId === line.itemId);
      if (row && line.qty > stockAvailable(row)) {
        appendSyncEvent(state, "correction", "Oversell blocked", `${line.name} request exceeded ${stockAvailable(row)} sellable units`);
        await saveHallState(state);
        return NextResponse.json({ error: "INSUFFICIENT_STOCK", itemId: line.itemId, sellable: stockAvailable(row) }, { status: 409 });
      }
    }

    const channel = String(body.channel || body.meta?.channel || "app");
    state.inventory = state.inventory.map(row => {
      const sold = validLines.filter(line => line.itemId === row.itemId).reduce((sum, line) => sum + line.qty, 0);
      if (!sold) return row;
      return {
        ...row,
        onHand: Math.max(0, row.onHand - sold),
        reserved: Math.max(0, row.reserved - sold),
        lastChannel: channel,
        discrepancy: null,
      };
    });

    const vendorIds = Array.from(new Set(validLines.map(line => line.vendorId)));
    const subtotal = lineTotal(validLines);
    const total = Number((subtotal + subtotal * 0.08125).toFixed(2));
    const order = {
      id: ++state.nextOrderSeq,
      lines: validLines,
      vendorIds,
      total,
      placed: Date.now(),
      meta: { ...(body.meta || {}), pickup: body.pickup, channel },
      tracks: vendorIds.map(vendorId => ({ vendorId, status: "received" })),
    };

    state.orders = [order, ...state.orders].slice(0, 100);
    appendSyncEvent(state, channel, "Sale adjusted central stock", `${validLines.reduce((sum, line) => sum + line.qty, 0)} units synced across POS, online, kiosk, and vendor panels`);
    recalculatePayouts(state);
    await saveHallState(state);

    return NextResponse.json({ order, state });
  } catch (error) {
    return NextResponse.json({ error: "ORDER_FAILED", message: error instanceof Error ? error.message : "Unable to place order" }, { status: 500 });
  }
}
