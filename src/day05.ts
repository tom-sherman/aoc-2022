export function solvePart1(input: string) {
  const stacks = parseStacks(input);
  const moves = parseMoves(input);

  for (const move of moves) {
    const sourceStack = stacks[move.from - 1]!;
    const targetStack = stacks[move.to - 1]!;
    const crates = sourceStack.splice(
      -move.amount,
      move.amount,
    );

    targetStack.push(...crates.reverse());
  }

  return stacks.map((stack) => stack.at(-1)!).join("");
}

export function solvePart2(input: string) {
  const stacks = parseStacks(input);
  const moves = parseMoves(input);

  for (const move of moves) {
    const sourceStack = stacks[move.from - 1]!;
    const targetStack = stacks[move.to - 1]!;
    const crates = sourceStack.splice(
      -move.amount,
      move.amount,
    );

    targetStack.push(...crates);
  }

  return stacks.map((stack) => stack.at(-1)!).join("");
}

function parseStacks(input: string) {
  const stackLines = input.split("\n\n")[0]!.split("\n");
  // The last stack line contains the stack numbers. We want the last number on this line
  const numberOfStacks = parseInt(
    stackLines.pop()!.trim().split(/\s+/).at(-1)!,
  );

  const stacks = Array.from(
    { length: numberOfStacks },
    () => [] as string[],
  );

  for (const line of stackLines) {
    const crates = Array.from(
      { length: numberOfStacks },
      (_, i) => line[i * 4 + 1],
    );

    for (const [index, crate] of crates.entries()) {
      if (!crate || crate === " ") continue;

      stacks[index]!.unshift(crate);
    }
  }

  return stacks;
}

const moveRegex = /move (?<amount>\d+) from (?<from>\d+) to (?<to>\d+)/;
function parseMoves(input: string) {
  const moveLines = input.split("\n\n")[1]!.trim().split("\n");
  return moveLines.map((line) => {
    const match = moveRegex.exec(line)!;

    return {
      from: parseInt(match.groups!.from!),
      to: parseInt(match.groups!.to!),
      amount: parseInt(match.groups!.amount!),
    };
  });
}
