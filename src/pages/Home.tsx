import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../sections/HeroSection';
import JourneySection from '../sections/JourneySection';
import ProjectsSection from '../sections/ProjectsSection';
import DashboardSection from '../sections/DashboardSection';
import ContactSection from '../sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    let cancelled = false;

    // A flat 100ms timeout is a guess about when layout has settled — if
    // fonts or section content (e.g. SkillsSection's track width) are
    // still shifting after that, ScrollTrigger bakes in a pin-spacer
    // height that's already wrong, and never self-corrects until the
    // next resize. Wait on real signals instead:
    //   1. document.fonts.ready — webfonts can reflow text after paint
    //   2. two animation frames — lets React finish committing/painting
    //      the initial layout of every section before we measure
    const refresh = () => {
      if (cancelled) return;
      ScrollTrigger.refresh();
    };

    const afterFonts = () => {
      requestAnimationFrame(() => requestAnimationFrame(refresh));
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(afterFonts);
    } else {
      afterFonts();
    }

    // Keep ScrollTrigger's measurements correct if the viewport changes
    // (orientation change, devtools resize, browser chrome collapsing on
    // mobile scroll, etc.) after the initial load.
    window.addEventListener('resize', refresh);

    return () => {
      cancelled = true;
      window.removeEventListener('resize', refresh);
      // Only kill triggers we created, avoid global kills
    };
  }, []);

  return (
    <div className="relative">
      {/* CRT overlay */}
      <div className="crt-overlay" />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main className="relative z-10">
        <HeroSection />
        <JourneySection />
        <DashboardSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
