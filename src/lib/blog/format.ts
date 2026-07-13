export const formatBlogDate = (iso: string): string => {
  return new Date(iso)
    .toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .toUpperCase();
};
