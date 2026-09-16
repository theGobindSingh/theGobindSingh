import { faqSection } from "@app/about/faq/constants";
import RailSection from "@components/rail-section";
import ScrollReveal from "@components/scroll-reveal";

const itemMapper = ({
  question,
  answer,
}: (typeof faqSection.items)[number]) => {
  return (
    <div key={question} className="py-8 first:pt-0 last:pb-0">
      <h3 className="mb-4 text-(size:--fs-l) font-medium text-grey-900">
        {question}
      </h3>
      <p className="max-w-2xl text-(size:--fs-3xs) text-grey-700">{answer}</p>
    </div>
  );
};

const Faq = ({ titleNumber = "00" }: { titleNumber?: string }) => {
  return (
    <RailSection
      titleNumber={titleNumber}
      title={faqSection.title}
      wrapperProps={{
        "aria-label": "Frequently asked questions",
        id: "faq",
      }}
    >
      <ScrollReveal className="divide-y divide-grey-200">
        {faqSection.items.map(itemMapper)}
      </ScrollReveal>
    </RailSection>
  );
};

export default Faq;
