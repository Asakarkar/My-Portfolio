import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });

  return (
    <footer className="relative border-t border-[#1F1F1F] py-12 px-6 md:px-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        {/* Left: CTA */}
        <div>
          <Link
            to="/contact"
            className="text-2xl md:text-2xl font-bold underline underline-offset-4 decoration-[#1F1F1F] hover:decoration-white transition-colors"
          >
            Code. Create. Iterate.
          </Link>
        </div>

        {/* Right: Terminal prompt */}
        <div className="flex flex-col items-end gap-4">
          <div className="text-[11px] text-[#888] italic">// Terminal</div>
          <div className="text-xs text-[#888]">
            <span className="text-white">(base)</span>{' '}
            <span className="text-[#888]">aditya@portfolio:~/contact$</span>{' '}
            <span className="cursor-blink text-white">█</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 pt-6 border-t border-[#1F1F1F] flex flex-col md:flex-row justify-between items-center gap-2 text-[10px] text-[#444]">
        <div>
          Aditya.OS v1.0 — Built with React + TypeScript + Tailwind
        </div>
        <div className="flex items-center gap-4">
          <span>Last updated: {lastUpdated}</span>
          <span>&copy; {currentYear} Aditya Sakarkar</span>
        </div>
      </div>
    </footer>
  );
}
