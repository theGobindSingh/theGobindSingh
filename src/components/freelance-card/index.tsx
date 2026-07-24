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
  priority = false,
}: WorkItem & {
  priority?: boolean;
}) => {
  return (
    // Bottom padding is dropped at every width so the screenshots bleed to the
    // card's lower edge; the text stays above them (its own column at md+, or
    // stacked on top on mobile) with the gap as the only separation.
    <li
      id={slug}
      className="relative flex min-h-125 items-start overflow-hidden border border-grey-300 bg-grey-100 p-6 md:p-10"
    >
      <div className="flex w-[40%] flex-col gap-3">
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
        <Image
          src={image.src}
          alt={image.alt}
          quality={100}
          sizes="100vw"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          className="absolute top-6 right-6 w-full max-w-[40%] md:top-10 md:right-10"
        />
      )}
      {imageMobile && (
        <Image
          src={imageMobile.src}
          alt={imageMobile.alt}
          quality={100}
          sizes="100vw"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          className="absolute top-35 right-[35%] max-w-[20%]"
        />
      )}
    </li>
  );
};

export default FreelanceCard;
