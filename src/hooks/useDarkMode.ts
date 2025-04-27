import { useState, useEffect } from "react";

export const useDarkMode = () => {
 // State to manage dark mode
 const [isDarkTheme, setIsDarkTheme] = useState(() => {
  // Check for user preference in localStorage or system preference
  const savedTheme = localStorage.getItem("memoryGameDarkTheme");
  if (savedTheme !== null) {
   return savedTheme === "true";
  }
  // If no saved preference, check for system preference
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
 });

 // Effect to update document with theme class when changed
 useEffect(() => {
  if (isDarkTheme) {
   document.documentElement.classList.add("dark-theme");
  } else {
   document.documentElement.classList.remove("dark-theme");
  }
  // Save preference to localStorage
  localStorage.setItem("memoryGameDarkTheme", isDarkTheme.toString());
 }, [isDarkTheme]);

 const toggleTheme = () => {
  setIsDarkTheme((prevTheme) => !prevTheme);
 };

 return { isDarkTheme, toggleTheme };
};
