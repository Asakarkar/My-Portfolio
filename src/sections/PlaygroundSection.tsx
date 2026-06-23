import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PlaygroundSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = linesRef.current?.querySelectorAll('.playground-line');
      if (lines) {
        gsap.fromTo(
          lines,
          {
            opacity: 0,
            y: 120,
          },
          {
            opacity: 1,
            y: 0,
            duration: 2,
            ease: 'expo.out',
            stagger: 0.8,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
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
      className="relative min-h-[100vh] flex flex-col justify-center py-20 px-6 md:px-12"
    >
      {/* Section label */}
      <div className="section-label mb-12">// Playground</div>

      {/* Manifesto text with staggered indentation */}
      <div
        ref={linesRef}
        className="mb-12 flex flex-col items-center justify-center text-center"
>
        <div className="playground-line text-4xl md:text-6xl lg:text-7xl font-bold leading-[1]">
          I LOVE CREATING INTERACTIVE AND
        </div>

        <div className="playground-line text-4xl md:text-6xl lg:text-7xl font-bold leading-[1] text-[#FF4D00]">
          &
        </div>

        <div className="playground-line text-4xl md:text-6xl lg:text-7xl font-bold leading-[1] ">
          PLAYFUL EXPERIENCES.
        </div>
      </div>
      
      {/* Explore link */}
      <div className="flex justify-end">
        <Link
          to="/playground"
          className="link-arrow text-sm"
          data-cursor-hover
        >
          <span>Explore My_Lab</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
