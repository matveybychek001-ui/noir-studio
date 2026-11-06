import { FormEvent, useEffect, useMemo, useState, type ReactNode } from 'react';
import Reveal from '@/components/Reveal';
import { services } from '@/data/services';
import { studio, timeSlots } from '@/data/studio';
import { scrollToId } from '@/hooks/useScreenProgress';
import { useScroller } from '@/scroller';

interface BookingProps {
  serviceId: string;
  onServiceChange: (id: string) => void;
}

interface FormState {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  comment: string;
}

type Errors = Partial<Record<keyof FormState | 'service' | 'consent', string>>;

const empty: FormState = {
  name: '',
  phone: '',
  email: '',
  date: '',
  time: '',
  comment: '',
};

function todayStamp() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

function maxStamp() {
  const now = new Date();
  now.setDate(now.getDate() + 90);
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

function minutes(time: string) {
  const [hours, mins] = time.split(':').map(Number);
  return hours * 60 + mins;
}

function slotAvailable(date: string, time: string, durationMin: number) {
  if (!date) return true;
  const end = minutes(time) + durationMin;
  if (end > studio.closeMinutes) return false;
  const slot = new Date(`${date}T${time}:00`);
  return slot.getTime() > Date.now();
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
  });
}

export default function Booking({ serviceId, onServiceChange }: BookingProps) {
  const { height } = useScroller();
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<FormState | null>(null);
  const [consent, setConsent] = useState(false);

  const service = services.find((item) => item.id === serviceId) ?? services[0];

  useEffect(() => {
    if (!sent) return;
    document.getElementById('booking-status')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    });
  }, [sent]);
  const minDate = todayStamp();
  const maxDate = maxStamp();

  const slots = useMemo(
    () =>
      timeSlots.map((time) => ({
        time,
        open: slotAvailable(form.date, time, service.durationMin),
      })),
    [form.date, service.durationMin],
  );

  const setField = (key: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const validate = () => {
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = 'Введите имя';
    const digits = form.phone.replace(/\D/g, '');
    if (digits.length < 10) next.phone = 'Введите телефон';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Введите почту';
    if (!form.date) next.date = 'Выберите дату';
    else if (new Date(`${form.date}T00:00:00`).getDay() === studio.closedWeekday) {
      next.date = 'По понедельникам студия закрыта';
    }
    if (!form.time) next.time = 'Выберите время';
    else if (!slotAvailable(form.date, form.time, service.durationMin)) {
      next.time = 'Это окно уже недоступно';
    }
    if (!consent) next.consent = 'Нужно согласие на обработку персональных данных';
    return next;
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const first = Object.keys(next)[0];
      document.getElementById(`field-${first}`)?.focus();
      return;
    }
    setSent(form);
  };

  const sendMail = () => {
    if (!sent) return;
    const body = [
      `Имя: ${sent.name.trim()}`,
      `Телефон: ${sent.phone.trim()}`,
      `Почта: ${sent.email.trim()}`,
      `Съёмка: ${service.title} (${service.duration})`,
      `Дата: ${formatDate(sent.date)}`,
      `Время: ${sent.time}`,
      `Комментарий: ${sent.comment.trim() || '—'}`,
      'Согласие на обработку персональных данных: да',
    ].join('\n');
    window.location.href = `mailto:${studio.email}?subject=${encodeURIComponent(
      `Запись Noir Studio — ${service.title}`,
    )}&body=${encodeURIComponent(body)}`;
  };

  const reset = () => {
    setSent(null);
    setForm(empty);
    setConsent(false);
    setErrors({});
  };

  return (
    <section
      id="booking"
      data-screen="booking"
      data-group="booking"
      style={height ? { minHeight: height } : undefined}
      className="page-flow px-5 py-8 md:px-12 md:py-14"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.1fr)] lg:gap-16">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.34em] text-white/45">05 — Запись</p>
          <h2 className="font-display mt-3 text-[2.4rem] font-light leading-[0.95] text-[#f3f0ea] sm:text-6xl">
            Онлайн-запись
          </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55">
              Выберите формат, день и окно. После подтверждения заявка уходит на почту студии, и
              администратор фиксирует время. Отмена без потери предоплаты — за 24 часа.
            </p>
          <p className="mt-6 text-sm text-white/70">
            {studio.hours}
            <span className="mt-1 block text-white/45">{studio.address}</span>
          </p>
        </Reveal>

        {sent ? (
          <div id="booking-status" className="border border-white/15 px-5 py-6" role="status">
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">Заявка собрана</p>
            <h3 className="font-display mt-3 text-4xl font-light text-white">{service.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              {formatDate(sent.date)}, {sent.time}
              <span className="mt-1 block">
                {sent.name.trim()} · {sent.phone.trim()}
              </span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/50">
              Отправьте заявку на почту студии. Если письмо не открылось, напишите на {studio.email}.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <button
                type="button"
                onClick={sendMail}
                className="h-12 bg-[#f3f0ea] px-4 text-[11px] uppercase tracking-[0.2em] text-black"
              >
                Отправить на почту
              </button>
              <button
                type="button"
                onClick={reset}
                className="h-12 border border-white/20 px-4 text-[11px] uppercase tracking-[0.2em] text-white"
              >
                Изменить
              </button>
            </div>
          </div>
        ) : (
          <form noValidate onSubmit={submit} className="grid gap-5">
            <fieldset className="grid gap-2">
              <legend className="text-[10px] uppercase tracking-[0.22em] text-white/45">Формат</legend>
              <div className="grid grid-cols-2 gap-2">
                {services.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={item.id === service.id}
                    onClick={() => {
                      onServiceChange(item.id);
                      if (form.time && !slotAvailable(form.date, form.time, item.durationMin)) {
                        setField('time', '');
                      }
                    }}
                    className={`min-h-12 border px-2 py-2 text-[11px] uppercase leading-tight tracking-[0.12em] ${
                      item.id === service.id
                        ? 'border-white text-white'
                        : 'border-white/15 text-white/55'
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </fieldset>

            <Field label="Имя" error={errors.name} id="field-name">
              <input
                id="field-name"
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={(event) => setField('name', event.target.value)}
                className={inputClass(Boolean(errors.name))}
              />
            </Field>

            <Field label="Телефон" error={errors.phone} id="field-phone">
              <input
                id="field-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+7"
                value={form.phone}
                onChange={(event) => setField('phone', event.target.value)}
                className={inputClass(Boolean(errors.phone))}
              />
            </Field>

            <Field label="Почта" error={errors.email} id="field-email">
              <input
                id="field-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={form.email}
                onChange={(event) => setField('email', event.target.value)}
                className={inputClass(Boolean(errors.email))}
              />
            </Field>

            <Field label="Дата" error={errors.date} id="field-date">
              <input
                id="field-date"
                name="date"
                type="date"
                min={minDate}
                max={maxDate}
                value={form.date}
                onChange={(event) => {
                  const value = event.target.value;
                  setForm((current) => ({
                    ...current,
                    date: value,
                    time:
                      current.time && slotAvailable(value, current.time, service.durationMin)
                        ? current.time
                        : '',
                  }));
                  setErrors((current) => ({ ...current, date: undefined, time: undefined }));
                }}
                className={inputClass(Boolean(errors.date))}
              />
            </Field>

            <fieldset className="grid gap-2">
              <legend className="text-[10px] uppercase tracking-[0.22em] text-white/45">Время</legend>
              <div className="grid grid-cols-3 gap-2" id="field-time">
                {slots.map((slot) => (
                  <button
                    key={slot.time}
                    type="button"
                    disabled={!slot.open}
                    aria-pressed={form.time === slot.time}
                    onClick={() => setField('time', slot.time)}
                    className={`h-12 border text-sm ${
                      form.time === slot.time
                        ? 'border-white text-white'
                        : 'border-white/15 text-white/70'
                    } disabled:border-white/10 disabled:text-white/25`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
              {errors.time && <p className="text-xs text-white/70">{errors.time}</p>}
              {form.date && slots.every((slot) => !slot.open) && (
                <p className="text-xs text-white/50">На эту дату свободных окон нет.</p>
              )}
            </fieldset>

            <Field label="Комментарий" error={undefined} id="field-comment">
              <textarea
                id="field-comment"
                name="comment"
                rows={3}
                maxLength={400}
                value={form.comment}
                onChange={(event) => setField('comment', event.target.value)}
                className="w-full resize-none border-b border-white/20 bg-transparent py-3 text-base text-white outline-none focus:border-white"
              />
            </Field>

            <div className="grid gap-2">
              <div className="flex items-start gap-3">
                <input
                  id="field-consent"
                  name="consent"
                  type="checkbox"
                  checked={consent}
                  onChange={(event) => {
                    setConsent(event.target.checked);
                    setErrors((current) => ({ ...current, consent: undefined }));
                  }}
                  className="mt-0.5 h-5 w-5 shrink-0 accent-[#f3f0ea]"
                />
                <p className="text-sm leading-relaxed text-white/70">
                  <label htmlFor="field-consent">
                    Соглашаюсь на обработку персональных данных и принимаю{' '}
                  </label>
                  <button
                    type="button"
                    onClick={() => scrollToId('privacy')}
                    className="underline decoration-white/30 underline-offset-4"
                  >
                    политику
                  </button>
                </p>
              </div>
              {errors.consent && <p className="text-xs text-white/70">{errors.consent}</p>}
            </div>

            <button
              type="submit"
              className="h-14 bg-[#f3f0ea] text-[11px] uppercase tracking-[0.24em] text-black"
            >
              Подтвердить запись
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function inputClass(invalid: boolean) {
  return `h-12 w-full border-b bg-transparent text-base text-white outline-none placeholder:text-white/30 ${
    invalid ? 'border-white' : 'border-white/20 focus:border-white'
  }`;
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-2" htmlFor={id}>
      <span className="text-[10px] uppercase tracking-[0.22em] text-white/45">{label}</span>
      {children}
      {error && <span className="text-xs text-white/70">{error}</span>}
    </label>
  );
}
