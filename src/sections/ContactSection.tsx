import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    url: 'https://github.com/Asakarkar',
    icon: Github,
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/aditya-sakarkar-a95b1b317/',
    icon: Linkedin,
  },
  {
    label: 'Email',
    url: 'mailto:aadityasakarkar@gmail.com',
    icon: Mail,
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Big text reveal
      gsap.fromTo(
        '.contact-heading span',
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Links stagger
      gsap.fromTo(
        '.contact-link',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: '.contact-links',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex flex-col justify-center py-20 px-6 md:px-12"
    >
      {/* Section label */}
      <div className="section-label mb-8">// Contact</div>

      {/* Big heading */}
      <div className="contact-heading mb-16">
        {['LET\'S BUILD', 'SOMETHING', 'AMAZING.'].map((line, i) => (
          <span
            key={i}
              className={`block text-[10vw] md:text-[8vw] font-bold leading-[0.9] tracking-tighter ${
                line === "AMAZING." ? "text-[#FF4D00]" : "text-white"
              }`}
            style={{ opacity: 0 }}
          >
            {line}
          </span>
        ))}
      </div>

      {/* Contact links */}
      <div className="contact-links flex flex-col gap-4 max-w-md">
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link group flex items-center gap-4 py-3 border-b border-[#1F1F1F] hover:border-[#444] transition-colors"
            onMouseEnter={() => setHoveredLink(link.label)}
            onMouseLeave={() => setHoveredLink(null)}
            data-cursor-hover
            style={{ opacity: 0 }}
          >
            <link.icon
              size={16}
              className={`transition-colors ${
                hoveredLink === link.label ? 'text-white' : 'text-[#444]'
              }`}
            />
            <span
              className={`text-sm tracking-wider transition-colors ${
                hoveredLink === link.label ? 'text-white' : 'text-[#888]'
              }`}
            >
              {link.label}
            </span>
            <ArrowUpRight
              size={14}
              className={`ml-auto transition-all ${
                hoveredLink === link.label
                  ? 'text-white translate-x-0 opacity-100'
                  : 'text-[#444] -translate-x-2 opacity-0'
              }`}
            />
          </a>
        ))}
      </div>

      {/* Status */}
      <div className="mt-12 flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[10px] text-[#888] tracking-wider">
          I REPLY WITHIN 24 HOURS
        </span>
      </div>
    </section>
  );
}
