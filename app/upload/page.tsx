import type { Metadata } from "next";
import { DeleteButton } from "./delete-button";
import { getSpaceLeft, listFiles } from "./files";
import { formatSize, MAX_TOTAL_BYTES } from "./limits";
import { UploadForm } from "./upload-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Upload",
  robots: { index: false },
};

export default async function UploadPage() {
  const files = await listFiles();
  const spaceLeft = getSpaceLeft(files);

  return (
    <main className="mx-auto w-full max-w-2xl space-y-8 px-6 py-16 text-sm">
      <div className="space-y-1">
        <h1 className="text-base font-medium">upload</h1>
        <p className="text-muted-foreground">
          Anyone with this link can see, download and delete everything here.{" "}
          {spaceLeft === 0
            ? "Storage is full, so uploads are off."
            : `${formatSize(spaceLeft)} of ${formatSize(MAX_TOTAL_BYTES)} free.`}
        </p>
      </div>

      <UploadForm spaceLeft={spaceLeft} />

      {files.length === 0 ? (
        <p className="text-muted-foreground">No files yet.</p>
      ) : (
        <ul className="divide-y divide-border border-y border-border">
          {files.map((file) => {
            const name = file.pathname.split("/").pop() ?? file.pathname;
            return (
              <li key={file.pathname} className="flex items-baseline gap-4 py-2">
                <span className="min-w-0 flex-1 break-words">{name}</span>
                <span className="shrink-0 text-muted-foreground">{formatSize(file.size)}</span>
                <span className="hidden shrink-0 text-muted-foreground sm:inline">
                  {file.uploadedAt.toISOString().slice(0, 10)}
                </span>
                <a className="link-underline shrink-0 text-foreground" href={file.downloadUrl}>
                  download
                </a>
                <DeleteButton name={name} pathname={file.pathname} />
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
