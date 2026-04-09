import { sanityClient } from "@/lib/sanity";
import { LATEST_BLOGS_QUERY } from "@/lib/queries";
import { getCorsHeaders, handleOptions } from "@/lib/api";

export async function OPTIONS(req: Request) {
  return handleOptions(req);
}

export async function GET(req: Request) {
  const origin = req.headers.get("origin");

  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang")?.toLowerCase() || "en";
    const posts = await sanityClient.fetch(LATEST_BLOGS_QUERY, { lang });

    return Response.json(
      { ok: true, data: posts },
      { headers: getCorsHeaders(origin) }
    );
  } catch (error) {
    console.error("latest-blogs error:", error);

    return Response.json(
      { ok: false, error: "Latest bloglar alınamadı." },
      { status: 500, headers: getCorsHeaders(origin) }
    );
  }
}
