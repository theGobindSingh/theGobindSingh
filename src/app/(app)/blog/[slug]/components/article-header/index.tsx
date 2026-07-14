import { formatBlogDate, type BlogPostMeta } from "@lib/blog";

const ArticleHeader = ({ post }: { post: BlogPostMeta }) => {
  const tagMapper = (tag: string) => {
    return (
      <span
        key={tag}
        className="bg-grey-100 px-2 py-1 font-mono text-(size:--fs-4xs) font-medium tracking-wide text-grey-700"
      >
        {tag}
      </span>
    );
  };

  return (
    <header className="grid grid-cols-1 gap-8 md:grid-cols-12">
      <div className="flex flex-col gap-4 md:col-span-4">
        <span className="font-mono text-(size:--fs-3xs) tracking-widest text-accent-600 uppercase">
          / {post.tags[0] ?? "Writing"}
        </span>
        <div className="flex flex-col gap-1 font-mono text-(size:--fs-4xs) tracking-wide text-grey-500 uppercase">
          <span>Published: {formatBlogDate(post.date)}</span>
          <span>Reading time: {post.readingTime}</span>
        </div>
      </div>
      <div className="flex flex-col gap-6 md:col-span-8">
        <h1 className="max-w-3xl text-(size:--fs-4xl) leading-tight font-semibold text-balance">
          {post.title}
        </h1>
        <p className="max-w-2xl text-(size:--fs-1xs) text-grey-700">
          {post.excerpt}
        </p>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">{post.tags.map(tagMapper)}</div>
        )}
      </div>
    </header>
  );
};

export default ArticleHeader;
