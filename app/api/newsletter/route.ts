import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const allowedOrigins = [
  "http://localhost:3000",
  "https://bravixcreative.com",
];

function getCorsHeaders(origin: string | null) {
  const allowedOrigin =
    origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0];

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");

  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(origin),
  });
}

export async function POST(req: Request) {
  const origin = req.headers.get("origin");

  try {
    const { email} = await req.json();

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "bravixcreative@gmail.com",
      subject: `Yeni Abone!`,
      html: `
        <h2>Yeni Abone kaydoldu.</h2>
        <p><strong>Email:</strong> ${email}</p>
      `,
    });

    return Response.json(
      { ok: true, data },
      { headers: getCorsHeaders(origin) }
    );
  } catch (error) {
    return Response.json(
      { ok: false, error: "Mail gönderilemedi." },
      {
        status: 500,
        headers: getCorsHeaders(origin),
      }
    );
  }
}