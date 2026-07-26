import { Link } from "@components/link";
import { WorkItem } from "@data";

// A teaser, not the write-up: the Constraints/Architecture/Outcome prose lives
// on /work, where the card expands. Repeating it here made the homepage denser
// than the page it links to.
const WorkCard = ({ description, stack, title, links, slug }: WorkItem) => {
  const stackMapper = (tech: string) => {
    return (
      <span
        key={`${title} stack-${tech}`}
        className="bg-grey-100 px-2 py-1 font-mono text-(size:--fs-4xs) font-medium tracking-wide text-grey-700"
      >
        {tech}
      </span>
    );
  };

  return (
    <li id={slug} className="scroll-mt-24 border border-grey-300 p-6">
      <span className="font-mono text-(size:--fs-4xs) font-medium tracking-wider text-accent-600 uppercase">
        Project
      </span>
      <h4 className="mt-3 text-(size:--fs-l) font-medium">
        {slug ? <Link href={`/work#${slug}`}>{title}</Link> : title}
      </h4>
      <p className="mt-2 max-w-2xl text-(size:--fs-3xs) text-grey-700">
        {description}
      </p>
      {stack.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {stack.map(stackMapper)}
        </div>
      )}
      <div className="mt-6 flex flex-wrap items-center gap-6">
        {slug && (
          <Link
            href={`/work#${slug}`}
            variant="outlined"
            color="accent"
            className="text-(size:--fs-3xs)"
            aria-label={`Read more about ${title}`}
          >
            Read more →
          </Link>
        )}
        {links?.live && (
          <Link
            href={links.live}
            target="_blank"
            rel="noopener noreferrer"
            variant="text"
            className="p-0 font-mono text-(size:--fs-3xs)"
            aria-label={`View live site for ${title}`}
          >
            View Live →
          </Link>
        )}
        {links?.github && (
          <Link
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            variant="text"
            className="p-0 font-mono text-(size:--fs-3xs)"
            aria-label={`View repository for ${title}`}
          >
            View Repository →
          </Link>
        )}
      </div>
    </li>
  );
};

export default WorkCard;
