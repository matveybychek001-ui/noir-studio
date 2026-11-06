import { useState } from 'react';
import { photos } from '@/data/photos';
import { useScroller } from '@/scroller';
import Lightbox from '@/components/Lightbox';

function pad(value: number) {
  return String(value).padStart(2, '0');
}

export default function Gallery() {
  const { height } = useScroller();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const frame = height ? { height, minHeight: height } : undefined;

  return (
    <>
      {photos.map((photo, index) => {
        const screenId = index === 0 ? 'gallery' : photo.id;
        return (
          <article
            key={photo.id}
            id={screenId}
            data-screen={screenId}
            data-group="gallery"
            style={frame}
            className="page-screen flex flex-col px-4 py-4 md:px-10 md:py-8"
          >
            <div className="flex min-h-0 flex-1 items-center justify-center bg-[#121212]">
              <img
                src={photo.src}
                alt={photo.alt}
                draggable={false}
                loading={index < 2 ? 'eager' : 'lazy'}
                decoding="async"
                className="max-h-full max-w-full object-contain grayscale"
              />
            </div>

            <div className="flex shrink-0 items-end justify-between gap-4 pt-4">
              <div className="min-w-0">
                {index === 0 && (
                  <p className="mb-2 text-[10px] uppercase tracking-[0.32em] text-white/40">
                    03 — Работы
                  </p>
                )}
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/45">{photo.category}</p>
                <h2 className="font-display truncate text-[1.85rem] font-light leading-none text-[#f3f0ea] sm:text-4xl">
                  {photo.title}
                </h2>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <p className="font-display text-lg text-white/45">
                  {pad(index + 1)}
                  <span className="mx-1 text-white/25">/</span>
                  {pad(photos.length)}
                </p>
                <button
                  type="button"
                  onClick={() => setOpenIndex(index)}
                  className="h-11 px-1 text-[10px] uppercase tracking-[0.22em] text-white/70 underline-offset-4 hover:text-white hover:underline"
                >
                  Открыть
                </button>
              </div>
            </div>
          </article>
        );
      })}

      {openIndex !== null && (
        <Lightbox
          photos={photos}
          index={openIndex}
          onIndexChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  );
}
