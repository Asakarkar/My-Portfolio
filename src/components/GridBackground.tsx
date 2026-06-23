import { useEffect, useRef } from 'react';

export default function GridBackground() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!gridRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * -6;
      const y = (e.clientY / window.innerHeight - 0.5) * -6;
      gridRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={gridRef} className="fixed inset-0 z-0 pointer-events-none transition-transform duration-300 ease-out">
      {/* Grid lines */}
      <div
        className="absolute inset-0 grid-breathe"
        style={{
          backgroundImage:
            'linear-gradient(to right, #1F1F1F 1px, transparent 1px), linear-gradient(to bottom, #1F1F1F 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Floating crosshairs */}
      {[
        { top: '15%', left: '8%', delay: '0s' },
        { top: '35%', left: '92%', delay: '2s' },
        { top: '65%', left: '5%', delay: '4s' },
        { top: '85%', left: '88%', delay: '6s' },
        { top: '45%', left: '45%', delay: '8s' },
        { top: '25%', left: '65%', delay: '10s' },
        { top: '75%', left: '25%', delay: '12s' },
      ].map((pos, i) => (
        <span
          key={i}
          className="crosshair"
          style={{
            top: pos.top,
            left: pos.left,
            animationDelay: pos.delay,
          }}
        >
          +
        </span>
      ))}

      {/* Grid coordinates */}
      <div className="grid-num" style={{ top: '10px', left: '10px' }}>
        [0,0]
      </div>
      <div className="grid-num" style={{ top: '10px', right: '10px' }}>
        [w,0]
      </div>
      <div className="grid-num" style={{ bottom: '10px', left: '10px' }}>
        [0,h]
      </div>
      <div className="grid-num" style={{ bottom: '10px', right: '10px' }}>
        [w,h]
      </div>
    </div>
  );
}
