import ThemeSetter from "@app/theme-setter";
import Footer from "@components/footer";
import Header from "@components/header";
import { fullName } from "@data";
import { SITE_NAME, SITE_URL } from "@lib/site-config";
import LenisProvider from "@providers/lenis";
import "@styles/globals.css";
import type { Metadata } from "next";
import {
  Anton,
  Epilogue,
  JetBrains_Mono as JetBrainsMono,
  Newsreader,
  Reenie_Beanie as ReenieBeanie,
} from "next/font/google";
import { type PropsWithChildren } from "react";

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
const fontCursive = ReenieBeanie({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--ff-cursive",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Gobind Singh — Full Stack Developer",
    template: "%s — Gobind Singh",
  },
  description:
    "Full stack developer who designs and ships polished, performant web apps. I build, rebuild, and integrate web products for startups and enterprises.",
  authors: [{ name: fullName, url: SITE_URL }],
  creator: fullName,
  publisher: fullName,
  openGraph: {
    title: "Gobind Singh — Full Stack Developer",
    description:
      "Full stack developer who designs and ships polished, performant web apps. See the work, then let's talk.",
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
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
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// const getTheme = async () => {
//   try {
//     const cookieStore = await cookies();
//     return cookieStore.get("theme")?.value ?? null;
//   } catch {
//     return null;
//   }
// };

const RootLayout = ({ children }: PropsWithChildren<unknown>) => {
  // const theme = await getTheme();
  return (
    <html
      lang="en"
      className={[
        "dark",
        fontDisplay.variable,
        fontSans.variable,
        fontMono.variable,
        fontSerif.variable,
        fontCursive.variable,
      ].join(" ")}
    >
      <head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body>
        <ThemeSetter />
        <Header />
        <LenisProvider>
          <div className="relative h-auto w-full pt-(--header-height)">
            {children}
          </div>
        </LenisProvider>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
