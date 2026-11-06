import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { scrollToId } from '@/hooks/useScreenProgress';

const links = [
  { id: 'studio', label: 'Студия' },
  { id: 'gallery', label: 'Работы' },
  { id: 'services', label: 'Услуги' },
  { id: 'contact', label: 'Контакты' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header className="shrink-0 border-b border-white/10 bg-[#090909]">
      <div className="flex h-[3.75rem] items-center justify-between gap-3 px-4 md:px-8">
        <button type="button" onClick={() => go('top')} className="min-w-0 text-left text-white">
          <span className="font-display block text-[1.35rem] leading-none tracking-[0.16em]">NOIR</span>
          <span className="mt-1 block text-[9px] uppercase tracking-[0.38em] text-white/50">Studio</span>
        </button>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Разделы">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => go(link.id)}
              className="text-[11px] uppercase tracking-[0.22em] text-white/60 transition-colors hover:text-white"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => go('booking')}
            className="h-11 border border-white/20 px-3 text-[10px] uppercase tracking-[0.22em] text-white transition-colors hover:bg-white hover:text-black"
          >
            Запись
          </button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={open}
            className="flex h-11 w-11 items-center justify-center border border-white/15 text-white md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] md:hidden ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <nav className="overflow-hidden" aria-label="Меню" aria-hidden={!open}>
          <ul className="border-t border-white/10 px-4 py-2">
            {links.map((link) => (
              <li key={link.id}>
                <button
                  type="button"
                  tabIndex={open ? 0 : -1}
                  onClick={() => go(link.id)}
                  className="flex h-12 w-full items-center text-left text-[12px] uppercase tracking-[0.22em] text-white/80"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
