import { BoardComponent } from "./ui/Board";
import { initializeBoard, randomizedBoard } from "./game/initializeBoard";
import { useState } from "react";
import type { Square } from "./types";

function App() {
  const [board, setBoard] = useState(randomizedBoard());
  const [selectedSqaure, setSelectedSquare] = useState<Square | null>(null);
  return (
    <>
      <div className="w-screen h-screen bg-gray-800 flex justify-center items-center">
        <div>
          <BoardComponent
            board={board}
            selectedSquare={selectedSqaure}
            setSelectedSquare={setSelectedSquare}
          ></BoardComponent>
        </div>
      </div>
    </>
  );
}

export default App;
