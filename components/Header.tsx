import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Header() {
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
  return (
    <>
      <Dialog open={isHowToPlayOpen} onOpenChange={setIsHowToPlayOpen}>
        <DialogContent className="bg-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-4">
              How to Play Practice Wordle
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>
              Practice Wordle is a word-guessing game inspired by the popular
              Wordle game. Here's how to play:
            </p>
            <ol className="list-decimal list-inside space-y-2">
              <li>You have 6 attempts to guess a 5-letter word.</li>
              <li>Type a 5-letter word and press Enter.</li>
              <li>
                The color of the tiles will change to show how close your guess
                was:
              </li>
              <ul className="list-disc list-inside ml-6 space-y-1">
                <li>
                  <span className="text-green-400">Green</span>: The letter is
                  correct and in the right position.
                </li>
                <li>
                  <span className="text-yellow-400">Yellow</span>: The letter is
                  in the word but in the wrong position.
                </li>
                <li>
                  <span className="text-gray-400">Gray</span>: The letter is not
                  in the word.
                </li>
              </ul>
              <li>Use the feedback to make your next guess.</li>
              <li>
                Keep guessing until you find the word or run out of attempts.
              </li>
            </ol>
            <p>
              Practice as much as you want and watch your word skills improve!
            </p>
          </div>
          <Button
            className="mt-4 bg-gradient-to-r from-green-400 to-blue-500 text-white"
            onClick={() => setIsHowToPlayOpen(false)}
          >
            Got it!
          </Button>
        </DialogContent>
      </Dialog>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-blue-900 opacity-50"></div>
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-pulse">
              Practice{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                Wordle
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Sharpen your word skills with our addictive Wordle-inspired game
            </p>
            <div className="space-x-4">
              <Link href="/wordle">
                <Button className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:from-green-500 hover:to-blue-600 transition duration-300">
                  Play Now <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-gray-900 font-bold py-3 px-8 rounded-full text-lg transition duration-300"
                onClick={() => setIsHowToPlayOpen(true)}
              >
                How to Play
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </section>
    </>
  );
}
