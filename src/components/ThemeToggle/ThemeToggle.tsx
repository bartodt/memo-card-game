import React from "react";
import "./ThemeToggle.css";

interface ThemeToggleProps {
 isDarkTheme: boolean;
 toggleTheme: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
 isDarkTheme,
 toggleTheme,
}) => {
 return (
  <div
   className="theme-toggle"
   onClick={toggleTheme}
   title={isDarkTheme ? "Switch to light mode" : "Switch to dark mode"}
   role="button"
   aria-label="Toggle dark mode"
   tabIndex={0}
  >
   <span>🌙</span>
  </div>
 );
};
