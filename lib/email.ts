import { Resend } from "resend";
import { siteConfig } from "@/data/site";

type LeadEmail = {
  subject: string;
  html: string;
  replyTo?: string;
};

// Email provider is isolated behind this one function so it can be swapped
// (e.g. for Nodemailer/SES) without touching the route handlers that call it.
export async function sendLeadEmail({ subject, html, replyTo }: LeadEmail) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn(
      "[email] RESEND_API_KEY is not set — lead email was not sent. Set it in .env.local to enable delivery.",
    );
    return { sent: false as const };
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: process.env.LEAD_FROM_EMAIL ?? "Klar Real Estate <leads@klarrealestate.ca>",
    to: siteConfig.email,
    subject,
    html,
    replyTo,
  });

  if (error) {
    console.error("[email] Resend send failed", error);
    return { sent: false as const };
  }

  // TODO: CRM webhook hook. Once a CRM (e.g. Follow Up Boss, kvCORE) is
  // chosen, POST the same lead payload here, e.g.:
  //
  //   await fetch(process.env.CRM_WEBHOOK_URL!, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(leadPayload),
  //   });

  return { sent: true as const };
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
