import { columns, genArray, uncons } from "lib/iter-util.ts";

export function solvePart1(input: string): number {
  const treeMap = parseTreeMap(input);
  const visibleTrees = new Set<Tree>();

  for (const row of treeMap) {
    addMany(visibleTrees, getVisibleTrees(genArray(row)));

    addMany(visibleTrees, getVisibleTrees(genArray(row.reverse())));
  }

  for (const column of columns(treeMap)) {
    addMany(visibleTrees, getVisibleTrees(genArray(column)));

    addMany(visibleTrees, getVisibleTrees(genArray(column.reverse())));
  }

  return [...visibleTrees].length;
}

function* getVisibleTrees(trees: Generator<Tree>): Iterable<Tree> {
  const [firstTree, rest] = uncons(trees)!;

  yield firstTree;

  let maxHeight = firstTree!.height;
  for (const tree of rest) {
    if (tree.height > maxHeight) {
      yield tree;
      maxHeight = tree.height;
    }
  }
}

type Tree = {
  height: number;
};

function parseTreeMap(input: string): Tree[][] {
  const lines = input.trim().split("\n");

  return lines.map((line) =>
    [...line].map((c) => ({ height: parseInt(c, 10) }))
  );
}

function addMany<T>(set: Set<T>, items: Iterable<T>): void {
  for (const item of items) {
    set.add(item);
  }
}
