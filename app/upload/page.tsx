import { list, type ListBlobResultBlob } from "@vercel/blob";
import type { Metadata } from "next";
import { MAX_UPLOAD_LABEL } from "./limits";
import { UploadForm } from "./upload-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Upload",
  robots: { index: false },
};

async function listFiles() {
  const files: ListBlobResultBlob[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: "uploads/", cursor });
    files.push(...page.blobs);
    cursor = page.cursor;
  } while (cursor);
  return files.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default async function UploadPage() {
  const files = await listFiles();

  return (
    <main className="mx-auto w-full max-w-2xl space-y-8 px-6 py-16 text-sm">
      <div className="space-y-1">
        <h1 className="text-base font-medium">upload</h1>
        <p className="text-muted-foreground">
          Anyone with this link can see and download everything here. Max {MAX_UPLOAD_LABEL} per
          file.
        </p>
      </div>

      <UploadForm />

      {files.length === 0 ? (
        <p className="text-muted-foreground">No files yet.</p>
      ) : (
        <ul className="divide-y divide-border border-y border-border">
          {files.map((file) => (
            <li key={file.pathname} className="flex items-baseline gap-4 py-2">
              <span className="min-w-0 flex-1 break-words">{file.pathname.split("/").pop()}</span>
              <span className="shrink-0 text-muted-foreground">{formatSize(file.size)}</span>
              <span className="hidden shrink-0 text-muted-foreground sm:inline">
                {file.uploadedAt.toISOString().slice(0, 10)}
              </span>
              <a className="link-underline shrink-0 text-foreground" href={file.downloadUrl}>
                download
              </a>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
