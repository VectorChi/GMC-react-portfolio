import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const experience = [
  {
    role: "Senior Product Designer",
    company: "Fintech Startup",
    period: "2023 — Present",
    description:
      "Leading end-to-end product design for a B2B payments platform. Own the design system, conduct user research, and collaborate closely with engineering and product teams.",
  },
  {
    role: "UI/UX Designer & Frontend Developer",
    company: "Digital Agency",
    period: "2021 — 2023",
    description:
      "Designed and built responsive web applications for clients across e-commerce, healthcare, and education sectors. Bridged the gap between design and engineering.",
  },
  {
    role: "Junior Frontend Developer",
    company: "Tech Company",
    period: "2020 — 2021",
    description:
      "Built reusable React components, maintained design consistency across the product, and contributed to the company's internal design system.",
  },
];

const values = [
  {
    title: "Craft",
    description:
      "I care deeply about the details — typography, spacing, motion, and interaction feel. Good design is invisible; great design is felt.",
  },
  {
    title: "Simplicity",
    description:
      "The best solutions are often the simplest. I push to remove complexity and surface only what truly matters to the user.",
  },
  {
    title: "Collaboration",
    description:
      "Design doesn't happen in a vacuum. I thrive working alongside engineers, PMs, and stakeholders to ship work everyone is proud of.",
  },
];

export default function About() {
  return (
    <>
      <Head>
        <title>About — Adimchi Sylvester</title>
        <meta
          name="description"
          content="Learn more about Adimchi Sylvester — product designer and frontend developer."
        />
      </Head>

      <div className="mx-auto max-w-5xl px-6 py-16">
        {/* Header */}
        <section className="py-12 sm:py-16">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">
            About me
          </p>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Designer who codes,
            <br />
            developer who designs.
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted">
            I&apos;m Adimchi Sylvester — a product designer and frontend developer
            based in Lagos, Nigeria. I&apos;ve spent the last 4+ years helping
            startups and companies build digital products that people actually
            enjoy using.
          </p>
        </section>

        {/* Bio */}
        <section className="grid gap-12 border-t border-border py-16 sm:grid-cols-2">
          <div>
            <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-border">
              <Image
                src="/1.jpg"
                alt="Adimchi Sylvester"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="flex flex-col justify-center gap-5">
            <p className="leading-relaxed text-muted">
              My path into tech was unconventional — I started as a visual
              designer, fell in love with the web, and taught myself to code. That
              dual background gives me an edge: I think in systems and ship in
              code.
            </p>
            <p className="leading-relaxed text-muted">
              When I&apos;m not designing or building, you&apos;ll find me reading
              about design history, contributing to open source, or mentoring
              junior designers breaking into the industry.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="mailto:adimchisylvester2@gmail.com"
                className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-80"
              >
                Get in touch
              </a>
              <a
                href="/resume.pdf"
                className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
              >
                Download CV
              </a>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="border-t border-border py-16">
          <h2 className="mb-10 text-2xl font-bold tracking-tight">
            What I believe in
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {values.map(({ title, description }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="mb-3 text-base font-semibold text-accent">{title}</h3>
                <p className="text-sm leading-relaxed text-muted">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="border-t border-border py-16">
          <h2 className="mb-10 text-2xl font-bold tracking-tight">Experience</h2>
          <div className="space-y-10">
            {experience.map(({ role, company, period, description }) => (
              <div key={role} className="grid gap-2 sm:grid-cols-[200px_1fr]">
                <div>
                  <p className="text-sm font-medium">{period}</p>
                  <p className="text-sm text-muted">{company}</p>
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">{role}</h3>
                  <p className="text-sm leading-relaxed text-muted">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border py-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight">
            Want to work together?
          </h2>
          <p className="mb-8 text-muted">
            I&apos;m currently available for freelance and full-time roles.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:adimchisylvester2@gmail.com"
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-80"
            >
              Send me an email
            </a>
            <Link
              href="/"
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
            >
              View my work
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
