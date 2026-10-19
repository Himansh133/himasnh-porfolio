import { Hero } from "@/components/hero";
import { ProjectsSection } from "@/components/projects-section";
import { ExperienceSection } from "@/components/experience-section";
import { SkillsSection } from "@/components/skills-section";
import { AchievementsSection } from "@/components/achievements-section";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <div>
      {/* Apple Product Intro */}
      <Hero />

      {/* Apple Product Stage & Animated Project Switcher */}
      <ProjectsSection />

      {/* Experience Flow (JV Micronics & Corsair YC W25) */}
      <ExperienceSection />

      {/* Apple Tech Specs */}
      <SkillsSection />

      {/* Recognitions & Leadership */}
      <AchievementsSection />

      {/* Apple Closing Callout */}
      <ContactSection />
    </div>
  );
}
