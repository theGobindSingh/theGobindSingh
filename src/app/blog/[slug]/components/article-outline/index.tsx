"use client";

import type { BlogOutlineItem } from "@lib/blog";
import { useEffect, useRef, useState } from "react";

const ArticleOutline = ({ outline }: { outline: BlogOutlineItem[] }) => {
  const [activeId, setActiveId] = useState(outline[0]?.id);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const headings = outline
      .map((item) => {
        return document.getElementById(item.id);
      })
      .filter((node): node is HTMLElement => {
        return Boolean(node);
      });
    if (headings.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => {
          return entry.isIntersecting;
        });
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-15% 0px -70% 0px" },
    );

    headings.forEach((node) => {
      observerRef.current?.observe(node);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [outline]);

  if (outline.length === 0) return null;

  const itemMapper = (item: BlogOutlineItem) => {
    const isActive = item.id === activeId;
    return (
      <li key={item.id}>
        <a
          href={`#${item.id}`}
          aria-current={isActive ? "location" : undefined}
          className={`block border-l text-(size:--fs-3xs) transition-colors duration-(--dur-fast) ${
            isActive
              ? "border-accent-600 pl-4 text-grey-950"
              : "border-grey-300 pl-4 text-grey-500 hover:text-grey-900"
          }`}
        >
          {item.text}
        </a>
      </li>
    );
  };

  return (
    <nav aria-label="Table of contents" className="flex flex-col gap-4">
      <h2 className="font-mono text-(size:--fs-4xs) font-medium tracking-widest text-grey-500 uppercase">
        On this page
      </h2>
      <ul className="flex flex-col gap-3">{outline.map(itemMapper)}</ul>
    </nav>
  );
};

export default ArticleOutline;
