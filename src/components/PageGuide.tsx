import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { scrollToId, useScreenProgress } from '@/hooks/useScreenProgress';
import { useScroller } from '@/scroller';

const chapters = [
  { id: 'top', label: 'Вход' },
  { id: 'studio', label: 'Студия' },
  { id: 'gallery', label: 'Работы' },
  { id: 'services', label: 'Услуги' },
  { id: 'booking', label: 'Запись' },
];

const names: Record<string, string> = {
  top: 'Вход',
  studio: 'Студия',
  gallery: 'Работы',
  services: 'Услуги',
  booking: 'Запись',
  contact: 'Контакты',
  privacy: 'Политика',
};

export default function PageGuide() {
  const { ref } = useScroller();
  const { activeId, activeGroup, progress, sequence, go } = useScreenProgress(ref);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const onFocus = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const tag = target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
        setEditing(true);
        window.setTimeout(() => {
          target.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }, 280);
      }
    };
    const onBlur = () => {
      window.setTimeout(() => {
        const active = document.activeElement;
        if (active instanceof HTMLElement) {
          const tag = active.tagName;
          if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
        }
        setEditing(false);
      }, 80);
    };
    document.addEventListener('focusin', onFocus);
    document.addEventListener('focusout', onBlur);
    return () => {
      document.removeEventListener('focusin', onFocus);
      document.removeEventListener('focusout', onBlur);
    };
  }, []);

  const chapterIndex = chapters.findIndex((chapter) => chapter.id === activeGroup);
  const atEnd = sequence.indexOf(activeId) === sequence.length - 1;
  const label = names[activeGroup] ?? 'Noir Studio';

  return (
    <aside
      className={`${editing ? 'hidden md:flex' : 'flex'} relative order-2 w-full shrink-0 flex-col border-t border-white/10 bg-[#090909] pb-[env(safe-area-inset-bottom)] md:order-1 md:h-full md:w-[4.75rem] md:border-r md:border-t-0 md:pb-0`}
      aria-label="Проводник по страницам"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left bg-white/80 md:hidden"
        style={{ transform: `scaleX(${progress})` }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-y-0 right-0 hidden w-px origin-top bg-white/80 md:block"
        style={{ transform: `scaleY(${progress})` }}
      />

      <div className="md:hidden">
        <p key={activeGroup} className="animate-fade-in truncate px-4 pt-2 text-[10px] uppercase tracking-[0.28em] text-white/75">
          <span className="text-white">
            {chapterIndex >= 0 ? String(chapterIndex + 1).padStart(2, '0') : '—'}
          </span>
          <span className="mx-2 text-white/30">/</span>
          {label}
        </p>
        <div className="flex h-11 items-stretch">
          <div className="relative flex min-w-0 flex-1">
            {chapters.map((chapter, index) => {
              const active = chapter.id === activeGroup;
              return (
                <button
                  key={chapter.id}
                  type="button"
                  onClick={() => scrollToId(chapter.id)}
                  aria-current={active ? 'true' : undefined}
                  aria-label={chapter.label}
                  className={`relative min-w-0 flex-1 text-[11px] tracking-[0.12em] ${
                    active ? 'text-white' : 'text-white/45'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')}
                </button>
              );
            })}
            {chapterIndex >= 0 && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 h-px bg-white transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]"
                style={{
                  width: `${100 / chapters.length}%`,
                  transform: `translateX(${chapterIndex * 100}%)`,
                }}
              />
            )}
          </div>
          <button
            type="button"
            onClick={() => (atEnd ? scrollToId('top') : go(1))}
            aria-label={atEnd ? 'Наверх' : `Дальше: следующая страница. Сейчас ${label}`}
            className="flex w-14 items-center justify-center border-l border-white/10 text-white"
          >
            {atEnd ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {label}
      </p>

      <div className="hidden h-full flex-col items-center py-4 md:flex">
        <div className="relative flex flex-1 flex-col items-center justify-center gap-1">
          {chapters.map((chapter, index) => {
            const active = chapter.id === activeGroup;
            return (
              <button
                key={chapter.id}
                type="button"
                onClick={() => scrollToId(chapter.id)}
                aria-current={active ? 'true' : undefined}
                aria-label={chapter.label}
                className={`flex h-11 w-11 items-center justify-center text-[11px] tracking-[0.14em] ${
                  active ? 'text-white' : 'text-white/35'
                }`}
              >
                {String(index + 1).padStart(2, '0')}
              </button>
            );
          })}
          {chapterIndex >= 0 && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-1 top-0 w-px bg-white transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]"
              style={{
                height: `${100 / chapters.length}%`,
                transform: `translateY(${chapterIndex * 100}%)`,
              }}
            />
          )}
        </div>
        <p className="guide-vertical my-4 text-[10px] uppercase tracking-[0.28em] text-white/55">{label}</p>
        <button
          type="button"
          onClick={() => (atEnd ? scrollToId('top') : go(1))}
          aria-label={atEnd ? 'Наверх' : 'Следующая страница'}
          className="flex h-11 w-11 items-center justify-center border border-white/15 text-white"
        >
          {atEnd ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
        </button>
      </div>
    </aside>
  );
}
