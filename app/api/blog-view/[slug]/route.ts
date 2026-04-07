import { sanityWriteClient } from "@/lib/sanity";
import { getCorsHeaders, handleOptions } from "@/lib/api";

export async function OPTIONS(req: Request) {
  return handleOptions(req);
}

export async function POST(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const origin = req.headers.get("origin");

  try {
    const { slug } = await context.params;

    if (!slug) {
      return Response.json(
        { ok: false, error: "Slug gerekli." },
        {
          status: 400,
          headers: getCorsHeaders(origin),
        }
      );
    }

    const post = await sanityWriteClient.fetch(
      `*[_type == "blog_bravix" && slug.current == $slug][0]{
        _id,
        views
      }`,
      { slug }
    );

    if (!post?._id) {
      return Response.json(
        { ok: false, error: "Blog bulunamadı." },
        {
          status: 404,
          headers: getCorsHeaders(origin),
        }
      );
    }

    const result = await sanityWriteClient
      .patch(post._id)
      .setIfMissing({ views: 0 })
      .inc({ views: 1 })
      .commit();

    return Response.json(
      {
        ok: true,
        views: result.views ?? (post.views || 0) + 1,
      },
      {
        headers: getCorsHeaders(origin),
      }
    );
  } catch (error: any) {
    console.error("blog-view error:", error);
    console.error("blog-view error message:", error?.message);
    console.error("blog-view error statusCode:", error?.statusCode);
    console.error("blog-view error responseBody:", error?.responseBody);

    return Response.json(
      { ok: false, error: "View artırılamadı." },
      {
        status: 500,
        headers: getCorsHeaders(origin),
      }
    );
  }
}