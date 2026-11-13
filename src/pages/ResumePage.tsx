
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Globe,
} from 'lucide-react';

import Navbar from '../components/Navbar';
import { PROJECTS } from '../data/projects';

const SKILLS = {
  Languages: [
    'Java',
    'C++',
    'Python',
    'JavaScript',
    'TypeScript',
    'SQL',
    'HTML5',
    'CSS3',
  ],
  Frontend: [
    'React.js',
    'React Query',
    'React Hook Form',
    'Tailwind CSS',
    'Vite',
    'Responsive Design',
    'Three.js',
  ],
  Backend: [
    'Node.js',
    'Express.js',
    'FastAPI',
    'REST APIs',
    'JWT Authentication',
    'OAuth 2.0',
    'RBAC',
    'Zod',
    'Argon2id',
    'Pydantic',
  ],
  Databases: [
    'PostgreSQL',
    'MongoDB',
    'MySQL',
    'SQLite',
    'Prisma ORM',
    'Mongoose',
  ],
  'Core CS': [
    'Data Structures & Algorithms',
    'OOP',
    'Operating Systems',
    'DBMS',
    'Computer Networks',
    'Design Patterns',
    'System Design',
  ],
  'Tools & ML': [
    'Git',
    'GitHub',
    'Docker',
    'Linux',
    'Postman',
    'Maven',
    'JUnit 5',
    'scikit-learn',
    'Pandas',
    'NumPy',
    'PCA',
    'SVM',
    'Joblib',
  ],
};

const EDUCATION = [
  {
    degree: 'Bachelor of Technology',
    field: 'Computer Science & Technology',
    institution: 'Ramdeobaba University',
    location: 'Nagpur, Maharashtra',
    period: 'July 2024 — April 2028',
    description:
      'Undergraduate student focused on software engineering, full-stack development, data structures, algorithms, database systems, and machine learning.',
  },
];

const HIGHLIGHTS = [
  {
    value: '31',
    label: 'UI Modules',
    description: 'Science on Wheels',
  },
  {
    value: '25+',
    label: 'API Endpoints',
    description: 'Fox SaaS Platform',
  },
  {
    value: '80.22%',
    label: 'Test Accuracy',
    description: 'CardioPulse ML',
  },
  {
    value: '13',
    label: 'Design Patterns',
    description: 'Smart Event System',
  },
];

