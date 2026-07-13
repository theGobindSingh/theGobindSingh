import { Link } from "@components/link";
import { CATEGORY_LABELS, type WorkItem } from "@data";
import Image from "next/image";

const FreelanceCard = ({
  title,
  description,
  timeframe,
  links,
  image,
  category,
  slug,
}: WorkItem) => {
  return (
    <li
      id={slug}
      className="relative isolate min-h-80 scroll-mt-24 overflow-hidden border border-grey-300 bg-grey-50"
    >
      {image && (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          placeholder="blur"
          sizes="(min-width: 768px) 60vw, 100vw"
          className="-z-10 object-cover"
        />
      )}
      <div
        className="absolute inset-0 -z-10 bg-linear-to-r from-grey-50 via-grey-50/85 to-grey-50/10"
        aria-hidden="true"
      />
      <div className="flex h-full max-w-lg flex-col gap-3 p-6 md:p-10">
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
            className="mt-2 w-fit text-(size:--fs-3xs)"
          >
            Visit Live →
          </Link>
        )}
      </div>
    </li>
  );
};

export default FreelanceCard;
