"use client";

import { useEffect, useState } from "react";
import {
  User,
  Briefcase,
  Sparkles,
  FolderGit2,
  Cpu,
  Mail,
  FileText,
  ArrowUp,
  Copy,
  Terminal,
  Zap,
  Coffee,
} from "lucide-react";
import { profile } from "@/data/portfolio";
import { GitHubIcon, LinkedInIcon } from "./icons";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";

const sections = [
  { id: "#about", label: "About", Icon: User },
  { id: "#experience", label: "Experience", Icon: Briefcase },
  { id: "#startup", label: "TrueStar", Icon: Sparkles },
  { id: "#projects", label: "Projects", Icon: FolderGit2 },
  { id: "#skills", label: "Skills", Icon: Cpu },
  { id: "#contact", label: "Contact", Icon: Mail },
];

function navigate(href: string, label: string) {
  window.dispatchEvent(
    new CustomEvent("vinet:navigate", { detail: { href, label } })
  );
}

// Easter-egg: briefly glitch the whole screen (RGB split + shake).
function screenGlitch() {
  const b = document.body;
  b.classList.remove("screen-glitch");
  void b.offsetWidth; // restart the animation
  b.classList.add("screen-glitch");
  window.setTimeout(() => b.classList.remove("screen-glitch"), 900);
}

// ⌘K / Ctrl-K command palette — jump to any section or run a quick action.
// Mounted once globally by SiteShell. Also opens on the `vinet:open-command`
// window event (dispatched by the Nav affordance).
export default function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("vinet:open-command", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("vinet:open-command", onOpen);
    };
  }, []);

  // Close first, then act — lets Radix release its scroll lock/focus trap
  // before we scroll or navigate.
  const run = (fn: () => void) => {
    setOpen(false);
    window.setTimeout(fn, 70);
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      className="border-white/10 bg-[#0a0a0b]"
    >
      <CommandInput placeholder="Jump to a section or run a command…" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>

        <CommandGroup heading="Navigate">
          {sections.map((s) => (
            <CommandItem
              key={s.id}
              value={s.label}
              onSelect={() => run(() => navigate(s.id, s.label))}
            >
              <s.Icon />
              <span>{s.label}</span>
            </CommandItem>
          ))}
          <CommandItem
            value="Back to top home"
            onSelect={() => run(() => navigate("#top", "Home"))}
          >
            <ArrowUp />
            <span>Back to top</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem
            value="Copy email address"
            onSelect={() =>
              run(() => navigator.clipboard?.writeText(profile.email))
            }
          >
            <Copy />
            <span>Copy email</span>
          </CommandItem>
          <CommandItem
            value="Email Vineet message"
            onSelect={() =>
              run(() => {
                window.location.href = `mailto:${profile.email}`;
              })
            }
          >
            <Mail />
            <span>Email me</span>
          </CommandItem>
          <CommandItem
            value="Open resume pdf cv"
            onSelect={() => run(() => window.open(profile.resumeUrl, "_blank"))}
          >
            <FileText />
            <span>Open résumé</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Links">
          <CommandItem
            value="GitHub profile code"
            onSelect={() => run(() => window.open(profile.github, "_blank"))}
          >
            <GitHubIcon />
            <span>GitHub</span>
          </CommandItem>
          <CommandItem
            value="LinkedIn profile"
            onSelect={() => run(() => window.open(profile.linkedin, "_blank"))}
          >
            <LinkedInIcon />
            <span>LinkedIn</span>
          </CommandItem>
        </CommandGroup>

        {/* Hidden easter-eggs — only surface when you type the magic words. */}
        <CommandGroup heading="> secret">
          <CommandItem
            value="sudo hire vineet make offer"
            onSelect={() =>
              run(() => {
                window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
                  "Permission granted, let's talk"
                )}&body=${encodeURIComponent(
                  "Hi Vineet, I found the secret command. Let's chat."
                )}`;
              })
            }
          >
            <Zap />
            <span>sudo hire-vineet</span>
          </CommandItem>
          <CommandItem
            value="whoami identity bio"
            onSelect={() =>
              run(() =>
                navigator.clipboard?.writeText(
                  "Vineet Kumar: AI software engineer. Founder @ TrueStar. Ex-Microsoft, ex-ION Trading."
                )
              )
            }
          >
            <Terminal />
            <span>whoami</span>
          </CommandItem>
          <CommandItem
            value="glitch matrix hack the planet"
            onSelect={() => run(screenGlitch)}
          >
            <Zap />
            <span>./glitch --run</span>
          </CommandItem>
          <CommandItem
            value="coffee brew make caffeine 418"
            onSelect={() => run(screenGlitch)}
          >
            <Coffee />
            <span>brew coffee</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
