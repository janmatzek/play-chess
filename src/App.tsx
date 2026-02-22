import { BoardComponent } from "./ui/Board";
import { initBoard as initializeBoard } from "./game/game";
import { useState } from "react";
import type { Piece } from "./types";

function App() {
  const [board, setBoard] = useState(initializeBoard());
  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null);
  return (
    <>
      <div className="w-screen h-screen bg-gray-800 flex justify-center items-center">
        <div>
          <BoardComponent
            board={board}
            selectedPiece={selectedPiece}
            setSelectedPiece={setSelectedPiece}
          ></BoardComponent>
        </div>
      </div>
    </>
  );
}

export default App;
