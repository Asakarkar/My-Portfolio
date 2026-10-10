import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const COMMANDS: Record<string, string> = {
  whoami: 'Aditya Sakarkar',
  role: 'Creative Developer',
  current_focus: 'Software Engineering Internships',
  status: 'Building Cool Stuff...',
  skills: 'React, Next.js, Node.js, TypeScript, Python, MongoDB',
  education: 'B.Tech CSE Student',
  help: 'Available commands: whoami, role, current_focus, status, skills, education, projects, contact, clear, help',
};

export default function DashboardSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [history, setHistory] = useState<
    { cmd: string; output: string; isTyping?: boolean }[]
  >([
    { cmd: 'whoami', output: COMMANDS.whoami },
    { cmd: 'status', output: COMMANDS.status },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.terminal-container',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();

      if (trimmed === 'clear') {
        setHistory([]);
        return;
      }

      if (trimmed === 'projects') {
        setHistory((prev) => [
          ...prev,
          { cmd: trimmed, output: 'Redirecting to projects...' },
        ]);
        setTimeout(() => navigate('/projects'), 500);
        return;
      }

      if (trimmed === 'contact') {
        setHistory((prev) => [
          ...prev,
          { cmd: trimmed, output: 'Opening contact...' },
        ]);
        setTimeout(() => navigate('/contact'), 500);
        return;
      }

      // Konami code detection
      if (trimmed === '↑↑↓↓←→←→ba' || trimmed === 'upupdowndownleftrightleftrightba') {
        setHistory((prev) => [
          ...prev,
          { cmd: trimmed, output: '🎮 Secret playground unlocked! Check /playground' },
        ]);
        return;
      }

      const output =
        COMMANDS[trimmed] ||
        `Command not found: ${trimmed}. Type 'help' for available commands.`;

      setHistory((prev) => [...prev, { cmd: trimmed, output }]);
    },
    [navigate]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleCommand(input);
    setInput('');
  };

  // Focus input on click
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100vh] flex flex-col justify-center py-20 px-6 md:px-12"
    >
      {/* Section label */}
      <div className="section-label mb-8">// Terminal</div>

      <h2 className="text-2xl md:text-4xl font-bold mb-8">
        DEVELOPER.<span className="text-[#FF4D00]">TERMINAL</span>
      </h2>

      {/* Terminal container */}
      <div
        className="terminal-container border border-[#1F1F1F] bg-[#050505] max-w-4xl mx-auto w-full"
        onClick={handleTerminalClick}
        data-cursor-hover
      >
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-[#1F1F1F]">
          <span className="w-3 h-3 rounded-full bg-[#333]" />
          <span className="w-3 h-3 rounded-full bg-[#333]" />
          <span className="w-3 h-3 rounded-full bg-[#333]" />
          <span className="ml-4 text-[10px] text-[#444]">
            aditya@portfolio — bash — 80x24
          </span>
        </div>

        {/* Terminal output */}
        <div
          ref={terminalRef}
          className="p-4 h-[300px] overflow-y-auto font-mono text-xs leading-relaxed"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#1F1F1F #000' }}
        >
          {/* Welcome message */}
          <div className="text-[#444] mb-4">
            <div>Welcome to ADITYA.OS Terminal v1.0</div>
            <div>Type 'help' for available commands</div>
          </div>

          {/* Command history */}
          {history.map((entry, i) => (
            <div key={i} className="mb-3">
              {/* Prompt + command */}
              <div className="flex items-center gap-2">
                <span className="text-white">(base)</span>
                <span className="text-[#888]">
                  aditya@portfolio:~$
                </span>
                <span className="text-white">{entry.cmd}</span>
              </div>
              {/* Output */}
              <div className="text-[#888] mt-1 pl-0">{entry.output}</div>
            </div>
          ))}

          {/* Current input */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <span className="text-white">(base)</span>
            <span className="text-[#888]">aditya@portfolio:~$</span>

            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="
                  w-full
                  bg-transparent
                  outline-none
                  text-white
                  caret-transparent
                "
                autoComplete="off"
                spellCheck={false}
                maxLength={200}
              />

              <span
                className="absolute top-0 pointer-events-none cursor-blink text-white"
                style={{
                  left: `${input.length}ch`,
                }}
              >
                █
              </span>
            </div>
          </form>
        </div>
      </div>

      {/* Terminal hint */}
      <div className="mt-4 text-[12px] text-[#444] text-center max-w-4xl mx-auto w-full">
        Try typing: whoami, skills, projects, contact — or find the Konami code
      </div>
    </section>
  );
}