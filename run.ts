import { readInput } from "lib/read-input.ts";
import { bold } from "std/fmt/colors.ts";

const [inputFileName, part] = Deno.args;

if (!inputFileName) {
  throw new Error("Missing input file name");
}

const [input, module] = await Promise.all([
  readInput(`${inputFileName}.txt`),
  import(`./src/${inputFileName}.ts`),
]);

console.log(
  `Running ${bold(inputFileName)}${part ? ` with part ${bold(part)}` : ""}...`,
);

const output = await module.solve(input, part);

console.log(bold("Got output:"));
console.log(output);
