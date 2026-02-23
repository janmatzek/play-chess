export type Color = "black" | "white";

export type PieceType =
  | "pawn"
  | "rook"
  | "knight"
  | "bishop"
  | "queen"
  | "king";

export type Position = {
  row: number;
  col: number;
};

export type Piece = {
  type: PieceType;
  color: Color;
};

export type Square = {
  color: Color;
  piece: Piece | null;
  position: Position;
};

export type Board = Square[][];
