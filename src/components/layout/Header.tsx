import { useState } from 'react';
import Button from '../ui/Button';

interface HeaderProps {
  pages: { id: string; label: string }[];
  activePage: string;
  onPageChange: (pageId: string) => void;
  pdfPath: string;
}

const Header = ({ pages, activePage, onPageChange, pdfPath }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <div className="text-sm font-semibold text-slate-900">Sustainable Sips Report</div>
        <nav className="hidden items-center gap-3 md:flex">
          {pages.map((page) => (
            <Button
              key={page.id}
              variant={activePage === page.id ? 'primary' : 'secondary'}
              onClick={() => onPageChange(page.id)}
              aria-pressed={activePage === page.id}
            >
              {page.label}
            </Button>
          ))}
        </nav>
        <div className="hidden md:block">
          <a href={pdfPath} target="_blank" rel="noreferrer">
            <Button>Download PDF</Button>
          </a>
        </div>
        <button
          type="button"
          className="rounded-md border border-slate-200 px-3 py-2 text-xs text-slate-600 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          Menu
        </button>
      </div>
      {isOpen ? (
        <div className="border-t border-slate-200 bg-white px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-3 text-sm text-slate-600">
            {pages.map((page) => (
              <button
                key={page.id}
                type="button"
                className="rounded-full border border-slate-200 px-4 py-2 text-left text-sm font-semibold text-slate-700"
                onClick={() => {
                  onPageChange(page.id);
                  setIsOpen(false);
                }}
                aria-pressed={activePage === page.id}
              >
                {page.label}
              </button>
            ))}
          </nav>
          <div className="mt-4">
            <a href={pdfPath} target="_blank" rel="noreferrer">
              <Button className="w-full">Download PDF</Button>
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
