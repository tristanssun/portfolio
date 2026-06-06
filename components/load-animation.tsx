"use client";

import { useEffect } from "react";

export function LoadAnimation() {
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      document.documentElement.classList.add("is-loaded");
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return null;
}
