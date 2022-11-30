# 🎄🎅 Advent of Code 2022

In Deno!

## Running

Each solution is a module inside `src/` that exports a `solve` function of type `string => string | Promise<string>`.

You'll need a session token from [adventofcode.com](https://adventofcode.com/2022) to run the solutions. This is obtained from the `session` cookie after logging in.

To run a solution, pass the day and part numbers to the `solve` script in the format `day:part`:

```
deno task solve 1:1
```

> **Note:** If a puzzle doesn't have a second part, you can pass `1` for the part number.
