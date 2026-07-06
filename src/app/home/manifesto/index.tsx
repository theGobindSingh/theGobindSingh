import HomeSection from "@app/home/components/section";
import { manifestoSection } from "@app/home/constants";
import { tw } from "@utils/tailwind";

const manifestoItemsMapper = ({
  title,
  description,
  subTitle,
}: (typeof manifestoSection.items)[number]) => {
  return (
    <li key={title} className="flex flex-col gap-2 text-(size:--fs-3xs)">
      <div className="flex flex-col gap-1">
        <h3 className="font-mono font-medium text-accent-600">{`// ${title}`}</h3>
        <span className="text-(size:--fs-2xs) font-medium uppercase">
          {subTitle}
        </span>
      </div>
      <p className="text-grey-700">{description}</p>
    </li>
  );
};

const HomeManifesto = ({ titleNumber = "00" }: { titleNumber?: string }) => {
  return (
    <HomeSection
      title={`${titleNumber} // ${manifestoSection.title}`}
      wrapperClassName={tw`bg-[hsla(var(--color-grey-100-base),0.5)]`}
      className="py-20"
      wrapperProps={{
        "aria-label": "Engineering principles and development philosophy",
        id: "manifesto",
      }}
    >
      <ul className="grid w-full grid-cols-3 gap-8 gap-y-8">
        {manifestoSection.items.map(manifestoItemsMapper)}
      </ul>
    </HomeSection>
  );
};

export default HomeManifesto;
