import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { solvePart1 } from "./day05.ts";

const input = `    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

Deno.test("part1", () => {
  assertEquals(solvePart1(input), "CMZ");
});
