import { Hero } from "@/components/hero";
import { InteractiveShowcase } from "@/components/interactive-showcase";
import { ProjectsSection } from "@/components/projects-section";
import { ExperienceSection } from "@/components/experience-section";
import { SkillsSection } from "@/components/skills-section";
import { AchievementsSection } from "@/components/achievements-section";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <div className="relative">
      {/* Hero with resume highlights & quick actions */}
      <Hero />

      {/* Interactive System Lab (Simulate Agent Guardrails, RF Sweeps, Git NL Query) */}
      <InteractiveShowcase />

      {/* Featured Projects with filter and deep impact metrics */}
      <ProjectsSection />

      {/* Work Experience: JV Micronics & Corsair (YC W25) */}
      <ExperienceSection />

      {/* Technical Skills & Competencies */}
      <SkillsSection />

      {/* Achievements, Hackathon, LeetCode, Certifications & IEEE Leadership */}
      <AchievementsSection />

      {/* Contact & Bio Section */}
      <ContactSection />
    </div>
  );
}
