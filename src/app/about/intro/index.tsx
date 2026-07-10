import LeftSide from "@app/about/intro/left-side";
import RightSide from "@app/about/intro/right-side";
import FullWidthWrapper from "@components/full-width-wrapper";

const Intro = () => {
  return (
    <FullWidthWrapper
      element="section"
      className="grid grid-cols-1 gap-8 py-16 md:grid-cols-12"
      wrapperProps={{
        "aria-label": "Portrait and introduction",
        id: "intro",
      }}
    >
      <LeftSide />
      <RightSide />
    </FullWidthWrapper>
  );
};

export default Intro;
