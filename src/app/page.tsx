import SiteShell from "@/components/SiteShell";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Marquee from "@/components/Marquee";
import Startup from "@/components/Startup";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Credentials from "@/components/Credentials";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <About />
      <Experience />
      <Marquee />
      <Startup />
      <Projects />
      <Skills />
      <Credentials />
      <Contact />
    </SiteShell>
  );
}
