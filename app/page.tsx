import { ThemeSwitcher } from "@/components/theme-switcher";

const links = [
  { label: "github", href: "https://github.com/tristanssun" },
  { label: "linkedin", href: "https://www.linkedin.com/in/tristansun/" },
  { label: "instagram", href: "https://www.instagram.com/tristan142857/" },
];

const linkClass =
  "relative text-foreground transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300 after:ease-out hover:text-foreground hover:after:scale-x-100";

const sections = [
  {
    label: "experience",
    items: [
      { title: "Research Science Institute 2026", detail: "bioinformatics research" },
      {
        title: "USA Computing Olympiad Camp 2025",
        detail: "top 25 in the USA",
      },
      {
        title: "Highland Park High School Student Council",
        detail: "2026-2027 executive president",
      },
      { title: "USA AI Olympiad Camp 2026", detail: "machine learning" },
      {
        title: "Congressional App Challenge 2025",
        detail: "TX24 winner",
        href: "https://www.congressionalappchallenge.us/25-TX24/",
      },
      {
        title: "Codeforces tristansun",
        detail: "2188 max rating",
        href: "https://codeforces.com/profile/tristansun",
      },
    ],
  },
  {
    label: "projects",
    items: [
      {
        title: "MyHeartHealth",
        detail: "iOS app for Blood Pressure log parsing",
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
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-2xl flex-col justify-between">
        <div>
          <header className="mb-16">
            <div className="flex items-start justify-between gap-6">
              <h1 className="group inline-grid text-4xl font-medium tracking-normal">
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
            <p className="mt-7 text-xl leading-9 text-muted-foreground">
              working at the intersection of ai, biology, and robotics.
            </p>
          </header>

          <div className="space-y-14">
            {sections.map((section) => (
              <section key={section.label} aria-labelledby={section.label}>
                <h2
                  id={section.label}
                  className="mb-7 text-sm uppercase text-muted-foreground"
                >
                  {section.label}
                </h2>
                <div className="space-y-5">
                  {section.items.map((item) => (
                    <p key={item.title} className="text-lg leading-9">
                      {item.href ? (
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
                      <span className="text-muted-foreground">
                        {" "}
                        - {item.detail}
                      </span>
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        <footer className="mt-16 border-t border-border pt-8 text-base text-muted-foreground">
          <p>Reach out to me at tris at mit dot edu.</p>
          <div className="mt-7 flex gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="relative transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300 after:ease-out hover:text-foreground hover:after:scale-x-100"
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
