import * as setUtil from "lib/set-util.ts";

export function solvePart1(input: string) {
  const rucksacks = input.split("\n").map((line) => parseRucksack(line));

  const sharedItems = rucksacks.map(([a, b]) =>
    setUtil.head(setUtil.intersection(a, b))!
  );

  return sharedItems.reduce((a, b) => a + getItemPriority(b), 0);
}

export function solvePart2(input: string) {
  const rucksackItems = input.split("\n").map((line) => {
    const rucksack = parseRucksack(line);

    return setUtil.union(...rucksack);
  });

  const groupsOf3Rucksacks = chunkArray(rucksackItems, 3);
  const sharedItems = groupsOf3Rucksacks.flatMap((items) =>
    setUtil.head(setUtil.intersection(...items))!
  );

  return sharedItems.reduce((a, b) => a + getItemPriority(b), 0);
}

function parseRucksack(input: string) {
  const items = [...input];
  const middleIndex = Math.ceil(items.length / 2);

  const firstHalf = items.splice(0, middleIndex);
  const secondHalf = items.splice(-middleIndex);

  return [
    new Set(firstHalf),
    new Set(secondHalf),
  ] as const;
}

function getItemPriority(item: string) {
  const priorities = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  return priorities.indexOf(item) + 1;
}

function chunkArray<T>(array: T[], chunkSize: number) {
  const chunks = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }

  return chunks;
}
