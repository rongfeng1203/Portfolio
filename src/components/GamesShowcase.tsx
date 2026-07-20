"use client";

import { useState } from "react";
import UnityWebGLEmbed from "@/components/UnityWebGLEmbed";

type Stone = "." | "X" | "O";
type Player = Exclude<Stone, ".">;
type Board = Stone[][];
type Captures = Record<Player, number>;

type Snapshot = {
  board: Board;
  currentPlayer: Player;
  captures: Captures;
  passCount: number;
  lastMove: [number, number] | null;
};

const BOARD_SIZE = 19;
const duckBreakerUrl = "/duck-breaker/index.html";

const demoVideos = [
  {
    title: "Pentamania: Alchemy Madness",
    id: "Yx6oVf_GKwM",
    meta: "game demo / alchemy systems",
  },
  {
    title: "Drillage",
    id: "lnslRH507K4",
    meta: "game demo / drilling prototype",
  },
];

function emptyBoard(): Board {
  return Array.from({ length: BOARD_SIZE }, () => Array<Stone>(BOARD_SIZE).fill("."));
}

function cloneBoard(board: Board): Board {
  return board.map((row) => [...row]);
}

function initialBoard(): Board {
  const board = emptyBoard();
  board[9][9] = "X";
  return board;
}

function neighbors(row: number, column: number) {
  return [
    [row - 1, column],
    [row + 1, column],
    [row, column - 1],
    [row, column + 1],
  ].filter(([nextRow, nextColumn]) =>
    nextRow >= 0 && nextRow < BOARD_SIZE && nextColumn >= 0 && nextColumn < BOARD_SIZE
  ) as Array<[number, number]>;
}

function getGroup(board: Board, row: number, column: number) {
  const color = board[row][column];
  const group = new Set<string>([`${row},${column}`]);
  const stack: Array<[number, number]> = [[row, column]];

  while (stack.length) {
    const [currentRow, currentColumn] = stack.pop()!;
    for (const [nextRow, nextColumn] of neighbors(currentRow, currentColumn)) {
      const key = `${nextRow},${nextColumn}`;
      if (board[nextRow][nextColumn] === color && !group.has(key)) {
        group.add(key);
        stack.push([nextRow, nextColumn]);
      }
    }
  }

  return [...group].map((point) => point.split(",").map(Number) as [number, number]);
}

function hasLiberty(board: Board, group: Array<[number, number]>) {
  return group.some(([row, column]) =>
    neighbors(row, column).some(([nextRow, nextColumn]) => board[nextRow][nextColumn] === ".")
  );
}

function removeCapturedGroups(board: Board, opponent: Player) {
  const checked = new Set<string>();
  let captured = 0;

  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let column = 0; column < BOARD_SIZE; column += 1) {
      const key = `${row},${column}`;
      if (board[row][column] !== opponent || checked.has(key)) continue;

      const group = getGroup(board, row, column);
      group.forEach(([groupRow, groupColumn]) => checked.add(`${groupRow},${groupColumn}`));

      if (!hasLiberty(board, group)) {
        captured += group.length;
        group.forEach(([groupRow, groupColumn]) => {
          board[groupRow][groupColumn] = ".";
        });
      }
    }
  }

  return captured;
}

function DuckBreakerEmbed() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <article className="game-module" aria-labelledby="duck-breaker-title">
      <header className="game-module-header">
        <div>
          <span>p5.js / playable browser build</span>
          <h2 id="duck-breaker-title">Duck Breaker</h2>
        </div>
        <a href={duckBreakerUrl} target="_blank" rel="noreferrer">
          open build
        </a>
      </header>

      <div className="game-web-stage">
        {isLoaded ? (
          <iframe
            src={duckBreakerUrl}
            title="Duck Breaker browser game"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        ) : (
          <button type="button" className="game-web-loader duck-loader" onClick={() => setIsLoaded(true)}>
            <span>load playable build</span>
            <strong>Catch the ring. Break the grid.</strong>
            <em>arrow keys / space to start / P to pause</em>
          </button>
        )}
      </div>

      <footer className="game-module-meta">
        <span>course / ICS3U</span>
        <span>engine / p5.js</span>
        <span>input / keyboard</span>
      </footer>
    </article>
  );
}

