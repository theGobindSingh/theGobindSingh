/**
 * One-off migration: reads the legacy public/case-studies/*.json files and
 * creates matching entries in the Payload `case-studies` collection.
 *
 * The legacy content is already a typed block AST (not raw HTML), so this is
 * a straight structural mapping from the kebab-case `Block` union
 * (src/lib/case-studies/types.ts) onto the Payload block slugs defined in
 * src/blocks/case-study/ (camelCase, matching src/lib/case-studies/map.ts).
 * Any `image`-type block/coverImage/signature image referencing a path under
 * public/ is resolved to an existing Media doc by filename — none of the
 * current content uses one, so unresolved references are skipped with a
 * warning rather than failing the run.
 *
 * Run once with: npx payload run scripts/migrate-case-studies.ts
 */
import config from "@payload-config";
import fs from "fs";
import path from "path";
import { getPayload, type Payload } from "payload";

interface LegacyBlock {
  type: string;
  src?: unknown;
  cols?: 1 | 2 | 3;
  items?: LegacyBlock[];
  alt?: string;
  aspect?: string;
  icon?: string;
  language?: string;
  variant?: string;
}

interface LegacySection {
  sectionTitle: string;
  title?: string;
  variant?: string;
  layout?: string;
  items: LegacyBlock[];
}

interface LegacyCaseStudy {
  title: string;
  description: string;
  client: string | null;
  category: string;
  role: string;
  stack: string[];
  timeframe: { start: string; end: string | null };
  coverImage?: string;
  featured?: boolean;
  order?: number;
  links?: { github?: string; live?: string };
  seo?: { title?: string; description?: string; ogImage?: string };
  sections: LegacySection[];
}

const CASE_STUDIES_DIR = path.join(process.cwd(), "public/case-studies");

const findMediaIdByPath = async (
  payload: Payload,
  src: string | undefined,
): Promise<number | undefined> => {
  if (!src) return undefined;
  const filename = path.basename(src);
  const result = await payload.find({
    collection: "media",
    where: { filename: { equals: filename } },
    limit: 1,
  });
  const doc = result.docs[0];
  if (!doc) {
    console.warn(`  ! No media found for "${src}" — skipping image reference`);
    return undefined;
  }
  return doc.id;
};

const convertLeafBlock = async (
  payload: Payload,
  block: LegacyBlock,
): Promise<Record<string, unknown> | undefined> => {
  switch (block.type) {
    case "para":
      return {
        blockType: "para",
        src: block.src,
        ...(block.variant ? { variant: block.variant } : {}),
      };
    case "numbered-list":
      return { blockType: "numberedList", items: block.src };
    case "bullet-list":
      return { blockType: "bulletList", items: block.src };
    case "eyebrow":
      return {
        blockType: "eyebrow",
        src: block.src,
        ...(block.icon ? { icon: block.icon } : {}),
      };
    case "h3":
      return { blockType: "h3", src: block.src };
    case "code":
      return {
        blockType: "code",
        src: block.src,
        ...(block.language ? { language: block.language } : {}),
      };
    case "image": {
      const imageId = await findMediaIdByPath(payload, block.src as string);
      if (!imageId) return undefined;
      return {
        blockType: "image",
        image: imageId,
        alt: block.alt,
        ...(block.aspect ? { aspect: block.aspect } : {}),
      };
    }
    case "simple-card":
      return { blockType: "simpleCard", ...(block.src as object) };
    case "chip-list":
      return { blockType: "chipList", items: block.src };
    case "stat":
      return { blockType: "stat", ...(block.src as object) };
    case "signature": {
      const src = block.src as {
        image?: { src: string; alt: string };
        name: string;
        role: string;
      };
      const imageId = await findMediaIdByPath(payload, src.image?.src);
      return {
        blockType: "signature",
        name: src.name,
        role: src.role,
        ...(imageId ? { image: imageId, imageAlt: src.image?.alt } : {}),
      };
    }
    default:
      return undefined;
  }
};

const convertBlock = async (
  payload: Payload,
  block: LegacyBlock,
): Promise<Record<string, unknown> | undefined> => {
  if (block.type === "container") {
    const items = (
      await Promise.all(
        (block.items ?? []).map((item) => {
          return convertLeafBlock(payload, item);
        }),
      )
    ).filter((item): item is Record<string, unknown> => Boolean(item));
    return {
      blockType: "container",
      cols: String(block.cols ?? 1),
      items,
    };
  }
  return convertLeafBlock(payload, block);
};

const convertSection = async (
  payload: Payload,
  section: LegacySection,
): Promise<Record<string, unknown>> => {
  const items = (
    await Promise.all(
      section.items.map((item) => {
        return convertBlock(payload, item);
      }),
    )
  ).filter((item): item is Record<string, unknown> => Boolean(item));

  return {
    blockType: "section",
    sectionTitle: section.sectionTitle,
    ...(section.title ? { title: section.title } : {}),
    ...(section.variant ? { variant: section.variant } : {}),
    ...(section.layout ? { layout: section.layout } : {}),
    items,
  };
};

const run = async () => {
  const payload = await getPayload({ config });

  const files = fs.existsSync(CASE_STUDIES_DIR)
    ? fs.readdirSync(CASE_STUDIES_DIR).filter((file) => {
        return file.endsWith(".json");
      })
    : [];

  for (const file of files) {
    const slug = file.replace(/\.json$/, "");
    const raw = fs.readFileSync(path.join(CASE_STUDIES_DIR, file), "utf-8");
    const data = JSON.parse(raw) as LegacyCaseStudy;

    const existing = await payload.find({
      collection: "case-studies",
      where: { slug: { equals: slug } },
      limit: 1,
    });
    if (existing.docs.length > 0) {
      console.log(`Skipping "${slug}" — already exists`);
      continue;
    }

    const coverImageId = await findMediaIdByPath(payload, data.coverImage);
    const ogImageId = await findMediaIdByPath(payload, data.seo?.ogImage);
    const sections = await Promise.all(
      data.sections.map((section) => {
        return convertSection(payload, section);
      }),
    );

    await payload.create({
      collection: "case-studies",
      data: {
        title: data.title,
        slug,
        description: data.description,
        client: data.client,
        category: data.category as any,
        role: data.role,
        stack: data.stack,
        timeframeStart: new Date(data.timeframe.start).toISOString(),
        ...(data.timeframe.end
          ? { timeframeEnd: new Date(data.timeframe.end).toISOString() }
          : {}),
        ...(coverImageId ? { coverImage: coverImageId } : {}),
        featured: data.featured ?? false,
        ...(data.order !== undefined ? { order: data.order } : {}),
        ...(data.links ? { links: data.links } : {}),
        ...(data.seo
          ? {
              seo: {
                ...(data.seo.title ? { title: data.seo.title } : {}),
                ...(data.seo.description
                  ? { description: data.seo.description }
                  : {}),
                ...(ogImageId ? { ogImage: ogImageId } : {}),
              },
            }
          : {}),
        sections: sections as any,
      },
    });

    console.log(`Migrated "${slug}"`);
  }
};

try {
  await run();
} catch (error) {
  console.error(error);
  process.exitCode = 1;
}
