"use client";

import { useEffect } from "react";

// Cards are collapsed <details>, so /work#<slug> would land on a shut panel and
// look like the item has no content. Open the targeted one on arrival.
const openTargetedCard = () => {
  const slug = window.location.hash.slice(1);
  if (!slug) return;
  const details = document
    .getElementById(slug)
    ?.querySelector<HTMLDetailsElement>("details");
  if (details) details.open = true;
};

const DeepLinkOpener = () => {
  useEffect(() => {
    openTargetedCard();
    window.addEventListener("hashchange", openTargetedCard);
    return () => {
      window.removeEventListener("hashchange", openTargetedCard);
    };
  }, []);

  return null;
};

export default DeepLinkOpener;
