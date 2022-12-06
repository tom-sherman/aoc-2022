import { entries } from "lib/iter-util.ts";

export function solvePart1(input: string) {
  const buffer = [...input.trim()];

  for (const [index, window] of entries(slidingWindow(buffer, 4))) {
    const set = new Set(window);
    if (set.size === 4) {
      return index + 4;
    }
  }
}

export function solvePart2(input: string) {
  const buffer = [...input.trim()];
  for (const [index, window] of entries(slidingWindow(buffer, 14))) {
    const set = new Set(window);
    if (set.size === 14) {
      return index + 14;
    }
  }
}

function* slidingWindow<T>(array: T[], size: number) {
  for (let i = 0; i < array.length - size + 1; i++) {
    yield array.slice(i, i + size);
  }
}
