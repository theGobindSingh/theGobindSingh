import ThemeSetter from "@app/theme-setter";
import Header from "@components/header";
import ThemeSwitcher from "@components/theme-switcher";
import LenisProvider from "@providers/lenis";
import type { Metadata } from "next";
import {
  Anton,
  Caveat,
  Epilogue,
  JetBrains_Mono as JetBrainsMono,
  Newsreader,
} from "next/font/google";
import { cookies } from "next/headers";
import { type PropsWithChildren } from "react";
import "./globals.css";

const fontDisplay = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--ff-display",
  display: "swap",
});
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
const fontSerif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--ff-serif",
  display: "swap",
});
const fontCursive = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--ff-cursive",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Gobind Singh — Full Stack Developer",
    template: "%s — Gobind Singh",
  },
  description:
    "Full stack developer who designs and ships polished, performant web apps. I build, rebuild, and integrate web products for startups and enterprises.",
  openGraph: {
    title: "Gobind Singh — Full Stack Developer",
    description:
      "Full stack developer who designs and ships polished, performant web apps. See the work, then let's talk.",
    type: "website",
    siteName: "Gobind Singh",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gobind Singh — Full Stack Developer",
    description:
      "Full stack developer who designs and ships polished, performant web apps.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const getTheme = async () => {
  try {
    const cookieStore = await cookies();
    return cookieStore.get("theme")?.value ?? null;
  } catch {
    return null;
  }
};

const RootLayout = async ({ children }: PropsWithChildren<unknown>) => {
  const theme = await getTheme();
  return (
    <html
      lang="en"
      className={[
        theme === "dark" ? "dark" : "light",
        fontDisplay.variable,
        fontSans.variable,
        fontMono.variable,
        fontSerif.variable,
        fontCursive.variable,
      ].join(" ")}
    >
      <head />
      <body>
        <ThemeSetter />
        <Header />
        <LenisProvider>
          <div className="pt-(--header-height)">{children}</div>
        </LenisProvider>
        <ThemeSwitcher />
      </body>
    </html>
  );
};

export default RootLayout;
