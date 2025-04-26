import React from "react";
import "./Header.css";

interface HeaderProps {
 moves: number;
 matchedPairs: number;
 totalPairs: number;
 bestScore: number | null;
 onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
 moves,
 matchedPairs,
 totalPairs,
 bestScore,
 onReset,
}) => {
 return (
  <header className="game-header">
   <h1>Memory Card Game</h1>

   <div className="stats-container">
    <div className="stat">
     <span className="stat-label">Moves:</span>
     <span className="stat-value">{moves}</span>
    </div>

    <div className="stat">
     <span className="stat-label">Pairs:</span>
     <span className="stat-value">
      {matchedPairs}/{totalPairs}
     </span>
    </div>

    {bestScore !== null && (
     <div className="stat">
      <span className="stat-label">Best:</span>
      <span className="stat-value">{bestScore}</span>
     </div>
    )}
   </div>

   <button className="reset-button" onClick={onReset}>
    Reset Game
   </button>
  </header>
 );
};
