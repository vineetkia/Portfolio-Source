import { profile } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
  ArrowUpRightIcon,
} from "./icons";

const channels = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    Icon: MailIcon,
  },
  {
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
    Icon: PhoneIcon,
  },
  {
    label: "LinkedIn",
    value: "in/-vineet",
    href: profile.linkedin,
    Icon: LinkedInIcon,
  },
  {
    label: "GitHub",
    value: "@vineetkia",
    href: profile.github,
    Icon: GitHubIcon,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-zinc-900 bg-zinc-950/40"
    >
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <Reveal>
          <SectionHeading index="06" title="Get in touch" />
        </Reveal>

        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
          <Reveal>
            <h3 className="font-heading text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">
              Let&apos;s build something.
            </h3>
            <p className="mt-4 max-w-md text-zinc-400">
              I&apos;m open to software engineering internships and new-grad
              roles, and always happy to talk distributed systems, AI, or a good
              side project. The fastest way to reach me is email.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-400"
            >
              Say hello
              <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>

          <Reveal delay={120} className="space-y-3">
            {channels.map(({ label, value, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 px-5 py-4 transition-colors hover:border-emerald-500/40 hover:bg-zinc-900/70"
              >
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-400 transition-colors group-hover:text-emerald-400">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-wide text-zinc-500">
                    {label}
                  </span>
                  <span className="block truncate text-sm text-zinc-200">
                    {value}
                  </span>
                </span>
                <ArrowUpRightIcon className="ml-auto h-4 w-4 flex-none text-zinc-600 transition-colors group-hover:text-emerald-400" />
              </a>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
