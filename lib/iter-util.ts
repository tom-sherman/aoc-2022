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
