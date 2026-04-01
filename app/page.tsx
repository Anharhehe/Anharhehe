import HeroSection from '@/components/Hero/HeroSection';
import AboutSection from '@/components/About/AboutSection';
import ProjectsSection from '@/components/Projects/ProjectsSection';
import SkillsSection from '@/components/Skills/SkillsSection';
import ExperienceSection from '@/components/Experience/ExperienceSection';
import ContactSection from '@/components/Contact/ContactSection';

export default function Home() {
  return (
    <div className="bg-[#080d1a] text-white min-h-screen">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
