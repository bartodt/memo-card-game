import React from "react";
import { Card as CardComponent } from "../Card/Card";
import { Card as CardType } from "../../types/Card";
import "./CardGrid.css";

interface CardGridProps {
 cards: CardType[];
 onCardClick: (id: number) => void;
}

export const CardGrid: React.FC<CardGridProps> = ({ cards, onCardClick }) => {
 return (
  <div className="card-grid">
   {cards.map((card) => (
    <CardComponent key={card.id} card={card} onClick={onCardClick} />
   ))}
  </div>
 );
};
