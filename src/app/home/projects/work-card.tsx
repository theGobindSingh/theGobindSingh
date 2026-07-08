import { Link } from "@components/link";
import { WorkItem } from "@data";

const WorkCard = ({
  approach,
  description,
  outcome,
  problem,
  stack,
  title,
  links,
  slug,
}: WorkItem) => {
  //

  const stackMapper = (stack: string) => {
    const key = `${title} stack-${stack}`;
    return (
      <span
        key={key}
        className="bg-grey-200 px-2 py-1 font-mono text-(size:--fs-4xs) font-medium tracking-wider uppercase"
      >
        {stack}
      </span>
    );
  };

  return (
    <li className="grid grid-cols-3 items-start justify-center gap-8 not-md:grid-cols-1">
      <div className="flex h-full flex-col gap-3">
        <h4 className="font-medium">
          {slug ? (
            <Link href={`/work#${slug}`} className="block whitespace-normal">
              {title}
            </Link>
          ) : (
            title
          )}
        </h4>
        <p className="text-(size:--fs-3xs) text-grey-700">{description}</p>
        <div className="flex flex-wrap items-center gap-2">
          {stack.map(stackMapper)}
        </div>
        <div className="mt-auto flex w-full flex-col items-start gap-2 pt-6">
          {links?.github && (
            <Link href={links.github} target="_blank" rel="noopener noreferrer">
              View Repository →
            </Link>
          )}
          {links?.live && (
            <Link href={links.live} target="_blank" rel="noopener noreferrer">
              View Live →
            </Link>
          )}
          {slug && <Link href={`/work#${slug}`}>Read More →</Link>}
        </div>
      </div>
      <div className="flex h-full flex-col gap-3">
        <h4 className="font-mono text-grey-700">{"/ The Constraints"}</h4>
        <p className="text-(size:--fs-3xs) leading-6.5">{problem}</p>
      </div>
      <div className="flex h-full flex-col gap-3">
        <div className="flex h-full flex-col gap-3">
          <h4 className="font-mono text-grey-700">{"/ The Architecture"}</h4>
          <p className="text-(size:--fs-3xs) leading-6.5 text-grey-700">
            {approach}
          </p>
        </div>
        <div className="flex h-full flex-col gap-3">
          <h4 className="sr-only">{"/ The Outcome"}</h4>
          <p className="relative pl-4 text-(size:--fs-3xs) leading-5.75 before:absolute before:top-0 before:left-0 before:h-full before:w-1 before:bg-accent-500">
            {"Result: " + outcome}
          </p>
        </div>
      </div>
    </li>
  );
};

export default WorkCard;
