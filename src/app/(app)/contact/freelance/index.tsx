import { freelanceSection } from "@app/contact/constants";
import { Link } from "@components/link";
import { ArrowUpRight } from "lucide-react";

const itemMapper = (item: (typeof freelanceSection.items)[number]) => {
  const Icon = item.logo;
  return (
    <li key={item.key}>
      <Link
        href={item.url}
        variant="text"
        className="group flex items-center gap-2 border border-grey-300 bg-grey-100 px-4 py-3 text-(size:--fs-s) font-medium text-grey-900 hover:border-accent-600 hover:text-accent-600"
      >
        <Icon className="size-4 shrink-0 text-grey-500 group-hover:text-accent-600" />
        {item.label}
        <ArrowUpRight
          className="size-4 shrink-0 text-grey-400 transition-transform duration-(--dur-fast) ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-600"
          aria-hidden="true"
        />
      </Link>
    </li>
  );
};

const Freelance = () => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="font-mono text-(size:--fs-4xs) font-medium tracking-wide text-grey-500 uppercase">
          {freelanceSection.title}
        </h2>
        <p className="mt-1 text-(size:--fs-3xs) text-grey-600">
          {freelanceSection.description}
        </p>
      </div>
      <ul className="flex flex-wrap gap-3">
        {freelanceSection.items.map(itemMapper)}
      </ul>
    </div>
  );
};

export default Freelance;
