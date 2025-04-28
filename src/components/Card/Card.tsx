import React from "react";
import { Card as CardType } from "../../types/Card";
import "./Card.css";

interface CardProps {
 card: CardType;
 onClick: (id: number) => void;
 isGameReady?: boolean;
 style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
 card,
 onClick,
 isGameReady = true,
 style,
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
  <div className={cardClasses} onClick={handleClick} style={style}>
   <div className="card-inner">
    <div className="card-front"></div>
    <div className="card-back">
     <span className="card-value">{value}</span>
    </div>
   </div>
  </div>
 );
};
