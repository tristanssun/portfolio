"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteButton({ name, pathname }: { name: string; pathname: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleClick() {
    if (!window.confirm(`Delete ${name} for everyone? This can't be undone.`)) return;
    setBusy(true);
    const response = await fetch("/upload/delete", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ pathname }),
    }).catch(() => null);
    if (!response?.ok) {
      window.alert(`Couldn't delete ${name}.`);
      setBusy(false);
      return;
    }
    router.refresh();
  }

  return (
    <button
      type="button"
      disabled={busy}
      onClick={handleClick}
      className="link-underline shrink-0 cursor-pointer text-muted-foreground disabled:opacity-60"
    >
      {busy ? "deleting..." : "delete"}
    </button>
  );
}
