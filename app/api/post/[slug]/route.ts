import { sanityClient } from "@/lib/sanity";
import { POST_BY_SLUG_QUERY } from "@/lib/queries";
import { getCorsHeaders, handleOptions } from "@/lib/api";

export async function OPTIONS(req: Request) {
  return handleOptions(req);
}

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const origin = req.headers.get("origin");

  try {
    const { slug } = await context.params;
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang");

    if (!slug) {
      return Response.json(
        { ok: false, error: "slug gerekli." },
        { status: 400, headers: getCorsHeaders(origin) }
      );
    }

    if (!lang) {
      return Response.json(
        { ok: false, error: "lang gerekli." },
        { status: 400, headers: getCorsHeaders(origin) }
      );
    }

    const post = await sanityClient.fetch(POST_BY_SLUG_QUERY, { slug, lang });

    if (!post) {
      return Response.json(
        { ok: false, error: "Post bulunamadı." },
        { status: 404, headers: getCorsHeaders(origin) }
      );
    }

    return Response.json(
      { ok: true, data: post },
      { status: 200, headers: getCorsHeaders(origin) }
    );
  } catch (error: any) {
    console.error("post-by-slug error:", error);

    return Response.json(
      { ok: false, error: error?.message || "Post alınamadı." },
      { status: 500, headers: getCorsHeaders(origin) }
    );
  }
}