import React from "react";
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

 return (
  <div className="app">
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
