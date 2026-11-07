import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { getSpaceLeft, listFiles } from "../files";

// Files go straight from the browser to Blob storage, so this only issues upload tokens.
export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;
  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (_pathname, clientPayload) => {
        const spaceLeft = getSpaceLeft(await listFiles());
        if (spaceLeft === 0 || Number(clientPayload) > spaceLeft) throw new Error("Storage is full");
        return { maximumSizeInBytes: spaceLeft };
      },
    });
    return Response.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload refused";
    return Response.json({ error: message }, { status: 400 });
  }
}
