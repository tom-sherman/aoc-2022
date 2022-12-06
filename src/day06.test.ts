import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { solvePart1 } from "./day06.ts";

Deno.test("part1", () => {
  ([
    ["mjqjpqmgbljsphdztnvjfqwrcgsmlb", 7],
    ["bvwbjplbgvbhsrlpgdmjqwftvncz", 5],
    ["nppdvjthqldpwncqszvftbrmjlhg", 6],
    ["nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 10],
    ["zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 11],
  ] as const).forEach(([buffer, expected]) => {
    assertEquals(solvePart1(buffer), expected);
  });
});
