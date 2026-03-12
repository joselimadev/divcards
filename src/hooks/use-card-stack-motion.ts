import { useMemo } from "react";

type CardMotion = {
  isActive: boolean;
  opacity: number;
  rotate: number;
  scale: number;
  translateX: number;
  translateY: number;
  zIndex: number;
};

type CardStackItem<T> = {
  card: T;
  index: number;
  offset: number;
  motion: CardMotion;
};

function getOffset(index: number, activeIndex: number, size: number) {
  const rawOffset = index - activeIndex;
  const half = Math.floor(size / 2);

  if (rawOffset > half) {
    return rawOffset - size;
  }

  if (rawOffset < -half) {
    return rawOffset + size;
  }

  return rawOffset;
}

function getCardMotion(offset: number): CardMotion {
  const isActive = offset === 0;
  const isBefore = offset < 0;
  const depth = Math.abs(offset);

  return {
    isActive,
    opacity: isActive ? 1 : depth === 1 ? 0.82 : 0.52,
    rotate: isActive ? -1 : isBefore ? -9 - depth * 3 : 9 + depth * 3,
    scale: isActive ? 1 : 1 - depth * 0.05,
    translateX: isActive ? 0 : isBefore ? -52 - depth * 18 : 52 + depth * 18,
    translateY: depth * 18,
    zIndex: 30 - depth,
  };
}

export function useCardStackMotion<T>(cards: T[], activeIndex: number) {
  return useMemo<CardStackItem<T>[]>(() => {
    return cards
      .map((card, index) => {
        const offset = getOffset(index, activeIndex, cards.length);

        return {
          card,
          index,
          offset,
          motion: getCardMotion(offset),
        };
      })
      .filter(({ offset }) => Math.abs(offset) <= 2);
  }, [activeIndex, cards]);
}
