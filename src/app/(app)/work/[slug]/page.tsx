import CaseStudyContent from "@app/work/components/case-study";
import NextCaseStudy from "@app/work/components/case-study/next-case-study";
import {
  getCaseStudiesSection,
  getWorkItemBySlug,
  getWorkItemSlugs,
} from "@app/work/constants";
import FullWidthWrapper from "@components/full-width-wrapper";
import JsonLd from "@components/json-ld";
import { Link } from "@components/link";
import { fullName } from "@data";
import { OG_IMAGE, SITE_URL } from "@lib/site-config";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface WorkDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = async () => {
  const slugs = await getWorkItemSlugs();
  return slugs.map((slug) => {
    return { slug };
  });
};

export const generateMetadata = async ({
  params,
}: WorkDetailPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const result = await getWorkItemBySlug(slug);

  if (!result) {
    return { title: "Work", robots: { index: false, follow: true } };
  }

  if (result.kind === "project") {
    return {
      title: `${result.data.title} — Case Study`,
      robots: { index: false, follow: true },
    };
  }

  const caseStudy = result.data;
  const title = caseStudy.seo?.title ?? `${caseStudy.title} — Case Study`;
  const description = caseStudy.seo?.description ?? caseStudy.description;
  const ogImage = caseStudy.seo?.ogImage ?? caseStudy.coverImage;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/work/${slug}` },
    openGraph: {
      title: `${title} | ${fullName}`,
      description,
      type: "article",
      url: `${SITE_URL}/work/${slug}`,
      ...(ogImage
        ? {
            images: [
              {
                url: ogImage,
                width: OG_IMAGE.width,
                height: OG_IMAGE.height,
                alt: caseStudy.title,
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

const WorkDetailPage = async ({ params }: WorkDetailPageProps) => {
  const { slug } = await params;
  const result = await getWorkItemBySlug(slug);

  if (!result) {
    notFound();
  }

  if (result.kind === "project") {
    const item = result.data;

    return (
      <main>
        <FullWidthWrapper
          className="flex min-h-[60vh] flex-col justify-center gap-6 py-16"
          wrapperClassName="max-w-2xl"
        >
          <Link href="/work" variant="text" className="w-fit p-0 font-mono">
            ← Back to work
          </Link>
          <div className="flex flex-col gap-3">
            <span className="font-mono text-(size:--fs-4xs) tracking-wide text-grey-500 uppercase">
              {item.timeframe}
            </span>
            <h1 className="text-(size:--fs-2xl) font-medium">{item.title}</h1>
            <p className="max-w-xl text-(size:--fs-s) text-grey-700">
              {item.description}
            </p>
          </div>
          <p className="text-(size:--fs-3xs) text-grey-500">
            The full write-up for this project is coming soon.
          </p>
        </FullWidthWrapper>
      </main>
    );
  }

  const caseStudy = result.data;
  const caseStudiesSection = await getCaseStudiesSection();
  const currentIndex = caseStudiesSection.items.findIndex((item) => {
    return item.slug === slug;
  });
  const next =
    caseStudiesSection.items.length > 1
      ? caseStudiesSection.items[
          (currentIndex + 1) % caseStudiesSection.items.length
        ]
      : undefined;

  const caseStudySchema = {
    "@type": "CreativeWork",
    name: caseStudy.title,
    description: caseStudy.description,
    url: `${SITE_URL}/work/${slug}`,
    creator: { "@type": "Person", name: fullName },
    ...(caseStudy.timeframe.end
      ? { dateModified: caseStudy.timeframe.end }
      : {}),
    datePublished: caseStudy.timeframe.start,
  };

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Work",
        item: `${SITE_URL}/work`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: caseStudy.title,
        item: `${SITE_URL}/work/${slug}`,
      },
    ],
  };

  return (
    <main>
      <JsonLd data={caseStudySchema} />
      <JsonLd data={breadcrumbSchema} />
      <FullWidthWrapper className="py-8" wrapperClassName="max-w-none">
        <Link href="/work" variant="text" className="w-fit p-0 font-mono">
          ← Back to work
        </Link>
      </FullWidthWrapper>
      <CaseStudyContent caseStudy={caseStudy} />
      {next && next.slug !== slug && <NextCaseStudy caseStudy={next} />}
    </main>
  );
};

export default WorkDetailPage;
