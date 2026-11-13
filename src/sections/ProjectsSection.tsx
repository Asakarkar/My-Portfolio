import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../data/projects';
import ProjectImage from '../components/ProjectImage';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const featuredProjects = PROJECTS.slice(0, 3);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.project-card');
      if (cards) {
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
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
      <div className="section-label mb-4">// Active Deployments</div>
      <h2 className="text-[8vw] md:text-[6vw] font-bold leading-none tracking-tighter mb-16">
        PROJECT<span className="text-[#FF4D00]">S</span>
      </h2>

      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProjects.map((project) => (
          <div
            key={project.id}
            className="project-card group border border-[#1F1F1F] hover:border-[#444] transition-colors duration-300"
            data-cursor-hover
          >
            {/* Image */}
            <div className="relative aspect-video overflow-hidden bg-[#080808]">
              <ProjectImage
                src={project.image}
                title={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay on hover */}
              {(project.liveUrl !== '#' || project.githubUrl !== '#') && (
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  {project.liveUrl !== '#' && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-[#eee] transition-colors"
                      data-cursor-hover
                    >
                      <ExternalLink size={12} />
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl !== '#' && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 border border-white text-white text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
                      data-cursor-hover
                    >
                      <Github size={12} />
                      GitHub
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Title + arrow */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl md:text-2xl font-bold group-hover:underline underline-offset-4 decoration-[#1F1F1F]">
                  {project.title}
                </h3>
                <ArrowUpRight
                  size={20}
                  className="text-[#444] group-hover:text-white transition-colors"
                />
              </div>

              {/* Hook */}
              <p className="text-xs md:text-sm text-[#888] mb-4 leading-relaxed uppercase tracking-wide">
                {project.hook}
              </p>

              {/* Metrics */}
              <div className="text-xs text-white mb-4 font-medium">
                {project.metrics[0].value} {project.metrics[0].label}
              </div>

              {/* Meta info */}
              <div className="flex items-center justify-between text-[10px] text-[#444]">
                <span>{project.duration}</span>
                <span>{project.role}</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-[10px] border border-[#1F1F1F] text-[#888]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View all link */}
      <div className="mt-12 flex justify-center">
        <Link
          to="/projects"
          className="magnetic-btn"
          data-cursor-hover
        >
          <span>VIEW ALL PROJECTS</span>
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </section>
  );
}
