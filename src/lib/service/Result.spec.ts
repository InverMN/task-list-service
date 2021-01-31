import { Result, Ok, Err } from './index'

describe('Result', () => {
  it('is present', () => {
    expect(Result).toBeDefined()
  })

  it('initializes new instance', () => {
    expect(new Result()).toBeDefined()
  })

  it('is not ok when payload is not present', () => {
    const result = new Result()
    expect(result.isOk()).toBe(false)
    expect(result.isErr()).toBe(true)
  })

  it('is ok when payload is present', () => {
    const result = new Result(true)
    expect(result.isOk()).toBe(true)
    expect(result.isErr()).toBe(false)
  })

  it('is always err when error is present', () => {
    const result = new Result(true, new Error())
    expect(result.isOk()).toBe(false)
    expect(result.isErr()).toBe(true)
  })

  it('returns payload when unwrapping ok result type', () => {
    const result = new Result('hello world')
    expect(result.unwrap()).toEqual('hello world')
  })

  it('throws error when unwrapping err result type', () => {
    const result = new Result(undefined, new Error())
    const unwrapInvocation = () => result.unwrap()
    expect(unwrapInvocation).toThrow(Error)
  })

  it('returns undefined when payload is not present and never throws error', () => {
    const result = new Result(undefined, new Error())
    const extractInvocation = () => result.extract()
    expect(result.extract()).toEqual(undefined)
    expect(extractInvocation).not.toThrow(Error)

    const resultB = new Result('string!')
    expect(resultB.extract()).toEqual('string!')
  })

  it('throws error when performing report method on err result type', () => {
    const result = new Result(undefined, new Error())
    const reportInvocation = () => result.report()
    expect(reportInvocation).toThrow(Error)
  })
})

describe('Ok', () => {
  it('creates Result instance', () => {
    expect(Ok(true)).toBeDefined()
  })

  it('returns always ok result type', () => {
    const result = Ok('anything')
    expect(result.isOk()).toBe(true)
  })
})

describe('Err', () => {
  it('creates Result instance', () => {
    expect(Err(new Error('custom error'))).toBeDefined()
  })

  it('returns always Err result type', () => {
    const result = Err(new Error())
    expect(result.isErr()).toBe(true)
  })
})
