import { connectSection } from "@app/contact/constants";
import HoverSwapText from "@components/hover-swap-text";
import { Link } from "@components/link";
import { ArrowUpRight } from "lucide-react";

const itemMapper = (item: (typeof connectSection.items)[number]) => {
  const Icon = item.logo;
  return (
    <li key={item.key}>
      <Link
        href={item.url}
        variant="text"
        className="group flex w-fit items-center gap-2 p-0 text-(size:--fs-s) font-medium text-grey-900 hover:text-accent-600"
      >
        <Icon className="size-4 shrink-0 text-grey-500 group-hover:text-accent-600" />
        {item.label}
        {item.userName && (
          <HoverSwapText label={item.label} secondary={item.userName} />
        )}
        <ArrowUpRight
          className="size-4 shrink-0 text-grey-400 transition-transform duration-(--dur-fast) ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-600"
          aria-hidden="true"
        />
      </Link>
    </li>
  );
};

const Connect = () => {
  return (
    <div className="flex flex-col gap-12">
      <div>
        <h2 className="mb-4 font-mono text-(size:--fs-4xs) font-medium tracking-wide text-grey-500 uppercase">
          {connectSection.title}
        </h2>
        <ul className="flex flex-col gap-4">
          {connectSection.items.map(itemMapper)}
        </ul>
      </div>

      <div className="border border-grey-300 bg-grey-100 p-6">
        <h3 className="mb-2 font-mono text-(size:--fs-4xs) font-medium tracking-wide text-grey-900 uppercase">
          {connectSection.meta.title}
        </h3>
        <p className="text-(size:--fs-3xs) text-grey-700">
          {connectSection.meta.availability}
        </p>
        <p className="text-(size:--fs-3xs) text-grey-700">
          {connectSection.meta.responseTime}
        </p>
      </div>
    </div>
  );
};

export default Connect;
