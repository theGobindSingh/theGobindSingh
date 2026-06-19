"use client";

import { ReactLenis } from "lenis/react";
import type { PropsWithChildren } from "react";

export default function LenisProvider({ children }: PropsWithChildren) {
  return <ReactLenis root>{children}</ReactLenis>;
}
