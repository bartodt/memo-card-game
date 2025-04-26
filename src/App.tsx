import React, { useState, useEffect } from "react";
import { Header } from "./components/Header/Header";
import { CardGrid } from "./components/CardGrid/CardGrid";
import { useMemoryGame } from "./hooks/useMemoryGame";
import "./App.css";

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

 // State to manage dark mode
 const [isDarkTheme, setIsDarkTheme] = useState(() => {
  // Check for user preference in localStorage or system preference
  const savedTheme = localStorage.getItem("memoryGameDarkTheme");
  if (savedTheme !== null) {
   return savedTheme === "true";
  }
  // If no saved preference, check for system preference
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
 });

 // Effect to update document with theme class when changed
 useEffect(() => {
  if (isDarkTheme) {
   document.documentElement.classList.add("dark-theme");
  } else {
   document.documentElement.classList.remove("dark-theme");
  }
  // Save preference to localStorage
  localStorage.setItem("memoryGameDarkTheme", isDarkTheme.toString());
 }, [isDarkTheme]);

 const toggleTheme = () => {
  setIsDarkTheme((prevTheme) => !prevTheme);
 };

 return (
  <div className="app">
   <div
    className="theme-toggle"
    onClick={toggleTheme}
    title={isDarkTheme ? "Switch to light mode" : "Switch to dark mode"}
    role="button"
    aria-label="Toggle dark mode"
    tabIndex={0}
   >
    <span>🌙</span>
   </div>

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

   {matchedPairs === TOTAL_PAIRS && matchedPairs > 0 && (
    <div className="win-message">
     <h2>Congratulations! 🎉</h2>
     <p>You completed the game in {moves} moves.</p>
     {bestScore !== null && moves <= bestScore && (
      <p className="new-record">That's a new record!</p>
     )}
     <button onClick={resetGame}>Play Again</button>
    </div>
   )}
  </div>
 );
};
