import Reveal from '@/components/Reveal';
import { useScroller } from '@/scroller';
import { studio } from '@/data/studio';

const facts = [
  { label: 'Зал', value: '70 м²' },
  { label: 'Свет', value: 'Импульс и постоянный' },
  { label: 'Часы', value: studio.hours },
  { label: 'Адрес', value: studio.address },
];

export default function Studio() {
  const { height } = useScroller();

  return (
    <section
      id="studio"
      data-screen="studio"
      data-group="studio"
      style={height ? { height, minHeight: height } : undefined}
      className="page-screen grid grid-rows-[auto_minmax(0,1fr)] md:grid-cols-2 md:grid-rows-1"
    >
      <div className="flex flex-col justify-center px-5 py-6 md:px-12 md:py-10">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.34em] text-white/45">02 — Студия</p>
          <h2 className="font-display mt-3 text-[2.4rem] font-light leading-[0.95] text-[#f3f0ea] sm:text-6xl">
            Тишина, свет и чистый кадр
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
            Noir Studio снимает в чёрно-белой дисциплине. Цвет не помогает кадру: его держат линия,
            пауза и то, как свет ложится на человека.
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-white/10 pt-5">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-[10px] uppercase tracking-[0.22em] text-white/40">{fact.label}</dt>
                <dd className="mt-1 text-sm text-white/80">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <div className="min-h-0 px-4 pb-4 md:px-8 md:py-8">
        <div className="flex h-full min-h-0 items-center justify-center bg-[#121212]">
          <img
            src="https://images.pexels.com/photos/10500054/pexels-photo-10500054.jpeg?auto=compress&cs=tinysrgb&h=1400&w=1600"
            alt="Профиль в студийном свете"
            className="max-h-full max-w-full object-contain grayscale"
          />
        </div>
      </div>
    </section>
  );
}
