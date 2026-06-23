import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const [, setIsHovering] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Letter stagger animation for ADITYA
      const letters = nameRef.current?.querySelectorAll('.hero-letter');
      if (letters) {
        gsap.fromTo(
          letters,
          { opacity: 0, x: -50, y: 20 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1.2,
            ease: 'expo.out',
            stagger: 0.05,
            delay: 0.2,
          }
        );
      }

      // Subtitle fade in
      gsap.fromTo(
        '.hero-subtitle',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 1 }
      );

      // CTA fade in
      gsap.fromTo(
        '.hero-cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 1.3 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderName = (name: string) => {
    return name.split('').map((letter, i) => (
      <span
        key={`${name}-${i}`}
        className="hero-letter inline-block"
        style={{ opacity: 0 }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {letter}
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden"
    >
      {/* Top border line */}
      <div
        className="absolute top-[60px] left-[10%] right-0 h-[1px] bg-[#1F1F1F]"
      />

      {/* Main content */}
      <div className="relative z-10 px-6 md:px-12 pt-[60px]">
        {/* Name */}
        <div ref={nameRef} className="mb-4">
          <div className="text-hero overflow-hidden">
            {renderName('ADITYA')}
          </div>
          <div className="text-hero overflow-hidden text-[#FF4D00]">
            {renderName('SAKARKAR')}
          </div>
        </div>

        {/* Subtitle */}
        <div className="hero-subtitle flex items-center gap-4 mb-8 opacity-0">
          <span
            className="text-xs md:text-sm font-medium tracking-widest uppercase"
            style={{ color: '#888' }}
          >
            Creative Developer
          </span>
          <span className="w-8 h-[1px] bg-[#1F1F1F]" />
          <span
            className="text-xs md:text-sm tracking-widest uppercase"
            style={{ color: '#444' }}
          >
            Exploring The Intersection Of Code, Mathematics & Creativity
          </span>
        </div>

        {/* CTA Button */}
        <div className="hero-cta opacity-0">
          <Link
            to="/projects"
            className="magnetic-btn inline-flex items-center gap-3"
            data-cursor-hover
          >
            <span>VIEW PROJECTS</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Bottom left info */}
      <div className="absolute bottom-8 left-6 md:left-12 text-[10px] text-[#444] hidden md:block">
        <div>B.TECH CSE STUDENT</div>
        <div>FULL STACK DEVELOPER</div>
        <div className="mt-1 text-[#888]">SCROLL TO EXPLORE ↓</div>
      </div>

      {/* Bottom right status */}
      <div className="absolute bottom-8 right-6 md:right-12 text-[10px] text-[#444] text-right hidden md:block">
        <div className="flex items-center gap-2 justify-end">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[#888]">AVAILABLE FOR OPPORTUNITIES</span>
        </div>
        <div className="mt-1">2025 — PRESENT</div>
      </div>
    </section>
  );
}
