import { useCallback, useEffect, useState, type RefObject } from 'react';

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function scrollToId(id: string) {
  const node = document.getElementById(id);
  if (!node) return;
  node.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  });
}

export function useScreenProgress(rootRef: RefObject<HTMLDivElement | null>) {
  const [activeId, setActiveId] = useState('top');
  const [activeGroup, setActiveGroup] = useState('top');
  const [progress, setProgress] = useState(0);
  const [sequence, setSequence] = useState<string[]>(['top']);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const nodes = [...root.querySelectorAll<HTMLElement>('[data-screen]')];
    setSequence(nodes.map((node) => node.dataset.screen!).filter(Boolean));

    const onScroll = () => {
      const max = root.scrollHeight - root.clientHeight;
      setProgress(max <= 0 ? 0 : Math.min(1, root.scrollTop / max));
    };

    onScroll();
    root.addEventListener('scroll', onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!(best?.target instanceof HTMLElement)) return;
        const screen = best.target.dataset.screen;
        if (!screen) return;
        setActiveId(screen);
        setActiveGroup(best.target.dataset.group || screen);
      },
      { root, threshold: [0.45, 0.62, 0.8] },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => {
      root.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, [rootRef]);

  const go = useCallback(
    (direction: 1 | -1) => {
      const index = sequence.indexOf(activeId);
      const fallback = direction === 1 ? 0 : sequence.length - 1;
      const next = sequence[index + direction] ?? sequence[fallback];
      if (next) scrollToId(next);
    },
    [activeId, sequence],
  );

  return { activeId, activeGroup, progress, sequence, go };
}
