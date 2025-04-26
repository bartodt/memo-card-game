import React from "react";
import { Card as CardType } from "../../types/Card";
import "./Card.css";

interface CardProps {
 card: CardType;
 onClick: (id: number) => void;
}

export const Card: React.FC<CardProps> = ({ card, onClick }) => {
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
