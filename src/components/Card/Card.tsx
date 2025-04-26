import React from "react";
import { Card as CardType } from "../../types/Card";
import "./Card.css";

interface CardProps {
 card: CardType;
 onClick: (id: number) => void;
 isGameReady?: boolean;
}

export const Card: React.FC<CardProps> = ({
 card,
 onClick,
 isGameReady = true,
}) => {
 const { id, isFlipped, isMatched, value } = card;

 const handleClick = () => {
  if (!isFlipped && !isMatched) {
   onClick(id);
  }
 };

 const cardClasses = [
  "memory-card",
  isFlipped ? "flipped" : "",
  isMatched ? "matched" : "",
  !isGameReady ? "disabled" : "",
 ]
  .filter(Boolean)
  .join(" ");

 return (
  <div className={cardClasses} onClick={handleClick}>
   <div className="card-inner">
    <div className="card-front"></div>
    <div className="card-back">{value}</div>
   </div>
  </div>
 );
};
