import { formatBlogDate, type BlogPostMeta } from "@lib/blog";
import Image from "next/image";

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
    <header className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-4 font-mono text-(size:--fs-4xs) tracking-wide text-grey-500 uppercase">
        <span>{formatBlogDate(post.date)}</span>
        <span aria-hidden="true">·</span>
        <span>{post.readingTime}</span>
      </div>
      <h1 className="max-w-3xl text-(size:--fs-3xl) leading-tight font-medium text-balance">
        {post.title}
      </h1>
      <p className="max-w-2xl text-(size:--fs-1xs) text-grey-700">
        {post.excerpt}
      </p>
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">{post.tags.map(tagMapper)}</div>
      )}
      {post.cover && (
        <div className="relative mt-4 aspect-video overflow-hidden border border-grey-300">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
    </header>
  );
};

export default ArticleHeader;
