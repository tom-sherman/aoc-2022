import { AocApi } from "lib/api.ts";
import { bold, italic } from "std/fmt/colors.ts";
import { config } from "dotenv/mod.ts";
import {
  choice,
  Command,
  number as numberArgument,
  string as stringArgument,
} from "clay/mod.ts";

const { AOC_TOKEN } = config();

if (!AOC_TOKEN) {
  console.error("AOC_TOKEN is not set");
  Deno.exit(1);
}

const cmd = new Command("Run Advent of Code solutions")
  .optional(stringArgument, "year", { flags: ["year"] })
  .required(numberArgument, "day")
  .optional(choice<("1" | "2")[]>("PART", ["1", "2"]), "part")
  .flag("auto-submit", { aliases: ["submit"] });

const args = cmd.run();

const api = new AocApi(
  `https://adventofcode.com/${args.year ?? "2022"}/`,
  AOC_TOKEN,
);

const moduleName = `day${String(args.day).padStart(2, "0")}.ts`;

const [input, module] = await Promise.all([
  api.getInput(args.day),
  import(`./src/${moduleName}`),
]);

const part = args.part ?? "1";

console.log(
  `Running ${bold(moduleName)} with part ${bold(String(part))}...`,
);

const output = await module.solve(input, part);

console.log(bold("Got output:"));
console.log(output);

const shouldCheck = args["auto-submit"] ||
  confirm(bold(italic("Do you want to check the solution?")));

if (shouldCheck) {
  const solutionResponse = await api.sendSolution(
    args.day,
    part,
    output,
  );

  console.log(bold("Got solution response:"));
  console.log(solutionResponse);
}
