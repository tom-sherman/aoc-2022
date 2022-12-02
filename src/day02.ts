export function solvePart1(input: string) {
  function parseMyMove(input: string): Move {
    const move = ({
      "X": "rock",
      "Y": "paper",
      "Z": "scissors",
    } as const)[input];

    if (!move) {
      throw new Error(`Invalid input: ${input}`);
    }

    return move;
  }

  const lines = input.trim().split("\n");

  const outcomes = lines.map((line) => {
    const [oponentMoveString, myMoveString] = line.split(" ");
    const oponentMove = parseOponentMove(oponentMoveString!);
    const myMove = parseMyMove(myMoveString!);

    const outcomeMap = {
      rock: {
        paper: "loss",
        scissors: "win",
        rock: "draw",
      },
      paper: {
        rock: "win",
        scissors: "loss",
        paper: "draw",
      },
      scissors: {
        rock: "loss",
        paper: "win",
        scissors: "draw",
      },
    } as const;

    const outcome = outcomeMap[myMove][oponentMove];

    return outcomeScores[outcome] + moveScores[myMove];
  });

  return outcomes.reduce((a, b) => a + b, 0);
}

export function solvePart2(input: string) {
  function parseDesiredOutcome(input: string): Outcome {
    const outcome = ({
      "X": "loss",
      "Y": "draw",
      "Z": "win",
    } as const)[input];

    if (!outcome) {
      throw new Error(`Invalid input: ${input}`);
    }

    return outcome;
  }

  const lines = input.trim().split("\n");

  const outcomes = lines.map((line) => {
    const [oponentMoveString, desiredOutcomeString] = line.split(" ");
    const oponentMove = parseOponentMove(oponentMoveString!);
    const desiredOutcome = parseDesiredOutcome(desiredOutcomeString!);

    const myMoveMap = {
      rock: {
        loss: "scissors",
        draw: "rock",
        win: "paper",
      },
      paper: {
        loss: "rock",
        draw: "paper",
        win: "scissors",
      },
      scissors: {
        loss: "paper",
        draw: "scissors",
        win: "rock",
      },
    } as const;

    const myMove = myMoveMap[oponentMove][desiredOutcome];

    console.log({
      oponentMove,
      desiredOutcome,
      myMove,
    });

    return moveScores[myMove] + outcomeScores[desiredOutcome];
  });

  return outcomes.reduce((a, b) => a + b, 0);
}

type Move = "rock" | "paper" | "scissors";
type Outcome = "win" | "loss" | "draw";

const moveScores = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

const outcomeScores = {
  loss: 0,
  draw: 3,
  win: 6,
};

function parseOponentMove(input: string): Move {
  const move = ({
    "A": "rock",
    "B": "paper",
    "C": "scissors",
  } as const)[input];

  if (!move) {
    throw new Error(`Invalid input: ${input}`);
  }

  return move;
}
