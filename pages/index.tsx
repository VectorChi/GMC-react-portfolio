import Head from "next/head";
import Link from "next/link";

const skills = [
  { category: "Design", items: ["Figma", "UI/UX Design", "Prototyping", "Design Systems", "User Research"] },
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "CSS / SCSS"] },
  { category: "Tools", items: ["Git", "VS Code", "Notion", "Linear", "Vercel"] },
];

const projects = [
  {
    title: "Finance Dashboard",
    description:
      "A clean, data-dense dashboard for tracking investments and expenses with real-time charts and customizable widgets.",
    tags: ["Product Design", "React", "TypeScript"],
    year: "2024",
  },
  {
    title: "E-Commerce Redesign",
    description:
      "Full end-to-end redesign of an e-commerce platform — from discovery to checkout — increasing conversion by 28%.",
    tags: ["UX Research", "Figma", "Next.js"],
    year: "2024",
  },
  {
    title: "Mobile Banking App",
    description:
      "Designed and built the frontend for a mobile-first banking experience with biometric auth and spending insights.",
    tags: ["Mobile Design", "React Native", "Figma"],
    year: "2023",
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Adimchi Sylvester — Designer & Developer</title>
        <meta
          name="description"
          content="Portfolio of Adimchi Sylvester — product designer and frontend developer crafting thoughtful digital experiences."
        />
      </Head>

      <div className="mx-auto max-w-5xl px-6 py-20">
        {/* Hero */}
        <section className="py-16 sm:py-24">
          <p className="mb-4 text-sm font-medium tracking-widest uppercase text-accent">
            Product Designer & Developer
          </p>
          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Hi, I&apos;m{" "}
            <span className="text-accent">Adimchi</span>.
            <br />
            I build things
            <br />
            people love.
          </h1>
          <p className="mb-10 max-w-xl text-lg leading-relaxed text-muted">
            I design and develop digital products that are fast, accessible, and
            delightful. Currently open to new opportunities.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/about"
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-80"
            >
              About me
            </Link>
            <a
              href="mailto:adimchisylvester2@gmail.com"
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
            >
              Get in touch
            </a>
          </div>
        </section>

        {/* Skills */}
        <section className="py-16 border-t border-border">
          <h2 className="mb-12 text-2xl font-bold tracking-tight">
            What I work with
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {skills.map(({ category, items }) => (
              <div key={category}>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent">
                  {category}
                </h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-muted hover:text-foreground transition-colors"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="py-16 border-t border-border">
          <div className="mb-12 flex items-end justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Selected Work</h2>
            <span className="text-sm text-muted">{projects.length} projects</span>
          </div>
          <div className="space-y-6">
            {projects.map((project, i) => (
              <article
                key={project.title}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-accent/40 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-3">
                      <span className="text-xs text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-xs text-muted">{project.year}</span>
                    </div>
                    <h3 className="mb-2 text-xl font-semibold group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-muted">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border px-3 py-1 text-xs text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="shrink-0 text-muted group-hover:text-accent transition-colors text-xl">
                    →
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 border-t border-border text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight">
            Let&apos;s work together
          </h2>
          <p className="mb-8 text-muted">
            Have a project in mind? I&apos;d love to hear about it.
          </p>
          <a
            href="mailto:adimchisylvester2@gmail.com"
            className="inline-block rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-80"
          >
            Say hello →
          </a>
        </section>
      </div>
    </>
  );
}
