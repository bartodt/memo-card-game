import { useState, useEffect } from "react";

export const useDarkMode = () => {
 const [isDarkTheme, setIsDarkTheme] = useState(() => {
  const savedTheme = localStorage.getItem("memoryGameDarkTheme");
  if (savedTheme !== null) {
   return savedTheme === "true";
  }
  return true;
 });

 useEffect(() => {
  if (isDarkTheme) {
   document.documentElement.classList.add("dark-theme");
  } else {
   document.documentElement.classList.remove("dark-theme");
  }
  localStorage.setItem("memoryGameDarkTheme", isDarkTheme.toString());
 }, [isDarkTheme]);

 const toggleTheme = () => {
  setIsDarkTheme((prevTheme) => !prevTheme);
 };

 return { isDarkTheme, toggleTheme };
};
