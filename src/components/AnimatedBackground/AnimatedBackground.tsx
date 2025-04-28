import React, { useEffect, useState } from "react";
import "./AnimatedBackground.css";

interface Shape {
 id: number;
 size: number;
 left: number;
 top: number;
 color: string;
 duration: number;
 delay: number;
}

export const AnimatedBackground: React.FC = () => {
 const [shapes, setShapes] = useState<Shape[]>([]);

 useEffect(() => {
  const colors = ["#3498db", "#e74c3c", "#2ecc71", "#f39c12", "#9b59b6"];
  const newShapes: Shape[] = [];

  for (let i = 0; i < 15; i++) {
   newShapes.push({
    id: i,
    size: Math.random() * 100 + 50,
    left: Math.random() * 100,
    top: Math.random() * 100,
    color: colors[Math.floor(Math.random() * colors.length)],
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
   });
  }

  setShapes(newShapes);
 }, []);

 return (
  <div className="animated-background">
   {shapes.map((shape) => (
    <div
     key={shape.id}
     className="floating-shape"
     style={{
      width: `${shape.size}px`,
      height: `${shape.size}px`,
      left: `${shape.left}%`,
      top: `${shape.top}%`,
      backgroundColor: shape.color,
      animationDuration: `${shape.duration}s`,
      animationDelay: `${shape.delay}s`,
     }}
    />
   ))}
  </div>
 );
};
