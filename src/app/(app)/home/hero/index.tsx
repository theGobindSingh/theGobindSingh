import LeftSide from "@app/home/hero/left-side";
import RightSide from "@app/home/hero/right-side";
import FullWidthWrapper from "@components/full-width-wrapper";

const Hero = () => {
  return (
    <FullWidthWrapper
      element="section"
      className="flex justify-center gap-16 py-16 not-md:flex-col"
      wrapperProps={{
        "aria-label":
          "Gobind Singh, full stack developer specializing in React, Next.js, TypeScript, and Node.js",
        id: "hero",
      }}
    >
      <LeftSide />
      <RightSide />
    </FullWidthWrapper>
  );
};

export default Hero;
