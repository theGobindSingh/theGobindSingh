import type { endorsementsSection } from "@app/home/constants";

type Testimonial = (typeof endorsementsSection.testimonials)[number];

const EndorsementChip = ({ quote, authorName, role, company }: Testimonial) => {
  if (quote.length <= 3) return null;
  return (
    <li className="flex w-full flex-col gap-5 border border-grey-300 p-8">
      <p className="max-w-[68ch] font-serif text-(size:--fs-s) leading-relaxed text-grey-900">
        {`"${quote}"`}
      </p>
      <p className="font-mono text-(size:--fs-4xs) tracking-wide text-grey-500 uppercase">
        {authorName} {"• "}
        {role} {"• "}
        {company}
      </p>
    </li>
  );
};

export default EndorsementChip;
