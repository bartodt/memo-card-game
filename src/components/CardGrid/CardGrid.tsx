import React, { useEffect, useState, useRef } from "react";
import { Card as CardComponent } from "../Card/Card";
import { Card as CardType } from "../../types/Card";
import "./CardGrid.css";

interface CardGridProps {
 cards: CardType[];
 onCardClick: (id: number) => void;
 isGameReady: boolean;
}

export const CardGrid: React.FC<CardGridProps> = ({
 cards,
 onCardClick,
 isGameReady,
}) => {
 const [key, setKey] = useState(0);
 const prevCardsRef = useRef<CardType[]>([]);

 useEffect(() => {
  if (!areCardIdsEqual(prevCardsRef.current, cards)) {
   setKey((prevKey) => prevKey + 1);
   prevCardsRef.current = [...cards];
  } else {
   prevCardsRef.current = [...cards];
  }
 }, [cards]);

 const areCardIdsEqual = (
  prevCards: CardType[],
  currentCards: CardType[]
 ): boolean => {
  if (prevCards.length !== currentCards.length) return false;
  if (prevCards.length === 0) return false;

  return prevCards.every((card, index) => card.id === currentCards[index].id);
 };

 const getCardStyles = (index: number): React.CSSProperties => {
  const baseDelay = 0.1;
  const incrementPerCard = 0.05;
  const delay = baseDelay + index * incrementPerCard;

  return {
   animationDelay: `${delay}s`,
   "--card-sound-delay": `${delay}s`,
  } as React.CSSProperties;
 };

 return (
  <div className="card-grid" key={key}>
   {cards.map((card, index) => (
    <CardComponent
     key={card.id}
     card={card}
     onClick={onCardClick}
     isGameReady={isGameReady}
     style={getCardStyles(index)}
    />
   ))}
  </div>
 );
};
