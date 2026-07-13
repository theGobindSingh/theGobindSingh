import ArticleBody from "@app/blog/[slug]/components/article-body";
import ArticleHeader from "@app/blog/[slug]/components/article-header";
import NextArticle from "@app/blog/[slug]/components/next-article";
import FullWidthWrapper from "@components/full-width-wrapper";
import JsonLd from "@components/json-ld";
import { Link } from "@components/link";
import { fullName } from "@data";
import { getAllPosts, getPostBySlug, getPostSlugs } from "@lib/blog";
import { OG_IMAGE, SITE_URL } from "@lib/site-config";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = () => {
  return getPostSlugs().map((slug) => {
    return { slug };
  });
};

export const generateMetadata = async ({
  params,
}: BlogPostPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Blog", robots: { index: false, follow: true } };
  }

  const title = post.seo?.title ?? post.title;
  const description = post.seo?.description ?? post.excerpt;
  const ogImage = post.seo?.ogImage ?? post.cover ?? OG_IMAGE.url;

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
      images: [
        {
          url: ogImage,
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${fullName}`,
      description,
      images: [ogImage],
    },
  };
};

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((item) => {
    return item.slug === slug;
  });
  const next =
    allPosts.length > 1
      ? allPosts[(currentIndex + 1) % allPosts.length]
      : undefined;

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

  return (
    <main>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <FullWidthWrapper
        className="flex flex-col gap-12 py-8"
        wrapperClassName="max-w-none"
      >
        <Link href="/blog" variant="text" className="w-fit p-0 font-mono">
          ← Back to blog
        </Link>
        <ArticleHeader post={post} />
        <ArticleBody html={post.html} />
      </FullWidthWrapper>
      {next && next.slug !== slug && <NextArticle post={next} />}
    </main>
  );
};

export default BlogPostPage;
