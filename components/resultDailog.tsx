// ResultDialog.tsx
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ResultDialogProps {
  showResult: boolean;
  setShowResult: (open: boolean) => void;
  gameStatus: "playing" | "won" | "lost";
  targetWord: string;
  resetGame: () => void;
}

const ResultDialog: React.FC<ResultDialogProps> = ({
  showResult,
  setShowResult,
  gameStatus,
  targetWord,
  resetGame,
}) => {
  return (
    <Dialog open={showResult} onOpenChange={setShowResult}>
      <DialogContent className="bg-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4">
            {gameStatus === "won" ? "Congratulations!" : "Game Over"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {gameStatus === "won" ? (
            <p className="text-xl">You guessed the word correctly!</p>
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
            resetGame();
          }}
        >
          Play Again
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ResultDialog;
