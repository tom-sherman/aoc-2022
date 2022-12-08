import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { solvePart1 } from "./day08.ts";

const input = `30373
25512
65332
33549
35390`;

Deno.test("part1", () => {
  assertEquals(solvePart1(input), 21);
});

// Deno.test("part2", () => {
//   assertEquals(solvePart2(input), 8);
// });
