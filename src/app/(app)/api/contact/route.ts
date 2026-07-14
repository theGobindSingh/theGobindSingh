import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name?: string;
  email?: string;
  message?: string;
}

const isValidEmail = (value: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

// Placeholder handler: validates the payload and simulates a send. No email
// provider is wired up yet — swap the delay below for a real integration
// (e.g. Resend) once one is decided.
export const POST = async (request: NextRequest) => {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const name = payload.name?.trim();
  const email = payload.email?.trim();
  const message = payload.message?.trim();

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

  await new Promise((resolve) => {
    // eslint-disable-next-line no-console -- temp
    console.log({ name, email, message });
    return setTimeout(resolve, 600);
  });

  return NextResponse.json({ ok: true });
};
