import { Link } from "@components/link";
import { formatBlogDate } from "@lib/blog/format";
import type { BlogPostMeta } from "@lib/blog/types";

const ArticleCard = ({ post }: { post: BlogPostMeta }) => {
  return (
    <li className="group border-b border-grey-300 py-10 transition-colors duration-(--dur-slow) first:pt-0 last:border-b-0">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-3">
          <div className="mb-1 font-mono text-(size:--fs-4xs) tracking-wide text-grey-500 uppercase">
            {formatBlogDate(post.date)}
          </div>
          <div className="font-mono text-(size:--fs-4xs) font-medium tracking-wide text-accent-600 uppercase">
            {post.tags[0] ?? "Writing"}
          </div>
        </div>
        <div className="col-span-12 md:col-span-9">
          <h3 className="translate-x-0 transition-transform duration-(--dur-slow) ease-out md:group-hover:translate-x-2">
            <Link
              href={`/blog/${post.slug}`}
              variant="text"
              className="p-0 text-(size:--fs-l) leading-normal font-medium"
            >
              {post.title}
            </Link>
          </h3>
          <p className="mt-4 max-w-2xl text-(size:--fs-3xs) text-grey-700">
            {post.excerpt}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <span className="font-mono text-(size:--fs-4xs) tracking-wide text-grey-500 uppercase">
              {post.readingTime}
            </span>
            <Link
              href={`/blog/${post.slug}`}
              variant="text"
              className="p-0 text-(size:--fs-3xs)"
              aria-label={`Read article: ${post.title}`}
            >
              Read article →
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ArticleCard;
