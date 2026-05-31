import { NextResponse } from "next/server";
import { appendSyncEvent, getHallState, saveHallState } from "@/lib/hall-os/state";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const allowedStatuses = new Set(["received", "queued", "cooking", "ready", "collected"]);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const orderId = Number(body.orderId);
    const vendorId = String(body.vendorId || "");
    const status = String(body.status || "");

    if (!Number.isFinite(orderId) || !vendorId || !allowedStatuses.has(status)) {
      return NextResponse.json({ error: "INVALID_STATUS_UPDATE" }, { status: 400 });
    }

    const state = await getHallState();
    const order = state.orders.find(item => item.id === orderId);
    if (!order) return NextResponse.json({ error: "ORDER_NOT_FOUND" }, { status: 404 });

    const hasVendor = order.vendorIds.includes(vendorId);
    if (!hasVendor) return NextResponse.json({ error: "VENDOR_NOT_IN_ORDER" }, { status: 404 });

    order.tracks = order.tracks.map(track => track.vendorId === vendorId ? { ...track, status } : track);
    appendSyncEvent(state, vendorId, "Vendor fulfillment status updated", `Order #${orderId} moved to ${status}`);
    await saveHallState(state);

    return NextResponse.json({ order, state });
  } catch (error) {
    return NextResponse.json({ error: "STATUS_UPDATE_FAILED", message: error instanceof Error ? error.message : "Unable to update status" }, { status: 500 });
  }
}
