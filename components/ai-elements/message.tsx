"use client";

import { Streamdown } from "streamdown";

export function MessageResponse({ children }: { children: string }) {
  return <Streamdown>{children}</Streamdown>;
}
