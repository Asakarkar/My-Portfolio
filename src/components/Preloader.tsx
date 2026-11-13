import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const WORDS = ['BUILDING', 'THINGS', 'THAT', 'MATTER'];

export default function Preloader({ onComplete }: PreloaderProps) {
  const [currentWord, setCurrentWord] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWord((prev) => {
        if (prev >= WORDS.length - 1) {
          clearInterval(timer);
          return prev;
        }

        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
  if (currentWord === WORDS.length - 1) {
    const tl = gsap.timeline({
      delay: 1,
      onComplete: () => {
        onComplete();
      },
    });

    tl.to(textRef.current, {
      scale: 1.08,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    }).to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
  }
}, [currentWord, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#0A0A0A] px-4 md:px-8"
    >
      {/* Grid Background */}

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Word */}
      <h1
        ref={textRef}
        key={currentWord}
        className={`
          relative z-10
          uppercase
          text-center
          leading-none
          select-none
          max-w-full
          animate-word-reveal
          ${
            currentWord === 3
              ? 'text-[#FF4D00]'
              : 'text-white'
          }
        `}
        style={{
          fontFamily:
          '"Clash Display","Cabinet Grotesk","General Sans",sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(2.5rem, 11.5vw, 12rem)',
          letterSpacing: 'clamp(0.02em, 0.5vw, 0.08em)',
          lineHeight: 0.9,
        }}
      >
        {WORDS[currentWord]}
      </h1>

      <style>{`
        .animate-word-reveal {
          animation: wordReveal 0.4s cubic-bezier(.16,1,.3,1) forwards;
        }
        @keyframes wordReveal {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}