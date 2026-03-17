import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, message } = await req.json();

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Test mail",
      html: `<p>${message}</p>`,
    });

    return Response.json({ ok: true, data });
  } catch (e) {
    return Response.json({ ok: false, error: e });
  }
}