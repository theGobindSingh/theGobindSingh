import { email as ownerEmail } from "@data";
import configPromise from "@payload-config";
import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";

interface ContactPayload {
  name?: string;
  email?: string;
  message?: string;
}

// Resend only sends from a domain you have verified, so the config's
// gmail.com default is rejected with a 403. onboarding@resend.dev is Resend's
// unverified-sender fallback: it can only deliver to the account owner, which
// is exactly what this form does. Verify gobindsingh.dev at resend.com/domains,
// then set CONTACT_FROM_ADDRESS (e.g. "Gobind Singh <hello@gobindsingh.dev>")
// for better deliverability — no code change needed.
const FROM_ADDRESS =
  process.env.CONTACT_FROM_ADDRESS ?? "Portfolio <onboarding@resend.dev>";

const isValidEmail = (value: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

const escapeHtml = (value: string): string => {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
};

const GOOGLE_FORM_RESPONSE_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeTUtYEulxNKji0aL5wXAcg8yowTf_BEoZYhxX-V8HFSH_pqA/formResponse";

// Google Forms has no public write API; POSTing to the viewform's formResponse
// endpoint with its entry.* field IDs is the documented workaround. Best-effort:
// a dropped log entry isn't worth losing a real enquiry over, so failures here
// are logged, not thrown.
const logToGoogleForm = async (
  name: string,
  email: string,
  message: string,
) => {
  try {
    await fetch(GOOGLE_FORM_RESPONSE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        "entry.87773612": name,
        "entry.704820590": email,
        "entry.1903692069": message,
      }),
    });
  } catch (error) {
    // eslint-disable-next-line no-console -- best-effort log, worth a trace
    console.error("[contact] google form log failed", error);
  }
};

export const POST = async (request: NextRequest) => {
  let payloadBody: ContactPayload;

  try {
    payloadBody = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const name = payloadBody.name?.trim();
  const email = payloadBody.email?.trim();
  const message = payloadBody.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and project details are all required." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "That email address doesn't look right." },
      { status: 400 },
    );
  }

  await logToGoogleForm(name, email, message);

  try {
    const payload = await getPayload({ config: configPromise });

    await payload.sendEmail({
      from: FROM_ADDRESS,
      to: ownerEmail,
      replyTo: email,
      subject: `Portfolio enquiry from ${name}`,
      html: [
        `<p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>`,
        `<p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>`,
      ].join(""),
    });
  } catch (error) {
    // Never report success on a send failure: the page promises "I read every
    // message myself", so a dropped message is a lost lead, not a cosmetic bug.
    // eslint-disable-next-line no-console -- a dropped enquiry must leave a trace
    console.error("[contact] send failed", error);
    return NextResponse.json(
      { error: `That didn't send. Please email me directly at ${ownerEmail}.` },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
};
