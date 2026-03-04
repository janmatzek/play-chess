import type { Board } from "../types";
export type HistoryControlProps = {
  boardHistory: Board[];
  boardIndex: number;
  setBoardIndex: React.Dispatch<React.SetStateAction<number>>;
};

export function HistoryControl(props: HistoryControlProps) {
  function goToNextBoard(direction: -1 | 1) {
    const newBoardIndex = props.boardIndex + direction;
    if (newBoardIndex <= props.boardHistory.length - 1 && newBoardIndex >= 0) {
      props.setBoardIndex(newBoardIndex);
    }
  }

  return (
    <div className="inline-flex">
      <button
        className="hover:bg-gray-400 text-gray-300 font-bold py-2 px-4 rounded-l"
        onClick={() => goToNextBoard(-1)}
      >
        ◀ Prev
      </button>
      <button
        className="hover:bg-gray-400 text-gray-300 font-bold py-2 px-4 rounded-r"
        onClick={() => goToNextBoard(1)}
      >
        Next ▶
      </button>
    </div>
  );
}