function TextGoVisualization() {
  const [board, setBoard] = useState<Board>(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState<Player>("O");
  const [captures, setCaptures] = useState<Captures>({ X: 0, O: 0 });
  const [history, setHistory] = useState<Snapshot[]>([]);
  const [passCount, setPassCount] = useState(0);
  const [lastMove, setLastMove] = useState<[number, number] | null>([9, 9]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [log, setLog] = useState([
    "WELCOME TO TEXT-GO",
    "RANDOM START > X placed at row 9, column 9",
    "TURN > Player O (White)",
  ]);

  const addLog = (entry: string) => {
    setLog((current) => [...current.slice(-4), entry]);
  };

  const playMove = (row: number, column: number) => {
    if (isGameOver) {
      addLog("GAME OVER > reset the board to continue");
      return;
    }

    if (board[row][column] !== ".") {
      addLog(`ERROR > (${row}, ${column}) is occupied`);
      return;
    }

    setHistory((current) => [
      ...current,
      {
        board: cloneBoard(board),
        currentPlayer,
        captures: { ...captures },
        passCount,
        lastMove,
      },
    ]);

    const nextBoard = cloneBoard(board);
    nextBoard[row][column] = currentPlayer;
    const opponent: Player = currentPlayer === "X" ? "O" : "X";
    const captured = removeCapturedGroups(nextBoard, opponent);

    setBoard(nextBoard);
    setCaptures((current) => ({ ...current, [currentPlayer]: current[currentPlayer] + captured }));
    setCurrentPlayer(opponent);
    setPassCount(0);
    setLastMove([row, column]);
    addLog(
      `MOVE > ${currentPlayer} at (${row}, ${column})${captured ? ` / captured ${captured}` : ""}`
    );
  };

  const undoMove = () => {
    const snapshot = history[history.length - 1];
    if (!snapshot) {
      addLog("UNDO > nothing to undo");
      return;
    }

    setBoard(cloneBoard(snapshot.board));
    setCurrentPlayer(snapshot.currentPlayer);
    setCaptures({ ...snapshot.captures });
    setPassCount(snapshot.passCount);
    setLastMove(snapshot.lastMove);
    setIsGameOver(false);
    setHistory((current) => current.slice(0, -1));
    addLog(`UNDO > restored Player ${snapshot.currentPlayer}'s turn`);
  };

  const passTurn = () => {
    if (isGameOver) return;

    setHistory((current) => [
      ...current,
      { board: cloneBoard(board), currentPlayer, captures: { ...captures }, passCount, lastMove },
    ]);

    if (passCount === 1) {
      setPassCount(2);
      setIsGameOver(true);
      addLog(`GAME OVER > X ${captures.X} / O ${captures.O}`);
      return;
    }

    const opponent: Player = currentPlayer === "X" ? "O" : "X";
    setCurrentPlayer(opponent);
    setPassCount(1);
    addLog(`PASS > Player ${currentPlayer} / Player ${opponent}'s turn`);
  };

  const resetGame = () => {
    const row = Math.floor(Math.random() * BOARD_SIZE);
    const column = Math.floor(Math.random() * BOARD_SIZE);
    const nextBoard = emptyBoard();
    nextBoard[row][column] = "X";

    setBoard(nextBoard);
    setCurrentPlayer("O");
    setCaptures({ X: 0, O: 0 });
    setHistory([]);
    setPassCount(0);
    setLastMove([row, column]);
    setIsGameOver(false);
    setLog([
      "WELCOME TO TEXT-GO",
      `RANDOM START > X placed at row ${row}, column ${column}`,
      "TURN > Player O (White)",
    ]);
  };

  return (
    <article className="game-module text-go-module" aria-labelledby="text-go-title">
      <header className="game-module-header">
        <div>
          <span>python logic / interactive visualization</span>
          <h2 id="text-go-title">Text-Go</h2>
        </div>
        <p>19 × 19</p>
      </header>

      <div className="text-go-layout">
        <div className="go-board-shell">
          <div className="go-board" role="grid" aria-label="Interactive Text-Go board">
            {board.map((row, rowIndex) =>
              row.map((stone, columnIndex) => {
                const isLastMove = lastMove?.[0] === rowIndex && lastMove?.[1] === columnIndex;
                return (
                  <button
                    type="button"
                    role="gridcell"
                    key={`${rowIndex}-${columnIndex}`}
                    className={`go-point${stone !== "." ? ` has-stone stone-${stone}` : ""}${isLastMove ? " is-last" : ""}`}
                    aria-label={`Row ${rowIndex}, column ${columnIndex}${stone === "." ? ", empty" : `, ${stone === "X" ? "black" : "white"} stone`}`}
                    onClick={() => playMove(rowIndex, columnIndex)}
                  >
                    {stone !== "." ? <span aria-hidden="true" /> : null}
                  </button>
                );
              })
            )}
          </div>
        </div>

        <aside className="text-go-terminal" aria-label="Text-Go game status">
          <div className="go-scoreboard">
            <p>
              <span className="score-stone black" aria-hidden="true" />
              Black / X <strong>{captures.X}</strong>
            </p>
            <p>
              <span className="score-stone white" aria-hidden="true" />
              White / O <strong>{captures.O}</strong>
            </p>
          </div>

          <div className="go-turn">
            <span>{isGameOver ? "game over" : "current turn"}</span>
            <strong>{isGameOver ? "two passes" : currentPlayer === "X" ? "X / Black" : "O / White"}</strong>
          </div>

          <div className="go-log" aria-live="polite">
            {log.map((entry, index) => <p key={`${entry}-${index}`}>&gt; {entry}</p>)}
          </div>

          <div className="go-controls">
            <button type="button" onClick={undoMove}>undo</button>
            <button type="button" onClick={passTurn} disabled={isGameOver}>pass</button>
            <button type="button" onClick={resetGame}>new random board</button>
          </div>
        </aside>
      </div>

      <footer className="game-module-meta">
        <span>course / ICS3U</span>
        <span>source / python</span>
        <span>rules / capture + undo + pass</span>
      </footer>
    </article>
  );
}

function GameDemoReels() {
  return (
    <section className="game-demo-section" aria-labelledby="game-demo-title">
      <header className="game-module-header">
        <div>
          <span>video archive / two project demos</span>
          <h2 id="game-demo-title">Demo Reels</h2>
        </div>
        <p>02 videos</p>
      </header>

      <div className="game-demo-grid">
        {demoVideos.map((video, index) => (
          <article key={video.id} className="game-demo-card">
            <div className="game-video-frame">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0`}
                title={`${video.title} game demo`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div className="game-demo-caption">
              <span>0{index + 1} / {video.meta}</span>
              <h3>{video.title}</h3>
              <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer">
                watch on youtube ↗
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function GamesShowcase() {
  return (
    <div className="games-showcase">
      <UnityWebGLEmbed />
      <DuckBreakerEmbed />
      <TextGoVisualization />
      <GameDemoReels />
    </div>
  );
}
