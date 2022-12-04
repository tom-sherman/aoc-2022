import { intersection, isSuperSet } from "lib/set-util.ts";

export function solvePart1(input: string) {
  const sectionPairs = input.trim().split("\n").map((line) => {
    const [aSection, bSection] = line.split(",");

    return [rangeFromString(aSection!), rangeFromString(bSection!)] as const;
  });

  return sectionPairs.filter(([a, b]) => isSuperSet(a, b) || isSuperSet(b, a))
    .length;
}

export function solvePart2(input: string) {
  const sectionPairs = input.trim().split("\n").map((line) => {
    const [aSection, bSection] = line.split(",");

    return [rangeFromString(aSection!), rangeFromString(bSection!)] as const;
  });

  return sectionPairs.filter(([a, b]) => intersection(a, b).size > 0).length;
}

function rangeFromString(rangeString: string) {
  const [start, end] = rangeString.split("-").map(Number);
  if (start === undefined || end === undefined || isNaN(start) || isNaN(end)) {
    throw new Error(`Invalid range string: ${rangeString}`);
  }

  return new Set([...Array(end - start + 1)].map((_, i) => i + start));
}
