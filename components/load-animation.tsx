"use client";

import { useEffect } from "react";

export function LoadAnimation() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll(".load-drop"));

    elements.forEach((element) => {
      element.classList.remove("is-visible");
    });

    const timeout = window.setTimeout(() => {
      elements.forEach((element) => {
        element.classList.add("is-visible");
      });
    }, 120);

    return () => window.clearTimeout(timeout);
  }, []);

  return null;
}
