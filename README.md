# Memory Card Game

A simple memory card matching game built with React and TypeScript.

## Features

- Card matching gameplay
- Move counter
- Best score tracking with localStorage
- Responsive design for mobile and desktop

## Project Structure

```
src/
  components/
    Header/       - Game header with stats and reset button
    CardGrid/     - Grid layout for the cards
    Card/         - Individual card component
  hooks/
    useMemoryGame.ts - Custom hook with game logic
  utils/
    shuffleArray.ts - Utility for shuffling cards
  types/
    Card.ts     - TypeScript interfaces
  App.tsx       - Main application component
  index.tsx     - Entry point
  App.css       - Global styles
```

## Getting Started

1. Install dependencies:

   ```
   npm install
   ```

2. Start the development server:

   ```
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the
   browser.

## Game Rules

- Click on cards to flip them
- Try to find matching pairs
- Game is complete when all pairs are matched
- Try to finish with the fewest moves possible
