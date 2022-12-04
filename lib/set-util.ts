export function intersection<T>(...sets: Set<T>[]): Set<T> {
  if (sets.length === 0) {
    return new Set();
  }
  const [firstSet, ...rest] = sets;
  const result = new Set<T>();

  for (const value of firstSet!) {
    if (rest.every((set) => set.has(value))) {
      result.add(value);
    }
  }

  return result;
}

export function union<T>(...sets: Set<T>[]): Set<T> {
  const result = new Set<T>();

  for (const set of sets) {
    for (const value of set) {
      result.add(value);
    }
  }

  return result;
}

export function head<T>(set: Set<T>) {
  const result = set.values().next();

  return result.done ? undefined : result.value;
}

export function isSuperSet<T>(set: Set<T>, subset: Set<T>) {
  for (const elem of subset) {
    if (!set.has(elem)) {
      return false;
    }
  }

  return true;
}
