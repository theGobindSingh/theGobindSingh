import ArticleList from "@app/blog/article-list";
import { getBlogIndexSection } from "@app/blog/constants";
import Cta from "@app/blog/cta";
import Hero from "@app/blog/hero";
import JsonLd from "@components/json-ld";
import { fullName } from "@data";
import { SITE_URL } from "@lib/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Notes on Frontend Architecture & Engineering",
  description:
    "Technical writing from Gobind Singh on frontend architecture, Next.js, performance, and design systems, drawn from real product work.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: `Blog — Notes on Frontend Architecture & Engineering | ${fullName}`,
    description:
      "Technical writing on frontend architecture, Next.js, performance, and design systems.",
    type: "website",
    url: `${SITE_URL}/blog`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog — Notes on Frontend Architecture & Engineering | ${fullName}`,
    description:
      "Technical writing on frontend architecture, Next.js, performance, and design systems.",
  },
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
  ],
};

const BlogPage = async () => {
  const blogIndexSection = await getBlogIndexSection();

  const collectionSchema = {
    "@type": "CollectionPage",
    name: "Blog",
    url: `${SITE_URL}/blog`,
    description:
      "Technical writing on frontend architecture, Next.js, performance, and design systems.",
    isPartOf: { "@type": "WebSite", name: fullName, url: SITE_URL },
    hasPart: blogIndexSection.posts.map((post) => {
      return {
        "@type": "BlogPosting",
        headline: post.title,
        url: `${SITE_URL}/blog/${post.slug}`,
        datePublished: post.date,
      };
    }),
  };

  return (
    <main>
      <JsonLd data={collectionSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Hero />
      <ArticleList
        posts={blogIndexSection.posts}
        tags={blogIndexSection.tags}
      />
      <Cta />
    </main>
  );
};

export default BlogPage;
