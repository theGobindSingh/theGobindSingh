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
    <li
      id={slug}
      className="relative flex h-fit min-h-125 w-full items-stretch gap-8 overflow-hidden border border-grey-300 bg-grey-100 p-6 not-md:flex-col md:p-10"
    >
      <div className="flex w-[40%] shrink-0 flex-col gap-3 not-md:w-full">
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
            className="mt-3 w-fit text-(size:--fs-3xs) not-md:ml-auto"
          >
            Visit Live →
          </Link>
        )}
      </div>

      <div className="relative flex w-full flex-col not-md:min-h-[50vh]">
        {image && (
          <Image
            src={image.src}
            alt={image.alt}
            quality={100}
            sizes="100vw"
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            className="absolute top-0 right-0 w-[62.5%] not-md:w-[75%]"
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
            className="absolute top-[25%] right-[55%] w-[40%] not-md:w-[40%]"
          />
        )}
      </div>
    </li>
  );
};

export default FreelanceCard;
