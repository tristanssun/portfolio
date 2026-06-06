"use client";

import { SunMoon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

function getStoredTheme() {
  if (typeof window === "undefined") {
    return false;
  }

  const storedTheme = window.localStorage.getItem("theme");

  if (storedTheme) {
    return storedTheme === "dark";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyTheme(isDark: boolean) {
  document.documentElement.classList.toggle("dark", isDark);
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
}

export function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(getStoredTheme);

  function updateTheme(nextIsDark: boolean) {
    setIsDark(nextIsDark);
    applyTheme(nextIsDark);
    window.localStorage.setItem("theme", nextIsDark ? "dark" : "light");
  }

  return (
    <Button
      aria-label="Toggle theme"
      title="Toggle theme"
      variant="secondary"
      size="icon"
      onClick={() => updateTheme(!isDark)}
    >
      <SunMoon className="size-5" />
    </Button>
  );
}
