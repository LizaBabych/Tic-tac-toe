import React, { useState } from "react";
import "./App.css";

type EndGameResult = "" | "lose" | "win" | "draw";
type cellState = "" | "close" | "cross";

interface ICell {
  id: string;
  state: cellState;
}

const App = () => {
  const directions = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [1, 4, 7],
    [3, 4, 5],
  ];
  const initialState: Array<ICell> = [
    {
      id: "1",
      state: "",
    },
    {
      id: "2",
      state: "",
    },
    {
      id: "3",
      state: "",
    },
    {
      id: "4",
      state: "",
    },
    {
      id: "5",
      state: "",
    },
    {
      id: "6",
      state: "",
    },
    {
      id: "7",
      state: "",
    },
    {
      id: "8",
      state: "",
    },
    {
      id: "9",
      state: "",
    },
  ];
  const [cellsState, setCellsState] = useState<Array<ICell>>(initialState);
  const [isGameEnd, setGameEnd] = useState<EndGameResult>("");

  const restartGame = () => {
    setGameEnd("");
    setCellsState(initialState);
  };

  const checkWinDirection = (
    firstInd: number,
    secInd: number,
    thirdInd: number,
    cellState: cellState
  ): boolean => {
    return (
      cellsState[firstInd].state === cellState &&
      cellsState[secInd].state === cellState &&
      cellsState[thirdInd].state === cellState
    );
  };

  const checkWin = (cellState: cellState): string | boolean => {
    const isDraw = cellsState.every((item) => item.state);
    if (isDraw) return "draw";
    return directions
      .map((dir) => {
        return checkWinDirection(dir[0], dir[1], dir[2], cellState);
      })
      .some((item) => item);
  };

  const botMove = () => {
    let cellsCopy = [...cellsState];
    while (true) {
      const cell = Math.floor(Math.random() * 9);
      if (cellsCopy[cell].state === "") {
        cellsCopy[cell].state = "cross";
        break;
      }
    }
    setCellsState(cellsCopy);
    const winn = checkWin("cross");
    if (winn === true) {
      setGameEnd("lose");
    }
  };

  const userMove = (cell: ICell) => {
    let cellsCopy = [...cellsState];
    cellsCopy = cellsCopy.map((item) => {
      if (item.id === cell.id && item.state === "") {
        item.state = "close";
      }
      return item;
    });
    setCellsState(cellsCopy);
    const winn = checkWin(cell.state);
    if (winn === true) {
      setGameEnd("win");
    } else if (winn === "draw") {
      setGameEnd("draw");
    } else {
      botMove();
    }
  };

  return (
    <div className="wrapper">
      <h1>Tic Tac Toe</h1>
      <div className="cardboard-wrapper">
        <header className="cardboard-header">
          <button className="restart-btn" onClick={restartGame}>
            Restart
          </button>
        </header>
        <div className="cardboard">
          {cellsState.map((cell: ICell) => (
            <div
              id={cell.id}
              key={cell.id}
              className="card"
              onClick={() => {
                if (!cell.state) {
                  userMove(cell);
                }
              }}
            >
              {cell.state && (
                <div className={cell.state === "cross" ? "cross" : "close"} />
              )}
            </div>
          ))}
          {isGameEnd && (
            <div className="end-game">
              <h2>You {isGameEnd}!!!</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
