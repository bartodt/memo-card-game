import { shuffleArray } from "../shuffleArray";

describe("shuffleArray", () => {
 test("should return an array of the same length", () => {
  const original = [1, 2, 3, 4, 5];
  const shuffled = shuffleArray(original);
  expect(shuffled.length).toBe(original.length);
 });

 test("should contain all the same elements", () => {
  const original = [1, 2, 3, 4, 5];
  const shuffled = shuffleArray(original);
  expect(shuffled).toEqual(expect.arrayContaining(original));
  expect(original).toEqual(expect.arrayContaining(shuffled));
 });

 test("should not modify the original array", () => {
  const original = [1, 2, 3, 4, 5];
  const originalCopy = [...original];
  shuffleArray(original);
  expect(original).toEqual(originalCopy);
 });
});
