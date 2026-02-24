import type { Square, Board } from "../types";
import { SquareComponent } from "./Square";
import type { SquareProps } from "./Square";
import React, { useMemo } from "react";
import { getLegalMoves } from "../game/getLegalMoves";

type BoardProps = {
  board: Board;
  setBoard: React.Dispatch<React.SetStateAction<Board>>;
  selectedSquare: Square | null;
  setSelectedSquare: React.Dispatch<React.SetStateAction<Square | null>>;
};

// TODO: handle `check` game state
// TODO: store previous board state -> for en passant and rolling back illegal move
// TODO: set player color - allow control over those pieces only
export function BoardComponent(boardProps: BoardProps) {
  const legalMoves = useMemo(() => {
    return getLegalMoves(boardProps.board, boardProps.selectedSquare);
  }, [boardProps.selectedSquare]);

  function selectSquare(squareProps: SquareProps) {
    if (squareProps.isSelected) {
      boardProps.setSelectedSquare(null);
    } else {
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
    const newBoard = structuredClone(boardProps.board);

    const originPosition = boardProps.selectedSquare.position;
    const destinationPosition = squareProps.square.position;
    const piece = newBoard[originPosition.row][originPosition.col].piece;

    // Remove the piece from the origin square
    newBoard[originPosition.row][originPosition.col].piece = null;

    // Move piece to destination square
    // TODO: handle Pawn reaching the oposite end of the board
    newBoard[destinationPosition.row][destinationPosition.col].piece = piece;

    // Set state of the new board, unselect origin square
    boardProps.setBoard(newBoard);
    boardProps.setSelectedSquare(null);
  }

  return (
    <>
      <div className="grid grid-cols-8 w-fit">
        {[...boardProps.board].reverse().map((row, rowIndex) =>
          row.map((square, colIndex) => {
            const squareId = `${square.position.row}-${square.position.col}`;
            const isLegal = legalMoves.includes(squareId);
            const onClickAction = isLegal ? movePiece : selectSquare;
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
    </>
  );
}