export default function ResumePage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.resume-animate',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.15,
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="relative min-h-screen bg-[#0A0A0A] text-white">
      <div className="crt-overlay" />
      <Navbar />

      <main className="relative z-10 pt-[60px]">

        {/* HEADER */}
        <header className="resume-animate border-b border-[#1F1F1F] px-6 py-12 md:px-12 lg:px-20">
          <Link
            to="/"
            className="mb-10 inline-flex items-center gap-2 text-xs text-[#777] transition-colors hover:text-white"
          >
            <ArrowLeft size={14} />
            Back to home
          </Link>

          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div>
              <span className="mb-4 block text-[10px] font-semibold uppercase tracking-[0.3em] text-[#FF4D00]">
                SOFTWARE ENGINEERING / 2026
              </span>

              <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-8xl">
                MY <span className="text-[#FF4D00]">RESUME.</span>
              </h1>

              <p className="mt-4 text-sm text-[#888]">
                Aditya Sakarkar — Software Engineer / Full Stack Developer
              </p>

              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-xs text-[#777]">
                <a
                  href="mailto:aadityasakarkar@gmail.com"
                  className="inline-flex items-center gap-2 hover:text-white"
                >
                  <Mail size={13} />
                  Email
                </a>

                <a
                  href="https://github.com/Asakarkar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white"
                >
                  <Github size={13} />
                  GitHub
                </a>

                <a
                  href="https://www.linkedin.com/in/aditya-sakarkar-a95b1b317/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white"
                >
                  <Linkedin size={13} />
                  LinkedIn
                </a>
              </div>
            </div>

            <a
              href="/Aditya_Sakarkar_Resume.pdf"
              download="Aditya_Sakarkar_Resume.pdf"
              className="magnetic-btn inline-flex items-center gap-3 self-start text-xs md:self-auto"
              data-cursor-hover
            >
              <Download size={14} />
              Download PDF
            </a>
          </div>
        </header>

        {/* CONTENT */}
        <div className="mx-auto max-w-6xl px-6 py-14 md:px-12 lg:px-20">

          {/* SUMMARY */}
          <section className="resume-animate mb-16">
            <SectionTitle number="01" title="PROFILE" />

            <p className="max-w-3xl text-sm leading-8 text-[#999] md:text-base">
              Third-year B.Tech student pursuing software engineering
              opportunities. Skilled in Data Structures & Algorithms,
              OOP, REST APIs, React, Node.js, TypeScript, Python, SQL,
              and MongoDB. Strong problem-solver with experience in
              debugging, clean code, backend architecture, and building
              scalable full-stack applications.
            </p>
          </section>

          {/* ENGINEERING HIGHLIGHTS */}
          <section className="resume-animate mb-16">
            <SectionTitle number="02" title="ENGINEERING HIGHLIGHTS" />

            <div className="grid grid-cols-2 gap-px border border-[#222] bg-[#222] md:grid-cols-4">
              {HIGHLIGHTS.map((item) => (
                <div
                  key={item.label}
                  className="bg-[#0A0A0A] p-5 transition-colors hover:bg-[#111]"
                >
                  <h3 className="text-2xl font-bold tracking-tight text-[#FF4D00] md:text-3xl">
                    {item.value}
                  </h3>

                  <p className="mt-2 text-xs font-semibold text-white">
                    {item.label}
                  </p>

                  <p className="mt-1 text-[10px] text-[#666]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* EDUCATION */}
          <section className="resume-animate mb-16">
            <SectionTitle number="03" title="EDUCATION" />

            {EDUCATION.map((edu) => (
              <div key={edu.degree} className="border-l border-[#FF4D00] pl-5">
                <div className="flex flex-col justify-between gap-2 md:flex-row md:items-start">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {edu.degree}
                    </h3>

                    <p className="mt-1 text-sm text-[#FF4D00]">
                      {edu.field}
                    </p>

                    <p className="mt-3 text-sm text-[#999]">
                      {edu.institution}
                    </p>

                    <p className="mt-1 text-xs text-[#555]">
                      {edu.location}
                    </p>
                  </div>

                  <span className="text-[10px] tracking-wider text-[#666]">
                    {edu.period}
                  </span>
                </div>

                <p className="mt-4 max-w-2xl text-xs leading-7 text-[#777]">
                  {edu.description}
                </p>
              </div>
            ))}
          </section>

          {/* PROJECTS */}
          <section className="resume-animate mb-16">
            <SectionTitle number="04" title="SELECTED PROJECTS" />

            <div className="space-y-8">
              {PROJECTS.map((project, index) => (
                <article
                  key={project.id}
                  className="group border-b border-[#222] pb-8 last:border-0"
                >
                  <div className="mb-4 flex flex-col justify-between gap-2 md:flex-row md:items-start">
                    <div>
                      <span className="text-[10px] tracking-[0.2em] text-[#FF4D00]">
                        PROJECT / 0{index + 1}
                      </span>

                      <h3 className="mt-2 text-xl font-bold tracking-tight transition-colors group-hover:text-[#FF4D00]">
                        {project.title}
                      </h3>

                      <p className="mt-2 max-w-2xl text-xs leading-6 text-[#888]">
                        {project.hook}
                      </p>
                    </div>

                    <span className="text-[10px] text-[#555]">
                      {project.duration}
                    </span>
                  </div>

                  <p className="max-w-3xl text-xs leading-7 text-[#777]">
                    {project.solution}
                  </p>

                  {/* Metrics */}
                  <div className="my-5 flex flex-wrap gap-5">
                    {project.metrics.map((metric) => (
                      <div key={metric.label}>
                        <p className="text-base font-bold text-white">
                          {metric.value}
                        </p>

                        <p className="mt-1 text-[9px] uppercase tracking-wider text-[#666]">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Technology stack */}
                  <div className="mb-5 flex flex-wrap gap-2">
                    {project.stack.map((skill) => (
                      <span
                        key={skill}
                        className="border border-[#292929] px-2 py-1 text-[9px] text-[#999]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Project links */}
                  <div className="flex flex-wrap items-center gap-4 text-[10px]">
                    {project.githubUrl && project.githubUrl !== '#' && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#999] transition-colors hover:text-[#FF4D00]"
                      >
                        <Github size={12} />
                        VIEW SOURCE
                        <ExternalLink size={10} />
                      </a>
                    )}

                    {project.liveUrl && project.liveUrl !== '#' && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#999] transition-colors hover:text-[#FF4D00]"
                      >
                        <Globe size={12} />
                        LIVE PROJECT
                        <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* SKILLS */}
          <section className="resume-animate mb-16">
            <SectionTitle number="05" title="TECHNICAL SKILLS" />

            <div className="grid gap-8 sm:grid-cols-2">
              {Object.entries(SKILLS).map(([category, skills]) => (
                <div key={category}>
                  <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#FF4D00]">
                    {category}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="border border-[#252525] px-3 py-2 text-[10px] text-[#999] transition-colors hover:border-[#FF4D00] hover:text-white"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CORE STRENGTHS */}
          <section className="resume-animate mb-16">
            <SectionTitle number="06" title="ENGINEERING PRACTICES" />

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                'Unit & Integration Testing',
                'REST API Design',
                'Database Design & Optimization',
                'Authentication & Authorization',
                'Debugging & Problem Solving',
                'Agile / Scrum Collaboration',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 border-b border-[#222] py-3 text-xs text-[#999]"
                >
                  <span className="h-1.5 w-1.5 bg-[#FF4D00]" />
                  {item}
                </div>
              ))}
            </div>
          </section>

          {/* CONTACT */}
          <section className="resume-animate border-t border-[#252525] pt-10">
            <span className="text-[10px] tracking-[0.3em] text-[#FF4D00]">
              LET'S CONNECT
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tighter md:text-5xl">
              BUILD SOMETHING
              <br />
              <span className="text-[#FF4D00]">MEANINGFUL.</span>
            </h2>

            <p className="mt-4 text-xs text-[#777]">
              Open to software engineering internships and opportunities
              to build impactful products.
            </p>

            <div className="mt-7 flex flex-wrap gap-5">
              <a
                href="mailto:aadityasakarkar@gmail.com"
                className="text-xs text-white underline underline-offset-4 decoration-[#FF4D00] hover:text-[#FF4D00]"
              >
                EMAIL ME
              </a>

              <a
                href="https://github.com/Asakarkar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white underline underline-offset-4 decoration-[#FF4D00] hover:text-[#FF4D00]"
              >
                GITHUB
              </a>

              <a
                href="https://www.linkedin.com/in/aditya-sakarkar-a95b1b317/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white underline underline-offset-4 decoration-[#FF4D00] hover:text-[#FF4D00]"
              >
                LINKEDIN
              </a>

              <a
                href="https://adityasakarkar.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white underline underline-offset-4 decoration-[#FF4D00] hover:text-[#FF4D00]"
              >
                PORTFOLIO
              </a>
            </div>
          </section>
        </div>

        {/* FOOTER */}
        <footer className="border-t border-[#1F1F1F] px-6 py-7 md:px-12 lg:px-20">
          <div className="flex flex-col justify-between gap-3 text-[9px] tracking-[0.15em] text-[#555] sm:flex-row">
            <span>ADITYA SAKARKAR © 2026</span>
            <span>DESIGNED & BUILT WITH PURPOSE.</span>
          </div>
        </footer>
      </main>

      {/* PRINT STYLES */}
      <style>{`
        @media print {
          nav,
          .crt-overlay,
          a[href="/"],
          button {
            display: none !important;
          }

          body {
            background: white !important;
            color: black !important;
          }

          main {
            padding-top: 0 !important;
          }

          * {
            color: black !important;
            border-color: #ddd !important;
            box-shadow: none !important;
          }

          .resume-animate {
            opacity: 1 !important;
            transform: none !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .resume-animate {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}

function SectionTitle({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className="mb-7 flex items-center gap-4 border-b border-[#252525] pb-3">
      <span className="font-mono text-[10px] text-[#FF4D00]">
        {number}
      </span>

      <h2 className="text-xs font-bold tracking-[0.2em] text-white">
        {title}
      </h2>
    </div>
  );
}
