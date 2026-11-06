import { createContext, useContext, type RefObject } from 'react';

export interface ScrollerValue {
  ref: RefObject<HTMLDivElement | null>;
  height: number | null;
}

export const ScrollerContext = createContext<ScrollerValue | null>(null);

export function useScroller() {
  const value = useContext(ScrollerContext);
  if (!value) {
    throw new Error('Scroller is missing');
  }
  return value;
}
