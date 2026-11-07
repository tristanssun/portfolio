import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { MAX_UPLOAD_BYTES } from "../limits";

// Files go straight from the browser to Blob storage, so this only issues upload tokens.
export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;
  const result = await handleUpload({
    body,
    request,
    onBeforeGenerateToken: async () => ({ maximumSizeInBytes: MAX_UPLOAD_BYTES }),
  });
  return Response.json(result);
}
