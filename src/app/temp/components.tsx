export const SectionHead = ({ label, id }: { label: string; id?: string }) => {
  return (
    <div
      id={id}
      className="mb-12 border-t-2 border-[var(--color-border-strong)] pt-6"
    >
      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] opacity-30">
        {label}
      </span>
    </div>
  );
};

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
    <div className="flex items-baseline gap-4 border-b border-[var(--color-border)] py-2.5 font-mono text-[13px] w-full">
      <span className="w-64 shrink-0 font-medium">{left}</span>
      <span className="opacity-45">{right}</span>
      {hint !== "" ? (
        <span className="ml-auto shrink-0 text-[11px] opacity-20">{hint}</span>
      ) : null}
    </div>
  );
};
