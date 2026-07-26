"use client";

import type { HTMLAttributes, PropsWithChildren } from "react";
import { useEffect, useRef } from "react";

/**
 * Content is fully visible in the SSR markup; the "hidden" classes are only ever
 * added client-side after mount, so crawlers and no-JS visitors never see them.
 */
const PENDING_CLASSES = ["opacity-0", "translate-y-4"];

const ScrollReveal = ({
  children,
  className,
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    node.classList.add(...PENDING_CLASSES);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.classList.remove(...PENDING_CLASSES);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-(--dur-reveal) ease-(--ease-out) ${className ?? ""}`.trim()}
      {...rest}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
