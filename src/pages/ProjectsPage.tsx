import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProjectImage from '../components/ProjectImage';
import { PROJECTS } from '../data/projects';

export default function ProjectsPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.page-header',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.2 }
      );

      const cards = pageRef.current?.querySelectorAll('.project-detail-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.15,
          }
        );
      }
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

          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
            PROJECTS
          </h1>
          <p className="text-sm text-[#888] max-w-lg">
            Every project is a story of identifying a problem, building a
            solution, and learning something unexpected along the way.
          </p>
        </div>

        {/* Project details */}
        <div className="px-6 md:px-12 py-12">
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              className="project-detail-card mb-20 last:mb-0"
            >
              {/* Project number */}
              <div className="text-[10px] text-[#444] mb-4">
                {String(index + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                {/* Image */}
                <div className="aspect-video bg-[#080808] border border-[#1F1F1F] overflow-hidden">
                  <ProjectImage
                    src={project.image}
                    title={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
                    {project.title}
                  </h2>

                  {/* Hook */}
                  <p className="text-sm text-[#888] uppercase tracking-wider mb-6">
                    {project.hook}
                  </p>

                  {/* Problem & Solution */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <div className="text-[10px] text-[#444] uppercase tracking-wider mb-1">
                        Problem
                      </div>
                      <p className="text-xs text-[#888] leading-relaxed">
                        {project.problem}
                      </p>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#444] uppercase tracking-wider mb-1">
                        Solution
                      </div>
                      <p className="text-xs text-[#888] leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {project.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="border border-[#1F1F1F] p-3"
                      >
                        <div className="text-lg md:text-xl font-bold">
                          {metric.value}
                        </div>
                        <div className="text-[9px] text-[#444] uppercase tracking-wider mt-1">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-[10px] border border-[#1F1F1F] text-[#888]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-[10px] text-[#444] mb-6">
                    <span>{project.duration}</span>
                    <span>{project.role}</span>
                  </div>

                  {/* Links */}
                  {(project.liveUrl !== '#' || project.githubUrl !== '#') && (
                    <div className="flex items-center gap-4">
                      {project.liveUrl !== '#' && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="magnetic-btn text-xs"
                          data-cursor-hover
                        >
                          <ExternalLink size={12} />
                          <span>Live Demo</span>
                        </a>
                      )}
                      {project.githubUrl !== '#' && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs text-[#888] hover:text-white transition-colors underline underline-offset-4 decoration-[#1F1F1F]"
                          data-cursor-hover
                        >
                          <Github size={12} />
                          <span>GitHub</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Divider */}
              {index < PROJECTS.length - 1 && (
                <div className="mt-16 border-t border-[#1F1F1F]" />
              )}
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
