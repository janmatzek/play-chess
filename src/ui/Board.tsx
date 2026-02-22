import type { Square, Board } from "../types";
import { SquareComponent } from "./Square";
import React from "react";

type BoardProps = {
  board: Board;
  selectedSquare: Square | null;
  setSelectedSquare: React.Dispatch<React.SetStateAction<Square | null>>;
};

export function BoardComponent(props: BoardProps) {
  return (
    <>
      <div className="grid grid-cols-8 w-fit">
        {[...props.board]
          .reverse()
          .map((row, rowIndex) =>
            row.map((square, colIndex) => (
              <SquareComponent
                square={square}
                isSelected={
                  props.selectedSquare?.position.rowNum ===
                    square.position.rowNum &&
                  props.selectedSquare?.position.colNum ===
                    square.position.colNum
                }
                isLegal={false}
                setSelectedSquare={props.setSelectedSquare}
                key={`${rowIndex}-${colIndex}`}
              ></SquareComponent>
            )),
          )}
      </div>
    </>
  );
}
