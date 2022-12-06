export function solvePart1(input: string) {
  const buffer = [...input.trim()];
  const windows = slidingWindow(buffer, 4);

  for (const [index, window] of windows.entries()) {
    const set = new Set(window);
    if (set.size === 4) {
      return index + 4;
    }
  }
}

export function solvePart2(input: string) {
  const buffer = [...input.trim()];
  const windows = slidingWindow(buffer, 14);
  for (const [index, window] of windows.entries()) {
    const set = new Set(window);
    if (set.size === 14) {
      return index + 14;
    }
  }
}

function slidingWindow<T>(array: T[], size: number) {
  return Array.from(
    { length: array.length - size + 1 },
    (_, i) => array.slice(i, i + size),
  );
}
