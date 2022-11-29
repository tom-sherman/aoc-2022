import { readInput } from "lib/read-input.ts";

const [inputFileName, part] = Deno.args;

if (!inputFileName) {
  throw new Error("Missing input file name");
}

const [input, module] = await Promise.all([
  readInput(`${inputFileName}.txt`),
  import(`./src/${inputFileName}.ts`),
]);

const output = await module.solve(input, part);

console.log("Got output:");
console.log(output);
