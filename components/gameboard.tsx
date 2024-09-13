// GameBoard.tsx
import React from "react";

interface GameBoardProps {
  guesses: string[];
  currentGuess: string;
  currentRow: number;
  getLetterStyle: (letter: string, index: number, row: number) => string;
  WORD_LENGTH: number;
}

const GameBoard: React.FC<GameBoardProps> = ({
  guesses,
  currentGuess,
  currentRow,
  getLetterStyle,
  WORD_LENGTH,
}) => {
  return (
    <div className="grid grid-rows-6 gap-1 mb-8">
      {guesses.map((guess, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-5 gap-1">
          {Array.from({ length: WORD_LENGTH }).map((_, colIndex) => (
            <div
              key={colIndex}
              className={`w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-2xl font-bold border ${getLetterStyle(
                guess[colIndex] || "",
                colIndex,
                rowIndex,
              )}`}
            >
              {rowIndex === currentRow
                ? currentGuess[colIndex]
                : guess[colIndex]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
