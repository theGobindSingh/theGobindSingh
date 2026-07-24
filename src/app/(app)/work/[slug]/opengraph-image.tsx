import { getWorkItemBySlug } from "@app/work/constants";
import { OG_ALT, OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@lib/og/card";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getWorkItemBySlug(slug);
  const photo =
    result?.kind === "case-study"
      ? (result.data.seo?.ogImage ?? result.data.coverImage)
      : undefined;

  if (photo) {
    const res = await fetch(photo);
    return new Response(res.body, {
      headers: {
        "Content-Type": res.headers.get("Content-Type") ?? "image/jpeg",
      },
    });
  }

  return renderOgCard();
}
