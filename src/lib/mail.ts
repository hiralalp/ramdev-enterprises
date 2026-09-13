import "server-only";
import type { Enquiry } from "./validation";
import { company } from "@/data/company";

export async function deliverEnquiry(enquiry: Enquiry) {
  const apiKey = process.env.RESEND_API_KEY;
  const sender = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !sender)
    return {
      ok: false,
      status: 503,
      message:
        "Online delivery is not configured yet. Your enquiry has not been sent. Please use the email option below to contact our team.",
    };
  const text = Object.entries(enquiry)
    .filter(([key]) => key !== "website")
    .map(([key, value]) => `${key}: ${value || "Not provided"}`)
    .join("\n\n");
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: [process.env.CONTACT_TO_EMAIL || company.email],
        reply_to: enquiry.email,
        subject: `Website enquiry: ${enquiry.requirement.replace(/[\r\n]/g, " ")}`,
        text,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok)
      return {
        ok: false,
        status: 502,
        message:
          "Email delivery could not be confirmed. Your enquiry details are still here; please contact our team by email.",
      };
    return {
      ok: true,
      status: 200,
      message:
        "Your enquiry has been accepted for email delivery. Thank you for sharing your requirement.",
    };
  } catch {
    return {
      ok: false,
      status: 502,
      message:
        "Email delivery could not be confirmed. Please use the email option below.",
    };
  }
}
