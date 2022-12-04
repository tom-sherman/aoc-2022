import { intersection, isSuperSet } from "lib/set-util.ts";

export function solvePart1(input: string) {
  const sectionPairs = parseInput(input);

  return sectionPairs.filter(([a, b]) => isSuperSet(a, b) || isSuperSet(b, a))
    .length;
}

export function solvePart2(input: string) {
  const sectionPairs = parseInput(input);

  return sectionPairs.filter(([a, b]) => intersection(a, b).size > 0).length;
}

const lineRegex = /(?<aStart>\d+)-(?<aEnd>\d+),(?<bStart>\d+)-(?<bEnd>\d+)/;

function parseInput(input: string) {
  return input.trim().split("\n").map((line) => {
    const matches = line.match(lineRegex);
    if (matches === null) {
      throw new Error(`Invalid line: ${line}`);
    }

    const { aStart, aEnd, bStart, bEnd } = matches.groups!;

    return [
      setRange(parseInt(aStart!), parseInt(aEnd!)),
      setRange(parseInt(bStart!), parseInt(bEnd!)),
    ] as const;
  });
}

function setRange(start: number, end: number) {
  return new Set([...Array(end - start + 1)].map((_, i) => i + start));
}
