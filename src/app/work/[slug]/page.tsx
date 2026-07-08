import { getWorkItemBySlug, workItemSlugs } from "@app/work/constants";
import FullWidthWrapper from "@components/full-width-wrapper";
import { Link } from "@components/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface WorkDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = () => {
  return workItemSlugs.map((slug) => {
    return { slug };
  });
};

export const generateMetadata = async ({
  params,
}: WorkDetailPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const item = getWorkItemBySlug(slug);

  return {
    title: item ? `${item.title} — Case Study` : "Work",
    robots: { index: false, follow: true },
  };
};

const WorkDetailPage = async ({ params }: WorkDetailPageProps) => {
  const { slug } = await params;
  const item = getWorkItemBySlug(slug);

  if (!item) {
    notFound();
  }

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
          The full write-up for this case study is coming soon.
        </p>
      </FullWidthWrapper>
    </main>
  );
};

export default WorkDetailPage;
