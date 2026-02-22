import type { Square } from "../types";
import { PieceComponent } from "./Pieces";

type SquareProps = {
  square: Square;
  isSelected: boolean;
  isLegal: boolean;
  setSelectedSquare: React.Dispatch<React.SetStateAction<Square | null>>;
};

function handleSquareClick(squareProps: SquareProps) {
  if (squareProps.isSelected) {
    squareProps.setSelectedSquare(null);
  } else {
    squareProps.setSelectedSquare(squareProps.square);
  }
}

export function SquareComponent(props: SquareProps) {
  const backgroundColor =
    props.square.color === "black" ? "bg-gray-600" : "bg-gray-300";

  const squareSize = "w-16 h-16";
  const contentAlignment =
    "flex items-center justify-center text-3xl select-none";

  const squareCss = `${squareSize} ${backgroundColor} ${contentAlignment}`;

  return (
    <>
      {/* TODO: responsive square size */}
      <div className={squareCss} onClick={() => handleSquareClick(props)}>
        {props.isLegal && "☩"}
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
