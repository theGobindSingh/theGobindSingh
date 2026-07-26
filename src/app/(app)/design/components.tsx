export const Row = ({
  left,
  right,
  hint = "",
}: {
  left: string;
  right: string;
  hint?: string;
}) => {
  return (
    <div
      className="
        flex w-full flex-col gap-1 border-b border-grey-200 py-3 font-mono
        text-(size:--fs-4xs)
        sm:flex-row sm:items-baseline sm:gap-4
      "
    >
      <span className="shrink-0 font-medium text-grey-900 sm:w-56">{left}</span>
      <span className="break-all text-grey-600">{right}</span>
      {hint !== "" ? (
        <span className="text-grey-500 sm:ml-auto sm:shrink-0">{hint}</span>
      ) : null}
    </div>
  );
};
