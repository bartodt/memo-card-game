import React from "react";
import "./ThemeToggle.css";

interface ThemeToggleProps {
 toggleTheme: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ toggleTheme }) => {
 return (
  <div
   className="theme-toggle"
   onClick={toggleTheme}
   aria-label="Toggle dark mode"
  >
   <span>🌙</span>
  </div>
 );
};
