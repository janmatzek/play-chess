import type { Piece, Board, Square } from "../types";
import { PieceComponent } from "./Pieces";
import React from "react";

type PieceState = {
  selectedPiece: Piece | null;
  setSelectedPiece: React.Dispatch<React.SetStateAction<Piece | null>>;
};

type BoardProps = PieceState & {
  board: Board;
};

type SquareProps = {
  square: Square;
  isSelected?: boolean;
  onClick: () => void;
};

function handleSquareClick(square: Square) {
  if (square.piece) {
    console.log(`${square.piece.color} ${square.piece.type} selected`);
  }
}

export function SquareComponent({ square, isSelected, onClick }: SquareProps) {
  const backgroundColor =
    square.color === "black" ? "bg-gray-600" : "bg-gray-300";

  return (
    <>
      {/* TODO: responsive square size */}
      <div
        className={`w-16 h-16 ${backgroundColor} flex items-center justify-center text-3xl select-none`}
        onClick={() => handleSquareClick(square)}
      >
        {square.piece && <PieceComponent piece={square.piece}></PieceComponent>}
      </div>
    </>
  );
}

export function BoardComponent({
  board,
  selectedPiece,
  setSelectedPiece,
}: BoardProps) {
  return (
    <>
      <div className="grid grid-cols-8 w-fit">
        {[...board]
          .reverse()
          .map((row, rowIndex) =>
            row.map((square, colIndex) => (
              <SquareComponent
                square={square}
                isSelected={false}
                onClick={() => {}}
                key={`${rowIndex}-${colIndex}`}
              ></SquareComponent>
            )),
          )}
      </div>
    </>
  );
}
