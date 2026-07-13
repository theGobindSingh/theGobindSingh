import { closingSection } from "@app/contact/constants";
import FullWidthWrapper from "@components/full-width-wrapper";
import goldenTemple from "@images/harmandar_sahib.jpg";
import { tw } from "@utils/tailwind";
import Image from "next/image";

const Img = (
  <>
    <Image
      src={goldenTemple}
      alt=""
      fill
      sizes="100vw"
      placeholder="blur"
      className="object-cover contrast-125 not-md:origin-[25%_bottom] not-md:scale-150 not-md:object-[25%_top]"
    />
    <div
      className="absolute inset-0 bg-grey-950/70 opacity-62.5"
      aria-hidden="true"
    />
  </>
);

const Cta = () => {
  return (
    <FullWidthWrapper
      element="section"
      className="relative flex h-80 w-full flex-col items-end justify-center gap-4 not-md:h-125 md:h-100"
      wrapperClassName={tw`relative`}
      wrapperProps={{
        "aria-label": "Availability and location",
      }}
      beforeContainer={Img}
    >
      <p className="bg-grey-50/87.5 px-4 py-2 font-mono text-(size:--fs-4xs) font-semibold tracking-[0.3em] text-grey-950 uppercase">
        {closingSection.label}
      </p>
      <p className="bg-grey-50/87.5 px-6 py-2 font-mono text-(size:--fs-l) font-medium text-grey-950">
        {closingSection.coordinates}
      </p>
      <p className="bg-grey-50/87.5 px-4 py-2 text-(size:--fs-3xs) font-semibold text-grey-950">
        {closingSection.caption}
      </p>
    </FullWidthWrapper>
  );
};

export default Cta;
