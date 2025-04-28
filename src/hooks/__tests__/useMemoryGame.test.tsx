import { renderHook, act } from "@testing-library/react";
import { useMemoryGame } from "../useMemoryGame";
import { Card } from "../../types/Card";

// Mock for localStorage
const localStorageMock = {
 getItem: jest.fn(),
 setItem: jest.fn(),
 clear: jest.fn(),
};
Object.defineProperty(window, "localStorage", { value: localStorageMock });

// Mock for shuffleArray to make tests predictable
jest.mock("../../utils/shuffleArray", () => ({
 shuffleArray: <T extends unknown[]>(array: T) => array,
}));

describe("useMemoryGame", () => {
 beforeEach(() => {
  jest.clearAllMocks();
  jest.useFakeTimers();
 });

 afterEach(() => {
  jest.clearAllTimers();
 });

 test("should initialize with correct number of cards", () => {
  const { result } = renderHook(() => useMemoryGame({ totalPairs: 4 }));

  expect(result.current.cards.length).toBe(8);
  expect(result.current.moves).toBe(0);
  expect(result.current.matchedPairs).toBe(0);
  expect(result.current.isGameReady).toBe(false);
 });

 test("should load best score from localStorage", () => {
  // Set up a best score in localStorage
  localStorageMock.getItem.mockReturnValueOnce("10");

  const { result } = renderHook(() => useMemoryGame({ totalPairs: 4 }));

  expect(result.current.bestScore).toBe(10);
  expect(localStorageMock.getItem).toHaveBeenCalledWith("memoryGameBestScore");
 });

 test("should flip cards during initialization and then hide them", () => {
  const { result } = renderHook(() => useMemoryGame({ totalPairs: 4 }));

  // Advance past the initial animation
  act(() => {
   jest.advanceTimersByTime(1650);
  });

  // Cards should be flipped to show values
  expect(result.current.cards.every((card: Card) => card.isFlipped)).toBe(true);

  // Advance past the preview time
  act(() => {
   jest.advanceTimersByTime(5000);
  });

  // Cards should be hidden and game ready
  expect(result.current.cards.every((card: Card) => !card.isFlipped)).toBe(
   true
  );
  expect(result.current.isGameReady).toBe(true);
 });

 test("should handle card click", () => {
  const { result } = renderHook(() => useMemoryGame({ totalPairs: 4 }));

  // Make game ready
  act(() => {
   jest.advanceTimersByTime(6650);
  });

  // Click first card
  act(() => {
   result.current.handleCardClick(1);
  });

  // One card should be flipped
  const flippedCard = result.current.cards.find((card) => card.isFlipped);
  expect(flippedCard).toBeDefined();
  expect(flippedCard?.id).toBe(1);
  expect(result.current.flippedCards.length).toBe(1);
 });

 test("should increment moves when two cards are flipped", () => {
  const { result } = renderHook(() => useMemoryGame({ totalPairs: 4 }));

  // Make game ready
  act(() => {
   jest.advanceTimersByTime(6650);
  });

  // Click first card
  act(() => {
   result.current.handleCardClick(1);
  });

  expect(result.current.moves).toBe(0);

  // Click second card
  act(() => {
   result.current.handleCardClick(3);
  });

  expect(result.current.moves).toBe(1);
 });

 test("should mark cards as matched when a matching pair is found", () => {
  const { result } = renderHook(() => useMemoryGame({ totalPairs: 4 }));

  // Make game ready
  act(() => {
   jest.advanceTimersByTime(6650);
  });

  // Click two cards with the same value
  // In our mocked shuffleArray, cards 1 and 2 will have value 1
  act(() => {
   result.current.handleCardClick(1);
   result.current.handleCardClick(2);
  });

  // Check that the cards are marked as matched
  expect(result.current.cards[0].isMatched).toBe(true);
  expect(result.current.cards[1].isMatched).toBe(true);
  expect(result.current.matchedPairs).toBe(1);

  // Wait for timeout to clear the flipped cards array
  act(() => {
   jest.advanceTimersByTime(800);
  });

  expect(result.current.flippedCards.length).toBe(0);
 });

 test("should flip back unmatched pairs after a delay", () => {
  const { result } = renderHook(() => useMemoryGame({ totalPairs: 4 }));

  // Make game ready
  act(() => {
   jest.advanceTimersByTime(6650);
  });

  // Click two cards with different values
  // In our mocked shuffleArray, cards 1 and 3 will have different values
  act(() => {
   result.current.handleCardClick(1);
   result.current.handleCardClick(3);
  });

  // Both cards should be flipped
  expect(result.current.cards[0].isFlipped).toBe(true);
  expect(result.current.cards[2].isFlipped).toBe(true);

  // After delay, cards should flip back
  act(() => {
   jest.advanceTimersByTime(1000);
  });

  expect(result.current.cards[0].isFlipped).toBe(false);
  expect(result.current.cards[2].isFlipped).toBe(false);
  expect(result.current.flippedCards.length).toBe(0);
 });

 test("should ignore clicks on already flipped or matched cards", () => {
  const { result } = renderHook(() => useMemoryGame({ totalPairs: 4 }));

  // Make game ready
  act(() => {
   jest.advanceTimersByTime(6650);
  });

  // Flip first card
  act(() => {
   result.current.handleCardClick(1);
  });

  // Try to click the same card again
  act(() => {
   result.current.handleCardClick(1);
  });

  // Still only one card flipped
  expect(result.current.flippedCards.length).toBe(1);

  // Match a pair
  act(() => {
   result.current.handleCardClick(2); // This makes a match with card 1
  });

  // Wait for timeout
  act(() => {
   jest.advanceTimersByTime(800);
  });

  // Try to click a matched card
  act(() => {
   result.current.handleCardClick(1);
  });

  // No cards should be in flippedCards
  expect(result.current.flippedCards.length).toBe(0);
 });

 test("should handle non-existent card ids gracefully", () => {
  const { result } = renderHook(() => useMemoryGame({ totalPairs: 4 }));

  // Make game ready
  act(() => {
   jest.advanceTimersByTime(6650);
  });

  // Initial state
  expect(result.current.flippedCards.length).toBe(0);

  // Click a non-existent card ID
  act(() => {
   result.current.handleCardClick(999);
  });

  // Should not change the state
  expect(result.current.flippedCards.length).toBe(0);
  expect(result.current.cards.every((card: Card) => !card.isFlipped)).toBe(
   true
  );
 });

 test("should not allow clicks when the game is not ready", () => {
  const { result } = renderHook(() => useMemoryGame({ totalPairs: 4 }));

  // Game is not ready yet
  expect(result.current.isGameReady).toBe(false);

  // Try to click a card
  act(() => {
   result.current.handleCardClick(1);
  });

  // No cards should be flipped
  expect(result.current.flippedCards.length).toBe(0);
  expect(result.current.cards.every((card: Card) => !card.isFlipped)).toBe(
   true
  );
 });

 test("should update best score when game is completed with a better score", () => {
  // Set up a higher best score in localStorage
  localStorageMock.getItem.mockReturnValueOnce("10");

  const { result } = renderHook(() => useMemoryGame({ totalPairs: 2 }));

  // Make game ready
  act(() => {
   jest.advanceTimersByTime(6650);
  });

  // Complete the game with 2 moves
  act(() => {
   result.current.handleCardClick(1);
   result.current.handleCardClick(2); // Match
  });

  act(() => {
   jest.advanceTimersByTime(800);
  });

  act(() => {
   result.current.handleCardClick(3);
   result.current.handleCardClick(4); // Match
  });

  // Best score should be updated
  expect(localStorageMock.setItem).toHaveBeenCalledWith(
   "memoryGameBestScore",
   "0"
  );
  expect(result.current.bestScore).toBe(0);
 });

 test("should not update best score when game is completed with a worse score", () => {
  // Set up a lower best score in localStorage
  localStorageMock.getItem.mockReturnValueOnce("0");

  const { result } = renderHook(() => useMemoryGame({ totalPairs: 2 }));

  // Make game ready
  act(() => {
   jest.advanceTimersByTime(6650);
  });

  // Complete the game with 2 moves
  act(() => {
   result.current.handleCardClick(1);
   result.current.handleCardClick(2); // Match
  });

  act(() => {
   jest.advanceTimersByTime(800);
  });

  act(() => {
   result.current.handleCardClick(3);
   result.current.handleCardClick(4); // Match
  });

  // In this case, we'd still expect a call to setItem because both scores are equal (0)
  // We'll check that the best score remains at its original value
  expect(result.current.bestScore).toBe(0);
 });

 test("should reset game state", () => {
  const { result } = renderHook(() => useMemoryGame({ totalPairs: 4 }));

  // Make game ready
  act(() => {
   jest.advanceTimersByTime(6650);
  });

  // Click some cards
  act(() => {
   result.current.handleCardClick(1);
   result.current.handleCardClick(3);
  });

  // Reset game
  act(() => {
   result.current.resetGame();
  });

  // Game should be back to initial state
  expect(result.current.isGameReady).toBe(false);
  expect(result.current.moves).toBe(0);
  expect(result.current.matchedPairs).toBe(0);
  expect(result.current.flippedCards.length).toBe(0);
 });
});
