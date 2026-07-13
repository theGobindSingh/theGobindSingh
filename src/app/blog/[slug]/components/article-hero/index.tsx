import CoverArt from "@app/blog/components/cover-art";
import type { BlogPostMeta } from "@lib/blog";
import Image from "next/image";

const ArticleHero = ({ post }: { post: BlogPostMeta }) => {
  return (
    <div className="relative aspect-21/9 w-full overflow-hidden border border-grey-300">
      {post.cover ? (
        <Image
          src={post.cover}
          alt={post.title}
          fill
          priority
          className="object-cover grayscale transition-all duration-(--dur-slow) ease-out hover:grayscale-0 motion-reduce:transition-none"
        />
      ) : (
        <CoverArt slug={post.slug} className="size-full" />
      )}
    </div>
  );
};

export default ArticleHero;
