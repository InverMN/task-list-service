import add from './add'

describe('add', () => {
  it('adds two numbers', () => {
    expect(add(10, 3)).toBe(13)
  })

  it('adds three numbers', () => {
    expect(add(1, 5, 2)).toBe(8)
  })

  it('passes one number', () => {
    expect(add(5)).toBe(5)
  })

  it('when no arguments returns 0', () => {
    expect(add()).toBe(0)
  })

  it('adds any number of arguments', () => {
    expect(add(0, 0, 0, 0, 0, 0, 0, 0, 0, 5)).toBe(5)
    expect(add(0, 0, 0, 2, 0, 0, 0, 5)).toBe(7)
    expect(add(0, 0, 0, 0, 0, 0, 9)).toBe(9)
  })
})
