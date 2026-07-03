import FullWidthWrapper from "@components/full-width-wrapper";
import { Fragment, PropsWithChildren } from "react";

interface HomeSectionProps {
  title: string;
  description?: string | undefined;
}

const HomeSection = ({
  title,
  description,
}: PropsWithChildren<HomeSectionProps>) => {
  return (
    <FullWidthWrapper>
      <Fragment>{children}</Fragment>
    </FullWidthWrapper>
  );
};

export default HomeSection;
