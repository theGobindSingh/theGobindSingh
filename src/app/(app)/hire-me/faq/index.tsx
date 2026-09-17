import { faqSection } from "@app/hire-me/faq/constants";
import RailSection from "@components/rail-section";
import ScrollReveal from "@components/scroll-reveal";
import { Plus } from "lucide-react";

const itemMapper = ({
  question,
  answer,
}: (typeof faqSection.items)[number]) => {
  return (
    <li key={question} className="border border-grey-300">
      <details className="work-card-details">
        <summary className="work-card-summary">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-(size:--fs-l) font-medium text-grey-900">
              {question}
            </h3>
            <Plus
              className="size-[1em] shrink-0 work-card-icon text-(size:--fs-2xs) text-grey-500"
              aria-hidden="true"
            />
          </div>
        </summary>
        <div className="border-t border-grey-200 p-6">
          <p className="max-w-2xl text-(size:--fs-3xs) text-grey-700">
            {answer}
          </p>
        </div>
      </details>
    </li>
  );
};

const Faq = ({ titleNumber = "00" }: { titleNumber?: string }) => {
  return (
    <RailSection
      titleNumber={titleNumber}
      title={faqSection.title}
      wrapperProps={{ "aria-label": "Frequently asked questions", id: "faq" }}
    >
      <ScrollReveal>
        <ul className="flex flex-col gap-4">
          {faqSection.items.map(itemMapper)}
        </ul>
      </ScrollReveal>
    </RailSection>
  );
};

export default Faq;
