export interface Service {
  id: string;
  title: string;
  duration: string;
  durationMin: number;
  price: string;
  text: string;
  deliver: string;
}

export const services: Service[] = [
  {
    id: 'portrait',
    title: 'Портрет',
    duration: '90 минут',
    durationMin: 90,
    price: '14 000 ₽',
    text: 'Один человек. Свет собираем до съёмки, в кадре остаётся лицо, а не декорация.',
    deliver: '15 обработанных кадров',
  },
  {
    id: 'pair',
    title: 'Пара',
    duration: '2 часа',
    durationMin: 120,
    price: '20 000 ₽',
    text: 'Двое в одном сетапе. Спокойный темп, без постановочной суеты.',
    deliver: '25 обработанных кадров',
  },
  {
    id: 'editorial',
    title: 'Редакционная',
    duration: '3 часа',
    durationMin: 180,
    price: '32 000 ₽',
    text: 'Образ, фактура, точный свет. Съёмка для публикации и портфолио.',
    deliver: '40 обработанных кадров',
  },
  {
    id: 'family',
    title: 'Семейная',
    duration: '2 часа',
    durationMin: 120,
    price: '22 000 ₽',
    text: 'До пяти человек. Короткий сетап, чтобы кадры остались живыми.',
    deliver: '30 обработанных кадров',
  },
];
