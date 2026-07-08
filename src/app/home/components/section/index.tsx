import FullWidthWrapper from "@components/full-width-wrapper";
import { Link } from "@components/link";
import { ArrowUpRight } from "lucide-react";
import type { HTMLAttributes } from "react";
import { FC, Fragment, PropsWithChildren } from "react";

interface HomeSectionProps {
  title: string;
  description?: string | undefined;
  wrapper?: FC<PropsWithChildren<unknown>>;
  className?: string | undefined;
  wrapperClassName?: string | undefined;
  wrapperProps?: HTMLAttributes<HTMLElement>;
  link?: {
    label: string;
    href: string;
  };
}

const HomeSection = ({
  title,
  description,
  wrapper: Wrapper = Fragment,
  children,
  className,
  wrapperClassName,
  wrapperProps,
  link = {} as never,
}: PropsWithChildren<HomeSectionProps>) => {
  return (
    <FullWidthWrapper
      className={`flex flex-col gap-4 py-12 ${className ?? ""}`.trim()}
      wrapperClassName={wrapperClassName!}
      {...(wrapperProps ? { wrapperProps } : {})}
    >
      <Wrapper>
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-mono text-(size:--fs-2xs) font-medium text-accent-600">
              {title}
            </h2>
            {description && (
              <p className="max-w-2xl text-(size:--fs-3xs) tracking-wide text-grey-700 [word-spacing:0.125em]">
                {description}
              </p>
            )}
          </div>
          {link?.href && link?.label && (
            <Link
              href={link.href}
              className="flex items-end justify-center gap-1 p-0 font-mono tracking-wide text-grey-900 hover:text-accent-600"
              variant="text"
            >
              <span className="text-(size:--fs-3xs)">{link.label}</span>
              <ArrowUpRight
                className="text-(size:--fs-m)"
                height={"1em"}
                width={"1em"}
              />
            </Link>
          )}
        </div>
        <hr className="mb-6 border-grey-300" />
        {children}
      </Wrapper>
    </FullWidthWrapper>
  );
};

export default HomeSection;
