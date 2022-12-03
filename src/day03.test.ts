import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { solvePart1, solvePart2 } from "./day03.ts";

const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

Deno.test("part1", () => {
  assertEquals(solvePart1(input), 157);
});

Deno.test("part2", () => {
  assertEquals(solvePart2(input), 70);
});
