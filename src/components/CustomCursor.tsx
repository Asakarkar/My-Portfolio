import { useEffect, useRef, useState, Fragment } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [isTouch] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  });
  const mousePos = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (isTouch) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const handleMouseEnterInteractive = () => {
      cursorRef.current?.classList.add('cursor-hover');
    };

    const handleMouseLeaveInteractive = () => {
      cursorRef.current?.classList.remove('cursor-hover');
    };

    const animateTrail = () => {
      trailPos.current.x += (mousePos.current.x - trailPos.current.x) * 0.15;
      trailPos.current.y += (mousePos.current.y - trailPos.current.y) * 0.15;
      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${trailPos.current.x}px, ${trailPos.current.y}px)`;
      }
      rafId.current = requestAnimationFrame(animateTrail);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId.current = requestAnimationFrame(animateTrail);

    const interactiveElements = document.querySelectorAll(
      'a, button, [data-cursor-hover]'
    );
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnterInteractive);
      el.addEventListener('mouseleave', handleMouseLeaveInteractive);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
      });
    };
  }, [isTouch]);

  useEffect(() => {
    if (isTouch) return;
    const observer = new MutationObserver(() => {
      const handleMouseEnterInteractive = () => {
        cursorRef.current?.classList.add('cursor-hover');
      };
      const handleMouseLeaveInteractive = () => {
        cursorRef.current?.classList.remove('cursor-hover');
      };
      const interactiveElements = document.querySelectorAll(
        'a, button, [data-cursor-hover]'
      );
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
        el.addEventListener('mouseenter', handleMouseEnterInteractive);
        el.addEventListener('mouseleave', handleMouseLeaveInteractive);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <Fragment>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[99999] pointer-events-none mix-blend-difference"
        style={{
          width: '10px',
          height: '10px',
          marginLeft: '-4px',
          marginTop: '-4px',
          borderRadius: '50%',
          backgroundColor: '#fff',
          transition: 'width 0.2s, height 0.2s, margin 0.2s',
        }}
      />
      <div
        ref={trailRef}
        className="fixed top-0 left-0 z-[99998] pointer-events-none"
        style={{
          width: '32px',
          height: '32px',
          marginLeft: '-16px',
          marginTop: '-16px',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.15)',
          transition: 'width 0.3s, height 0.3s, margin 0.3s, border-color 0.3s',
        }}
      />
    </Fragment>
  );
}
