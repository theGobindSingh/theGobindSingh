import NotFoundLinks from "@components/not-found-links";
import "@styles/globals.css";
import type { Metadata } from "next";
import { Epilogue, JetBrains_Mono as JetBrainsMono } from "next/font/google";

const fontSans = Epilogue({
  subsets: ["latin", "latin-ext"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--ff-sans",
  display: "swap",
});

const fontMono = JetBrainsMono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--ff-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Page not found",
  robots: {
    index: false,
  },
};

const GlobalNotFound = () => {
  return (
    <html
      lang="en"
      className={["dark", fontSans.variable, fontMono.variable].join(" ")}
    >
      <body>
        <main className="flex min-h-screen flex-col items-center justify-center gap-6 text-center">
          <h1 className="font-mono text-(size:--fs-4xl) font-bold text-grey-900">
            404
          </h1>
          <p className="max-w-md text-(size:--fs-s) text-grey-700">
            This page does not exist or has moved — here are the pages that do.
          </p>
          <NotFoundLinks />
        </main>
      </body>
    </html>
  );
};

export default GlobalNotFound;
