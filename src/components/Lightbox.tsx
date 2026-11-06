import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import type { Photo } from '@/data/photos';

interface LightboxProps {
  photos: Photo[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

const SWIPE = 48;

export default function Lightbox({ photos, index, onIndexChange, onClose }: LightboxProps) {
  const count = photos.length;
  const photo = photos[index];
  const closeRef = useRef<HTMLButtonElement>(null);
  const startX = useRef<number | null>(null);
  const [offset, setOffset] = useState(0);

  const goNext = () => onIndexChange((index + 1) % count);
  const goPrev = () => onIndexChange((index - 1 + count) % count);

  useEffect(() => {
    closeRef.current?.focus();
    const scroller = document.getElementById('scroller');
    const previous = scroller?.style.overflow ?? '';
    if (scroller) scroller.style.overflow = 'hidden';

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onIndexChange((index + 1) % count);
      if (event.key === 'ArrowLeft') onIndexChange((index - 1 + count) % count);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      if (scroller) scroller.style.overflow = previous;
    };
  }, [count, index, onClose, onIndexChange]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.title}
      className="fixed inset-0 z-[70] flex flex-col bg-black"
    >
      <header className="flex h-14 shrink-0 items-center justify-between px-4 pt-[env(safe-area-inset-top)]">
        <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">
          {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="flex h-11 w-11 items-center justify-center border border-white/20 text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </header>

      <div
        className="flex min-h-0 flex-1 items-center justify-center px-3"
        onPointerDown={(event) => {
          startX.current = event.clientX;
          setOffset(0);
        }}
        onPointerMove={(event) => {
          if (startX.current === null) return;
          setOffset(event.clientX - startX.current);
        }}
        onPointerUp={() => {
          if (offset <= -SWIPE) goNext();
          if (offset >= SWIPE) goPrev();
          startX.current = null;
          setOffset(0);
        }}
        onPointerCancel={() => {
          startX.current = null;
          setOffset(0);
        }}
      >
        <img
          key={photo.id}
          src={photo.src}
          alt={photo.alt}
          draggable={false}
          style={{ transform: `translateX(${offset}px)` }}
          className="max-h-full max-w-full object-contain grayscale animate-fade-in"
        />
      </div>

      <footer className="shrink-0 border-t border-white/10 pb-[env(safe-area-inset-bottom)]">
        <div className="px-4 py-3 text-center">
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">{photo.category}</p>
          <p className="font-display text-2xl font-light text-white">{photo.title}</p>
        </div>
        <div className="grid grid-cols-2 border-t border-white/10">
          <button
            type="button"
            onClick={goPrev}
            className="h-14 border-r border-white/10 text-[11px] uppercase tracking-[0.22em] text-white/80"
          >
            Назад
          </button>
          <button
            type="button"
            onClick={goNext}
            className="h-14 text-[11px] uppercase tracking-[0.22em] text-white/80"
          >
            Дальше
          </button>
        </div>
      </footer>
    </div>
  );
}
