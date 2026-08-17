import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { LoadAnimation } from "@/components/load-animation";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tristan Sun",
  description: "Tristan's portfolio.",
};

const themeScript = `
(() => {
  const storedTheme = window.localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = storedTheme ? storedTheme === "dark" : prefersDark;

  document.documentElement.classList.toggle("dark", isDark);
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <LoadAnimation />
        {children}
      </body>
    </html>
  );
}
