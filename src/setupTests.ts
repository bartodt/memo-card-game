import "@testing-library/jest-dom";

// Añadir tipos globales para Jest
declare global {
 namespace jest {
  interface Matchers<R> {
   toBeInTheDocument(): R;
   toHaveClass(className: string): R;
  }
 }
}

// Mock for localStorage
Object.defineProperty(window, "localStorage", {
 value: {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
 },
 writable: true,
});

// Mock timer implementations
jest.useFakeTimers();
