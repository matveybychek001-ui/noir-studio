import { useEffect, useState } from 'react';
import { scrollToId } from '@/hooks/useScreenProgress';

const STORAGE_KEY = 'noir-studio-cookies';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const choose = (value: 'all' | 'necessary') => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* выбор останется на эту сессию, если хранилище закрыто */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div data-cookie-banner className="shrink-0 border-t border-white/15 bg-[#111111] px-4 py-3 md:px-8">
      <p className="text-sm leading-relaxed text-white/75">
        Cookies запоминают только этот выбор.{' '}
        <button
          type="button"
          onClick={() => scrollToId('privacy')}
          className="underline decoration-white/30 underline-offset-4"
        >
          Политика
        </button>
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => choose('necessary')}
          className="min-h-12 border border-white/20 px-2 text-[10px] uppercase leading-tight tracking-[0.12em] text-white"
        >
          Только нужные
        </button>
        <button
          type="button"
          onClick={() => choose('all')}
          className="min-h-12 bg-[#f3f0ea] px-2 text-[10px] uppercase tracking-[0.14em] text-black"
        >
          Принять
        </button>
      </div>
    </div>
  );
}
