import ThemeSetter from "@/app/theme-setter";
import type { Metadata } from "next";
import {
  Anton,
  Caveat,
  DM_Mono as DMMono,
  Newsreader,
  Space_Grotesk as SpaceGrotesk,
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
const fontSans = SpaceGrotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--ff-sans",
  display: "swap",
});
const fontMono = DMMono({
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
  title: "Next.js Starter Template",
  description:
    "Starter template with Next.js, TypeScript, and Tailwind baseline.",
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
    <html lang="en" className={theme === "dark" ? "dark" : "light"}>
      <head />
      <body
        className={`${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable} ${fontSerif.variable} ${fontCursive.variable}`}
      >
        <ThemeSetter />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
