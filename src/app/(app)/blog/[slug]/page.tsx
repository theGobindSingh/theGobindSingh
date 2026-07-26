import ArticleBody from "@app/blog/[slug]/components/article-body";
import ArticleFacts from "@app/blog/[slug]/components/article-facts";
import ArticleHeader from "@app/blog/[slug]/components/article-header";
import ArticleHero from "@app/blog/[slug]/components/article-hero";
import ArticleOutline from "@app/blog/[slug]/components/article-outline";
import ReadingProgress from "@app/blog/[slug]/components/reading-progress";
import RelatedArticles from "@app/blog/[slug]/components/related-articles";
import FullWidthWrapper from "@components/full-width-wrapper";
import JsonLd from "@components/json-ld";
import { Link } from "@components/link";
import { fullName } from "@data";
import type { BlogPost, BlogPostMeta } from "@lib/blog";
import { getAllPosts, getPostBySlug, getPostSlugs } from "@lib/blog";
import { OG_IMAGE, SITE_URL } from "@lib/site-config";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = async () => {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => {
    return { slug };
  });
};

export const generateMetadata = async ({
  params,
}: BlogPostPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Blog", robots: { index: false, follow: true } };
  }

  const title = post.seo?.title ?? post.title;
  const description = post.seo?.description ?? post.excerpt;
  const ogImage = post.seo?.ogImage ?? post.cover;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/blog/${slug}` },
    openGraph: {
      title: `${title} | ${fullName}`,
      description,
      type: "article",
      url: `${SITE_URL}/blog/${slug}`,
      publishedTime: post.date,
      ...(post.updated ? { modifiedTime: post.updated } : {}),
      tags: post.tags,
      ...(ogImage
        ? {
            images: [
              {
                url: ogImage,
                width: OG_IMAGE.width,
                height: OG_IMAGE.height,
                alt: post.title,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${fullName}`,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
};

const getRelatedPosts = (
  post: BlogPost | undefined,
  allPosts: BlogPostMeta[],
): BlogPostMeta[] => {
  if (!post) return [];

  const others = allPosts.filter((item) => {
    return item.slug !== post.slug;
  });
  const shareTag = (item: BlogPostMeta) => {
    return item.tags.some((tag) => {
      return post.tags.includes(tag);
    });
  };

  const related = others.filter(shareTag);
  const rest = others.filter((item) => {
    return !shareTag(item);
  });

  return [...related, ...rest].slice(0, 3);
};

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getAllPosts();
  const relatedPosts = getRelatedPosts(post, allPosts);

  const articleSchema = {
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: `${SITE_URL}/blog/${slug}`,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { "@type": "Person", name: fullName, url: SITE_URL },
    ...(post.cover ? { image: `${SITE_URL}${post.cover}` } : {}),
  };

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${slug}`,
      },
    ],
  };

  const hasOutline = post.outline.length > 0;

  return (
    <main>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <ReadingProgress />
      <FullWidthWrapper
        className="flex flex-col gap-12 pt-8"
        wrapperClassName="max-w-none"
      >
        <Link href="/blog" variant="text" className="w-fit p-0 font-mono">
          ← Back to blogs
        </Link>
        <ArticleHeader post={post} />
      </FullWidthWrapper>
      <FullWidthWrapper className="pt-10" wrapperClassName="max-w-none">
        <ArticleHero post={post} />
      </FullWidthWrapper>
      <FullWidthWrapper className="flex gap-12 py-16 not-md:flex-col">
        <aside className="flex w-[25vw] max-w-90 min-w-50 shrink-0 flex-col gap-12 md:sticky md:top-[calc(var(--header-height)+2rem)] md:h-fit">
          {hasOutline && <ArticleOutline outline={post.outline} />}
          <ArticleFacts post={post} />
        </aside>
        <div className="w-full">
          <ArticleBody html={post.html} />
        </div>
      </FullWidthWrapper>
      {relatedPosts.length > 0 && <RelatedArticles posts={relatedPosts} />}
    </main>
  );
};

export default BlogPostPage;
