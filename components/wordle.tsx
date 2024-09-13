// PracticeWordleComponent.tsx
"use client";
import React, { useState, useEffect, useCallback } from "react";
import GameBoard from "./gameboard";
import Keyboard from "./keyboard";
import ResultDialog from "./resultDailog";
import { useWindowSize } from "react-use";
import WORDS from "@/words";
const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

type LetterState = "correct" | "present" | "absent" | "empty";

export default function Wordle() {
  const [targetWord, setTargetWord] = useState<string>("");
  const [guesses, setGuesses] = useState<string[]>(Array(MAX_GUESSES).fill(""));
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">(
    "playing",
  );
  const [showResult, setShowResult] = useState<boolean>(false);
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

      guess.split("").forEach((letter, i) => {
        if (result[i] !== "correct" && targetLetters.includes(letter)) {
          result[i] = "present";
          targetLetters[targetLetters.indexOf(letter)] = "";
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
      <GameBoard
        guesses={guesses}
        currentGuess={currentGuess}
        currentRow={currentRow}
        getLetterStyle={getLetterStyle}
        WORD_LENGTH={WORD_LENGTH}
      />
      <Keyboard
        keyboard={keyboard}
        handleKeyPress={handleKeyPress}
        handleDelete={handleDelete}
        handleEnter={handleEnter}
        getKeyboardKeyStyle={getKeyboardKeyStyle}
      />
      <ResultDialog
        showResult={showResult}
        setShowResult={setShowResult}
        gameStatus={gameStatus}
        targetWord={targetWord}
        resetGame={() => {
          setShowResult(false);
          setTargetWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
          setGuesses(Array(MAX_GUESSES).fill(""));
          setCurrentGuess("");
          setCurrentRow(0);
          setGameStatus("playing");
        }}
      />
    </div>
  );
}
