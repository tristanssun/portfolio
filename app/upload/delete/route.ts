import { del } from "@vercel/blob";

export async function POST(request: Request) {
  const { pathname } = (await request.json()) as { pathname?: unknown };
  // One file at a time, and only files uploaded through this page.
  if (typeof pathname !== "string" || !/^uploads\/[^/]+\/[^/]+$/.test(pathname)) {
    return Response.json({ error: "Invalid file" }, { status: 400 });
  }
  await del(pathname);
  return new Response(null, { status: 204 });
}
