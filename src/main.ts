export const add = (...numbers: number[]): number =>
  numbers.reduce((total, number) => total + number, 0)
