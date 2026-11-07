import { list, type ListBlobResultBlob } from "@vercel/blob";
import { MAX_TOTAL_BYTES } from "./limits";

export async function listFiles() {
  const files: ListBlobResultBlob[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: "uploads/", cursor });
    files.push(...page.blobs);
    cursor = page.cursor;
  } while (cursor);
  return files.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
}

export function getSpaceLeft(files: ListBlobResultBlob[]) {
  const used = files.reduce((total, file) => total + file.size, 0);
  return Math.max(0, MAX_TOTAL_BYTES - used);
}
