import { Link } from "@components/link";
import { CATEGORY_LABELS, type WorkItem } from "@data";
import Image from "next/image";

// The screenshots are the evidence, not decoration, so they lead the card.
const FreelanceCard = ({
  title,
  description,
  timeframe,
  links,
  image,
  imageMobile,
  category,
  slug,
}: WorkItem) => {
  return (
    // Bottom padding is dropped at every width so the screenshots bleed to the
    // card's lower edge; the text stays above them (its own column at md+, or
    // stacked on top on mobile) with the gap as the only separation.
    <li
      id={slug}
      className="grid scroll-mt-24 items-start gap-8 border border-grey-300 bg-grey-100 px-6 pt-6 pb-0 md:grid-cols-2 md:gap-12 md:px-10 md:pt-10"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          {category && (
            <span className="font-mono text-(size:--fs-4xs) font-medium tracking-wider text-accent-600 uppercase">
              {CATEGORY_LABELS[category]}
            </span>
          )}
          <span className="font-mono text-(size:--fs-4xs) tracking-wide text-grey-500">
            {timeframe}
          </span>
        </div>
        <h3 className="text-(size:--fs-l) font-medium">{title}</h3>
        <p className="text-(size:--fs-3xs) text-grey-700">{description}</p>
        {links?.live && (
          <Link
            href={links.live}
            variant="outlined"
            color="accent"
            className="mt-3 w-fit text-(size:--fs-3xs)"
          >
            Visit Live →
          </Link>
        )}
      </div>

      {image && (
        // self-end drops the pair to the bottom of the card (which has no bottom
        // padding at md+), so both shots bleed to the lower edge. The desktop
        // shot is right-aligned; the phone overlaps its lower-left corner and
        // sits in front, reading as a companion capture rather than a peer.
        //
        // The aspect ratios crop 25% off each shot's height (natural heights
        // 1955 and 1341, cropped to 1466 and 1006) via object-cover. Height is
        // trimmed rather than the pair scaled down, because scaling would narrow
        // the shots and pull them apart, breaking the overlap. object-top keeps
        // the hero and nav — the recognisable part — and drops the lower page.
        <div className="relative self-end">
          <Image
            src={image.src}
            alt={image.alt}
            sizes="(min-width: 768px) 36vw, 72vw"
            className="ml-auto block aspect-1600/1466 w-[82%] border border-grey-300 object-cover object-top"
          />
          {imageMobile && (
            <Image
              src={imageMobile.src}
              alt={imageMobile.alt}
              sizes="(min-width: 768px) 12vw, 24vw"
              className="absolute bottom-0 left-0 z-10 aspect-620/1006 w-[30%] border border-grey-300 object-cover object-top shadow-xl"
            />
          )}
        </div>
      )}
    </li>
  );
};

export default FreelanceCard;
