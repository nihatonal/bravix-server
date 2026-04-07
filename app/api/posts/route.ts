import { sanityClient } from "@/lib/sanity";
import { POSTS_QUERY } from "@/lib/queries";
import { getCorsHeaders, handleOptions } from "@/lib/api";

export async function OPTIONS(req: Request) {
  return handleOptions(req);
}

export async function GET(req: Request) {
  const origin = req.headers.get("origin");

  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang");

    if (!lang) {
      return Response.json(
        { ok: false, error: "lang gerekli." },
        { status: 400, headers: getCorsHeaders(origin) }
      );
    }

    const posts = await sanityClient.fetch(POSTS_QUERY, { lang });

    return Response.json(
      { ok: true, data: posts },
      { headers: getCorsHeaders(origin) }
    );
  } catch (error) {
    console.error("posts error:", error);

    return Response.json(
      { ok: false, error: "Postlar alınamadı." },
      { status: 500, headers: getCorsHeaders(origin) }
    );
  }
}