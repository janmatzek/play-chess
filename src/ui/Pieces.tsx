import BlackKing from "../assets/pieces/Chess_kdt45.svg";
import BlackQueen from "../assets/pieces/Chess_qdt45.svg";
import BlackRook from "../assets/pieces/Chess_rdt45.svg";
import BlackBishop from "../assets/pieces/Chess_bdt45.svg";
import BlackKnight from "../assets/pieces/Chess_ndt45.svg";
import BlackPawn from "../assets/pieces/Chess_pdt45.svg";
import WhiteKing from "../assets/pieces/Chess_klt45.svg";
import WhiteQueen from "../assets/pieces/Chess_qlt45.svg";
import WhiteRook from "../assets/pieces/Chess_rlt45.svg";
import WhiteBishop from "../assets/pieces/Chess_blt45.svg";
import WhiteKnight from "../assets/pieces/Chess_nlt45.svg";
import WhitePawn from "../assets/pieces/Chess_plt45.svg";

import type { PieceType, Color, Piece } from "../types";

// TODO: chec the type, this looks fishy
export const PIECE_MAP: Record<Color, Record<PieceType, string>> = {
  black: {
    king: BlackKing,
    queen: BlackQueen,
    rook: BlackRook,
    bishop: BlackBishop,
    knight: BlackKnight,
    pawn: BlackPawn,
  },
  white: {
    king: WhiteKing,
    queen: WhiteQueen,
    rook: WhiteRook,
    bishop: WhiteBishop,
    knight: WhiteKnight,
    pawn: WhitePawn,
  },
} as const;

export function PieceComponent({
  piece,
  isSelected,
}: {
  piece: Piece;
  isSelected: boolean;
}) {
  const pathToAsset = PIECE_MAP[piece.color][piece.type];
  const altText = `${piece.color} ${piece.type}`;
  const pieceCss = `w-full h-full ${isSelected && "mb-3 drop-shadow-xl/50"}`;

  return <img src={pathToAsset} alt={altText} className={pieceCss} />;
}
