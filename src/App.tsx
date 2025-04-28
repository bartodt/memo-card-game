import React from "react";
import { Header } from "./components/Header/Header";
import { CardGrid } from "./components/CardGrid/CardGrid";
import { ThemeToggle } from "./components/ThemeToggle/ThemeToggle";
import { AnimatedBackground } from "./components/AnimatedBackground/AnimatedBackground";
import { useMemoryGame } from "./hooks/useMemoryGame";
import { useDarkMode } from "./hooks/useDarkMode";
import "./App.css";
import { WinModal } from "./components/WinModal/WinModal";

const TOTAL_PAIRS = 8;

export const App: React.FC = () => {
 const {
  cards,
  moves,
  matchedPairs,
  bestScore,
  isGameReady,
  handleCardClick,
  resetGame,
 } = useMemoryGame({ totalPairs: TOTAL_PAIRS });

 const { toggleTheme } = useDarkMode();

 const userWon = matchedPairs === TOTAL_PAIRS;

 return (
  <div className="app">
   <AnimatedBackground />
   <ThemeToggle toggleTheme={toggleTheme} />

   <Header
    moves={moves}
    matchedPairs={matchedPairs}
    totalPairs={TOTAL_PAIRS}
    bestScore={bestScore}
    onReset={resetGame}
   />

   <main className="game-container">
    <CardGrid
     cards={cards}
     onCardClick={handleCardClick}
     isGameReady={isGameReady}
    />
   </main>

   {userWon && (
    <WinModal moves={moves} bestScore={bestScore} resetGame={resetGame} />
   )}
  </div>
 );
};
