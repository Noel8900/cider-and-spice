'use client';

import { useRef, useCallback } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Transform {
  scale: number;
  x: number;
  y: number;
}

interface UseFloorPlanInteractionOptions {
  minScale?: number;
  maxScale?: number;
  onTransformChange: (t: Transform) => void;
  getContainerRect: () => DOMRect | null;
  getCurrentTransform: () => Transform;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
// Extracts all pan / pinch / wheel / keyboard interaction logic out of
// FloorPlanClient so the component stays focused on rendering.

export function useFloorPlanInteraction({
  minScale = 0.75,
  maxScale = 3,
  onTransformChange,
  getContainerRect,
  getCurrentTransform,
}: UseFloorPlanInteractionOptions) {
  const isPanning   = useRef(false);
  const panStart    = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const pinchDist   = useRef<number | null>(null);
  const pinchScale  = useRef(1);
  const rafPending  = useRef<number | null>(null);

  // Flush transform on next animation frame — throttles React re-renders
  const scheduleFlush = useCallback((next: Transform) => {
    if (rafPending.current !== null) return;
    rafPending.current = requestAnimationFrame(() => {
      rafPending.current = null;
      onTransformChange(next);
    });
  }, [onTransformChange]);

  const cancelFlush = useCallback(() => {
    if (rafPending.current !== null) {
      cancelAnimationFrame(rafPending.current);
      rafPending.current = null;
    }
  }, []);

  // ── Wheel zoom (desktop) ──────────────────────────────────────────────────
  const onWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const rect = getContainerRect();
    if (!rect) return;
    const prev   = getCurrentTransform();
    const delta  = e.deltaY > 0 ? -0.12 : 0.12;
    const next   = Math.min(Math.max(prev.scale + delta, minScale), maxScale);
    const ratio  = next / prev.scale;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    scheduleFlush({
      scale: next,
      x: mouseX - ratio * (mouseX - prev.x),
      y: mouseY - ratio * (mouseY - prev.y),
    });
  }, [getContainerRect, getCurrentTransform, minScale, maxScale, scheduleFlush]);

  // ── Mouse pan ─────────────────────────────────────────────────────────────
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    isPanning.current = true;
    const prev = getCurrentTransform();
    panStart.current = { x: e.clientX, y: e.clientY, tx: prev.x, ty: prev.y };
  }, [getCurrentTransform]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning.current) return;
    const prev = getCurrentTransform();
    scheduleFlush({
      scale: prev.scale,
      x: panStart.current.tx + e.clientX - panStart.current.x,
      y: panStart.current.ty + e.clientY - panStart.current.y,
    });
  }, [getCurrentTransform, scheduleFlush]);

  const onMouseUp = useCallback(() => { isPanning.current = false; }, []);

  // ── Touch pan + pinch ─────────────────────────────────────────────────────
  function getTouchDist(touches: React.TouchList) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isPanning.current = true;
      const prev = getCurrentTransform();
      panStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, tx: prev.x, ty: prev.y };
    } else if (e.touches.length === 2) {
      isPanning.current = false;
      pinchDist.current  = getTouchDist(e.touches);
      pinchScale.current = getCurrentTransform().scale;
    }
  }, [getCurrentTransform]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    const prev = getCurrentTransform();
    if (e.touches.length === 1 && isPanning.current) {
      scheduleFlush({
        scale: prev.scale,
        x: panStart.current.tx + e.touches[0].clientX - panStart.current.x,
        y: panStart.current.ty + e.touches[0].clientY - panStart.current.y,
      });
    } else if (e.touches.length === 2 && pinchDist.current !== null) {
      const ratio = getTouchDist(e.touches) / pinchDist.current;
      scheduleFlush({
        ...prev,
        scale: Math.min(Math.max(pinchScale.current * ratio, minScale), maxScale),
      });
    }
  }, [getCurrentTransform, minScale, maxScale, scheduleFlush]);

  const onTouchEnd = useCallback(() => {
    isPanning.current = false;
    pinchDist.current = null;
  }, []);

  // ── Swipe-to-dismiss helper (for mobile stall drawer) ─────────────────────
  const swipeStartY   = useRef<number | null>(null);
  const swipeThreshold = 80; // px

  const onDrawerTouchStart = useCallback((e: React.TouchEvent) => {
    swipeStartY.current = e.touches[0].clientY;
  }, []);

  const onDrawerTouchEnd = useCallback(
    (e: React.TouchEvent, onDismiss: () => void) => {
      if (swipeStartY.current === null) return;
      const delta = e.changedTouches[0].clientY - swipeStartY.current;
      if (delta > swipeThreshold) onDismiss();
      swipeStartY.current = null;
    },
    []
  );

  return {
    isPanning,
    onWheel,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onDrawerTouchStart,
    onDrawerTouchEnd,
    cancelFlush,
  };
}
