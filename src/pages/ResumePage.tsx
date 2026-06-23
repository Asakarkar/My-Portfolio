import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, ExternalLink } from 'lucide-react';
import Navbar from '../components/Navbar';

const SKILLS = {
  Languages: ['C++', 'Java', 'JavaScript', 'TypeScript', 'Python'],
  Frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML/CSS'],
  Backend: ['Node.js', 'Express', 'REST APIs'],
  Database: ['MongoDB', 'MySql'],
  Tools: ['Git', 'Docker', 'AWS', 'Vercel'],
};

const EXPERIENCE = [
  {
    title: 'Full Stack Developer',
    company: 'Self-Initiated Projects',
    period: '2024 — Present',
    description:
      'Building production-grade web applications from concept to deployment. Focusing on React ecosystems and Node.js backends.',
  },
  {
    title: 'B.Tech CSE Student',
    company: 'University',
    period: '2024 — 2028 (Expected)',
    description:
      'Pursuing Computer Science and Engineering. Active in coding clubs, hackathons, and open-source contributions.',
  },
];

const PROJECTS = [
  {
    name: 'Save Duffy',
    tech: 'React, Node.js, MongoDB',
    description: 'Animal rescue platform connecting rescuers with communities.',
  },
  {
    name: 'ResQNet',
    tech: 'React, Node.js, MongoDB, Redis',
    description: 'Real-time disaster relief coordination platform.',
  },
  {
    name: 'AI Interview Platform',
    tech: 'React, TypeScript, OpenAI API',
    description: 'AI-powered interview practice with real-time feedback.',
  },
];

export default function ResumePage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.page-header',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.2 }
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="relative min-h-screen">
      <div className="crt-overlay" />
      <Navbar />

      <main className="relative z-10 pt-[60px]">
        {/* Header */}
        <div className="page-header px-6 md:px-12 py-12 border-b border-[#1F1F1F]">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs text-[#888] hover:text-white transition-colors mb-8"
            data-cursor-hover
          >
            <ArrowLeft size={14} />
            Back to home
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-2">
                RESUME
              </h1>
              <p className="text-sm text-[#888]">
                Aditya Sakarkar — Full Stack Developer / Software Engineer
              </p>
            </div>

            <a
              href="/Aditya_Sakarkar_Resume.pdf"
              download
              className="magnetic-btn text-xs self-start md:self-auto flex items-center gap-2"
              data-cursor-hover
            >
              <Download size={12} />
              <span>Download PDF</span>
            </a>
          </div>
        </div>

        {/* Resume Content */}
        <div className="px-6 md:px-12 py-12 max-w-4xl">
          {/* Objective */}
          <section className="mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#444] mb-4 border-b border-[#1F1F1F] pb-2">
              Objective
            </h2>
            <p className="text-sm text-[#888] leading-relaxed">
              Seeking software engineering internships at product-first companies.
              Passionate about building digital experiences that combine design
              excellence with engineering rigor. I believe software should feel
              invisible — it should just work, beautifully.
            </p>
          </section>

          {/* Education */}
          <section className="mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#444] mb-4 border-b border-[#1F1F1F] pb-2">
              Education
            </h2>
            <div className="space-y-4">
              {EXPERIENCE.map((exp) => (
                <div key={exp.title}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 mb-1">
                    <h3 className="text-sm font-bold">{exp.title}</h3>
                    <span className="text-[10px] text-[#444]">{exp.period}</span>
                  </div>
                  <div className="text-xs text-[#888] mb-1">{exp.company}</div>
                  <p className="text-xs text-[#666] leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#444] mb-4 border-b border-[#1F1F1F] pb-2">
              Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(SKILLS).map(([category, skills]) => (
                <div key={category}>
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-[#888] mb-2">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 text-[10px] border border-[#1F1F1F] text-[#888]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section className="mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#444] mb-4 border-b border-[#1F1F1F] pb-2">
              Projects
            </h2>
            <div className="space-y-4">
              {PROJECTS.map((project) => (
                <div key={project.name}>
                  <h3 className="text-sm font-bold mb-1">{project.name}</h3>
                  <p className="text-xs text-[#888] mb-1">
                    {project.description}
                  </p>
                  <span className="text-[10px] text-[#444]">{project.tech}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Achievements */}
          <section className="mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#444] mb-4 border-b border-[#1F1F1F] pb-2">
              Achievements
            </h2>
            <ul className="space-y-2 text-xs text-[#888]">
              <li className="flex items-start gap-2">
                <span className="text-[#444] mt-1">&bull;</span>
                <span>Built and deployed 4 full-stack applications with measurable user impact</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#444] mt-1">&bull;</span>
                <span>Active open-source contributor with 500+ GitHub contributions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#444] mt-1">&bull;</span>
                <span>Consistently write technical articles sharing learnings from projects</span>
              </li>
            </ul>
          </section>

          {/* Links */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#444] mb-4 border-b border-[#1F1F1F] pb-2">
              Links
            </h2>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/Asakarkar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[#888] hover:text-white transition-colors underline underline-offset-4 decoration-[#1F1F1F]"
                data-cursor-hover
              >
                <ExternalLink size={10} />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/aditya-sakarkar-a95b1b317/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[#888] hover:text-white transition-colors underline underline-offset-4 decoration-[#1F1F1F]"
                data-cursor-hover
              >
                <ExternalLink size={10} />
                LinkedIn
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1 text-xs text-[#888] hover:text-white transition-colors underline underline-offset-4 decoration-[#1F1F1F]"
                data-cursor-hover
              >
                <ExternalLink size={10} />
                Contact
              </Link>
            </div>
          </section>
        </div>
      </main>
      {/* Print styles */}
      <style>{`
        @media print {
          nav, .crt-overlay { display: none !important; }
          body { background: white !important; color: black !important; }
          main { padding-top: 0 !important; }
        }
      `}</style>
    </div>
  );
}
