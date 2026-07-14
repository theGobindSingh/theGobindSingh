import { introSection } from "@app/about/constants";

const RightSide = () => {
  return (
    <div className="flex flex-col justify-center gap-4 md:col-span-7 md:col-start-6">
      <p className="max-w-[75%] text-(size:--fs-l) leading-normal font-semibold text-grey-900 not-md:max-w-[85%]">
        {introSection.title}
      </p>
      <p className="ml-auto text-justify text-(size:--fs-1xs) leading-loose text-grey-600 [text-align-last:right]">
        {introSection.paragraph}
      </p>
    </div>
  );
};

export default RightSide;
