// Credit to https://github.com/caderek/aocrunner/blob/c014b8b48fbbc4b2b36fb1ee12272e1890eeacee/src/io/api.ts#L6
// most of the code is from there, I just ported it to Deno
import { DOMParser } from "deno_dom/deno-dom-wasm.ts";

type SolutionResponseStatus =
  | "solved"
  | "wrong"
  | "throttled"
  | "completed_or_locked"
  | "unknown";

export class AocApi {
  #token;
  #baseUrl;

  constructor(baseUrl: string, token: string) {
    this.#token = token;
    this.#baseUrl = baseUrl;
  }

  #getCache() {
    return caches.open(this.#baseUrl);
  }

  async getInput(day: number) {
    const url = new URL(`day/${day}/input`, this.#baseUrl);
    const cache = await this.#getCache();
    const cached = await cache.match(url);
    if (cached) {
      return cached.text();
    }
    const response = await fetch(url.toString(), {
      headers: {
        Cookie: `session=${this.#token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch input for day ${day}`);
    }

    await cache.put(url, response.clone());
    return response.text();
  }

  async sendSolution(day: number, part: "1" | "2", solution: string): Promise<
    {
      infoText: string;
      status: SolutionResponseStatus;
    }
  > {
    const url = new URL(`day/${day}/answer`, this.#baseUrl);

    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: `session=${this.#token}`,
      },
      body: `level=${part}&answer=${solution}`,
    });

    if (!response.ok) {
      throw new Error(
        `Failed to send solution for day ${day} part ${part}: ${response.status}`,
      );
    }

    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");

    if (!doc) {
      throw new Error("Failed to parse response");
    }

    const mainEl = doc.querySelector("main");

    if (!mainEl) {
      throw new Error("Failed to find main element");
    }

    let status: SolutionResponseStatus;

    const info = mainEl.textContent.replace(/\[.*\]/, "").trim();

    if (info.includes("That's the right answer")) {
      status = "solved";
    } else if (info.includes("That's not the right answer")) {
      status = "wrong";
    } else if (info.includes("You gave an answer too recently")) {
      status = "throttled";
    } else if (
      info.includes("You don't seem to be solving the right level")
    ) {
      status = "completed_or_locked";
    } else {
      status = "unknown";
    }

    return { status, infoText: info };
  }
}
