import FullWidthWrapper from "@components/full-width-wrapper";
import type { BlogPostMeta } from "@lib/blog";
import NextLink from "next/link";

const NextArticle = ({ post }: { post: BlogPostMeta }) => {
  return (
    <FullWidthWrapper
      element="footer"
      wrapperClassName="border-t border-grey-200"
    >
      <NextLink
        href={`/blog/${post.slug}`}
        className="group flex w-full flex-col gap-4 py-16 md:flex-row md:items-end md:justify-between md:py-24"
      >
        <div>
          <span className="mb-4 block font-mono text-(size:--fs-4xs) tracking-widest text-grey-500 uppercase">
            Next article
          </span>
          <h2 className="text-(size:--fs-2xl) font-medium transition-transform duration-(--dur-slow) ease-out group-hover:translate-x-2">
            {post.title} →
          </h2>
        </div>
        <p className="max-w-xs text-(size:--fs-3xs) text-grey-700">
          {post.excerpt}
        </p>
      </NextLink>
    </FullWidthWrapper>
  );
};

export default NextArticle;
