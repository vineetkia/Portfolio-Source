import SiteShell from "@/components/SiteShell";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Startup from "@/components/Startup";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <About />
      <Experience />
      <Startup />
      <Projects />
      <Skills />
      <Contact />
    </SiteShell>
  );
}
