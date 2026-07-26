import { getFreelanceSection } from "@app/home/constants";
import FreelanceCard from "@components/freelance-card";
import { Link } from "@components/link";
import HomeSection from "@components/section";

const HomeFreelance = async ({
  titleNumber = "00",
}: {
  titleNumber?: string;
}) => {
  const freelanceSection = await getFreelanceSection();

  return (
    <HomeSection
      title={`${titleNumber} // ${freelanceSection.title}`}
      description={freelanceSection.description}
      wrapperProps={{
        "aria-label": "Freelance client work",
        id: "freelance",
      }}
      link={{
        href: "/work#freelance",
        label: "View all freelance work",
      }}
    >
      <ul className="flex flex-col gap-4">
        {freelanceSection.items.map((item) => {
          return <FreelanceCard key={item.slug ?? item.title} {...item} />;
        })}
      </ul>
      <Link
        href="/work#freelance"
        className="mt-4 ml-auto px-4 py-0 font-mono font-medium"
        color="accent"
        hoverTextColor="grey"
        hoverTextColorWeight={100}
        variant="outlined"
      >
        <span>View all freelance work </span>
        <span className="text-(size:--fs-m)">↗</span>
      </Link>
    </HomeSection>
  );
};

export default HomeFreelance;
