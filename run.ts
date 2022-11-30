import { AocApi } from "lib/api.ts";
import { bold } from "std/fmt/colors.ts";
import { config } from "dotenv/mod.ts";

const { AOC_TOKEN } = config();

if (!AOC_TOKEN) {
  console.error("AOC_TOKEN is not set");
  Deno.exit(1);
}

const [dayInput, partInput] = Deno.args[0]?.split(":") ?? [];

const day = parseInt(dayInput!);
const part = parseInt(partInput!);

if (isNaN(day)) {
  throw new Error("Missing day");
}

if (isNaN(part) || part !== 1 && part !== 2) {
  throw new Error(`Missing part (1 or 2) received ${partInput}`);
}

const api = new AocApi(
  "https://adventofcode.com/2020/",
  AOC_TOKEN,
);

const moduleName = `day${String(day).padStart(2, "0")}.ts`;

const [input, module] = await Promise.all([
  api.getInput(day),
  import(`./src/${moduleName}`),
]);

console.log(
  `Running ${bold(moduleName)} with part ${bold(String(part))}...`,
);

const output = await module.solve(input, part);

console.log(bold("Got output:"));
console.log(output);

const solutionResponse = await api.sendSolution(
  day,
  part,
  output,
);

console.log(bold("Got solution response:"));
console.log(solutionResponse);
