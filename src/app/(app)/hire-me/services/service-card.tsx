import type { servicesSection } from "@app/hire-me/services/constants";

type Service = (typeof servicesSection.items)[number];

const ServiceCard = ({ title, description, chips }: Service) => {
  return (
    <li className="flex flex-col gap-4 border border-grey-300 p-6">
      <h3 className="text-(size:--fs-l) font-medium">{title}</h3>
      <p className="text-(size:--fs-3xs) text-grey-700">{description}</p>
      <ul className="mt-auto flex flex-wrap items-center gap-2 pt-2">
        {chips.map((chip) => {
          return (
            <li
              key={chip}
              className="bg-grey-100 px-2 py-1 font-mono text-(size:--fs-4xs) font-medium tracking-wide text-grey-700"
            >
              {chip}
            </li>
          );
        })}
      </ul>
    </li>
  );
};

export default ServiceCard;
