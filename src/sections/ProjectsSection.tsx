
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../data/projects';
import ProjectImage from '../components/ProjectImage';
import ProjectActionButtons from '../components/ProjectActionButtons';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const featuredProjects = PROJECTS.slice(0, 3);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll<HTMLElement>('.project-card');

      if (!cards.length) return;

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
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex flex-col justify-center py-20 px-6 md:px-12"
    >
      {/* Section label */}
      <div className="section-label mb-4">
        // Active Deployments
      </div>

      <h2 className="text-[8vw] md:text-[6vw] font-bold leading-none tracking-tighter mb-16">
        PROJECT<span className="text-[#FF4D00]">S</span>
      </h2>

      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProjects.map((project) => {
          const metrics = project.metrics?.[0];
          const stack = project.stack ?? [];

          return (
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
                <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center gap-4 bg-black/70 opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 [@media(hover:none)]:pointer-events-auto [@media(hover:none)]:opacity-100">
                  <ProjectActionButtons
                    projectTitle={project.title}
                    liveUrl={project.liveUrl}
                    githubUrl={project.githubUrl}
                  />
                </div>
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
                  {project.hook || 'Software development project'}
                </p>

                {/* Metrics */}
                {metrics && (
                  <div className="text-xs text-white mb-4 font-medium">
                    {metrics.value} {metrics.label}
                  </div>
                )}

                {/* Meta info */}
                <div className="flex items-center justify-between text-[10px] text-[#444]">
                  <span>{project.duration || 'Ongoing'}</span>
                  <span>{project.role || 'Developer'}</span>
                </div>

                {/* Tags */}
                {stack.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-[10px] border border-[#1F1F1F] text-[#888]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
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
