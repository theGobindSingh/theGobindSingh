import { Link } from "@components/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: {
    index: false,
    follow: false,
  },
};

const NotFound = () => {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <h1 className="font-mono text-(size:--fs-4xl) font-bold text-grey-900">
        404
      </h1>
      <p className="max-w-md text-(size:--fs-s) text-grey-700">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/">Back to home</Link>
    </main>
  );
};

export default NotFound;
