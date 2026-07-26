import type { Block } from "@lib/case-studies";
import Image from "next/image";
import { Fragment } from "react";

const paraClass = (variant?: "body" | "lead") => {
  if (variant === "lead") {
    return "max-w-2xl text-(size:--fs-l) font-medium text-grey-900";
  }
  return "max-w-2xl text-(size:--fs-3xs) leading-6.5 text-grey-700";
};

const renderBlock = (block: Block, key: string): React.ReactNode => {
  switch (block.type) {
    case "para":
      return (
        <p key={key} className={paraClass(block.variant)}>
          {block.src}
        </p>
      );

    case "numbered-list":
      return (
        <ol
          key={key}
          className="flex flex-col gap-4 font-mono text-(size:--fs-3xs)"
        >
          {block.src.map((item, index) => {
            return (
              <li key={`${key}-${index}`} className="flex items-start gap-4">
                <span className="text-accent-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-grey-700">{item}</span>
              </li>
            );
          })}
        </ol>
      );

    case "bullet-list":
      return (
        <ul key={key} className="flex flex-col gap-2.5">
          {block.src.map((item, index) => {
            return (
              <li
                key={`${key}-${index}`}
                className="relative pl-4 text-(size:--fs-3xs) text-grey-700 before:absolute before:top-2 before:left-0 before:size-1 before:bg-accent-600"
              >
                {item}
              </li>
            );
          })}
        </ul>
      );

    case "eyebrow":
      return (
        <div
          key={key}
          className="flex items-end justify-between gap-4 border-b border-grey-200 pb-4"
        >
          <span className="font-mono text-(size:--fs-4xs) tracking-widest text-grey-500 uppercase">
            {block.src}
          </span>
          {block.icon && (
            <span
              className="size-1.5 shrink-0 bg-accent-600"
              aria-hidden="true"
            />
          )}
        </div>
      );

    case "h3":
      return (
        <h3 key={key} className="text-(size:--fs-l) font-medium">
          {block.src}
        </h3>
      );

    case "code":
      return (
        <pre
          key={key}
          className="overflow-x-auto border border-grey-300 bg-grey-100 p-6 font-mono text-(size:--fs-4xs) text-grey-800"
        >
          <code>{block.src}</code>
        </pre>
      );

    case "image":
      return (
        <div
          key={key}
          className={`relative overflow-hidden border border-grey-300 ${
            block.aspect === "square" ? "aspect-square" : "aspect-video"
          }`}
        >
          <Image
            src={block.src}
            alt={block.alt}
            fill
            sizes="(min-width: 768px) 40vw, 90vw"
            className="object-cover"
          />
        </div>
      );

    case "simple-card":
      return (
        <div
          key={key}
          className="flex flex-col justify-between gap-4 border border-grey-300 p-8"
        >
          {block.src.chip && (
            <span className="font-mono text-(size:--fs-4xs) tracking-widest text-accent-600 uppercase">
              {block.src.chip}
            </span>
          )}
          <h4 className="text-(size:--fs-m) font-medium">{block.src.title}</h4>
          <p className="text-(size:--fs-3xs) text-grey-700">{block.src.desc}</p>
        </div>
      );

    case "chip-list":
      return (
        <div key={key} className="flex flex-wrap gap-2">
          {block.src.map((chip, index) => {
            return (
              <span
                key={`${key}-${index}`}
                className="bg-grey-100 px-3 py-1 font-mono text-(size:--fs-4xs) font-medium tracking-wide text-grey-700"
              >
                {chip}
              </span>
            );
          })}
        </div>
      );

    case "stat":
      return (
        <div key={key} className="border-t border-current/20 pt-8">
          <span className="mb-4 block text-(size:--fs-4xl) font-medium">
            {block.src.value}
          </span>
          <p className="font-mono text-(size:--fs-4xs) uppercase opacity-80">
            {block.src.label}
          </p>
        </div>
      );

    case "signature":
      return (
        <div
          key={key}
          className="flex items-center gap-4 border-t border-grey-200 pt-8"
        >
          {block.src.image && (
            <Image
              src={block.src.image.src}
              alt={block.src.image.alt}
              width={48}
              height={48}
              className="h-12 w-auto object-contain"
            />
          )}
          <div className="font-mono text-(size:--fs-4xs) leading-tight text-grey-500 uppercase">
            {block.src.name}
            <br />
            {block.src.role}
          </div>
        </div>
      );

    case "container": {
      const colsClass =
        block.cols === 2
          ? "grid grid-cols-1 gap-8 md:grid-cols-2"
          : block.cols === 3
            ? "grid grid-cols-1 gap-8 md:grid-cols-3"
            : "flex flex-col gap-8";

      return (
        <div key={key} className={colsClass}>
          {block.items.map((item, index) => {
            return (
              <Fragment key={`${key}-${index}`}>
                {renderBlock(item, `${key}-${index}`)}
              </Fragment>
            );
          })}
        </div>
      );
    }

    default:
      return null;
  }
};

export default renderBlock;
