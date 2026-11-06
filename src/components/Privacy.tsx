import { studio } from '@/data/studio';
import { useScroller } from '@/scroller';

const sections = [
  {
    title: 'Оператор',
    text: `${studio.name}, ${studio.city}, ${studio.address}. Вопросы по данным: ${studio.email}, ${studio.phoneDisplay}.`,
  },
  {
    title: 'Какие данные',
    text: 'Имя, телефон, почта, выбранная съёмка, дата, время и комментарий. Отдельно в браузере хранится только ваш выбор по cookies.',
  },
  {
    title: 'Зачем',
    text: 'Чтобы собрать заявку на съёмку и связаться с вами для подтверждения окна. Других целей у формы нет.',
  },
  {
    title: 'Как уходит заявка',
    text: 'Сайт не отправляет анкету на сервер. Текст собирается у вас в браузере, а письмо уходит, только когда вы нажимаете «Отправить на почту».',
  },
  {
    title: 'Cookies',
    text: 'Нужная запись одна: запомнить, закрыли ли вы баннер и какой выбор сделали. Рекламных и аналитических cookies нет.',
  },
  {
    title: 'Срок',
    text: 'Выбор по cookies хранится в этом браузере, пока вы его не очистите. Заявка остаётся в отправленном письме. Согласие можно отозвать письмом на почту студии.',
  },
  {
    title: 'Ваши права',
    text: 'Можно запросить, какие данные студия получила, попросить их исправить или удалить и отказаться от дальнейшей обработки.',
  },
];

export default function Privacy() {
  const { height } = useScroller();

  return (
    <section
      id="privacy"
      data-screen="privacy"
      data-group="privacy"
      style={height ? { minHeight: height } : undefined}
      className="page-flow border-t border-white/10 px-5 py-8 md:px-12 md:py-14"
    >
      <p className="text-[10px] uppercase tracking-[0.34em] text-white/45">Политика</p>
      <h2 className="font-display mt-3 max-w-3xl text-[2.3rem] font-light leading-[0.95] text-[#f3f0ea] sm:text-6xl">
        Обработка персональных данных
      </h2>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/55">
        Документ от 6 ноября 2026 года. Он описывает запись на съёмку и cookies сайта {studio.name}.
      </p>

      <ol className="mt-10 grid max-w-3xl gap-6">
        {sections.map((section, index) => (
          <li key={section.title} className="border-t border-white/10 pt-5">
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">
              {String(index + 1).padStart(2, '0')}
            </p>
            <h3 className="font-display mt-2 text-3xl font-light text-white">{section.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/65">{section.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
