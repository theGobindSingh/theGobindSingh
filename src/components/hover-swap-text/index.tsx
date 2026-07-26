"use client";

import { useEffect, useRef } from "react";

interface HoverSwapTextProps {
  label: string;
  secondary: string;
}

// Renders no visible content of its own — it's a marker that locates the
// static label text node among its parent <a>'s children (server-rendered,
// so SEO keeps seeing `label`) by matching content rather than position,
// then swaps the text in place with a native listener on hover. No React
// re-render involved.
const HoverSwapText = ({ label, secondary }: HoverSwapTextProps) => {
  const markerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const anchor = markerRef.current?.parentElement;
    const textNode = Array.from(anchor?.childNodes ?? []).find((node) => {
      return node.nodeType === Node.TEXT_NODE && node.textContent === label;
    });
    if (!anchor || !textNode) return;

    const display = secondary.includes("@") ? secondary : `@${secondary}`;
    const onEnter = () => {
      textNode.nodeValue = display;
    };
    const onLeave = () => {
      textNode.nodeValue = label;
    };

    anchor.addEventListener("mouseenter", onEnter);
    anchor.addEventListener("mouseleave", onLeave);
    return () => {
      anchor.removeEventListener("mouseenter", onEnter);
      anchor.removeEventListener("mouseleave", onLeave);
    };
  }, [label, secondary]);

  return <span ref={markerRef} aria-hidden="true" className="hidden" />;
};

export default HoverSwapText;
