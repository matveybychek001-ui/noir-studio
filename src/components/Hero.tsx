import Reveal from '@/components/Reveal';
import { useScroller } from '@/scroller';
import { studio } from '@/data/studio';

const heroSrc =
  'https://images.pexels.com/photos/29528855/pexels-photo-29528855.jpeg?auto=compress&cs=tinysrgb&h=1400&w=1800';

export default function Hero() {
  const { height } = useScroller();

  return (
    <section
      id="top"
      data-screen="top"
      data-group="top"
      style={height ? { height, minHeight: height } : undefined}
      className="page-screen grid grid-rows-[auto_minmax(0,1fr)] md:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] md:grid-rows-1"
    >
      <div className="flex flex-col justify-end px-5 pb-2 pt-6 md:justify-center md:px-12 md:py-10">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.34em] text-white/50">
            {studio.city} · с {studio.since}
          </p>
          <h1 className="font-display mt-4 text-[3.15rem] font-light leading-[0.88] text-[#f3f0ea] sm:text-7xl">
            Noir
            <span className="block">Studio</span>
          </h1>
        </Reveal>
        <Reveal delay={120} className="mt-5 max-w-sm">
          <p className="text-sm leading-relaxed text-white/60 sm:text-base">
            Фотостудия. Портрет, пары и редакционные съёмки. Строгий свет, один кадр — одно решение.
          </p>
        </Reveal>
      </div>

      <div className="min-h-0 px-4 pb-4 pt-4 md:px-8 md:py-8">
        <div className="flex h-full min-h-0 items-center justify-center overflow-hidden bg-[#121212]">
          <img
            src={heroSrc}
            alt="Интерьер студии: свет из потолочного окна"
            className="uncover max-h-full max-w-full object-contain grayscale"
          />
        </div>
      </div>
    </section>
  );
}
