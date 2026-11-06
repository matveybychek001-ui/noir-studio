import { studio } from '@/data/studio';
import { scrollToId } from '@/hooks/useScreenProgress';
import { useScroller } from '@/scroller';

export default function Footer() {
  const { height } = useScroller();

  return (
    <footer
      id="contact"
      data-screen="contact"
      data-group="contact"
      style={height ? { minHeight: height } : undefined}
      className="page-flow flex flex-col justify-between border-t border-white/10 px-5 py-8 md:px-12 md:py-12"
    >
      <div className="grid gap-10 md:grid-cols-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.34em] text-white/45">Контакты</p>
          <p className="font-display mt-3 text-4xl font-light tracking-[0.08em] text-white">Noir Studio</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
            Портрет, пары и редакционные съёмки. Кадр не перекрываем ни светом «для красоты», ни
            лишним реквизитом.
          </p>
        </div>

        <ul className="space-y-4 text-sm text-white/75">
          <li>
            <a href={`mailto:${studio.email}`} className="underline-offset-4 hover:underline">
              {studio.email}
            </a>
          </li>
          <li>
            <a href={studio.phoneHref} className="underline-offset-4 hover:underline">
              {studio.phoneDisplay}
            </a>
          </li>
          <li>
            {studio.city}, {studio.address}
          </li>
          <li className="text-white/45">{studio.hours}</li>
        </ul>

        <div className="md:text-right">
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/40">Студия</p>
          <p className="mt-4 text-sm leading-relaxed text-white/55">
            Гримёрная и циклорама в зале.
            <span className="mt-2 block">Предоплата фиксирует окно.</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-12 text-[11px] tracking-wide text-white/35 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Noir Studio</p>
        <button
          type="button"
          onClick={() => scrollToId('privacy')}
          className="h-11 text-left uppercase tracking-[0.18em] text-white/55"
        >
          Политика персональных данных
        </button>
      </div>
    </footer>
  );
}
