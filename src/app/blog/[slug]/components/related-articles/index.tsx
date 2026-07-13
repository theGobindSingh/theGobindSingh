import CoverArt from "@app/blog/components/cover-art";
import FullWidthWrapper from "@components/full-width-wrapper";
import { Link } from "@components/link";
import type { BlogPostMeta } from "@lib/blog";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const RelatedArticles = ({ posts }: { posts: BlogPostMeta[] }) => {
  const cardMapper = (post: BlogPostMeta) => {
    return (
      <Link
        key={post.slug}
        href={`/blog/${post.slug}`}
        variant="text"
        className="group flex flex-col gap-6 p-0"
      >
        <div className="relative aspect-video overflow-hidden border border-grey-300">
          {post.cover ? (
            <Image
              src={post.cover}
              alt={post.title}
              fill
              className="object-cover grayscale transition-all duration-(--dur-slow) ease-out group-hover:scale-105 group-hover:grayscale-0 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          ) : (
            <CoverArt slug={post.slug} className="size-full" />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-mono text-(size:--fs-4xs) tracking-widest text-accent-600 uppercase">
            {post.tags[0] ?? "Writing"}
          </span>
          <h3 className="text-(size:--fs-s) leading-tight font-medium text-grey-950 transition-colors duration-(--dur-fast) group-hover:text-accent-600">
            {post.title}
          </h3>
        </div>
      </Link>
    );
  };

  return (
    <FullWidthWrapper
      element="footer"
      className="flex flex-col gap-10 border-t border-grey-300 py-16"
      wrapperClassName="max-w-none"
    >
      <div className="flex items-end justify-between">
        <h2 className="text-(size:--fs-2xl) font-medium">Related reading</h2>
        <Link
          href="/blog"
          variant="text"
          className="group flex items-center gap-1 p-0 font-mono text-(size:--fs-3xs) tracking-wide text-grey-900 uppercase hover:text-accent-600"
        >
          View all
          <ArrowUpRight
            className="transition-transform duration-(--dur-fast) ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            height="1em"
            width="1em"
          />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {posts.map(cardMapper)}
      </div>
    </FullWidthWrapper>
  );
};

export default RelatedArticles;
