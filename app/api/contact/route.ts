import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { sendLeadEmail, escapeHtml } from "@/lib/email";
import { isRateLimited } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(`contact:${ip}`)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again in a minute." },
      { status: 429 },
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the form for errors.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  // Honeypot: silently accept but don't send, so bots can't tell they were caught.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const { name, phone, email, intent, budget, timeline, message, listingSlug } = parsed.data;

  const intentLabel = { buy: "Buy", sell: "Sell", both: "Both", exploring: "Just exploring" }[intent];

  const html = `
    <h2>New website lead</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
    <p><strong>Looking to:</strong> ${escapeHtml(intentLabel)}</p>
    ${budget ? `<p><strong>Budget:</strong> ${escapeHtml(budget)}</p>` : ""}
    ${timeline ? `<p><strong>Timeline:</strong> ${escapeHtml(timeline)}</p>` : ""}
    ${listingSlug ? `<p><strong>Listing:</strong> ${escapeHtml(listingSlug)}</p>` : ""}
    ${message ? `<p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>` : ""}
  `;

  const result = await sendLeadEmail({
    subject: `New lead: ${name} (${intentLabel})`,
    html,
    replyTo: email,
  });

  if (!result.sent) {
    return NextResponse.json(
      { ok: false, error: "We couldn't send your message right now. Please call or email directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
