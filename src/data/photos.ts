export interface Photo {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: string;
}

export const photos: Photo[] = [
  {
    id: 'portrait-1',
    src: 'https://images.pexels.com/photos/13221342/pexels-photo-13221342.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1600',
    alt: 'Теневой портрет в монохроме',
    title: 'Полутень',
    category: 'Портрет',
  },
  {
    id: 'architecture-1',
    src: 'https://images.pexels.com/photos/21835402/pexels-photo-21835402.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1600',
    alt: 'Минималистичная архитектура с острыми углами',
    title: 'Геометрия',
    category: 'Архитектура',
  },
  {
    id: 'portrait-2',
    src: 'https://images.pexels.com/photos/10500054/pexels-photo-10500054.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1600',
    alt: 'Профиль мужчины в тёмной студии',
    title: 'Профиль',
    category: 'Портрет',
  },
  {
    id: 'architecture-2',
    src: 'https://images.pexels.com/photos/11787622/pexels-photo-11787622.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1600',
    alt: 'Абстрактные тени в городской сцене',
    title: 'Тени города',
    category: 'Улица',
  },
  {
    id: 'portrait-3',
    src: 'https://images.pexels.com/photos/20441653/pexels-photo-20441653.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1600',
    alt: 'Задумчивый чёрно-белый портрет женщины',
    title: 'Размышление',
    category: 'Портрет',
  },
  {
    id: 'architecture-3',
    src: 'https://images.pexels.com/photos/29528855/pexels-photo-29528855.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1600',
    alt: 'Геометрическая перспектива с окном в потолке',
    title: 'Свет сверху',
    category: 'Интерьер',
  },
  {
    id: 'portrait-4',
    src: 'https://images.pexels.com/photos/7699980/pexels-photo-7699980.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1600',
    alt: 'Портрет женщины с эффектом размытия движения',
    title: 'Движение',
    category: 'Портрет',
  },
  {
    id: 'architecture-4',
    src: 'https://images.pexels.com/photos/15663491/pexels-photo-15663491.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1600',
    alt: 'Минималистичная лестница с геометрическим светом',
    title: 'Ступени',
    category: 'Интерьер',
  },
];
