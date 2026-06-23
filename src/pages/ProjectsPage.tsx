import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PROJECTS = [
  {
    id: 'save-duffy',
    title: 'Save Duffy',
    hook: 'Platform connecting animal rescuers with communities to save stray animals.',
    problem: 'Stray animals lack a centralized rescue coordination system. Rescuers work in isolation, shelters are overwhelmed, and volunteers cannot find opportunities efficiently.',
    solution: 'Built a full-stack platform connecting rescuers, shelters, and volunteers in real-time with a map-based interface, case tracking, and volunteer matching.',
    architecture: 'React frontend with Node.js/Express API. MongoDB for flexible data storage. Socket.io for real-time notifications. Mapbox for location services.',
    stack: ['React.js', 'Node.js', 'MongoDB', 'Socket.io', 'Mapbox'],
    metrics: [
      { label: 'Rescuers Connected', value: '500+' },
      { label: 'Animals Helped', value: '1,200+' },
      { label: 'Response Time', value: '-40%' },
    ],
    challenges: 'Real-time location tracking was draining mobile battery. Solved by implementing geofencing and batch location updates.',
    learnings: 'Battery efficiency is a feature, not an afterthought. Always test location services on actual devices in the field.',
    image: '/images/project-save-duffy.jpg',
    duration: 'Built in 3 weeks',
    role: 'Solo — full stack',
    liveUrl: '#',
    githubUrl: 'https://github.com/Asakarkar/Save-Duffy',
  },
  {
    id: 'resqnet',
    title: 'ResQNet',
    hook: 'Real-time disaster relief platform connecting volunteers with NGOs.',
    problem: 'Emergency response coordination is chaotic and slow. NGOs struggle to communicate needs, and volunteers cannot find where help is needed most.',
    solution: 'Created a real-time map-based platform for disaster resource allocation with need posting, volunteer matching, and supply tracking.',
    architecture: 'MERN stack with Redis for caching real-time data. Twilio for SMS alerts. Cloudinary for image uploads. JWT auth with role-based access.',
    stack: ['React.js', 'Node.js', 'MongoDB', 'Redis', 'Twilio'],
    metrics: [
      { label: 'Response Time Reduction', value: '60%' },
      { label: 'Volunteers Mobilized', value: '2,000+' },
      { label: 'Supplies Tracked', value: '50K+' },
    ],
    challenges: 'Handling traffic spikes during actual emergencies. Implemented rate limiting and CDN caching to keep the platform responsive.',
    learnings: 'Design for failure — your infrastructure will fail at the worst possible moment. Have fallback mechanisms for every critical path.',
    image: '/images/project-resqnet.jpg',
    duration: 'Built in 4 weeks',
    role: 'Team of 3 — led frontend',
    liveUrl: '#',
    githubUrl: 'https://github.com/Asakarkar/ResQNet/blob/main/README.md',
  },
  {
    id: 'ai-interview',
    title: 'AI Interview Platform',
    hook: 'AI-powered platform helping job seekers practice with real-time feedback.',
    problem: 'Job seekers struggle to prepare for technical interviews effectively. Mock interviews are expensive and feedback is delayed.',
    solution: 'Built an AI interviewer using GPT-4 that conducts realistic technical interviews and provides instant, actionable feedback on code, communication, and problem-solving.',
    architecture: 'React with TypeScript frontend. Node.js backend with OpenAI API integration. WebRTC for video streaming. PostgreSQL for session storage.',
    stack: ['React.js', 'TypeScript', 'Tailwind CSS', 'OpenAI API', 'WebRTC'],
    metrics: [
      { label: 'Practice Sessions', value: '10,000+' },
      { label: 'User Satisfaction', value: '4.8/5' },
      { label: 'Offer Rate', value: '65%' },
    ],
    challenges: 'AI responses were too generic initially. Fine-tuned prompts with few-shot examples from real interview transcripts to improve relevance.',
    learnings: 'Prompt engineering is iterative. Start with 10 examples, measure, refine. The quality of your training examples directly determines output quality.',
    image: '/images/project-ai-interview.jpg',
    duration: 'Ongoing',
    role: 'Solo — full stack',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'quant-finance',
    title: 'Quant Finance Simulator',
    hook: 'Interactive quantitative finance simulator for learning algorithmic trading.',
    problem: 'Finance concepts are abstract and hard to visualize. Students learn theory without understanding real-world market dynamics.',
    solution: 'Created an interactive simulator with real-time market data visualization, backtesting engine, and paper trading environment.',
    architecture: 'Python backend with pandas/numpy for calculations. React frontend with D3.js for visualizations. WebSocket for live data feeds. SQLite for local storage.',
    stack: ['Python', 'React', 'D3.js', 'WebSocket', 'pandas'],
    metrics: [
      { label: 'Simulated Trades', value: '$1M+' },
      { label: 'Strategies Tested', value: '150+' },
      { label: 'Active Learners', value: '800+' },
    ],
    challenges: 'Real-time chart rendering was slow with large datasets. Implemented data decimation and canvas-based rendering for 60fps performance.',
    learnings: 'Data visualization performance is about knowing what NOT to render. Aggressive downsampling beats fancy algorithms for perceived performance.',
    image: '/images/project-quant-finance.jpg',
    duration: 'Built in 2 weeks',
    role: 'Solo — full stack',
    liveUrl: '#',
    githubUrl: '#',
  },
];

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
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
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
                  <div className="flex items-center gap-4">
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
                  </div>
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
