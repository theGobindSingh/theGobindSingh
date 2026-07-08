import type { endorsementsSection } from "@app/work/constants";

type Testimonial = (typeof endorsementsSection.testimonials)[number];

const EndorsementChip = ({ quote, authorName, role, company }: Testimonial) => {
  return (
    <li
      className="flex flex-1 basis-80 flex-col gap-4 border border-grey-300 p-6"
      style={{ maxWidth: "480px" }}
    >
      <p className="font-serif text-title/7 text-grey-800 italic">
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
