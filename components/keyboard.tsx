// Keyboard.tsx
import React from "react";
import { Button } from "@/components/ui/button";

interface KeyboardProps {
  keyboard: string[][];
  handleKeyPress: (key: string) => void;
  handleDelete: () => void;
  handleEnter: () => void;
  getKeyboardKeyStyle: (key: string) => string;
}

const Keyboard: React.FC<KeyboardProps> = ({
  keyboard,
  handleKeyPress,
  handleDelete,
  handleEnter,
  getKeyboardKeyStyle,
}) => {
  return (
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
  );
};

export default Keyboard;
