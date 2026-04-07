import { sanityClient } from "@/lib/sanity";
import { BLOG_TRANSLATIONS_QUERY } from "@/lib/queries";
import { getCorsHeaders, handleOptions } from "@/lib/api";

export async function OPTIONS(req: Request) {
  return handleOptions(req);
}

export async function GET(req: Request) {
  const origin = req.headers.get("origin");

  try {
    const { searchParams } = new URL(req.url);
    const translationGroup = searchParams.get("translationGroup");

    if (!translationGroup) {
      return Response.json(
        { ok: false, error: "translationGroup gerekli." },
        { status: 400, headers: getCorsHeaders(origin) }
      );
    }

    const translations = await sanityClient.fetch(BLOG_TRANSLATIONS_QUERY, {
      translationGroup,
    });

    return Response.json(
      { ok: true, data: translations },
      { headers: getCorsHeaders(origin) }
    );
  } catch (error) {
    console.error("blog-translations error:", error);

    return Response.json(
      { ok: false, error: "Çeviri blogları alınamadı." },
      { status: 500, headers: getCorsHeaders(origin) }
    );
  }
}