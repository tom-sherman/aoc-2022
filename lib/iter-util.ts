export function* genArray<T>(array: T[]): Generator<T> {
  for (const value of array) {
    yield value;
  }
}

export function* entries<T>(iterable: Iterable<T>): Iterable<[number, T]> {
  let index = 0;
  for (const value of iterable) {
    yield [index, value];
    index++;
  }
}

export function find<T>(
  iterable: Iterable<T>,
  predicate: (value: T) => boolean,
): T | undefined {
  for (const value of iterable) {
    if (predicate(value)) {
      return value;
    }
  }
}

export function uncons<T>(
  iterable: Generator<T>,
): [T, Iterable<T>] | undefined {
  const iterator = iterable[Symbol.iterator]();
  const first = iterable.next();
  if (first.done) {
    return undefined;
  } else {
    return [first.value, iterator];
  }
}

export function* columns<T>(grid: T[][]): Generator<T[]> {
  const width = grid[0]!.length;
  for (let x = 0; x < width; x++) {
    yield grid.map((row) => row[x] as T);
  }
}
