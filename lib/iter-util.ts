export function* entries<T>(iterable: Iterable<T>): Iterable<[number, T]> {
  let index = 0;
  for (const value of iterable) {
    yield [index, value];
    index++;
  }
}
