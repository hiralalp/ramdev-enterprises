import { NextRequest, NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validation";
import { deliverEnquiry } from "@/lib/mail";

export const runtime = "nodejs";
const attempts = new Map<string, { count: number; expires: number }>();
const bodyLimit = 16000;

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (
    origin &&
    origin !== request.nextUrl.origin &&
    origin !== process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")
  )
    return NextResponse.json(
      { message: "This enquiry must be submitted from our website." },
      { status: 403 },
    );
  if (!request.headers.get("content-type")?.includes("application/json"))
    return NextResponse.json(
      { message: "JSON content is required." },
      { status: 415 },
    );
  if (Number(request.headers.get("content-length")) > bodyLimit)
    return NextResponse.json(
      { message: "The enquiry is too large." },
      { status: 413 },
    );
  const now = Date.now();
  for (const [key, entry] of attempts)
    if (entry.expires < now) attempts.delete(key);
  const client =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const attempt = attempts.get(client) || { count: 0, expires: now + 60000 };
  if (attempt.count >= 5 || attempts.size >= 10000)
    return NextResponse.json(
      {
        message:
          "Too many attempts. Please try again in a minute or contact us by email.",
      },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  attempt.count++;
  attempts.set(client, attempt);
  try {
    const reader = request.body?.getReader();
    if (!reader)
      return NextResponse.json(
        { message: "An enquiry is required." },
        { status: 400 },
      );
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      size += chunk.value.byteLength;
      if (size > bodyLimit) {
        await reader.cancel();
        return NextResponse.json(
          { message: "The enquiry is too large." },
          { status: 413 },
        );
      }
      chunks.push(chunk.value);
    }
    const parsed = enquirySchema.safeParse(
      JSON.parse(Buffer.concat(chunks).toString("utf8")),
    );
    if (!parsed.success)
      return NextResponse.json(
        {
          message: "Please check the enquiry fields and try again.",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    const result = await deliverEnquiry(parsed.data);
    return NextResponse.json(
      { message: result.message, sent: result.ok },
      { status: result.status },
    );
  } catch {
    return NextResponse.json(
      {
        message:
          "The enquiry could not be read. Please check your details and try again.",
      },
      { status: 400 },
    );
  }
}
