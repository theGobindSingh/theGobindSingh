import ContactForm from "@app/contact/form";
import {
  channelsSection,
  contactSection,
} from "@app/hire-me/contact/constants";
import { Link } from "@components/link";
import Section from "@components/section";
import { ArrowUpRight } from "lucide-react";

const itemMapper = (item: (typeof channelsSection.items)[number]) => {
  const Icon = item.logo;
  return (
    <li key={item.key}>
      <Link
        href={item.href}
        variant="text"
        className="group flex min-h-11 items-center justify-start gap-2 border border-grey-300 bg-grey-100 px-4 py-3 text-(size:--fs-s) font-medium text-grey-900 hover:border-accent-600 hover:text-accent-600"
      >
        <Icon
          className="size-4 shrink-0 text-grey-500 group-hover:text-accent-600"
          aria-hidden="true"
        />
        {item.label}
        <ArrowUpRight
          className="size-4 shrink-0 text-grey-400 transition-transform duration-(--dur-fast) ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-600"
          aria-hidden="true"
        />
      </Link>
      <p className="mt-2 font-mono text-(size:--fs-4xs) text-grey-600">
        {item.detail}
      </p>
      <p className="mt-1 max-w-xs text-(size:--fs-4xs) text-grey-700">
        {item.reason}
      </p>
    </li>
  );
};

const Contact = () => {
  return (
    <Section
      title={contactSection.title}
      description={contactSection.lede}
      wrapperClassName="scroll-mt-24"
      wrapperProps={{
        "aria-label": "Contact form and direct channels",
        id: "contact",
        tabIndex: -1,
      }}
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <Link
            href={contactSection.primaryCta.href}
            variant="filled"
            size="lg"
            color="accent"
            className="min-h-11 w-full md:w-auto"
          >
            {contactSection.primaryCta.label}
          </Link>
          <Link
            href={contactSection.secondaryCta.href}
            variant="outlined"
            size="lg"
            color="accent"
            className="min-h-11 w-full md:w-auto"
          >
            {contactSection.secondaryCta.label}
          </Link>
        </div>
        <p className="text-(size:--fs-3xs) text-grey-600">
          {contactSection.supportLine}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-8">
          <ContactForm source="hire-me" />
        </div>
        <div className="flex flex-col gap-12 md:col-span-4 md:border-l md:border-grey-300 md:pl-12">
          <div>
            <h3 className="mb-4 font-mono text-(size:--fs-4xs) font-medium tracking-wide text-grey-500 uppercase">
              {channelsSection.title}
            </h3>
            <ul className="flex flex-col gap-6">
              {channelsSection.items.map(itemMapper)}
            </ul>
          </div>
          <p className="font-mono text-(size:--fs-4xs) tracking-wide text-grey-500">
            {channelsSection.location}
          </p>
        </div>
      </div>
    </Section>
  );
};

export default Contact;
