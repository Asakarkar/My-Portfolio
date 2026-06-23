import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
  {label: 'Resume', path: '/resume'},
];

export default function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300"
        style={{
          height: '60px',
          background: isScrolled ? 'rgba(0,0,0,0.8)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(8px)' : 'none',
          borderBottom: isScrolled ? '1px solid #1F1F1F' : '2px solid transparent',
        }}
      >
        <div className="h-full flex items-center justify-between px-6 md:px-12">
          {/* Logo */}
          <Link
            to="/"
            className="text-xs font-bold tracking-wider hover:text-[#888] transition-colors"
          >
            (Aditya.OS)
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs tracking-wide transition-colors relative ${
                  location.pathname === link.path
                    ? 'text-white'
                    : 'text-[#888] hover:text-white'
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-white" />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#888] hover:text-white transition-colors"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-[99] bg-black flex flex-col items-center justify-center gap-8 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-2xl font-bold tracking-wider transition-colors ${
                location.pathname === link.path
                  ? 'text-white'
                  : 'text-[#888]'
              }`}
              onClick={() => setIsMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
