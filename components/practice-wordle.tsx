"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useWindowSize } from "react-use";

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;
const WORDS = ["REACT"];

type LetterState = "correct" | "present" | "absent" | "empty";

export function PracticeWordleComponent() {
  const [targetWord, setTargetWord] = useState("");
  const [guesses, setGuesses] = useState<string[]>(Array(MAX_GUESSES).fill(""));
  const [currentGuess, setCurrentGuess] = useState("");
  const [currentRow, setCurrentRow] = useState(0);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">(
    "playing",
  );
  const [showResult, setShowResult] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    setTargetWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
  }, []);

  const checkGuess = useCallback(
    (guess: string): LetterState[] => {
      const result: LetterState[] = Array(WORD_LENGTH).fill("absent");
      const targetLetters = targetWord.split("");

      guess.split("").forEach((letter, i) => {
        if (letter === targetLetters[i]) {
          result[i] = "correct";
          targetLetters[i] = "";
        }
      });

      // Check for present letters
      guess.split("").forEach((letter, i) => {
        if (result[i] !== "correct" && targetLetters.includes(letter)) {
          result[i] = "present";
          targetLetters[targetLetters.indexOf(letter)] = ""; // Mark as used by setting to an empty string
        }
      });

      return result;
    },
    [targetWord],
  );

  const handleKeyPress = (key: string) => {
    if (gameStatus !== "playing") return;
    if (currentGuess.length < WORD_LENGTH && key.length === 1) {
      setCurrentGuess((prev) => prev + key.toUpperCase());
    }
  };

  const handleDelete = () => {
    if (gameStatus !== "playing") return;
    setCurrentGuess((prev) => prev.slice(0, -1));
  };

  const handleEnter = () => {
    if (gameStatus !== "playing") return;
    if (currentGuess.length === WORD_LENGTH) {
      const newGuesses = [...guesses];
      newGuesses[currentRow] = currentGuess;
      setGuesses(newGuesses);

      if (currentGuess === targetWord) {
        setGameStatus("won");
        setShowResult(true);
        console.log("Correct guess! Showing popup."); // Added line to log when the correct guess is made
      } else if (currentRow === MAX_GUESSES - 1) {
        setGameStatus("lost");
        setShowResult(true);
      } else {
        setCurrentRow((prev) => prev + 1);
        setCurrentGuess("");
      }
    }
  };

  const getLetterStyle = (
    letter: string,
    index: number,
    row: number,
  ): string => {
    if (row >= currentRow) return "bg-gray-800";
    const state = checkGuess(guesses[row])[index];
    switch (state) {
      case "correct":
        return "bg-green-600";
      case "present":
        return "bg-yellow-600";
      case "absent":
        return "bg-gray-600";
      default:
        return "bg-gray-800";
    }
  };

  const keyboard = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
  ];

  const getKeyboardKeyStyle = (key: string): string => {
    for (let i = 0; i < currentRow; i++) {
      const guessResult = checkGuess(guesses[i]);
      const keyIndex = guesses[i].indexOf(key);
      if (keyIndex !== -1) {
        switch (guessResult[keyIndex]) {
          case "correct":
            return "bg-green-600";
          case "present":
            return "bg-yellow-600";
          case "absent":
            return "bg-gray-600";
        }
      }
    }
    return "bg-gray-400";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">Practice Wordle</h1>
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
      <div className="grid gap-1 mb-4">
        {keyboard.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1">
            {row.map((key) => (
              <Button
                key={key}
                onClick={() =>
                  key === "⌫"
                    ? handleDelete()
                    : key === "ENTER"
                      ? handleEnter()
                      : handleKeyPress(key)
                }
                className={`px-2 py-4 sm:px-4 sm:py-6 text-sm sm:text-base font-semibold ${getKeyboardKeyStyle(
                  key,
                )} hover:opacity-80`}
              >
                {key}
              </Button>
            ))}
          </div>
        ))}
      </div>

      {/* Win/Lose Dialog */}
      <Dialog open={showResult} onOpenChange={setShowResult}>
        <DialogContent className="bg-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-4">
              {gameStatus === "won" ? "Congratulations!" : "Game Over"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {gameStatus === "won" ? (
              <>
                <p className="text-xl">You guessed the word correctly!</p>
              </>
            ) : (
              <p className="text-xl">
                You didn't guess the word. The correct word was:{" "}
                <span className="font-bold text-red-500">{targetWord}</span>
              </p>
            )}
          </div>
          <Button
            className="mt-4 bg-gradient-to-r from-green-400 to-blue-500 text-white"
            onClick={() => {
              setShowResult(false);
              // Reset the game
              setTargetWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
              setGuesses(Array(MAX_GUESSES).fill(""));
              setCurrentGuess("");
              setCurrentRow(0);
              setGameStatus("playing");
            }}
          >
            Play Again
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
