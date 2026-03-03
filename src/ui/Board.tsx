import type { Square, Board, Color } from "../types";
import { SquareComponent } from "./Square";
import type { SquareProps } from "./Square";
import React, { useMemo } from "react";
import { getLegalMoves } from "../game/getLegalMoves";

type BoardProps = {
  playerColor: Color;
  boardHistory: Board[];
  setBoardHistory: React.Dispatch<React.SetStateAction<Board[]>>;
  boardIndex: number;
  setBoardIndex: React.Dispatch<React.SetStateAction<number>>;
  selectedSquare: Square | null;
  setSelectedSquare: React.Dispatch<React.SetStateAction<Square | null>>;
};

function RowLabels({ labels }: { labels: number[] }) {
  return (
    <div className="grid grid-cols-1 w-fig">
      {[...labels].reverse().map((label) => {
        return (
          <div
            className="w-8 h-16 flex justify-center items-center text-white"
            key={label}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
}

function ColumnLabels({ labels }: { labels: string[] }) {
  return (
    <div className="pl-8 grid grid-cols-10 w-fig">
      {labels.map((label) => {
        return (
          <div
            className="w-16 h-8 flex justify-center items-center text-white"
            key={label}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
}

// TODO: handle `check` game state
// TODO: board history could also be used to visualize previous turns. It could also include the LLM reasoning
// TODO: UI for setting player color
export function BoardComponent(boardProps: BoardProps) {
  let columnLabels = ["a", "b", "c", "d", "e", "f", "g", "h"];
  let rowLabels = [1, 2, 3, 4, 5, 6, 7, 8];

  let boardToRender = [
    ...boardProps.boardHistory[boardProps.boardIndex],
  ].reverse();
  if (boardProps.playerColor === "black") {
    columnLabels = [...columnLabels].reverse();
    rowLabels = [...rowLabels].reverse();
    boardToRender = boardProps.boardHistory[boardProps.boardIndex].map(
      (row) => {
        return [...row].reverse();
      },
    );
  }

  const legalMoves = useMemo(() => {
    return getLegalMoves(
      boardProps.boardHistory[boardProps.boardIndex],
      boardProps.selectedSquare,
    );
  }, [boardProps.selectedSquare]);

  function selectSquare(squareProps: SquareProps): void {
    if (squareProps.isSelected) {
      boardProps.setSelectedSquare(null);
    } else if (squareProps.square.piece?.color === boardProps.playerColor) {
      boardProps.setSelectedSquare(squareProps.square);
    }
  }

  function movePiece(squareProps: SquareProps) {
    if (!boardProps.selectedSquare) {
      throw new Error(
        "Attempting to move a piece without selected square is illegal",
      );
    }

    // Create a new object with the board array
    const newBoard = structuredClone(
      boardProps.boardHistory[boardProps.boardIndex],
    );

    const originPosition = boardProps.selectedSquare.position;
    const destinationPosition = squareProps.square.position;
    const piece = newBoard[originPosition.row][originPosition.col].piece;

    // Remove the piece from the origin square
    newBoard[originPosition.row][originPosition.col].piece = null;

    // Move piece to destination square
    // TODO: handle Pawn reaching the oposite end of the board
    newBoard[destinationPosition.row][destinationPosition.col].piece = piece;

    // Set state of the new board, unselect origin square
    boardProps.setBoardHistory([...boardProps.boardHistory, newBoard]);
    boardProps.setSelectedSquare(null);
    boardProps.setBoardIndex(boardProps.boardIndex + 1);
  }

  function getSquareOnClick(
    isLegal: boolean,
  ): (squareProps: SquareProps) => void {
    if (boardProps.boardHistory.length - 1 === boardProps.boardIndex) {
      return isLegal ? movePiece : selectSquare;
    }
    return () => boardProps.setBoardIndex(boardProps.boardHistory.length - 1);
  }

  return (
    <div>
      <div className="flex">
        <RowLabels labels={rowLabels}></RowLabels>
        <div className="grid grid-cols-8 w-fit">
          {boardToRender.map((row, rowIndex) =>
            row.map((square, colIndex) => {
              const squareId = `${square.position.row}-${square.position.col}`;
              const isLegal = legalMoves.includes(squareId);
              const onClickAction = getSquareOnClick(isLegal);
              return (
                <SquareComponent
                  square={square}
                  isSelected={
                    boardProps.selectedSquare?.position.row ===
                      square.position.row &&
                    boardProps.selectedSquare?.position.col ===
                      square.position.col
                  }
                  isLegal={isLegal}
                  onClickAction={onClickAction}
                  key={`${rowIndex}-${colIndex}`}
                ></SquareComponent>
              );
            }),
          )}
        </div>
      </div>
      <ColumnLabels labels={columnLabels}></ColumnLabels>
    </div>
  );
}
