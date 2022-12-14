export function solvePart1(input: string) {
  return parseElveTotalCalories(input)[0];
}

export function solvePart2(input: string) {
  return parseElveTotalCalories(input).slice(0, 3).reduce((a, b) => a + b, 0);
}

function parseElveTotalCalories(input: string) {
  const elves = input.trim().split("\n\n").map((elf) =>
    elf.split("\n").map(Number)
  );

  return elves.map((calories) => calories.reduce((a, b) => a + b, 0)).sort((
    a,
    b,
  ) => b - a);
}
