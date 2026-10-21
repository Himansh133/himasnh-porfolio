import { Hero } from "@/components/hero";
import { ExperienceSection } from "@/components/experience-section";
import { CodingActivitySection } from "@/components/coding-activity-section";
import { SkillsSection } from "@/components/skills-section";
import { ProjectsSection } from "@/components/projects-section";
import { OpenSourceSection } from "@/components/opensource-section";
import { AchievementsSection } from "@/components/achievements-section";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <div className="container-narrow">
      {/* Editorial Horizontal Hero with User Photo and Live Availability */}
      <Hero />

      {/* Things I've Built (Revenue Rescue Agent, GitHub Commit Explorer, FieldFox RF Suite) */}
      <ProjectsSection />

      {/* Coding Activity & Heatmaps (GitHub, LeetCode, Codeforces) */}
      <CodingActivitySection />

      {/* Tech Stack Marquee & Categorized Badges */}
      <SkillsSection />

      {/* Experience Section (JV Micronics & Corsair YC W25) */}
      <ExperienceSection />

      {/* Open Source Contributions (Corsair YC W25 SDK PRs) */}
      <OpenSourceSection />

      {/* Achievements, Certifications & Leadership */}
      <AchievementsSection />

      {/* Hire Me Tree & Contact Actions */}
      <ContactSection />
    </div>
  );
}
