import { Header } from "@/app/components/layout/Header";
import { Hero } from "@/app/components/sections/Hero";
import { About } from "@/app/components/sections/About";
import { ProjectList } from "@/app/components/sections/ProjectList";
import { getAllProjects } from "@/lib/projects";
import { HashScrollHandler } from "@/app/components/HashScrollHandler";

export default function Home() {
  const projects = getAllProjects();

  return (
    <div className="min-h-screen font-sans">
      <HashScrollHandler />
      <Header />
      <main>
        <Hero />
        <ProjectList projects={projects} />
      </main>
    </div>
  );
}
