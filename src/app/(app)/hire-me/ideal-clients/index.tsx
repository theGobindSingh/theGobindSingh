import { idealClientsSection } from "@app/hire-me/ideal-clients/constants";
import ScrollReveal from "@components/scroll-reveal";
import Section from "@components/section";

const IdealClients = ({ titleNumber = "00" }: { titleNumber?: string }) => {
  return (
    <Section
      title={`${titleNumber} // ${idealClientsSection.title}`}
      description={idealClientsSection.description}
      wrapperProps={{
        "aria-label": "Who I work best with",
        id: "ideal-clients",
      }}
    >
      <ScrollReveal>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {idealClientsSection.items.map((item) => {
            return (
              <li
                key={item.title}
                className="flex flex-col gap-3 border border-grey-300 p-6"
              >
                <h3 className="text-(size:--fs-l) font-medium">{item.title}</h3>
                <p className="text-(size:--fs-3xs) text-grey-700">
                  {item.description}
                </p>
              </li>
            );
          })}
        </ul>
      </ScrollReveal>
    </Section>
  );
};

export default IdealClients;
