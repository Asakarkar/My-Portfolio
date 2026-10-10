import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowLeft, Github, Linkedin, Mail, Send } from 'lucide-react';
import Navbar from '../components/Navbar';
import emailjs from '@emailjs/browser';

const SOCIAL_LINKS = [
  { label: 'GitHub', url: 'https://github.com/Asakarkar', icon: Github },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/aditya-sakarkar-a95b1b317/', icon: Linkedin },
  { label: 'Email', url: 'mailto:aadityasakarkar@gmail.com', icon: Mail },
];

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.page-header',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.2 }
      );
      gsap.fromTo(
        '.contact-form-container',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.4 }
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name || !email || !message) {
      setFormError('All fields are required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setFormError('Contact service is temporarily unconfigured. Please use direct email below.');
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name,
          email,
          message,
        },
        publicKey
      );

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error(error);
      setFormError('Failed to send transmission. Please use direct email link.');
    } finally {
      setIsSubmitting(false);
    }
  };

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

          <h1 className="text-6xl md:text-6xl font-bold tracking-tighter mb-4">
            CONTACT
          </h1>
          <p className="text-sm text-[#888] max-w-lg">
            Let's build something together. I'm always open to discussing
            projects, opportunities, or just chatting about tech.
          </p>
        </div>

        <div className="px-6 md:px-12 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="contact-form-container">
            <div className="section-label mb-6">// Send a message</div>

            {isSubmitted ? (
              <div className="border border-[#1F1F1F] p-8 text-center">
                <div className="text-2xl font-bold mb-4">
                  TRANSMISSION SENT
                </div>
                <p className="text-sm text-[#888] mb-6">
                  Thanks for reaching out! I'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs text-[#888] hover:text-white transition-colors underline underline-offset-4"
                  data-cursor-hover
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {formError && (
                  <div className="p-3 border border-red-500/40 bg-red-500/10 text-red-400 text-xs tracking-wide">
                    {formError}
                  </div>
                )}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#444] mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-transparent border border-[#1F1F1F] px-4 py-3 text-sm text-white placeholder-[#444] focus:border-[#888] focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#444] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    maxLength={254}
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-transparent border border-[#1F1F1F] px-4 py-3 text-sm text-white placeholder-[#444] focus:border-[#888] focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#444] mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    maxLength={3000}
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-transparent border border-[#1F1F1F] px-4 py-3 text-sm text-white placeholder-[#444] focus:border-[#888] focus:outline-none transition-colors resize-none"
                    placeholder="Tell me about your project, idea, or just say hi..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="magnetic-btn w-full justify-center disabled:opacity-50"
                  data-cursor-hover
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <>
                      <Send size={12} />
                      <span>SEND MESSAGE</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Direct links */}
          <div>
            <div className="section-label mb-6">// Direct links</div>

            <div className="space-y-4 mb-12">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 py-4 border-b border-[#1F1F1F] hover:border-[#444] transition-colors"
                  data-cursor-hover
                >
                  <link.icon
                    size={18}
                    className="text-[#444] group-hover:text-white transition-colors"
                  />
                  <span className="text-sm tracking-wider text-[#888] group-hover:text-white transition-colors flex-1">
                    {link.label}
                  </span>
                  <span className="text-[10px] text-[#444] group-hover:text-white transition-colors">
                    &rarr;
                  </span>
                </a>
              ))}
            </div>

            {/* Availability status */}
            <div className="border border-[#1F1F1F] p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-bold tracking-wider">
                  AVAILABLE FOR OPPORTUNITIES
                </span>
              </div>
              <p className="text-xs text-[#888] leading-relaxed">
                I'm currently looking for software engineering internships at
                product-first companies. If you're building something
                interesting, I'd love to hear about it.
              </p>
              <div className="mt-4 text-[10px] text-[#444]">
                I reply within 24 hours
              </div>
            </div>

            {/* Resume download */}
            <div className="mt-8">
              <Link
                to="/resume"
                className="inline-flex items-center gap-2 text-xs text-[#888] hover:text-white transition-colors underline underline-offset-4 decoration-[#1F1F1F]"
                data-cursor-hover
              >
                View my resume &rarr;
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
