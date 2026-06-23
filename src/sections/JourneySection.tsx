import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TIMELINE = [
  { year: '2024', label: 'Started Programming', status: 'completed' },
  { year: '2025', label: 'Started Web Development', status: 'completed' },
  { year: '2026', label: 'Building Products', status: 'active' },
  { year: 'FUTURE', label: 'Software Engineer', status: 'upcoming' },
];

export default function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Bio text character-by-character reveal
      if (bioRef.current) {
        gsap.fromTo(
          bioRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bioRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Timeline items stagger
      const items = timelineRef.current?.querySelectorAll('.timeline-item');
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex flex-col justify-center py-20 px-6 md:px-12"
    >
      {/* Section label */}
      <div className="section-label mb-8">// Journey</div>

      {/* Bio text - large statement */}
      <p
        ref={bioRef}
        className="text-section-title max-w-6xl mb-16 leading-tight"
      >
        B.TECH CSE STUDENT, FULL-STACK DEVELOPER, AND CREATIVE TECHNOLOGIST WITH A <span className="text-[#FF4D00]">STRONG</span> FOUNDATION IN COMPUTER SCIENCE, DATA STRUCTURES, ALGORITHMS, AND SCALABLE SOFTWARE DEVELOPMENT.
      </p>

      {/* Timeline */}
      <div ref={timelineRef} className="flex flex-col gap-6 md:gap-8">
        {TIMELINE.map((item) => (
          <div
            key={item.year}
            className={`timeline-item flex items-baseline gap-4 md:gap-8 group ${
              item.status === 'active' ? 'active' : ''
            }`}
          >
            {/* Year */}
            <span
              className={`text-3xl md:text-5xl font-bold tabular-nums transition-colors duration-300 ${
                item.status === 'active'
                  ? 'text-white'
                  : item.status === 'upcoming'
                  ? 'text-[#444]'
                  : 'text-[#888]'
              }`}
            >
              {item.year}
            </span>

            {/* Arrow */}
            <span className="text-[#444] text-sm">&rarr;</span>

            {/* Label */}
            <span
              className={`text-sm md:text-base transition-colors duration-300 ${
                item.status === 'active'
                  ? 'text-white'
                  : item.status === 'upcoming'
                  ? 'text-[#444]'
                  : 'text-[#888]'
              }`}
            >
              {item.label}
            </span>

            {/* Status indicator */}
            {item.status === 'active' && (
              <span className="w-2 h-2 rounded-full bg-white animate-pulse ml-2" />
            )}
          </div>
        ))}
      </div>

      {/* Decorative arrow */}
      <div className="absolute top-20 right-12 text-[#1F1F1F] text-4xl hidden md:block">
        ↓
      </div>
    </section>
  );
}
