import { useState, useEffect, useCallback } from "react";
import { Card } from "../types/Card";
import { shuffleArray } from "../utils/shuffleArray";

interface UseMemoryGameProps {
 totalPairs: number;
}

interface UseMemoryGameReturn {
 cards: Card[];
 flippedCards: Card[];
 moves: number;
 matchedPairs: number;
 bestScore: number | null;
 handleCardClick: (id: number) => void;
 resetGame: () => void;
}

export function useMemoryGame({
 totalPairs,
}: UseMemoryGameProps): UseMemoryGameReturn {
 const [cards, setCards] = useState<Card[]>([]);
 const [flippedCards, setFlippedCards] = useState<Card[]>([]);
 const [moves, setMoves] = useState(0);
 const [matchedPairs, setMatchedPairs] = useState(0);
 const [bestScore, setBestScore] = useState<number | null>(null);

 // Initialize the game
 const initializeGame = useCallback(() => {
  // Create pairs of cards
  const values = Array.from({ length: totalPairs }, (_, i) => i + 1);
  const cardPairs = values.flatMap((value) => [
   { id: value * 2 - 1, value, isFlipped: true, isMatched: false },
   { id: value * 2, value, isFlipped: true, isMatched: false },
  ]);

  // Shuffle cards
  setCards(shuffleArray(cardPairs));
  setFlippedCards([]);
  setMoves(0);
  setMatchedPairs(0);

  // Flip cards back after preview
  setTimeout(() => {
   setCards((prevCards) =>
    prevCards.map((card) => ({ ...card, isFlipped: false }))
   );
  }, 2000);
 }, [totalPairs]);

 useEffect(() => {
  initializeGame();
  // Load best score from localStorage
  const savedBestScore = localStorage.getItem("memoryGameBestScore");
  if (savedBestScore) {
   setBestScore(Number(savedBestScore));
  }
 }, [totalPairs, initializeGame]);

 // Check for game completion
 useEffect(() => {
  if (matchedPairs === totalPairs && matchedPairs > 0) {
   // Game completed
   if (bestScore === null || moves < bestScore) {
    // New best score
    localStorage.setItem("memoryGameBestScore", moves.toString());
    setBestScore(moves);
   }
  }
 }, [matchedPairs, moves, bestScore, totalPairs]);

 // Check for matches when two cards are flipped
 useEffect(() => {
  if (flippedCards.length === 2) {
   const [firstCard, secondCard] = flippedCards;

   if (firstCard.value === secondCard.value) {
    // Match found
    setCards((prevCards) =>
     prevCards.map((card) =>
      card.id === firstCard.id || card.id === secondCard.id
       ? { ...card, isMatched: true }
       : card
     )
    );
    setMatchedPairs((prev) => prev + 1);
    setFlippedCards([]);
   } else {
    // No match, flip back after delay
    const timeout = setTimeout(() => {
     setCards((prevCards) =>
      prevCards.map((card) =>
       card.id === firstCard.id || card.id === secondCard.id
        ? { ...card, isFlipped: false }
        : card
      )
     );
     setFlippedCards([]);
    }, 1000);

    return () => clearTimeout(timeout);
   }
  }
 }, [flippedCards]);

 const handleCardClick = useCallback(
  (id: number) => {
   // Ignore clicks if two cards are already flipped
   if (flippedCards.length === 2) return;

   // Find the clicked card
   const clickedCard = cards.find((card) => card.id === id);

   // Ignore if card already flipped or matched
   if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

   // Flip the card
   setCards((prevCards) =>
    prevCards.map((card) =>
     card.id === id ? { ...card, isFlipped: true } : card
    )
   );

   // Add to flipped cards
   setFlippedCards((prev) => [...prev, clickedCard]);

   // Increment moves if this is the second card flipped
   if (flippedCards.length === 1) {
    setMoves((prev) => prev + 1);
   }
  },
  [cards, flippedCards]
 );

 const resetGame = useCallback(() => {
  initializeGame();
 }, [initializeGame]);

 return {
  cards,
  flippedCards,
  moves,
  matchedPairs,
  bestScore,
  handleCardClick,
  resetGame,
 };
}
