import type { CSSProperties } from "react";
import { ThemeSwitcher } from "@/components/theme-switcher";

const links = [
  { label: "github", href: "https://github.com/tristanssun" },
  { label: "linkedin", href: "https://www.linkedin.com/in/tristansun/" },
  { label: "instagram", href: "https://www.instagram.com/tristan142857/" },
];

const linkClass = "link-underline text-foreground";

const sections = [
  {
    label: "experience",
    items: [
      {
        title: "Research Science Institute 2026",
        detail: "bioinformatics research",
        href: "https://youtu.be/-nFmaJTAXPs",
      },
      {
        title: "USA Computing Olympiad Camp 2025",
        href: "https://usaco.org/index.php?page=finalists25",
      },
      {
        title: "Paradigm Fellowship 2026",
        href: "https://paradigm.xyz/fellowship-2026",
      },
      {
        title: "USA AI Olympiad Camp 2026",
      },
      {
        title: "Highland Park High School Student Council 2026-2027 Executive President",
      },
      {
        title: "Congressional App Challenge TX24 2025 Winner",
        href: "https://www.congressionalappchallenge.us/25-TX24/",
      },
      {
        title: "Competitive programming",
        href: "https://codeforces.com/profile/tristansun",
      },
    ],
  },
  {
    label: "research",
    items: [
      {
        title: "Single Nucleus Dissection of Nine Alzheimer's Disease Comorbidities",
        resources: [
          {
            label: "Paper",
            href: "/research/single-nucleus-alzheimers-comorbidities.pdf",
          },
          { label: "Presentation", href: "https://youtu.be/-nFmaJTAXPs" },
        ],
      },
      {
        title: "Omega-3 Fatty Acids and Atrial Fibrillation",
        resources: [
          {
            label: "Paper",
            href: "/research/omega-3-fatty-acids-atrial-fibrillation.pdf",
          },
        ],
      },
      {
        title: "Diophantine Approximations on Spheres",
        resources: [
          {
            label: "Presentation",
            href: "/research/diophantine-approximations-on-spheres.pdf",
          },
        ],
      },
    ],
  },
  {
    label: "projects",
    items: [
      {
        title: "DNA Data Storage",
        detail: "designed the fastest inkjet-based system in the world",
      },
      {
        title: "MyHeartHealth",
        detail: "iOS app for blood pressure log parsing",
        href: "https://apps.apple.com/us/app/myhearthealth/id6760372304",
      },
      {
        title: "FunctionalSharp",
        detail: "functional programming in C#",
        href: "https://github.com/tfg1434/FunctionalSharp",
      },
      {
        title: "Loungeware",
        detail: "open-source game with 50+ contributors",
        href: "https://loungeware.games/",
      },
    ],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-10 text-lg text-foreground sm:py-16">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-3xl flex-col justify-between">
        <div>
          <header className="mb-16">
            <div className="flex items-start justify-between gap-6">
              <h1
                className="load-drop group inline-grid text-4xl font-medium tracking-normal"
                style={{ "--load-delay": "40ms" } as CSSProperties}
              >
                <span className="col-start-1 row-start-1 transition duration-200 ease-out group-hover:-translate-y-1 group-hover:opacity-0">
                  Tristan Sun
                </span>
                <span
                  aria-hidden="true"
                  className="col-start-1 row-start-1 translate-y-1 opacity-0 transition duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100"
                >
                  孙思齐
                </span>
              </h1>
              <ThemeSwitcher />
            </div>
            <p
              className="load-drop mt-7 text-xl leading-9 text-muted-foreground"
              style={{ "--load-delay": "120ms" } as CSSProperties}
            >
              working at the intersection of ai, biology and robotics
            </p>
          </header>

          <div className="space-y-14">
            {sections.map((section, sectionIndex) => (
              <section
                key={section.label}
                aria-labelledby={section.label}
                className="load-drop"
                style={
                  {
                    "--load-delay": `${220 + sectionIndex * 130}ms`,
                  } as CSSProperties
                }
              >
                <h2
                  id={section.label}
                  className="mb-7 text-sm uppercase text-muted-foreground"
                >
                  {section.label}
                </h2>
                <div className="space-y-5">
                  {section.items.map((item) => (
                    <p key={item.title} className="text-lg leading-9">
                      {"href" in item && item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className={linkClass}
                        >
                          {item.title}
                        </a>
                      ) : (
                        <span className="text-foreground">{item.title}</span>
                      )}
                      {"detail" in item && item.detail ? (
                        <span className="text-muted-foreground">
                          {" "}
                          - {item.detail}
                        </span>
                      ) : null}
                      {"resources" in item && item.resources?.map((link) => (
                        <span
                          key={link.href}
                          className="ml-4 text-sm text-muted-foreground"
                        >
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="link-underline text-muted-foreground"
                          >
                            {link.label}
                          </a>
                        </span>
                      ))}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        <footer
          className="load-drop mt-16 border-t border-border pt-8 text-base text-muted-foreground"
          style={{ "--load-delay": "500ms" } as CSSProperties}
        >
          <p>reach out at tris at mit dot edu</p>
          <div className="mt-7 flex gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="link-underline text-muted-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </main>
  );
}
