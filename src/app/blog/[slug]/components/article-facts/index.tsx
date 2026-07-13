import { formatBlogDate, type BlogPostMeta } from "@lib/blog";

const ArticleFacts = ({ post }: { post: BlogPostMeta }) => {
  const rows: [string, string][] = [
    ["Published", formatBlogDate(post.date)],
    ["Reading time", post.readingTime],
    ["Tags", String(post.tags.length)],
  ];

  const rowMapper = ([label, value]: [string, string]) => {
    return (
      <div
        key={label}
        className="flex justify-between border-b border-grey-300 py-2 last:border-b-0"
      >
        <span className="font-mono text-(size:--fs-4xs) text-grey-700 uppercase">
          {label}
        </span>
        <span className="font-mono text-(size:--fs-4xs) text-accent-600 uppercase">
          {value}
        </span>
      </div>
    );
  };

  return (
    <div className="border border-grey-300 bg-grey-100 p-6">
      <p className="mb-4 font-mono text-(size:--fs-4xs) tracking-widest text-grey-500 uppercase">
        Article info
      </p>
      <div className="flex flex-col">{rows.map(rowMapper)}</div>
    </div>
  );
};

export default ArticleFacts;
