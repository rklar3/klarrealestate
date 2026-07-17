import { NextResponse } from "next/server";
import { valuationSchema } from "@/lib/validation";
import { sendLeadEmail, escapeHtml } from "@/lib/email";
import { isRateLimited } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(`valuation:${ip}`)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again in a minute." },
      { status: 429 },
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = valuationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the form for errors.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const { address, city, propertyType, beds, baths, approxSqft, name, phone, email, timeline } =
    parsed.data;

  const html = `
    <h2>New home valuation request</h2>
    <p><strong>Address:</strong> ${escapeHtml(address)}, ${escapeHtml(city)}</p>
    <p><strong>Property type:</strong> ${escapeHtml(propertyType)}</p>
    ${beds ? `<p><strong>Beds:</strong> ${escapeHtml(beds)}</p>` : ""}
    ${baths ? `<p><strong>Baths:</strong> ${escapeHtml(baths)}</p>` : ""}
    ${approxSqft ? `<p><strong>Approx. sqft:</strong> ${escapeHtml(approxSqft)}</p>` : ""}
    <hr />
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
    ${timeline ? `<p><strong>Timeline:</strong> ${escapeHtml(timeline)}</p>` : ""}
  `;

  const result = await sendLeadEmail({
    subject: `Home valuation request: ${address}, ${city}`,
    html,
    replyTo: email,
  });

  if (!result.sent) {
    return NextResponse.json(
      { ok: false, error: "We couldn't send your request right now. Please call or email directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
