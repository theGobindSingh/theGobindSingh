"use client";

import { formSection } from "@app/contact/constants";
import { Button } from "@components/button";
import { tw } from "@utils/tailwind";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { FormEvent, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const getFieldValue = (formData: FormData, field: string): string => {
  const value = formData.get(field);
  return typeof value === "string" ? value : "";
};

const inputClassName = tw`
  w-full border-0 border-b border-grey-300 bg-transparent py-3
  text-(size:--fs-1xs) text-grey-900 placeholder:text-grey-400
  outline-offset-4 transition-colors duration-(--dur-base) ease-out
  focus-visible:border-accent-600 focus-visible:outline-2
  focus-visible:outline-(--color-focus)
`;

const labelClassName = tw`
  mb-2 block font-mono text-(size:--fs-4xs) font-medium tracking-wide
  text-grey-500 uppercase
`;

const ContactForm = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: getFieldValue(formData, "name"),
      email: getFieldValue(formData, "email"),
      message: getFieldValue(formData, "message"),
    };

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => {
          return null;
        })) as {
          error?: string;
        } | null;
        throw new Error(data?.error ?? formSection.errorMessage);
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : formSection.errorMessage,
      );
    }
  };

  const isSubmitting = status === "submitting";
  const isSuccess = status === "success";

  if (isSuccess) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-start gap-3 border border-grey-300 bg-grey-100 p-8"
      >
        <Check className="size-6 text-accent-600" aria-hidden="true" />
        <p className="text-(size:--fs-s) font-medium text-grey-900">
          {formSection.submit.success}
        </p>
        <p className="max-w-md text-(size:--fs-3xs) text-grey-700">
          {formSection.successMessage}
        </p>
        <Button
          type="button"
          variant="text"
          onClick={() => {
            setStatus("idle");
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-10"
      onSubmit={(event) => {
        void handleSubmit(event);
      }}
      noValidate
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClassName}>
            {formSection.fields.name.label}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder={formSection.fields.name.placeholder}
            className={inputClassName}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClassName}>
            {formSection.fields.email.label}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={formSection.fields.email.placeholder}
            className={inputClassName}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClassName}>
          {formSection.fields.message.label}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          placeholder={formSection.fields.message.placeholder}
          className={tw`${inputClassName} resize-none`}
        />
      </div>

      <div className="flex flex-col items-start gap-4 not-md:flex-col-reverse md:flex-row md:items-center md:justify-between">
        <p className="max-w-xs text-(size:--fs-4xs) text-grey-500">
          {formSection.note}
        </p>
        <Button
          type="submit"
          variant="filled"
          color="accent"
          size="lg"
          disabled={isSubmitting}
          className="flex shrink-0 items-center gap-2"
        >
          {isSubmitting ? (
            <LoaderCircle
              className="size-4 animate-spin motion-reduce:animate-none"
              aria-hidden="true"
            />
          ) : (
            <ArrowRight className="size-4" aria-hidden="true" />
          )}
          {isSubmitting
            ? formSection.submit.submitting
            : formSection.submit.idle}
        </Button>
      </div>

      {status === "error" && (
        <p role="alert" className="text-(size:--fs-3xs) text-error-600">
          {errorMessage ?? formSection.errorMessage}
        </p>
      )}
    </form>
  );
};

export default ContactForm;
