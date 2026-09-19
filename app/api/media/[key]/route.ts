export const dynamic = "force-dynamic";

// Preserve partial-image response status, which external rewrites normalize to 200.
export async function GET(request: Request, context: { params: Promise<{ key: string }> }) {
  const { key } = await context.params;
  if (!/^[\w.-]+$/.test(key) || key.startsWith(".")) return new Response("Invalid file", { status: 400 });
  const headers = new Headers();
  for (const name of ["range", "if-none-match", "if-range"]) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  const origin = process.env.FUNDRAISER_ORIGIN || "https://aws.pie4cancer.org";
  const upstream = await fetch(`${origin}/api/media/${encodeURIComponent(key)}`, { headers, cache: "no-store" });
  const responseHeaders = new Headers();
  for (const name of ["content-type", "content-length", "content-range", "accept-ranges", "etag", "cache-control", "x-content-type-options"]) {
    const value = upstream.headers.get(name);
    if (value) responseHeaders.set(name, value);
  }
  return new Response(upstream.body, { status: upstream.status, headers: responseHeaders });
}
