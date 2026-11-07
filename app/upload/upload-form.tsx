"use client";

import { upload } from "@vercel/blob/client";
import { useRouter } from "next/navigation";
import { useState, type ChangeEvent } from "react";
import { formatSize } from "./limits";

export function UploadForm({ spaceLeft }: { spaceLeft: number }) {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const files = Array.from(input.files ?? []);
    const totalSize = files.reduce((total, file) => total + file.size, 0);
    if (totalSize > spaceLeft) {
      setStatus(`Not enough space: ${formatSize(totalSize)} selected, ${formatSize(spaceLeft)} free.`);
      input.value = "";
      return;
    }

    setBusy(true);
    try {
      for (const file of files) {
        setStatus(`Uploading ${file.name}...`);
        // The random folder keeps same-named files apart and keeps the download name clean.
        await upload(`uploads/${crypto.randomUUID()}/${file.name}`, file, {
          access: "public",
          handleUploadUrl: "/upload/token",
          multipart: true,
          clientPayload: String(file.size),
          onUploadProgress: ({ percentage }) =>
            setStatus(`Uploading ${file.name}... ${Math.round(percentage)}%`),
        });
      }
      setStatus("Done.");
      router.refresh();
    } catch (error) {
      setStatus(`Upload failed: ${error instanceof Error ? error.message : "unknown error"}`);
    } finally {
      setBusy(false);
      input.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <input
        type="file"
        multiple
        disabled={busy || spaceLeft === 0}
        onChange={handleChange}
        aria-label="Choose files to upload"
        className="block w-full cursor-pointer text-muted-foreground file:mr-3 file:cursor-pointer file:rounded-md file:border file:border-input file:bg-transparent file:px-3 file:py-1 file:text-foreground disabled:opacity-60"
      />
      <p className="min-h-5 text-muted-foreground" role="status">
        {status}
      </p>
    </div>
  );
}
