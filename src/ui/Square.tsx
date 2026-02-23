import type { Square } from "../types";
import { PieceComponent } from "./Pieces";

export type SquareProps = {
  square: Square;
  isSelected: boolean;
  isLegal: boolean;
  onClickAction: (squareProps: SquareProps) => void;
};

export function SquareComponent(props: SquareProps) {
  const backgroundColor =
    props.square.color === "black" ? "bg-gray-600" : "bg-gray-300";

  const squareSize = "w-16 h-16";
  const contentAlignment =
    "flex items-center justify-center text-3xl select-none";

  const legalHighlight = props.isLegal
    ? "shadow-[inset_0_0_10px_rgba(0,0,0,0.9)]"
    : "";

  const squareCss = `${squareSize} ${legalHighlight} ${backgroundColor} ${contentAlignment} `;

  return (
    <>
      {/* TODO: responsive square size */}
      <div className={squareCss} onClick={() => props.onClickAction(props)}>
        {props.isLegal && (
          <div className="absolute w-2 h-2 bg-gray-400 rounded-full opacity-60"></div>
        )}
        {props.square.piece && (
          <PieceComponent
            piece={props.square.piece}
            isSelected={props.isSelected}
          ></PieceComponent>
        )}
      </div>
    </>
  );
}
