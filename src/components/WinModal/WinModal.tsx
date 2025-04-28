interface WinModalProps {
 moves: number;
 bestScore: number | null;
 resetGame: () => void;
}

export const WinModal = ({ moves, bestScore, resetGame }: WinModalProps) => {
 return (
  <div className="win-message">
   <h2>Congratulations! 🎉</h2>
   <p>You completed the game in {moves} moves.</p>
   {bestScore !== null && moves <= bestScore && (
    <p className="new-record">That's a new record!</p>
   )}
   <button onClick={resetGame}>Play Again</button>
  </div>
 );
};
