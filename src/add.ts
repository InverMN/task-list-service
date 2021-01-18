export default function add(...numbers: number[]): number {
  return numbers.reduce((total, number) => total + number, 0)
}
