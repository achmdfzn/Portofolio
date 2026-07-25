import Navbar from '@/components/organisms/navbar';
import HeroSection from '@/components/organisms/hero-section';
import AboutSection from '@/components/organisms/about-section';
import SkillsSection from '@/components/organisms/skills-section';
import ProjectsSection from '@/components/organisms/projects-section';
import ExperienceSection from '@/components/organisms/experience-section';
import ContactSection from '@/components/organisms/contact-section';
import Footer from '@/components/organisms/footer';
import AnimateIn from '@/components/atoms/animate-in';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1" style={{ paddingTop: '56px' }}>
        <HeroSection />
        <AnimateIn><AboutSection /></AnimateIn>
        <AnimateIn delay={0.1}><SkillsSection /></AnimateIn>
        <AnimateIn delay={0.2}><ProjectsSection /></AnimateIn>
        <AnimateIn delay={0.3}><ExperienceSection /></AnimateIn>
        <AnimateIn delay={0.4}><ContactSection /></AnimateIn>
      </main>
      <Footer />
    </>
  );
}
