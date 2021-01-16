import { add } from './main'

describe('add', () => {
  it('add two numbers', () => {
    expect(add(10, 5)).toBe(15)
  })
  it('add three numbers', () => {
    expect(add(3, 2, 2)).toBe(7)
  })
  it('pass one argument number', () => {
    expect(add(3)).toBe(3)
  })
  it('pass no numbers', () => {
    expect(add()).toBe(0)
  })
  it('pass any number of arguments', () => {
    expect(add(1, 1, 1, 1, 1, 1, 1)).toBe(7)
    expect(add(0, 0, 0, 0, 0, 0, 0, 0)).toBe(0)
    expect(add(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1)).toBe(1)
  })
})
