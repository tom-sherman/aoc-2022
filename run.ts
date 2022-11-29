import { readInput } from "lib/read-input.ts";

const [inputFileName, part] = Deno.args;

if (!inputFileName) {
  throw new Error("Missing input file name");
}

const [input, module] = await Promise.all([
  readInput(`${inputFileName}.txt`),
  import(`./src/${inputFileName}.ts`),
]);

await module.solve(input, part);
