"use client";

import ArticleCard from "@app/blog/article-list/article-card";
import { Button } from "@components/button";
import Section from "@components/section";
import type { BlogPostMeta } from "@lib/blog/types";
import { useMemo, useState } from "react";

const ALL_TAG = "All";

interface ArticleListProps {
  posts: BlogPostMeta[];
  tags: string[];
  titleNumber?: string;
}

const ArticleList = ({ posts, tags, titleNumber = "" }: ArticleListProps) => {
  const [activeTag, setActiveTag] = useState(ALL_TAG);

  const filteredPosts = useMemo(() => {
    if (activeTag === ALL_TAG) return posts;
    return posts.filter((post) => {
      return post.tags.includes(activeTag);
    });
  }, [posts, activeTag]);

  const tagMapper = (tag: string) => {
    const isActive = tag === activeTag;
    return (
      <Button
        key={tag}
        variant="text"
        type="button"
        onClick={() => {
          setActiveTag(tag);
        }}
        aria-pressed={isActive}
        className={`font-mono text-(size:--fs-3xs) tracking-wide uppercase ${
          isActive ? "text-accent-600" : "text-grey-500 hover:text-grey-900"
        }`}
      >
        {tag}
      </Button>
    );
  };

  return (
    <Section
      title={`${titleNumber} // Articles`.trim()}
      description={`Posts covering frontend architecture, performance, and design systems and more.`}
      wrapperProps={{ "aria-label": "Articles", id: "articles" }}
    >
      <div className="mb-6 flex flex-wrap items-center gap-x-8 gap-y-3 border-y border-grey-300 py-5">
        <span className="font-mono text-(size:--fs-3xs) tracking-wide text-grey-500 uppercase">
          Filter:
        </span>
        {[ALL_TAG, ...tags].map(tagMapper)}
      </div>
      {filteredPosts.length > 0 ? (
        <ul>
          {filteredPosts.map((post) => {
            return <ArticleCard key={post.slug} post={post} />;
          })}
        </ul>
      ) : (
        <p className="py-12 text-(size:--fs-3xs) text-grey-500">
          No articles tagged &ldquo;{activeTag}&rdquo; yet.
        </p>
      )}
    </Section>
  );
};

export default ArticleList;
