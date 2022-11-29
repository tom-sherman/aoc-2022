import * as path from "std/path/mod.ts";

export function readInput(filename: string) {
  const filePath = path.resolve(
    new URL("", import.meta.url).pathname,
    // Go up next level twice because import.meta.url has a trailing /, it a directory in itself
    "../..",
    "inputs",
    filename,
  );

  return Deno.readTextFile(filePath);
}
