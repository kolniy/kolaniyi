import { About } from "@/components/about";
import { Activity } from "@/components/activity";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Expertise } from "@/components/expertise";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { Philosophy, Process } from "@/components/philosophy-process";
import { Projects } from "@/components/projects";
import { site } from "@/content/site";
import { socialLinks } from "@/lib/utils";

export default function Home() {
  // Structured data only contains facts configured by the owner.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.title,
    url: site.url,
    sameAs: socialLinks().filter((l) => l.icon !== "mail").map((l) => l.href),
  };

  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Expertise />
        <Projects />
        <Philosophy />
        <Process />
        <Experience />
        <Activity />
        <Contact />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
