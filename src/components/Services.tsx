import Reveal from '@/components/Reveal';
import { services } from '@/data/services';
import { scrollToId } from '@/hooks/useScreenProgress';
import { useScroller } from '@/scroller';

interface ServicesProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function Services({ selectedId, onSelect }: ServicesProps) {
  const { height } = useScroller();

  return (
    <section
      id="services"
      data-screen="services"
      data-group="services"
      style={height ? { minHeight: height } : undefined}
      className="page-flow px-5 py-8 md:px-12 md:py-14"
    >
      <Reveal>
        <p className="text-[10px] uppercase tracking-[0.34em] text-white/45">04 — Услуги</p>
        <h2 className="font-display mt-3 max-w-xl text-[2.4rem] font-light leading-[0.95] text-[#f3f0ea] sm:text-6xl">
          Четыре формата съёмки
        </h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55">
          Выберите формат — откроется запись с уже отмеченной услугой. Время подстроится под
          длительность.
        </p>
      </Reveal>

      <ul className="mt-8 grid gap-3 md:grid-cols-2">
        {services.map((service) => {
          const selected = service.id === selectedId;
          return (
            <li key={service.id}>
              <button
                type="button"
                onClick={() => {
                  onSelect(service.id);
                  scrollToId('booking');
                }}
                aria-pressed={selected}
                className={`flex h-full w-full flex-col border px-4 py-5 text-left transition-colors ${
                  selected ? 'border-white bg-white/[0.04]' : 'border-white/15 hover:border-white/40'
                }`}
              >
                <span className="flex items-baseline justify-between gap-3">
                  <span className="font-display text-[2rem] font-light leading-none text-white">
                    {service.title}
                  </span>
                  <span className="shrink-0 text-sm text-white/75">{service.price}</span>
                </span>
                <span className="mt-3 text-sm leading-relaxed text-white/55">{service.text}</span>
                <span className="mt-5 flex flex-col gap-2 text-[10px] uppercase tracking-[0.16em] text-white/40 sm:flex-row sm:items-center sm:justify-between">
                  <span>
                    {service.duration} · {service.deliver}
                  </span>
                  <span className="text-white/70">Записать</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
