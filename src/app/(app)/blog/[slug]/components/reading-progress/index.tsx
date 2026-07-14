"use client";

import { useEffect, useState } from "react";

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const scrollable = scrollHeight - clientHeight;
      setProgress(scrollable > 0 ? (scrollTop / scrollable) * 100 : 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed inset-x-0 top-(--header-height) z-(--z-nav) h-px bg-grey-200"
      aria-hidden="true"
    >
      <div className="h-full bg-accent-600" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ReadingProgress;
