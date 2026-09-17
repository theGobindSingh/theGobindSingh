import { proofSection } from "@app/hire-me/proof/constants";
import FullWidthWrapper from "@components/full-width-wrapper";
import Hr from "@components/hr";

const Proof = () => {
  return (
    <FullWidthWrapper
      element="section"
      className="flex flex-col gap-6 py-12"
      wrapperProps={{ "aria-label": "Experience and results", id: "proof" }}
    >
      <ul className="flex flex-wrap items-center gap-2">
        {proofSection.chips.map((chip) => {
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

      <p className="max-w-3xl text-(size:--fs-2xs) text-grey-700">
        {proofSection.body}
      </p>

      <Hr marginTop="mt-8" marginBottom="mb-0" />
    </FullWidthWrapper>
  );
};

export default Proof;
