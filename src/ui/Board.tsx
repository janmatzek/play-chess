import type { Square, Board } from "../types";
import { SquareComponent } from "./Square";
import React, { useMemo } from "react";
import { getLegalMoves } from "../game/getLegalMoves";

type BoardProps = {
  board: Board;
  selectedSquare: Square | null;
  setSelectedSquare: React.Dispatch<React.SetStateAction<Square | null>>;
};

export function BoardComponent(props: BoardProps) {
  const legalMoves = useMemo(() => {
    return getLegalMoves(props.board, props.selectedSquare);
  }, [props.selectedSquare]);
  return (
    <>
      <div className="grid grid-cols-8 w-fit">
        {[...props.board].reverse().map((row, rowIndex) =>
          row.map((square, colIndex) => {
            const squareId = `${square.position.row}-${square.position.col}`;
            return (
              <SquareComponent
                square={square}
                isSelected={
                  props.selectedSquare?.position.row === square.position.row &&
                  props.selectedSquare?.position.col === square.position.col
                }
                isLegal={legalMoves.includes(squareId)}
                setSelectedSquare={props.setSelectedSquare}
                key={`${rowIndex}-${colIndex}`}
              ></SquareComponent>
            );
          }),
        )}
      </div>
    </>
  );
}
