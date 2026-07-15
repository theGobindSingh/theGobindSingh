import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Manual cache-bust for content updated outside a Next.js request (CLI
 * scripts, seed/migration runs) where Payload's collection hooks can't call
 * revalidateTag themselves. Admin UI edits already revalidate automatically
 * via the collection's afterChange/afterDelete hooks.
 */
export const GET = (request: NextRequest) => {
  const secret = request.nextUrl.searchParams.get("secret");
  const tag = request.nextUrl.searchParams.get("tag");

  if (!tag) {
    return NextResponse.json({ error: "Missing tag" }, { status: 400 });
  }
  if (secret !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidateTag(tag, "max");
  return NextResponse.json({ revalidated: true, tag });
};
