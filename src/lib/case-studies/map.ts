import type {
  CaseStudyContainerBlock,
  Media,
  CaseStudy as PayloadCaseStudyDoc,
  CaseStudySection as PayloadCaseStudySection,
} from "@/payload-types";

import type { Block, CaseStudySection, CaseStudyWithSlug } from "./types";

type LeafBlock = Exclude<
  PayloadCaseStudySection["items"][number],
  CaseStudyContainerBlock
>;
type AnyPayloadBlock = PayloadCaseStudySection["items"][number];

const mediaUrl = (value?: (number | null) | Media): string | undefined => {
  if (value && typeof value === "object") return value.url ?? undefined;
  return undefined;
};

const mapLeafBlock = (block: LeafBlock): Block | undefined => {
  switch (block.blockType) {
    case "para":
      return {
        type: "para",
        src: block.src,
        ...(block.variant ? { variant: block.variant } : {}),
      };
    case "numberedList":
      return { type: "numbered-list", src: block.items };
    case "bulletList":
      return { type: "bullet-list", src: block.items };
    case "eyebrow":
      return {
        type: "eyebrow",
        src: block.src,
        ...(block.icon ? { icon: block.icon } : {}),
      };
    case "h3":
      return { type: "h3", src: block.src };
    case "code":
      return {
        type: "code",
        src: block.src,
        ...(block.language ? { language: block.language } : {}),
      };
    case "image":
      return {
        type: "image",
        src: mediaUrl(block.image) ?? "",
        alt: block.alt,
        ...(block.aspect ? { aspect: block.aspect } : {}),
      };
    case "simpleCard":
      return {
        type: "simple-card",
        src: {
          ...(block.chip ? { chip: block.chip } : {}),
          title: block.title,
          desc: block.desc,
        },
      };
    case "chipList":
      return { type: "chip-list", src: block.items };
    case "stat":
      return {
        type: "stat",
        src: { value: block.value, label: block.label },
      };
    case "signature": {
      const image = mediaUrl(block.image);
      return {
        type: "signature",
        src: {
          name: block.name,
          role: block.role,
          ...(image
            ? { image: { src: image, alt: block.imageAlt ?? block.name } }
            : {}),
        },
      };
    }
    default:
      return undefined;
  }
};

const mapBlock = (block: AnyPayloadBlock): Block | undefined => {
  if (block.blockType === "container") {
    const items = block.items
      .map(mapLeafBlock)
      .filter((item): item is Block => {
        return Boolean(item);
      });
    return {
      type: "container",
      ...(block.cols ? { cols: Number(block.cols) as 1 | 2 | 3 } : {}),
      items,
    };
  }
  return mapLeafBlock(block);
};

const mapSection = (section: PayloadCaseStudySection): CaseStudySection => {
  return {
    sectionTitle: section.sectionTitle,
    ...(section.title ? { title: section.title } : {}),
    ...(section.variant ? { variant: section.variant } : {}),
    ...(section.layout ? { layout: section.layout } : {}),
    items: section.items.map(mapBlock).filter((item): item is Block => {
      return Boolean(item);
    }),
  };
};

export const mapCaseStudy = (doc: PayloadCaseStudyDoc): CaseStudyWithSlug => {
  const coverImage = mediaUrl(doc.coverImage);
  const ogImage = mediaUrl(doc.seo?.ogImage);

  return {
    slug: doc.slug,
    title: doc.title,
    description: doc.description,
    client: doc.client ?? null,
    category: doc.category,
    role: doc.role,
    stack: doc.stack ?? [],
    timeframe: {
      start: doc.timeframeStart,
      end: doc.timeframeEnd ?? null,
    },
    ...(coverImage ? { coverImage } : {}),
    ...(doc.featured ? { featured: doc.featured } : {}),
    ...(doc.order !== null && doc.order !== undefined
      ? { order: doc.order }
      : {}),
    ...(doc.links && (doc.links.github ?? doc.links.live)
      ? {
          links: {
            ...(doc.links.github ? { github: doc.links.github } : {}),
            ...(doc.links.live ? { live: doc.links.live } : {}),
          },
        }
      : {}),
    ...(doc.seo
      ? {
          seo: {
            ...(doc.seo.title ? { title: doc.seo.title } : {}),
            ...(doc.seo.description
              ? { description: doc.seo.description }
              : {}),
            ...(ogImage ? { ogImage } : {}),
          },
        }
      : {}),
    sections: doc.sections.map(mapSection),
  };
};
